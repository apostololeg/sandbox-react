import React, { PureComponent, Fragment } from 'react';
import { Link } from '@reach/router';
import { bind } from 'decko';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import SubmitButtons from 'components/UI/Form/SubmitButtons';
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
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape(validationSchemaObj)}
            onSubmit={this.onSubmit}
            render={form => this.renderForm(form, formProps)}
          />
        )}
      </Fragment>
    );
  }

  renderForm(form, { fields, submitText, postFieldsContent }) {
    const { isValid } = form;

    this.form = form;

    return (
      <Form className={s.form}>
        {fields.map(({ name, label, ...fieldProps }) => (
          <Field
            key={name}
            name={name}
            render={({ field }) => (
              <Input
                {...field}
                // TODO:↓
                // autoFocus={i === 0}
                // label={label}
                onKeyUp={this.onKeyUp}
                {...fieldProps}
              />
            )}
          />
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
      </Form>
    );
  }
  render() {
    const { type } = this.props;
    const AuthForm = Forms[capitalize(type)];

    return (
      <AuthForm>{this.renderAuthForm}</AuthForm>
    );
  }
}

export default Auth;
