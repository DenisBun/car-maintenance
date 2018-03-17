import React from 'react';
import jumbotronImg from './img/old-car-wallpaper.jpg';
import './LandingPage.css';
import Button from '../Common/Button/Button';



const LandingPage = ({ isLoggedIn }) => (
  !isLoggedIn 
    ? (<figure className="imghvr-zoom-out-up">
        <div>
          <h1 className="main-title">Car <span className="attentionText">Manager</span></h1>
          <h2 className="subtitle"><span className="attentionText">The only</span> thing you need for your car maintenance!</h2>
          <Button
              //fullWidth
              //className={cx('login')}
            >
              Start
            </Button>
        </div>
        <figcaption className="content">
          // Hover Content
        </figcaption>
    </figure>)
    : (
      <div></div>
    )
);
  

export default LandingPage
