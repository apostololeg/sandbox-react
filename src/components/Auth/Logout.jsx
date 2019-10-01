import { h, Component } from 'preact'
import { bind } from 'decko'

import UserStore, { logout } from 'store/user'

import { store as RouterStore } from 'components/Router'
import Spinner from 'components/UI/Spinner'

import s from './Auth.styl'

const REDIRECT_TIMEOUT = 500;

class Logout extends Component {
  componentDidMount() {
    if (!UserStore.isLogged) {
      this.redirect();
      return
    }

    this.logout();
  }

  async logout() {
    const startTime = Date.now();
    await logout();
    const delay = REDIRECT_TIMEOUT - (Date.now() - startTime);

    if (delay <= 0) {
      this.redirect();
      return
    }

    this._timeout = setTimeout(this.redirect, delay);
  }

  @bind
  redirect() {
    RouterStore.navigate('/', { replace: true });
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    return (
      <div className={s.wrap}>
        logging out<Spinner paddedX />
      </div>
    );
  }
}
export default Logout;
