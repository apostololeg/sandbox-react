import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { bind } from 'decko';

import Link from 'components/UI/Link';
import { login } from 'store/actions/user';

const mapStateToProps = ({ user }) => ({ user });

@connect(mapStateToProps)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        email: '',
        password: '',
      },
      validationSchemaObj: {
        email: Yup.string().min(3).required(),
        password: Yup.string().min(6).required(),
      },
    };
  }

  @bind
  onSubmit(values) {
    const { dispatch } = this.props;

    dispatch(login(values));
  }

  render() {
    const { children } = this.props;
    const { initialValues, validationSchemaObj } = this.state;

    // return children({title: 123});
    return children({
      title: 'Sign in',
      titleLink: {
        text: 'Registration',
        to: '/register',
      },
      initialValues,
      validationSchemaObj,
      fields: [
        {
          name: 'email',
          label: 'Email',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
        },
      ],
      postFieldsContent: (
        <Link to="/reset-password" text="Forgot password?"/>
      ),
      submitText: 'Sign in',
      onSubmit: this.onSubmit,
    });
  }
}

export default Login;
