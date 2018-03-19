import React from 'react';
import { Link } from 'react-router-dom';
import jumbotronImg from './img/old-car-wallpaper.jpg';
import './Jumbotron.css';
import Button from '../Common/Button/Button';



const Jumbotron = ({ isLoggedIn }) => (
  !isLoggedIn 
     ? (//<figure className="imghvr-zoom-out-up">
        <div className="content">
          <h1 className="main-title">Car <span className="attentionText">Manager</span></h1>
          <h2 className="subtitle"><span className="attentionText">The only</span> thing you need for your car maintenance!</h2>
          <Link to="/Login" style={{ textDecoration: 'none', paddingBottom: '50px' }}>
              <Button
                className="pulse-action"
                onClick={() => {console.log('Get started')}}
              >
                Get In Action!
              </Button>
            </Link>  
        </div>
     )

    : (
      <div></div>
    )
);
  

export default Jumbotron;
