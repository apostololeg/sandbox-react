import { h } from 'preact';

import { Link } from 'preact-router';
import s from './Logo.styl';

const Logo = () => (
  <Link href="/">
    <div className={s.root} />
  </Link>
);

export default Logo;
