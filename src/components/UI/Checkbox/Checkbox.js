import React from 'react'
import cn from 'classnames'

import ControlBase from 'components/UI/ControlBase'

import s from './Checkbox.styl'

function Control({
  baseStyles,
  className,
  children,
  label,
  ...props
}) {
  const classes = cn(s.root, className);
  const classesControl = cn(
    baseStyles.control,
    baseStyles.decor,
    s.control,
    props.value && s.checked,
  );

  return (
    <div className={classes}>
      <checkbox className={classesControl} {...props} />
      {label && <label className={s.label} htmlFor={props.id}>{label}</label>}
    </div>
  );
}

const Button = props => (
  <ControlBase {...props} Component={Control} />
);

export default Button;
