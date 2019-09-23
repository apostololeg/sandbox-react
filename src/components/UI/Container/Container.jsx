import { h } from 'preact';
import cn from 'classnames';

import s from './Container.styl';

const Container = ({ className, vertical, ...props }) => {
  const classes = cn(
    s.root,
    className,
    vertical && s.vertical
  );

  return (
    <div className={classes} {...props} />
  );
};

export default Container;
