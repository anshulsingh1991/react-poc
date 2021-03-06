import React, { Component } from 'react';
import user from './../images/no-user.png';
var $ = require('jquery');

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      isVisible: true
    }
  }

  scrollToBottom = () => {
    const node = this.refs.EndMsg;
    node.scrollIntoView({behavior: "smooth"});
  }

  componentDidMount() {
    var userId = localStorage.getItem('user');
    console.log(userId);
    if(userId !== null && userId !== "") {
      this.MessageList();
      this.interval = setInterval(() => this.MessageList(), 5000);
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

  logout(e) {
    localStorage.removeItem('user');
  }

  MessageList(){
    return $.getJSON('http://localhost:4400/api/listAllMessages/')
    .then((data) => {
      this.setState({
        messages: data,
        isVisible: false
      });
    });
  }

  render() {
    var data = new Array(500);
    for (var i = 0; i < this.state.messages.length; i++) {
      if(i >= 500) {
        break;
      }
      else {
        data[i] = new Array(3);
        data[i][0] = this.state.messages[i].content || 'NA';
        data[i][1] = this.state.messages[i].fromUser;
        data[i][2] = this.state.messages[i].toUser;
      }
    }
    return (
      <div>
        <header>
          <a href="/notifications" className="float-left">Go to Notifications</a>
          <a href="/" className="float-right" onClick={this.logout.bind(this)}>Logout</a>
        </header>
        <strong className="Msg-header">List of messages sent on chat app</strong>
        <div className="Panel-msg">
          { this.state.isVisible ? <div className="Loader-panel"><div className="Loader"></div><span> Loading... </span></div> : null }
          {
            data.map(function(msg, i) {
              return (
                <div className="Msg-container Fade-in">
                  <div className="From-user">
                    <img className="Img-user" src={user} alt="dp" />
                    {msg[1]} <span className="To-user">To : {msg[2]}</span>
                  </div>
                  <div className="Msg">{msg[0]}</div>
                </div>
              );
            })
          }
        </div>
        { this.state.isVisible ? null : <footer className="End-msg" ref="EndMsg">-- No more msg --</footer> }
      </div>
    );
  }
}

export default Messages;
