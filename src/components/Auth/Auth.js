import React, { Component, Fragment } from 'react'
import { store, view } from 'react-easy-state'
import { Redirect } from '@reach/router'
import { bind } from 'decko'

import { capitalize } from 'tools/string'

import { notify } from 'store/notifications'
import PageStore, { setTitle } from 'store/page'

import Flex from 'components/UI/Flex'
import Link from 'components/UI/Link'
import Form, { SubmitButtons } from 'components/UI/Form'

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
    fields,
    footerContent,
    submitText,
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
        <Form
          className={s.form}
          onSubmit={payload => this.onSubmit(onSubmit, payload)}
          {...formProps}
        >
          {({ Field, isValid, isDirty }) => (
            <Fragment>
              {fields.map(props => <Field {...props} key={props.name} />)}
              <div className={s.footer}>
                {footerContent}
                <div className={s.gap} />
                <SubmitButtons
                  buttons={[
                    {
                      text: submitText,
                      type: 'submit',
                      disabled: !isDirty || !isValid
                    },
                  ]}
                />
              </div>
            </Fragment>
          )}
        </Form>
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
      <Flex centered scrolled>
        <AuthForm>{this.renderAuthForm}</AuthForm>
      </Flex>
    );
  }
}

export default view(Auth);
