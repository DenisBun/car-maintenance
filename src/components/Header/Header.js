import React from 'react';
import appLogo from './img/wheel-logo.png';
import './Header.css';




const Header = props => ( 
  <div className='Header'>
    <div className='app-logo'>
      <img src={appLogo} alt="logo"/>  
    </div>
  </div>
);
  

export default Header
