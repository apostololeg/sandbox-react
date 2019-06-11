import React, { PureComponent, Fragment } from 'react';
import { store, view } from 'react-easy-state';
import { Link, Redirect } from '@reach/router';
import { bind } from 'decko';
import * as Yup from 'yup';

import User from 'store/user';

import Form, { Field, SubmitButtons } from 'components/UI/Form';
import Input from 'components/UI/Input';
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

class Auth extends PureComponent {
  state = store({ needRedirect: false });

  @bind
  async onSubmit(payload) {
    const { onSubmit } = this.formProps;
    await onSubmit(payload);
    this.state.needRedirect = true;
  }

  @bind
  renderAuthForm({
    title,
    titleContent,
    titleLink,
    initialValues,
    validationSchemaObj,
    ...formProps
  }) {
    this.formProps = formProps;

    return (
      <Fragment>
        <div className={s.header}>
          <h1>{title}</h1>
          {titleContent}
          {titleLink && (
            <Link to={titleLink.to} className={s.link}>
              <Button>{titleLink.text}</Button>
            </Link>
          )}
        </div>
        {initialValues && (
          <Form
            className={s.form}
            initialValues={initialValues}
            validationSchema={Yup.object().shape(validationSchemaObj)}
            onSubmit={this.onSubmit}
            render={this.renderForm}
          />
        )}
      </Fragment>
    );
  }

  @bind
  renderForm(form) {
    const { isValid } = form;
    const { fields, submitText, postFieldsContent } = this.formProps;

    this.form = form;

    return (
      <Fragment>
        {fields.map(({ name, label, ...fieldProps }) => (
          <Field name={name} key={name} Component={Input} {...fieldProps} />
        ))}
        {postFieldsContent}
        <SubmitButtons
          buttons={[
            {
              text: submitText,
              type: 'submit',
              disabled: !isValid
            },
          ]}
        />
      </Fragment>
    );
  }

  render() {
    const { type } = this.props;
    const { needRedirect } = this.state;
    const AuthForm = Forms[capitalize(type)];

    if (needRedirect) {
    // if (User.isLogged) {
      return <Redirect to="/" noThrow />;
    }

    return <AuthForm>{this.renderAuthForm}</AuthForm>;
  }
}

export default view(Auth);
