import React from 'react';

import { login } from 'store/user';

import Link from 'components/UI/Link';

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
    validationSchema: {
      email: { type: 'email' },
      password: { type: 'string', min: 6 },
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
    footerContent: (
      <Link to="/reset-password">Forgot password?</Link>
    ),
    submitText: 'Sign in',
    onSubmit: login,
  });
}

export default Login;
