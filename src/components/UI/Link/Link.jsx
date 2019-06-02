import React from 'react';
import { Link as ReachLink } from '@reach/router';

import s from './Link.styl';

const Link = ({ text, ...props }) => (
  <ReachLink className={s.root} {...props}>
    {text}
  </ReachLink>
);

export default Link;
