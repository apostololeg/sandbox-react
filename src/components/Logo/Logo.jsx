import { h } from 'preact'
import cn from 'classnames'

import { Link } from 'components/Router'

import s from './Logo.styl'

const Logo = ({ className }) => (
  <Link href="/" isClear className={cn(s.root, className)} />
);

export default Logo;
