import React, { PureComponent } from 'react';

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const Forms = {
  Login,
  Logout,
  Register
};

const capitalize = s => `${s[0].toUpperCase()}${s.slice(1)}`;

class Auth extends PureComponent {
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
        <div className={classes.header}>
          <Typography variant="h5">{title}</Typography>
          {titleContent}
          {titleLink && (
            <Link to={titleLink.to} className={classes.link}>
              <Button color="primary">
                {titleLink.text}
              </Button>
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

  renderForm() {
  }

  render() {
    const { type } = this.props;
    const AuthForm = Forms[capitalize[type]];

    return (
      <AuthForm>{this.renderLoginForm}</AuthForm>
    );
  }
}

export default Auth;
