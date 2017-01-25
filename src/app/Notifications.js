import React, { Component } from 'react';
import user from './../images/no-user.png';
var $ = require('jquery');

class Notifications extends Component {
  constructor(props) {
    super(props);
    $(document).ready(function() {
      console.log('in')
    });
    this.state = {
      notifications: {},
      isVisible: true
    }
  }

  NotificationList(){
    return $.getJSON('http://localhost:4400/api/listAllNotifications/')
    .then((data) => {
      console.log('in');
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
    this.NotificationList();
    this.interval = setInterval(() => this.NotificationList(), 5000);
    this.scrollToBottom();
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
          <a href="/" className="float-left">Go to Home</a>
          <a href="/messages" className="float-right">Go to Messages</a>
        </header>
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
        { this.state.isVisible ? null : <div className="End-msg" ref="EndMsg">-- No more msg --</div> }
      </div>
    );
  }
}

export default Notifications;
