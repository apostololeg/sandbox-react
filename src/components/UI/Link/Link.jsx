import React from 'react';
import s from './Link.styl';

const Link = ({ text, ...props }) => (
  <Link className={s.root} {...props}>
    {text}
  </Link>
);

export default Link;
