import React from 'react'
import cn from 'classnames'

import ControlBase from 'components/UI/ControlBase'
import Spinner from 'components/UI/Spinner'

import s from './Button.styl'

function Control({
  baseStyles,
  className,
  loading,
  children,
  As = 'button',
  ...props
}) {
  const classes = cn(
    baseStyles.control,
    baseStyles.decor,
    s.root,
    loading && s.loading,
    className,
  );

  return (
    <As className={classes} {...props}>
      {children}
      {loading && <Spinner size='s' paddedX />}
    </As>
  );
}

const Button = props => (
  <ControlBase {...props} Component={Control} />
);

export default Button;
