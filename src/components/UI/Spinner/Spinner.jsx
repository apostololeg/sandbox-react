import cn from 'classnames';

import Icon from './spinner.svg';
import s from './Spinner.styl';

const SIZE_MAP = {
  s: 20,
  m: 30,
  l: 40,
};

const Spinner = ({ size = 20, className, paddedX, ...props }) => {
  const sz = typeof size === 'string' ? SIZE_MAP[size] : size;
  const classes = cn(s.root, paddedX && s.paddedX, className);

  return (
    <Icon className={classes} style={{ height: sz, width: sz }} {...props} />
  );
};

export default Spinner;
