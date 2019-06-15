import React from 'react';

import Button from 'components/UI/Button';

import s from './SubmitButtons.styl';

const SubmitButtons = ({ buttons, ...props }) => (
  <div className={s.root} {...props}>
    {buttons.map(({ text, disabled, ...buttonProps }) => (
      <Button
        className={s.item}
        key={text}
        disabled={!!disabled}
        {...buttonProps}
      >
        {text}
      </Button>
    ))}
  </div>
);

export default SubmitButtons;
