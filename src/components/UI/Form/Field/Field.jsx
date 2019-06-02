import React from 'react';
import { Field as FormikField } from 'formik';

import s from './Field.styl';

function Field({ name,Component, ...props }) {
  return (
    <FormikField name={name} {...props}>
      {({ field, form: { touched, error } }) => (
        <div className={s.root} dataName={name}>
          <Component {...field} key={name} />
          {touched && error && (
            <span className={s.error}>{error}</span>
          )}
        </div>
      )}
    </FormikField>
  );
};

export default Field;
