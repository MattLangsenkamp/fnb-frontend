import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  gql,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  from,
} from "@apollo/client";
import { Ref } from "yup";

const cache = new InMemoryCache();

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const httpLink = new HttpLink({
  uri: "http://0.0.0.0:8080/graphql",
  credentials: "include",
});

const setTokensAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    let accessToken = headers.get("AccessToken");
    let refreshToken = headers.get("RefreshToken");

    if (accessToken.startsWith(",")) {
      accessToken = accessToken.substr(2, accessToken.length);
    }
    if (refreshToken.startsWith(",")) {
      refreshToken = refreshToken.substr(2, refreshToken.length);
    }

    localStorage.setItem("AccessToken", accessToken);
    localStorage.setItem("RefreshToken", refreshToken);
    cache.writeQuery({
      query: IS_LOGGED_IN,
      data: {
        isLoggedIn:
          !!localStorage.getItem("AccessToken") &&
          !!localStorage.getItem("RefreshToken"),
      },
    });
    return response;
  });
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      AccessToken: localStorage.getItem("AccessToken") || null,
      RefreshToken: localStorage.getItem("RefreshToken") || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: from([authMiddleware, setTokensAfterware, httpLink]),
  cache: cache,
  credentials: "include",
});

export default cache;
cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn:
      !!localStorage.getItem("AccessToken") &&
      !!localStorage.getItem("RefreshToken"),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
