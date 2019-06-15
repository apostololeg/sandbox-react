import React, { Component } from 'react';
import { bind } from 'decko';
import { Formik, Form as FormikForm } from 'formik';

import Field from './Field';
import SubmitButtons from './SubmitButtons';

import s from './Form.styl';

class Form extends Component {
  @bind
  renderForm({ isValid }) {
    const { className, fields, submitText, footerContent } = this.props;

    return (
      <FormikForm className={className}>
        {fields.map(props => <Field key={props.name} {...props} />)}
        <div className={s.footer}>
          {footerContent}
          <SubmitButtons
            buttons={[
              {
                text: submitText,
                type: 'submit',
                disabled: !isValid
              },
            ]}
          />
        </div>
      </FormikForm>
    );
  }

  render() {
    const { className, ...props } = this.props;

    return (
      <Formik
        enableReinitialize
        render={this.renderForm}
        {...props}
      />
    );
  }
}

export default Form;
export Field from './Field';
export SubmitButtons from './SubmitButtons';
