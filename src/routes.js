import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
// import About from './components/AboutPage/AboutPage';
// import SingleComponentPage from './components/SingleComponentPage/SingleComponentPage';
// import NotFound from './components/NotFoundPage/NotFoundPage';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/Login" component={LoginPage} />
      {/*<Route path="/:componentName/:env" component={SingleComponentPage} />
      <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

export default Routes;
