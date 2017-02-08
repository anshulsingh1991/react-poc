import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: "",
      validationText: ""
    }
  }

  handleEmailChange(e) {
    if(e.target.value === "" || e.target.value === null || e.target.value === undefined) {
      this.setState({ validationText: "Please fill all the required fields." });
    }
    else if(!/^.+@.+\..+$/.test(e.target.value)) {
      this.setState({ validationText: "Please enter a valid email" });
    }
    else {
      this.setState({ validationText: "" });
    }
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    if(e.target.value === "" || e.target.value === null || e.target.value === undefined) {
      this.setState({ validationText: "Please fill all the required fields." });
    }
    else {
      this.setState({ validationText: "" });
    }
    this.setState({password: e.target.value});
  }

  login(e) {
    if((this.state.email === "" || this.state.email === null || this.state.email === undefined || (!/^.+@.+\..+$/.test(this.state.email))) || (this.state.password === "" || this.state.password === null || this.state.password === undefined)) {
      this.setState({
        validationText: "Please fill all the required fields."
      });
      e.preventDefault();
      return false;
    }
    else {
      this.setState({
        message: "Please wait, fetching data..."
      });
    }
    e.preventDefault();
    fetch('http://localhost:4400/api/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('User found.');
        localStorage.setItem('user', 'sdd@34#eq3$2d2dsg*eqwr&wef#wecwd');
        this.setState({
          message: "User found, logging in now..."
        });
        if(document.getElementById("Chb-message").checked) {
          window.location.assign('./Messages');
        }
        else {
          window.location.assign('./Notifications');
        }
      }
      else if (response.status === 303) {
        console.log("Username and password mismatched.");
        this.setState({
          message: "Username and password mismatched."
        });
      }
      else {
        console.log("User doesn't exists.");
        this.setState({
          message: "User doesn't exists."
        });
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <form>
          <input className="Textbox" placeholder="email*" value={this.state.email} type="email" onChange={this.handleEmailChange.bind(this)} />
          <input className="Textbox" placeholder="password*" value={this.state.password} type="password" onChange={this.handlePasswordChange.bind(this)} />
          <div className="Panel-checkboxes">
            <input className="Chb-message" type="radio" id="Chb-message" name="navigatorPage" />
            <label htmlFor="Chb-message">Messages</label>
            <input className="Chb-notification" type="radio" id="Chb-notification" name="navigatorPage" />
            <label htmlFor="Chb-notification">Notifications</label>
          </div>
          <input className="Button" type="submit" value="submit" onClick={this.login.bind(this)}/>
        </form>
        <div className="Message">{this.state.message}</div>
        <div className="Validation-text">{this.state.validationText}</div>
      </div>
    )
  }
}

export default Login;
