import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App/App';
// import About from './components/AboutPage/AboutPage';
// import SingleComponentPage from './components/SingleComponentPage/SingleComponentPage';
// import NotFound from './components/NotFoundPage/NotFoundPage';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      {/* <Route path="/about" component={About} />
      <Route path="/:componentName/:env" component={SingleComponentPage} />
      <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

export default Routes;
