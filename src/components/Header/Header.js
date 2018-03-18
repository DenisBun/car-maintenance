import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from './img/wheel-logo.png';
import './Header.css';
import Button from '../Common/Button/Button';




const Header = props => ( 
  <header className="header">
    <div className="header-limiter">
      <h1 className="pulse"><Link to="/">Car<span>Manager</span></Link></h1>
      <nav>
        <Link to="/">Home</Link>
        <a href="#">About</a>
        <a href="#">Pricing</a>
        { props.isLoggedIn && <Link to="/BuyCar">Buy car</Link> }
      </nav>
      <ul>
        {!props.isLoginPage && <li><Link to="/Login">Login</Link></li>}
        <li><Button>Sign up</Button></li>
      </ul>
    </div>
  </header>
);
  

export default Header
