import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';


class App extends Component {
  render() {
    return (
    <div className="App">
      <Header />
      <LandingPage />
    </div>
    );
  }
}

export default App;
