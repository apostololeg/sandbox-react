import React from 'react';
import cn from 'classnames'

import Icon from './spinner.svg';

import s from './Spinner.styl';

const SIZE_MAP = {
  s: 20,
  m: 30,
  l: 40
};

const Spinner = ({ size = 20, className, ...props }) => {
  const sz = typeof size === 'string' ? SIZE_MAP[size] : size;

  return (
    <Icon
      className={cn(s.root, className)}
      style={{ height: sz, width: sz }}
      {...props}
    />
  );
};

export default Spinner
