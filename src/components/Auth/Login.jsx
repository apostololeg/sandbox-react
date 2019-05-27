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
        <Input type="text" name="username" />
        <Input type="password" name="password" />
        <Button type="submit">Log in</Button>
      </form>
    );
  }
}

export default Login;
