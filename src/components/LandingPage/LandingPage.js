import React from 'react';
import Header from '../Header/Header';
import Jumbotron from '../Jumbotron/Jumbotron';
import UserContent from '../UserContent/UserContent';
import { isLoggedIn } from '../../utils/utils';

const LandingPage = (props) => (
  <div>
    <Header />
    {
      isLoggedIn()
        ? <UserContent />
        : <Jumbotron />
    }
  </div>  
);

export default LandingPage;