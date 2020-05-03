import { createRef } from 'preact';
import cn from 'classnames';

import ControlBase from 'components/UI/ControlBase';

import Time from 'timen';

import s from './Input.styl';

const AUTOFILL_FIELDS = ['email', 'password'];
const AUTOFILL_INTERVAL = 200;
const AUTOFILL_MAX_TRY = 50;

class Input extends ControlBase {
  inputRef = createRef<HTMLInputElement>();

  isAutofill = false;

  _autofillTryCount = 0;

  isNumber = false;

  timers = Time.create();

  static defaultProps = {
    type: 'text',
  };

  constructor(props) {
    super(props);
    this.isNumber = props.type === 'number';
    this.isAutofill = AUTOFILL_FIELDS.indexOf(props.name) > -1;
  }

  componentDidMount() {
    if (this.isAutofill) this.checkAutofill();
  }

  componentWillUnmount() {
    this.timers.clear()
  }

  checkAutofill() {
    const { onChange } = this.props;
    const value = this.inputRef.current?.value;

    if (value) {
      onChange(this.getValue(value))
    } else if (this._autofillTryCount < AUTOFILL_MAX_TRY) {
      this._autofillTryCount++;
      this.timers.after(AUTOFILL_INTERVAL, () => this.checkAutofill());
    }
  }

  getValue(val) {
    if (this.isNumber) return parseFloat(val);
    return val;
  }

  onClick = e => {
    const { onClick } = this.props;

    if (onClick) onClick(e);
  };

  onChange = e => {
    const { onChange } = this.props;

    if (onChange) onChange(e, this.getValue(e.target.value));
  };

  render() {
    const { className, loading, label, ...props } = this.renderProps;

    const classes = cn(
      this.styles.control,
      s.control,
      loading && s.loading,
      props.type === 'file' && s.isFile
    );
    const classesWrap = cn(s[`type_${props.type}`], className);

    if (this.isAutofill) props.ref = this.inputRef;

    return (
      <div className={classesWrap}>
        {label && (
          <label htmlFor={props.name} className={s.label}>
            {label}
          </label>
        )}
        <div // eslint-disable-line
          className={this.styles.decor}
          data-placeholder={props.placeholder}
          onClick={this.onClick}
        >
          <input
            {...props}
            id={props.name}
            className={classes}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Input;
