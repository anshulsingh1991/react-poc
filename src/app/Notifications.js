import React, { Component } from 'react';

class Notifications extends Component {
  render() {
    return (
      <div>
        <header>
          <a href="/" className="float-left">Go to Home</a>
          <a href="/messages" className="float-right">Go to Messages</a>
        </header>
        <div>
          Notifications
        </div>
      </div>
    );
  }
}

export default Notifications;
