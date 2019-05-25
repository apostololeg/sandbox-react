import React from 'react';
// import cn from 'classnames';

import ControlBase from 'components/UI/ControlBase';
// import s from './Button.styl';

const Button = ({ children, ...props }) => (
  <ControlBase {...props}>
    {buttonProps => (
      <button {...buttonProps}>
        {children}
      </button>
    )}
  </ControlBase>
);

export default Button;
