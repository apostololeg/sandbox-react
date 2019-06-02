import React from 'react';

import ControlBase from 'components/UI/ControlBase';
import s from './Button.styl';

const Button = ({ children, ...props }) => (
  <ControlBase {...props} className={s.root}>
    {buttonProps => (
      <button {...buttonProps}>
        {children}
      </button>
    )}
  </ControlBase>
);

export default Button;
