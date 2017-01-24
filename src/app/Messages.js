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

  componentDidMount() {
    this.MessageList();
    this.interval = setInterval(() => this.MessageList(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          <a href="/" className="float-left">Go to Home</a>
          <a href="/notifications" className="float-right">Go to Notifications</a>
        </header>
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
      </div>
    );
  }
}

export default Messages;
