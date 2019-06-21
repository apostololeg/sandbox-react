import React, { Component } from 'react';
import { store, view } from 'react-easy-state';
import { Redirect } from '@reach/router';
import { bind } from 'decko';
import * as Yup from 'yup';

import PageStore, { setTitle } from 'store/page';

import Form from 'components/UI/Form';
import Link from 'components/UI/Link';
import Button from 'components/UI/Button';

import Login from './Login';
import Logout from './Logout';
import Register from './Register';

import s from './Auth.styl';

const Forms = {
  Login,
  Logout,
  Register
};

const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`;

class Auth extends Component {
  state = store({ needRedirect: false });

  componentDidMount() {
    setTitle('Auth');
    Object.assign(PageStore, {
      centeredContent: true,
      isAuth: true,
    });
  }

  componentWillUnmount() {
    Object.assign(PageStore, {
      centeredContent: false,
      isAuth: false,
    });
  }

  @bind
  async onSubmit(onSubmit, payload) {
    const ok = await onSubmit(payload);

    if (ok) {
      this.state.needRedirect = true;
    }
  }

  @bind
  renderAuthForm({
    title,
    titleContent,
    titleLink,
    initialValues,
    validationSchemaObj,
    onSubmit,
    ...formProps
  }) {
    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2>{title}</h2>
          {titleContent}
          {titleLink && (
            <Button As={Link} to={titleLink.to} className={s.link}>
              {titleLink.text}
            </Button>
          )}
        </div>
        {initialValues && (
          <Form
            className={s.form}
            initialValues={initialValues}
            validationSchema={Yup.object().shape(validationSchemaObj)}
            onSubmit={payload => this.onSubmit(onSubmit, payload)}
            {...formProps}
          />
        )}
      </div>
    );
  }

  render() {
    const { type } = this.props;
    const { needRedirect } = this.state;
    const AuthForm = Forms[capitalize(type)];

    if (needRedirect) {
      return <Redirect to="/" noThrow />;
    }

    return <AuthForm>{this.renderAuthForm}</AuthForm>;
  }
}

export default view(Auth);
