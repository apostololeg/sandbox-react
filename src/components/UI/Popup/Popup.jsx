import { Component, createRef } from 'preact';
import { createPortal } from 'preact/compat';
import cn from 'classnames';
import { bind, debounce } from 'decko';

import { getCoords, getScrollParent, hasParent } from 'tools/dom';
import Time from 'timen';

import s from './Popup.styl';
import * as H from './Popup.helpers';

const ANIMATION_DURATION = 200;
const DEFAULT_AXIS = 'vertical';
const DEFAULT_FLOAT = 'bottom';

/**
 * @param  {Array} children
 * @param  {any} children[0] - trigger
 * @param  {any} children[1] - content
 * @param  {Boolean} disabled
 * @param  {(
      top-right
     |top-left
     |right-top
     |right-bottom
     |bottom-right
     |bottom-left
     |left-top
     |left-bottom
     |vertical-righ
     |vertical-left
     |horizontal-top
     |horizontal-bottom
     |vertical
     |horizontal
   )} direction
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

  _clickInsideContent = false;

  _focused = false;

  timeoutVisibility = null;

  state = {
    open: false,
    showContent: false,
  };

  static getDerivedStateFromProps({ disabled }) {
    if (disabled) {
      // close when receive disabled=true
      return { open: false };
    }

    return null;
  }

  componentDidMount() {
    const { onApi } = this.props;

    this.scrollParent = getScrollParent(this.triggerElem.current);
    this.scrollParent.addEventListener('scroll', this.close);

    document.body.addEventListener('mousedown', this.onDocTouch);
    document.body.addEventListener('touchstart', this.onDocTouch);
    document.addEventListener('keydown', this.onDocKeyDown);

    if (onApi) {
      onApi({ setOpen: this.setOpen });
    }
  }

  componentWillUnmount() {
    this.scrollParent.removeEventListener('scroll', this.close);

    document.body.removeEventListener('mousedown', this.onDocTouch);
    document.body.removeEventListener('touchstart', this.onDocTouch);
    document.removeEventListener('keydown', this.onDocKeyDown);
  }

  @bind
  onDocKeyDown(e) {
    if (this.state.open && e.key === 'Escape') {
      e.stopPropagation();
      this.close();
      return;
    }

    if (!this._focused) return;

    if (/Enter| /.test(e.key)) {
      e.stopPropagation();
      this.toggle();
    }
  }

  @bind
  onDocTouch(e) {
    if (!this.state.open) return;

    const isTargetInside = hasParent(e.target, this.containerElem.current);

    if (!isTargetInside || (isTargetInside && this.props.autoClose)) {
      this.close();
      return;
    }

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

  getMetrics() {
    const trigger = this.triggerElem.current;

    if (!trigger) {
      return {
        axis: DEFAULT_AXIS,
        float: DEFAULT_FLOAT,
      };
    }

    const [parsedAxis, parsedFloat] = H.parseMetrics(this.props.direction);
    const scrollParent = document.body;

    const axis = H.getAxis(parsedAxis, trigger, scrollParent);
    const float = parsedFloat || H.getFloat(axis, trigger, scrollParent);

    return { axis, float };
  }

  @bind
  @debounce(100)
  setOpen(val) {
    clearTimeout(this.timeoutVisibility);

    this.setState({ open: val });

    if (val) {
      this.setState({ showContent: val });
      return;
    }

    this.timeoutVisibility = setTimeout(
      () => this.setState({ showContent: val }),
      ANIMATION_DURATION
    );
  }

  @bind
  open() {
    this.setOpen(true);
  }

  @bind
  close() {
    const { onClose } = this.props;
    const { open } = this.state;

    if (!open) return;

    this.setOpen(false);

    if (onClose) {
      onClose();
    }
  }

  @bind
  toggle() {
    this.setOpen(!this.state.open);
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
        onBlurCapture: this.onBlur,
      });
    }

    return (
      <div className={classesTrigger} {...triggerProps} ref={this.triggerElem}>
        {trigger}
      </div>
    );
  }

  renderContent() {
    const { children, disabled, outlined } = this.props;
    const { open, showContent } = this.state;

    const [, content] = children;
    const trigger = this.triggerElem.current;

    const wrppperProps = {};
    const wrapperClasses = cn(s.contentWrapper, open && s.open);

    const { axis, float } = this.getMetrics();
    const classes = cn(
      s.content,
      outlined && s.outlined,
      !disabled && open && s.open,
      s[`axis-${axis}`],
      s[`float-${float}`]
    );

    if (trigger) {
      const { offsetHeight, offsetWidth } = trigger;

      wrppperProps.style = {
        height: offsetHeight,
        width: offsetWidth,
        ...getCoords(trigger),
      };
    }

    return createPortal(
      <div className={wrapperClasses} {...wrppperProps}>
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

Popup.defaultProps = {
  direction: 'vertical',
};

export default Popup;
