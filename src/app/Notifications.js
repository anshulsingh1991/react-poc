import React, { Component } from 'react';
import user from './../images/no-user.png';
var $ = require('jquery');

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: {},
      isVisible: true
    }
  }

  logout(e) {
    localStorage.removeItem('user');
  }

  NotificationList(){
    return $.getJSON('http://localhost:4400/api/listAllNotifications/')
    .then((data) => {
      this.setState({
        notifications: data,
        isVisible: false
      });
    });
  }

  scrollToBottom = () => {
    const node = this.refs.EndMsg;
    node.scrollIntoView({behavior: "smooth"});
  }

  componentDidMount() {
    var userId = localStorage.getItem('user');
    console.log(userId);
    if(userId !== null && userId !== "") {
      this.NotificationList();
      this.interval = setInterval(() => this.NotificationList(), 5000);
      this.scrollToBottom();
    }
    else {
      window.location.assign('./');
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var data = new Array(500);
    for (var i = 0; i < this.state.notifications.length; i++) {
      if(i >= 500) {
        break;
      }
      else {
        data[i] = new Array(3);
        data[i][0] = this.state.notifications[i].pendingChat;
        data[i][1] = this.state.notifications[i].userFrom;
        data[i][2] = this.state.notifications[i].userTo;
      }
    }
    return (
      <div>
        <header>
          <a href="/messages" className="float-left">Go to Messages</a>
          <a href="/" className="float-right" onClick={this.logout.bind(this)}>Logout</a>
        </header>
        <strong className="Msg-header">List of notifications on chat app</strong>
        <div className="Panel-msg">
          { this.state.isVisible ? <div className="Loader-panel"><div className="Loader"></div><span> Loading... </span></div> : null }
          {
            data.map(function(notification, i) {
              return (
                <div className="Msg-container Fade-in">
                  <div className="From-user">
                    <img className="Img-user" src={user} alt="dp" />
                    {notification[1]} <span className="To-user">To : {notification[2]}</span>
                  </div>
                  <div className="Msg">Notification Count - <strong>{notification[0]}</strong></div>
                </div>
              );
            })
          }
        </div>
        { this.state.isVisible ? null : <footer className="End-msg" ref="EndMsg">-- No more data --</footer> }
      </div>
    );
  }
}

export default Notifications;
