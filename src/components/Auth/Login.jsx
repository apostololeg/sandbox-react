import React from 'react';
import * as Yup from 'yup';

import Link from 'components/UI/Link';
import { login } from 'store/user';

function Login({ children }) {
  return children({
    title: 'Sign in',
    titleLink: {
      text: 'Registration',
      to: '/register',
    },
    initialValues: {
      email: '',
      password: '',
    },
    validationSchemaObj: {
      email: Yup.string().min(3).required(),
      password: Yup.string().min(6).required(),
    },
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
    onSubmit: login,
  });
}

export default Login;
