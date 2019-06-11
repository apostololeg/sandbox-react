import React, { Fragment } from 'react';
import { view } from 'react-easy-state';
import Link from 'components/UI/Link';

import UserStore from 'store/user';
import s from './User.styl';

function LoggedContent() {
  const { name, email } = UserStore;

  return (
    <Fragment>
      <Link to="/profile" text={email || name} />
      &nbsp;
      <Link to="/logout" text="Logout" />
    </Fragment>
  );
}

function User() {
  const { isLogged } = UserStore;

  return (
    <div className={s.root}>
      {isLogged
        ? LoggedContent()
        : <Link to="/login" text="Sign in" />}
    </div>
  );
}

export default view(User);
