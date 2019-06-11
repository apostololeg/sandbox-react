import React from 'react';

import { Link } from '@reach/router';
import s from './Logo.styl';

const Logo = () => (
  <Link to="/">
    <div className={s.root} />
  </Link>
);

export default Logo;
