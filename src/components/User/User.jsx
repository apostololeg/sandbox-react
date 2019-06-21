import React, { Fragment } from 'react';
import { view } from 'react-easy-state';
import Link from 'components/UI/Link';

import UserStore from 'store/user';
import PageStore from 'store/page';

import s from './User.styl';

function LoggedContent({ name, email }) {
  return (
    <Fragment>
      <Link to="/profile">{email || name}</Link>
      &nbsp;
      <Link to="/logout">Logout</Link>
    </Fragment>
  );
}

function User() {
  const { isLogged, name, email } = UserStore;
  const { isAuth } = PageStore;

  return (
    <div className={s.root}>
      {isLogged
        ? view(LoggedContent({ name, email }))
        : (!isAuth && <Link to="/login">Sign in</Link>)
      }
    </div>
  );
}

export default view(User);
