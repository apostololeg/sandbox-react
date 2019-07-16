import React, { Component } from 'react'
import { store, view } from 'react-easy-state'
import { Redirect } from '@reach/router'
import { bind } from 'decko'
import * as Yup from 'yup'

import { capitalize } from 'tools/string'

import { notify } from 'store/notifications'
import PageStore, { setTitle } from 'store/page'

import FullPage from 'components/UI/FullPage'
import Form from 'components/UI/Form'
import Link from 'components/UI/Link'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

import s from './Auth.styl'

const Forms = {
  Login,
  Logout,
  Register
};

class Auth extends Component {
  store = store({ needRedirect: false });

  componentDidMount() {
    setTitle('Auth');
    PageStore.isAuth = true;
  }

  componentWillUnmount() {
    PageStore.isAuth = false;
  }

  @bind
  async onSubmit(onSubmit, payload) {
    try {
      await onSubmit(payload);
      this.store.needRedirect = true;
    } catch(err) {
      notify({
        type: 'error',
        title: 'Login',
        content: err.message
      });
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
            <Link to={titleLink.to} className={s.link}>
              {titleLink.text}
            </Link>
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
    const { needRedirect } = this.store;
    const AuthForm = Forms[capitalize(type)];

    if (needRedirect) {
      return <Redirect to="/" noThrow />;
    }

    return (
      <FullPage centered scroll>
        <AuthForm>{this.renderAuthForm}</AuthForm>
      </FullPage>
    );
  }
}

export default view(Auth);
