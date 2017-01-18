import React, { Component } from 'react';

class Messages extends Component {
  render() {
    return (
      <div>
        <header>
          <a href="/" className="float-left">Go to Home</a>
          <a href="/notifications" className="float-right">Go to Notifications</a>
        </header>
        <div>
          Messages
        </div>
      </div>
    );
  }
}

export default Messages;
