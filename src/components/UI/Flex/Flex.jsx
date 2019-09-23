import { h } from 'preact';
import cn from 'classnames';

import s from './Flex.styl';

export function mix(...args) {
  return cn(
    s.root,
    args.includes('centered') && s.centered,
    args.includes('scrolled') && s.scrolled,
    args.join(' ').replace(/(centered|scrolled)/g, '')
  );
}

function Flex({ children, As = 'div', ...props }) {
  const { className, centered, scrolled, ...other } = props;
  const classes = mix(
    className,
    centered && 'centered',
    scrolled && 'scrolled'
  );

  return (
    <As className={classes} {...other}>
      {children}
    </As>
  );
}

export default Flex;
