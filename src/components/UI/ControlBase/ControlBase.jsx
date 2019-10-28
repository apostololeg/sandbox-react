import { h, Component } from 'preact'

import { store, view } from 'preact-easy-state'
import { bind } from 'decko'
import cn from 'classnames'

import s from './ControlBase.styl'

@view
class ControlBase extends Component {
  constructor(props) {
    super(props);
    this.store = store({ focused: false });
  }

  componentDidMount() {
    document.addEventListener('click', this.dropFocus);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.dropFocus);
  }

  @bind
  dropFocus({ target }) {
    const isClickOutside = !target.classList.contains(s.decor)
      && !target.closest(`.${s.decor}`);

    if (isClickOutside) {
      this.store.focused = false;
    }
  }

  @bind
  onFocus(e) {
    const { onFocus } = this.props;

    this.store.focused = true;
    if (onFocus) onFocus(e);
  };

  @bind
  onBlur(e) {
    const { onBlur } = this.props;

    this.store.focused = false;
    if (onBlur) onBlur(e);
  };

  get styles() {
    const { disabled, fullWidth, size='s' } = this.props;
    const { focused } = this.store;

    return {
      decor: cn(
        s.decor,
        focused && s.focused,
        disabled && s.disabled
      ),
      control: cn(
        s.control,
        s[`size_${size}`],
        fullWidth && s.fullWidth,
      )
    };
  }

  get renderProps() {
    const { component, onFocus, onBlur, ...props } = this.props;

    return {
      ...props,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    };
  }

  render() {
    const { component: Control } = this.props;

    return (
      <Control
        {...this.renderProps}
        baseStyles={this.styles}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }
}

export default ControlBase;
