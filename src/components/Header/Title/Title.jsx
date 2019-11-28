import { h, Component, Fragment } from 'preact'
import { createPortal } from 'preact/compat'
import { view } from 'preact-easy-state'
import { bind } from 'decko'

import Time from 'tools/time'
import PageStore, { setTitle } from 'store/page'

import s from './Title.styl'

export function Gap() {
  return <div className={s.gap} />
}

function getNode() {
  return document.getElementById('app-title');
}

function waitForNode() {
  return new Promise(resolve => {
    function checkNode() {
      if (getNode()) {
        resolve();
      } else {
        Time.after(10, checkNode);
      }
    }

    checkNode();
  });
}

@view
class Title extends Component {
  componentDidUpdate() {
    if (PageStore.title !== this.getTitle()) {
      this.init();
    }
  }

  async init() {
    if (getNode()) {
      await waitForNode();
      this.setTitle();
      return;
    }

    this.setTitle();
  }

  getTitle() {
    return this.props.text;
  }

  @bind
  setTitle() {
    setTitle(this.getTitle());
  }

  render() {
    const { children } = this.props;
    const { title } = PageStore;
    const targetNode = getNode();

    if (!targetNode) return null;

    return createPortal((
      <Fragment>
        {title && <h1 className={s.title}>{title}</h1>}
        {children}
      </Fragment>
    ), targetNode);
  }
}

export default Title
