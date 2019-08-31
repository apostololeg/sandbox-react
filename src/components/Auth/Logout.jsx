import React, { Component } from 'react'
import { store, view } from 'react-easy-state'
import { Redirect } from '@reach/router'

import UserStore, { logout } from 'store/user'

import Spinner from 'components/UI/Spinner'

import s from './Auth.styl'

const REDIRECT_TIMEOUT = 500;

@view
class Logout extends Component {
  state = store({ redirect: false });

  async componentDidMount() {
    if (!UserStore.isLogged) {
      this.state.redirect = true;
      return
    }

    await logout();
    this._timeout = setTimeout(
      () => this.state.redirect = true,
      REDIRECT_TIMEOUT
    );
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' noThrow />
    }

    return (
      <div className={s.wrap}>
        logging out<Spinner paddedX />
      </div>
    );
  }
}
export default Logout;
