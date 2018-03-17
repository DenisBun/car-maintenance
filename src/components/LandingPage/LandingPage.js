import React from 'react';
import jumbotronImg from './img/old-car-wallpaper.jpg';
import './LandingPage.css';




const LandingPage = props => (
  <div className="wrapper">
    <figure className="imghvr-zoom-out-up">
        <img src={jumbotronImg} alt="img" className="jubmotron"/>
        <figcaption className="content">
          // Hover Content
        </figcaption>
    </figure>
  </div>  
);
  

export default LandingPage
