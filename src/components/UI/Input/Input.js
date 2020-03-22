import { h, createRef } from 'preact';
import { store, view } from 'preact-easy-state';
import cn from 'classnames';
import { bind } from 'decko';

import ControlBase from 'components/UI/ControlBase';

import s from './Input.styl';

class Input extends ControlBase {
  controlEl = createRef();

  static defaultProps = {
    type: 'text'
  };

  constructor(props) {
    super(props);
    this.store = store({
      fileName: '',
      isFileInput: props.type === 'file'
    });
  }

  @bind
  onClick(e) {
    const { onClick } = this.props;
    const { isFileInput } = this.store;

    if (isFileInput) {
      const input = this.controlEl.current;

      input.click();
      input.focus();
    }

    if (onClick) onClick(e);
  }

  @bind
  onChange(e) {
    const { onChange } = this.props;
    const { isFileInput } = this.store;

    if (isFileInput) {
      const { name = '' } = e.target.files?.[0];
      this.store.fileName = name;
    }

    if (onChange) onChange(e);
  }

  render() {
    const {
      className,
      controlClassName,
      loading,
      label,
      ...props
    } = this.renderProps;
    const { isFileInput, fileName } = this.store;

    const classes = cn(
      this.styles.control,
      s.control,
      loading && s.loading,
      controlClassName
    );
    const classesWrap = cn(s[`type_${props.type}`], className);
    const classesFilePLaceholder = cn(
      s.filePlaceholder,
      fileName && s.filePlaceholderFilled
    );

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
          alt={fileName}
        >
          <input
            {...props}
            id={props.name}
            className={classes}
            ref={this.controlEl}
            onChange={this.onChange}
          />
          {isFileInput && (
            <div className={classesFilePLaceholder}>
              <div className={s.filePlaceholderInner}>
                {fileName || 'Choose file'}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default view(Input);
