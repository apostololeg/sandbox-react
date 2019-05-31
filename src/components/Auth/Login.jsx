import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Link from 'components/UI/Link';

import { login } from 'store/actions/user';

const mapStateToProps = ({ user }) => ({ user });

@connect(mapStateToProps)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        username: '',
        password: '',
      },
      validationSchemaObj: {
        username: Yup.string().min(3).required(),
        password: Yup.string().min(6).required(),
      },
    };
  }

  onSubmit(values) {
    const { dispatch } = this.props;

    dispatch(login(values));
  }

  render() {
    const { children } = this.props;
    const { initialValues, validationSchemaObj } = this.state;

    return children({
      title: 'Sign in',
      titleLink: {
        text: 'Registration',
        to: '/registration',
      },
      initialValues,
      validationSchemaObj,
      fields: [
        {
          name: 'username',
          label: 'Username',
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
