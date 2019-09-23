import { h, Component } from 'preact'
import { store, view } from 'preact-easy-state'

import UserStore, { logout } from 'store/user'

import Redirect from 'components/UI/Redirect'
import Spinner from 'components/UI/Spinner'

import s from './Auth.styl'

const REDIRECT_TIMEOUT = 500;

class Logout extends Component {
  store = store({ redirect: false });

  async componentDidMount() {
    if (!UserStore.isLogged) {
      this.store.redirect = true;
      return
    }

    await logout();
    this._timeout = setTimeout(
      () => this.store.redirect = true,
      REDIRECT_TIMEOUT
    );
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    if (this.store.redirect) {
      return <Redirect to='/' noThrow />
    }

    return (
      <div className={s.wrap}>
        logging out<Spinner paddedX />
      </div>
    );
  }
}
export default view(Logout);
