import React from 'react';
import { Link as ReachLink } from '@reach/router';

import s from './Link.styl';

const Link = ({ children, ...props }) => (
  <ReachLink className={s.root} {...props}>
    {children}
  </ReachLink>
);

export default Link;
