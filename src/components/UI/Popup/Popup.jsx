import { h, Component, createRef } from 'preact'
import { createPortal } from 'preact/compat'
import { store, view } from 'preact-easy-state'
import cn from 'classnames'
import { bind, debounce } from 'decko'

import { getCoords, hasParent } from 'tools/dom'
import Time from 'tools/time'

import s from './Popup.styl'

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

  triggerElem = createRef();

  containerElem = createRef();

  store = store({
    open: false,
    showContent: false
  });

  _clickInsideContent = false;

  _focused = false;

  componentDidMount() {
    document.body.addEventListener('mousedown', this.onDocTouch);
    document.body.addEventListener('touchstart', this.onDocTouch);
    document.addEventListener('keydown', this.onDocKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onDocTouch);
    document.body.removeEventListener('touchstart', this.onDocTouch);
    document.removeEventListener('keydown', this.onDocKeyDown);
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
  onDocKeyDown(e) {
    if (this.store.open && e.key === 'Escape') {
      e.stopPropagation();
      this.close();
      return
    }

    if (!this._focused) return;

    if (/(Enter| )/.test(e.key)) {
      e.stopPropagation();
      this.toggle();
    }
  }

  @bind
  onDocTouch(e) {
    if (!this.store.open) return;

    const isTargetInside = hasParent(e.target, this.containerElem.current);

    if (!isTargetInside || isTargetInside && this.props.autoClose) {
      this.close();
      return;
    };

    e.stopPropagation();
    this._clickInsideContent = true;
    Time.nextTick(() => {
      this._clickInsideContent = false;
    });
  }

  @bind
  onFocus() {
    this._focused = true;
    this.open();
  }

  @bind
  onBlur() {
    this._focused = false;

    if (this._clickInsideContent) return;

    this.close();
  }

  @bind
  onTriggerClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toggle();
  }

  @bind
  @debounce(100)
  setOpen(val) {
    clearTimeout(this.timeoutVisibility);
    this.store.open = val;

    if (!val) {
      this.timeoutVisibility = setTimeout(
        () => this.store.showContent = val,
        ANIMATION_DURATION
      );
    } else {
      this.store.showContent = val;
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

  renderTrigger() {
    const { children, disabled } = this.props;

    const [trigger, content] = children;
    const disableTrigger = disabled || !content;
    const classesTrigger = cn(s.trigger, disableTrigger && s.disabled);
    const triggerProps = {};

    if (!disableTrigger) {
      Object.assign(triggerProps, {
        role: 'button',
        onClick: this.onTriggerClick,
        onFocusCapture: this.onFocus,
        onBlurCapture: this.onBlur
      });
    }

    return (
      <div className={classesTrigger} {...triggerProps} ref={this.triggerElem}>
        {trigger}
      </div>
    );
  }

  renderContent() {
    const {
      children,
      disabled,
      vertical='bottom',
      horizontal='right',
    } = this.props;
    const { open, showContent } = this.store;

    const [trigger, content] = children;
    const triggerElem = this.triggerElem.current;

    const wrppperProps = {};
    const classes = cn(
      s.content,
      !disabled && open && s.open,
      s[vertical],
      s[horizontal]
    );

    if (triggerElem) {
      const { offsetHeight, offsetWidth } = triggerElem;

      wrppperProps.style = {
        height: offsetHeight,
        width: offsetWidth,
        ...getCoords(triggerElem)
      };
    }

    return createPortal(
      <div className={s.contentWrapper} {...wrppperProps}>
        <div className={classes} ref={this.containerElem}>
          {showContent && content}
        </div>
      </div>,
      document.getElementById('app-modal')
    );
  }

  render() {
    const { className } = this.props;
    const classes = cn(s.root, className);

    return (
      <div className={classes} ref={this.domElem}>
        {this.renderTrigger()}
        {this.renderContent()}
      </div>
    );
  }
}

export default view(Popup);
