import React, { Component } from 'react';
var $ = require('jquery');

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: {}
    }
  }

  NotificationList(){
    return $.getJSON('http://localhost:4400/api/listAllNotifications/')
    .then((data) => {
      console.log('in');
      this.setState({ notifications: data });
    });
  }

  componentDidMount() {
    this.NotificationList();
    this.interval = setInterval(() => this.NotificationList(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var data = new Array(10);
    for (var i = 0; i < this.state.notifications.length; i++) {
      if(i >= 10) {
        break;
      }
      else {
        data[i] = new Array(3);
        data[i][0] = this.state.notifications[i].pendingChat;
        data[i][1] = this.state.notifications[i].userFrom;
        data[i][2] = this.state.notifications[i].userTo;
        // data.push(this.state.notifications[i].pendingChat);
      }
    }
    return (
      <div>
        <header>
          <a href="/" className="float-left">Go to Home</a>
          <a href="/messages" className="float-right">Go to Messages</a>
        </header>
        <div className="Panel-msg">
          {
            data.map(function(notification, i) {
              return (
                <div className="Msg-container">
                  <div className="Msg">{notification[0]}</div>
                  <div className="From-user">From : {notification[1]}</div>
                  <div className="To-user">To : {notification[2]}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Notifications;
