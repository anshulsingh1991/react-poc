import React, { Component } from 'react';
import logo from './../images/react.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React POC</h2>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          To get started, please click on either of two buttons.
        </p>
        <a href="./Messages">
          <input type="button" value="Read Messages" className="Button"/>
        </a>
        <a href="./Notifications">
          <input type="button" value="Read Notifications" className="Button" />
        </a>
      </div>
    );
  }
}

export default App;
