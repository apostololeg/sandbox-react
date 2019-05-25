import React, { Component } from 'react';
import Input from 'components/UI/Input';
import Button from 'components/UI/Button';

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
        <Input size="m" type="text" name="username" />
        <Input size="m" type="password" name="password" />
        <Button size="m" type="submit">Log in</Button>
      </form>
    );
  }
}

export default Login;
