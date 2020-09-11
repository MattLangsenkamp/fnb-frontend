import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { gql, ApolloClient, ApolloLink, HttpLink, InMemoryCache, ApolloProvider, from } from '@apollo/client';


const cache = new InMemoryCache()


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const httpLink = new HttpLink({ uri: 'http://0.0.0.0:8080/graphql', credentials: 'include'});

const setTokensAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;
    
    const accessToken = headers.get("AccessToken")
    const refreshToken = headers.get("RefreshToken")

    localStorage.setItem('AccessToken', accessToken)
    localStorage.setItem('RefreshToken', refreshToken)

    return response;
  });
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      AccessToken: localStorage.getItem('AccessToken') || "poo",
      RefreshToken: localStorage.getItem('RefreshToken') || null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  link: from([
    authMiddleware,
    setTokensAfterware,
    httpLink
  ]),
  cache: cache,
  credentials: 'include'
});

export default cache;
cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("AccessToken")
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



