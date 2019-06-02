import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

const Form = ({ className, render, ...props }) => (
  <Formik
    enableReinitialize
    // validateOnChange={false}
    // validateOnBlur
    render={form => (
      <FormikForm className={className}>
        {render(form)}
      </FormikForm>
    )}
    {...props}
  />
);

export default Form;
export Field from './Field';
export SubmitButtons from './SubmitButtons';
