import React, { Component, createRef } from 'react';
import { store, view } from 'react-easy-state';
import cn from 'classnames';
import { bind, debounce } from 'decko';

import s from './Popup.styl';

const ANIMATION_DURATION = 200;

/**
 * @param  {Array} children
 * @param  {any} children[0] - trigger
 * @param  {any} children[1] - content
 * @param  {Boolean} disabled
 * @param  {('top'|'bottom')} vertical
 * @param  {('left'|'right')} horizontal
 * @param  {Boolean} autoClose – close popup when clicked
 *
 * @example
 * <Popup>
 *  <Button>click me</Button>
 *  <Menu>
 *    <MenuItem>One</MenuItem>
 *    <MenuItem>Two</MenuItem>
 *    <MenuItem>Three</MenuItem>
 *  </Menu>
 * </Popup>
 */
class Popup extends Component {
  domElem = createRef();

  store = store({
    open: false,
    contentVisibility: false
  });

  componentDidMount() {
    document.addEventListener('click', this.onDocCLick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocCLick);
  }

  timeoutVisibility;

  static getDerivedStateFromProps({ disabled }) {
    if (disabled) {
      // close when receive disabled=true
      return { open: false }
    }

    return null
  }

  @bind
  onDocCLick(e) {
    if (!this.store.open) {
      return
    }

    if (this.props.autoClose) {
      this.close();
      return
    }

    const rootClass = this.domElem.current.className.split(' ')[0];

    if (!e.target.closest(`.${rootClass}`)) {
      this.close();
    }
  }

  @bind
  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggle();
  }

  @bind
  onKeyDown(e) {
    if (['Escape', 'Enter', ' '].includes(e.key)) {
      this.toggle();
    }
  }

  @bind
  @debounce(100)
  setOpen(val) {
    clearTimeout(this.timeoutVisibility);
    this.store.open = val;

    if (!val) {
      this.timeoutVisibility = setTimeout(
        () => this.store.contentVisibility = val,
        ANIMATION_DURATION
      );
    } else {
      this.store.contentVisibility = val;
    }
  }

  @bind
  open() {
    this.setOpen(true);
  }

  @bind
  close() {
    const { onClose } = this.props;

    this.setOpen(false);

    if (onClose) {
      onClose();
    }
  }

  @bind
  toggle() {
    this.setOpen(!this.store.open);
  }

  render() {
    const {
      className,
      children,
      disabled,
      vertical='bottom',
      horizontal='right',
      shadow,
    } = this.props;
    const { open } = this.store;

    const [trigger, content] = children;
    const disableTrigger = disabled || !content;

    const classes = cn(
      s.root,
      !disabled && open && s.open,
      className
    );
    const classesTrigger = cn(s.trigger, disableTrigger && s.disabled);
    const classesContent = cn(
      s.content,
      shadow && s.shadow,
      s[vertical],
      s[horizontal]
    );

    const triggerProps = {};
    const contentProps = {};

    if (!disableTrigger) {
      Object.assign(triggerProps, {
        role: 'button',
        tabIndex: 0,
        onClick: this.onClick,
        onKeyDown: this.onKeyDown,
        onFocus: this.open
      });
    }

    return (
      <div className={classes} ref={this.domElem}>
        <div className={classesTrigger} {...triggerProps}>
          {trigger}
        </div>
        <div className={classesContent} {...contentProps}>
          {open && content}
        </div>
      </div>
    );
  }
}

export default view(Popup);
