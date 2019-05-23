import React, { Component } from 'react';

class Register extends Component {
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
        <input type="passwort" name="confirmPassword" />
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default Register;
