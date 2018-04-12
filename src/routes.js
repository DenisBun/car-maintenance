import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import BuyCar from './components/BuyCar/BuyCar';
import UserOders from './components/UserOrders/UserOrders';
import UpgradeCar from './components/UpgradeCar/UpgradeCar';
import NotFound from './components/NotFound/NotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/Login" component={LoginPage} />
      <Route path="/Registration" component={RegistrationPage} />
      <Route path="/BuyCar" component={BuyCar} />
      <Route path="/UpgradeCar" component={UpgradeCar} />
      <Route path="/Orders/:userId" component={UserOders} />
      {/* <Route path="/Admin" component={AdminPage} /> */}
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
