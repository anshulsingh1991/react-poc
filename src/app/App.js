import React, { Component } from 'react';
import logo from './../images/react.svg';
import Login from './Login';
import './App.css';

class App extends Component {
  componentDidMount() {
    var userId = localStorage.getItem('user');
    console.log(userId);
    if(userId !== null && userId !== "") {
      window.location.assign('./Messages');
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React POC</h2>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          To get started, please login.
        </p>
        <Login />
      </div>
    );
  }
}

export default App;
