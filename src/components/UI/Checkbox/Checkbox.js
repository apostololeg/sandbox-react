import cn from 'classnames';
import nanoid from 'nanoid';

import ControlBase from 'components/UI/ControlBase';

import s from './Checkbox.styl';

class Checkbox extends ControlBase {
  render() {
    const { id = nanoid(), className, label, ...props } = this.renderProps;
    const { focused } = this.state;

    const classes = cn(s.root, className);
    const classesControl = cn(
      this.styles.control,
      this.styles.decor,
      s.control,
      props.checked && s.checked
    );
    const markClasses = cn(
      s.checkmark,
      props.checked && s.checked,
      focused && s.focused
    );

    return (
      <div className={classes}>
        <div className={s.controlWrapper}>
          <input
            className={classesControl}
            {...props}
            id={id}
            type="checkbox"
            tabIndex={0}
          />
          <div className={markClasses} />
        </div>
        {label && (
          <label className={s.label} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    );
  }
}

Checkbox.defaultProps = {
  label: '',
  checked: false,
};

export default Checkbox;
