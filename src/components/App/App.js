import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from '../../routes';
import './App.css';
import Header from '../Header/Header';


class App extends Component {
  render() {
    return (
    <div className="App">
      <Routes />
    </div>
    );
  }
}

export default App;
