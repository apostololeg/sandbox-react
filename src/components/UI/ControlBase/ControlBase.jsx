import React from 'react';
import cn from 'classnames';
import { store, view } from 'react-easy-state';

import s from './ControlBase.styl';

const ControlBase = ({
  size='s',
  Component,
  onFocus,
  onBlur,
  fullWidth,
  ...props
}) => {
  const state = store({ focused: false });
  const styles = {
    decor: cn(
      s.decor,
      state.focused && s.focused,
      props.disabled && s.disabled
    ),
    control: cn(
      s.control,
      s[`size_${size}`],
      fullWidth && s.fullWidth,
    )
  };

  const handleFocus = e => {
    state.focused = true;
    onFocus && onFocus(e); // eslint-disable-line
  };
  const handleBlur = e => {
    state.focused = false;
    onBlur && onBlur(e); // eslint-disable-line
  };

  return (
    <Component
      {...props}
      baseStyles={styles}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export default view(ControlBase);
