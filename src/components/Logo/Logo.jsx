import { h } from 'preact';

import Link from 'components/Routes/Link';
import s from './Logo.styl';

const Logo = () => (
  <Link href="/" isClear>
    <div className={s.root} />
  </Link>
);

export default Logo;
