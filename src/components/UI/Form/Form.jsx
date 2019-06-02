import React, { Component } from 'react';
import { bind } from 'decko';
import { Formik, Form as FormikForm } from 'formik';

class Form extends Component {
  @bind
  renderForm(form) {
    const { className, render } = this.props;

    return (
      <FormikForm className={className}>
        {render(form)}
      </FormikForm>
    );
  }

  render() {
    const { className, render, ...props } = this.props;

    return (
      <Formik
        enableReinitialize
        validateOnChange={false}
        render={this.renderForm}
        {...props}
      />
    );
  }
}

export default Form;
export Field from './Field';
export SubmitButtons from './SubmitButtons';
