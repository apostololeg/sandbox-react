import { h } from 'preact'
import { Link as RouterLink } from 'preact-router'
import cn from 'classnames'

import ExternalIcon from './icons/external.svg'
import s from './Link.styl'

const Link = ({ className, children, ...props }) => {
  const { href } = props;
  const { pathname } = window.location;

  const isExternal = /\./.test(href);
  const isNested = !/^\//.test(href) && !isExternal;
  const isExact = href === pathname;

  const Component = isExternal ? 'a' : RouterLink;
  const classes = cn(
    s.root,
    isExact && s.exact,
    isExternal && s.external,
    className
  );

  if (isNested) {
    props.href = `${pathname.replace(/\/$/, '')}/${href}`;
  }

  if (isExternal) {
    props.target = '_blank';
  }

  return (
    <Component className={classes} {...props}>
      {children}
      {isExternal && <ExternalIcon class={s.externalIcon} />}
    </Component>
  );
};

export default Link;
