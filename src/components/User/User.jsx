import React, { Fragment } from 'react';
import { view } from 'react-easy-state';
import Link from 'components/UI/Link';

import UserStore from 'store/user';
import s from './User.styl';

function LoggedContent() {
  const { name, email } = UserStore;

  return (
    <Fragment>
      <Link to="/profile">{email || name}</Link>
      &nbsp;
      <Link to="/logout">Logout</Link>
    </Fragment>
  );
}

function User() {
  const { isLogged } = UserStore;

  return (
    <div className={s.root}>
      {isLogged
        ? view(LoggedContent())
        : <Link to="/login">Sign in</Link>}
    </div>
  );
}

export default view(User);
