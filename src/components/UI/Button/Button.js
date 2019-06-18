import React from 'react';

import ControlBase from 'components/UI/ControlBase';
import s from './Button.styl';

const Button = ({ children, As = 'button', ...props }) => (
  <ControlBase {...props} className={s.root}>
    {buttonProps => (
      <As {...buttonProps}>{children}</As>
    )}
  </ControlBase>
);

export default Button;
