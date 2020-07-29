import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Locations from './components/pages/Locations';
import GetInvolved from './components/pages/GetInvolved';
import Home from './components/pages/Home';
import NoMatch from './components/pages/NoMatch';
import { createGlobalStyle } from 'styled-components';
import AddLocation from './components/pages/AddLocation';

const Styles = createGlobalStyle`
  body, html, #root {
    height: 100%;
  }
  
`;

function App() {
  return (
    <>
      <Styles />
      <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/locations" component={Locations}></Route>
            <Route path="/getinvolved" component={GetInvolved}></Route>
            <Route path="/addlocation" component={AddLocation}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
