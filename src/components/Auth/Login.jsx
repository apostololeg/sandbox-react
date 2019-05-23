import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit() {

  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="username" />
        <input type="passwort" name="password" />
        <button type="submit">Log in</button>
      </form>
    );
  }
}

export default Login;
