import React, { PureComponent } from 'react';

import s from './FormField.styl';

class FormField extends PureComponent {
  render() {
    const {
      children,
      ...props
    } = this.props;

    if (validator) {
      props[validateEvent] = validate;
    }

    return (
      <div className={s.root}>
        {children(props)}
        {validationStatus === false && (
          <span className={s.error}>{validationMessage}</span>
        )}
      </div>
    );
  }
};

export default FormField;
