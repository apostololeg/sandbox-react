import React from 'react';
import cn from 'classnames';

import s from './Flex.styl';

export function mix(props = {}) {
  const { className, centered, scrolled } = props;

  return cn(
    s.root,
    className,
    centered && s.centered,
    scrolled && s.scrolled
  );
}

function Flex({ children, As = 'div', ...props }) {
  const { className, centered, scrolled, ...other } = props;

  return (
    <As className={mix(props)} {...other}>
      {children}
    </As>
  );
}

export default Flex;
