import React from 'react';
import Icon from './spinner.svg';

import s from './Spinner.styl';

function Spinner() {
  return (
    <div className={s.root}>
      <Icon />
    </div>
  );
}

export default Spinner
