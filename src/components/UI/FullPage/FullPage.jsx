import React from 'react';
import cn from 'classnames';

import s from './FullPage.styl';

function FullPage ({ children, className, centered, scroll, ...props }) {
  const classes = cn(
    s.root,
    className,
    centered && s.centered,
    scroll && s.scroll
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default FullPage;
