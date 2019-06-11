import React from 'react';
import cn from 'classnames';

import s from './Container.styl';

const Container = ({ className, ...props }) => (
  <div className={cn(s.root, className)} {...props} />
);

export default Container;
