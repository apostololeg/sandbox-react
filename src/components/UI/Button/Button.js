import { h } from 'preact'
import cn from 'classnames'

import ControlBase from 'components/UI/ControlBase'
import Spinner from 'components/UI/Spinner'

import s from './Button.styl'

function Control({
  baseStyles,
  className,
  loading,
  checked,
  children,
  type = 'button',
  As = 'button',
  ...props
}) {
  const classes = cn(
    baseStyles.control,
    baseStyles.decor,
    s.root,
    loading && s.loading,
    checked && s.checked,
    className,
  );

  return (
    <As className={classes} {...props} type={type}>
      {children}
      {loading && <Spinner className={s.spinner} size='s' />}
    </As>
  );
}

const Button = props => (
  <ControlBase {...props} Component={Control} />
);

export default Button;
