import React from 'react';
import ControlBase from 'components/UI/ControlBase';

const Input = props => (
  <ControlBase {...props}>
    {inputProps => <input {...inputProps} />}
  </ControlBase>
);

export default Input;
