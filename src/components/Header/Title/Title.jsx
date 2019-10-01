import { h, Component, Fragment } from 'preact'
import { createPortal } from 'preact/compat';


import { setTitle } from 'store/page';
import s from './Title.styl'

export function Gap() {
  return <div className={s.gap} />
}

export class Title extends Component {
  componentDidMount() {
    const { text } = this.props;

    if (text) {
      setTitle(text);
    }
  }

  render({ text, children }) {
    return createPortal((
      <Fragment>
        {text && <h1 className={s.title}>{text}</h1>}
        {children}
      </Fragment>
    ), document.getElementById('app-title'));
  }
}
