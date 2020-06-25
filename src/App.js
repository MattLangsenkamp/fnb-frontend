import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NoMatch from './components/pages/NoMatch';
import Layout from './components/common/Layout';
import NavigationBar from './components/common/NavigationBar';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/contact" component={Contact}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
