import { h } from 'preact'
import cn from 'classnames'

import { Link } from 'components/Router'

import s from './Logo.styl'

const Logo = ({ className }) => (
  <Link href="/" className={cn(s.root, className)} isClear isClearPadding />
);

export default Logo;
