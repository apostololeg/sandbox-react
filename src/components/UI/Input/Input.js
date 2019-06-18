import React from 'react';
import ControlBase from 'components/UI/ControlBase';

import s from './Input.styl';

function Control({ className, ...inputProps }) {
  return <input className={`${s.root} ${className}`} {...inputProps} />;
}

function Input(props) {
  return (
    <ControlBase {...props}>
      {Control}
    </ControlBase>
  );
}

export default Input;
