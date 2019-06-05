import React, { Component, Fragment } from 'react';
import { store, view } from 'react-easy-state';
import { Redirect } from '@reach/router';

import Spinner from 'components/UI/Spinner';

const state = store({ redirect: false });
const REDIRECT_TIMEOUT = 1000;

class Logout extends Component {
  componentDidMount() {
    this._timeout = setTimeout(
      () => state.redirect = true,
      REDIRECT_TIMEOUT
    );
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    if (state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <Fragment>
        logging out ...&nbsp;<Spinner/>
      </Fragment>
    );
  }
}
export default view(Logout);
