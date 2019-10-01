import { h } from 'preact'
import cn from 'classnames'

import { navigate } from '../store';
import ExternalIcon from './icons/external.svg'
import s from './Link.styl'

const Link = ({ className, children, isClear, isDisabled, ...props }) => {
  const { href } = props;
  const { pathname } = window.location;

  const isExternal = /\./.test(href);
  const isNested = !/^\//.test(href) && !isExternal;
  const isExact = href === pathname;

  const classes = cn(
    s.root,
    isDisabled && s.disabled,
    isClear && s.clear,
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

  function handleClick(e) {
    const { href } = props;

    e.preventDefault();

    if (location.pathname !== href) {
      navigate(href);
    }
  }

  return (
    <a className={classes} {...props} onClick={handleClick}>
      {children}
      {isExternal && <ExternalIcon class={s.externalIcon} />}
    </a>
  );
};

export default Link;
