import React from 'react';
import ControlBase from 'components/UI/ControlBase';

function Control(inputProps) {
  return <input {...inputProps} />;
}

function Input(props) {
  return (
    <ControlBase {...props}>
      {Control}
    </ControlBase>
  );
}

export default Input;
