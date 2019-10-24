import { h } from 'preact'
import cn from 'classnames'

import ControlBase from 'components/UI/ControlBase'
import Spinner from 'components/UI/Spinner'

import s from './Button.styl'

class Button extends ControlBase {
  render() {
    const {
      className,
      loading,
      checked,
      children,
      type = 'button',
      As = 'button',
      ...props
    } = this.renderProps;

    const classes = cn(
      this.styles.control,
      this.styles.decor,
      s.root,
      loading && s.loading,
      checked && s.checked,
      className,
    );

    return (
      <As className={classes} {...props} type={type}>
        {children}
        {loading && <Spinner className={s.spinner} size='s' />}
      </As>
    );
  }
}

export default Button;
