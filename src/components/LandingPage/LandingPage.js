import React from 'react';
import Header from '../Header/Header';
import Jumbotron from '../Jumbotron/Jumbotron';
import UserContent from '../UserContent/UserContent';
import Gallery from '../Common/ImageGallery/ImageGallery';
import { isLoggedIn } from '../../utils/utils';

const LandingPage = (props) => (
  <div>
    <Header history={props.history} />
    {
      isLoggedIn()
        ? <UserContent history={props.history} />
        : <Jumbotron />
    }
  </div>  
);

export default LandingPage;