import React from 'react';
import cn from 'classnames';

import s from './ControlBase.styl';

const ControlBase = ({ size='s', children: Component, className = '', ...props }) => {
  const classes = cn(
    s.root,
    s[`root_size_${size}`],
    className,
  );

  return (
    <Component {...props} className={classes} key={props.name} />
  );
}

export default ControlBase;
