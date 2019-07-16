import React from 'react';
import { Link as ReachLink } from '@reach/router';
import cn from 'classnames' ;

import s from './Link.styl';

const Link = ({ className, children, ...props }) => {
  const isExact = props.to === window.location.pathname;
  const classes = cn(
    s.root,
    isExact && s.exact,
    className
  );

  return (
    <ReachLink className={classes} {...props}>
      {children}
    </ReachLink>
  );
};

export default Link;
