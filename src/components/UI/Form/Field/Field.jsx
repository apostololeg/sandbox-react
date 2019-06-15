import React from 'react';
import { Field as FormikField } from 'formik';

import Input from 'components/UI/Input';

import s from './Field.styl';

function Field({ name, component: Component = Input, ...props }) {
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
