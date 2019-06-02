import React from 'react';
import { Field as FormikField } from 'formik';

import s from './Field.styl';

function Field({ name, Component, ...props }) {
  return (
    <FormikField name={name} {...props}>
      {({ field, form: { touched, errors } }) => {
        const err = Object(errors)[name];

        return (
          <div className={s.root} dataname={name}>
            <Component {...props} {...field} key={name} />
            {touched[name] && err && (
              <span className={s.error}>{err}</span>
            )}
          </div>
        );
      }}
    </FormikField>
  );
};

export default Field;
