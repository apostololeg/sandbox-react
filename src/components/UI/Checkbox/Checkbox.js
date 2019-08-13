import React from 'react'
import cn from 'classnames'
import nanoid from 'nanoid'

import ControlBase from 'components/UI/ControlBase'

import s from './Checkbox.styl'

function Control({
  baseStyles,
  className,
  children,
  label,
  ...props
}) {
  const id = props.id || nanoid();
  const classes = cn(s.root, className);
  const classesControl = cn(
    baseStyles.control,
    baseStyles.decor,
    s.control,
    props.checked && s.checked,
  );

  return (
    <div className={classes}>
      <input className={classesControl} {...props} id={id} type="checkbox" />
      {label && <label className={s.label} htmlFor={id}>{label}</label>}
    </div>
  );
}

const Button = props => (
  <ControlBase {...props} Component={Control} />
);

export default Button;
