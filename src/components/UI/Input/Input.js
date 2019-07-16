import React, { Component, createRef } from 'react'
import { store, view } from 'react-easy-state'
import cn from 'classnames'
import { bind } from 'decko'

import ControlBase from 'components/UI/ControlBase'

import s from './Input.styl'

class Control extends Component {
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

    onClick && onClick(e); // eslint-disable-line
  }

  @bind
  onChange(e) {
    const { onChange } = this.props;
    const { isFileInput } = this.store;

    if (isFileInput) {
      const { name = '' } = Object(e.target.files[0]);
      this.store.fileName = name;
    }
    onChange && onChange(e); // eslint-disable-line
  }

  controlEl = createRef();

  render() {
    const {
      baseStyles,
      className,
      controlClassName,
      loading,
      ...props
    } = this.props;
    const { isFileInput, fileName } = this.store;

    const classes = cn(
      baseStyles.control,
      s.control,
      loading && s.loading,
      controlClassName
    );
    const classesWrap = cn(
      baseStyles.decor,
      s[`type_${props.type}`],
      className
    );
    const classesFilePLaceholder = cn(
      s.filePLaceholder,
      fileName && s.filePLaceholderFilled
    );

    return (
      <div // eslint-disable-line
        className={classesWrap}
        data-placeholder={props.placeholder}
        onClick={this.onClick}
      >
        <input
          {...props}
          className={classes}
          ref={this.controlEl}
          onChange={this.onChange}
        />
        {isFileInput && (
          <div className={classesFilePLaceholder}>
            <div className={s.filePLaceholderInner}>
              {fileName || 'Choose file'}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const Input = props => (
  <ControlBase {...props} Component={Control} />
);

export default view(Input);
