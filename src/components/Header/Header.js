import React from 'react';
import appLogo from './img/wheel-logo.png';
import './Header.css';




const Header = props => ( 
  <header className="header">
    <div className="header-limiter">
      <h1 className="pulse"><a href="#">Car<span>Manager</span></a></h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Pricing</a>
      </nav>
      <ul>
        <li><a href="#">Login</a></li>
        <li><a href="#">Sign up</a></li>
      </ul>
    </div>
  </header>
);
  

export default Header
