import React, { Component } from 'react';
var $ = require('jquery');

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {}
    }
  }

  componentDidMount() {
    this.MessageList();
    this.interval = setInterval(() => this.MessageList(), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  MessageList(){
    return $.getJSON('http://localhost:4400/api/listAllMessages/')
    .then((data) => {
      this.setState({ messages: data });
    });
  }

  render() {
    var data = new Array(10);
    for (var i = 0; i < this.state.messages.length; i++) {
      if(i >= 10) {
        break;
      }
      else {
        data[i] = new Array(3);
        data[i][0] = this.state.messages[i].content;
        data[i][1] = this.state.messages[i].fromUser;
        data[i][2] = this.state.messages[i].toUser;
        // data.push("Message - " + this.state.messages[i].content + " From - " + this.state.messages[i].fromUser + " To - " + this.state.messages[i].toUser);
      }
    }
    return (
      <div>
        <header>
          <a href="/" className="float-left">Go to Home</a>
          <a href="/notifications" className="float-right">Go to Notifications</a>
        </header>
        <div className="Panel-msg">
          {
            data.map(function(msg, i) {
              return (
                <div className="Msg-container">
                  <div className="Msg">{msg[0]}</div>
                  <div className="From-user">From : {msg[1]}</div>
                  <div className="To-user">To : {msg[2]}</div>
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
