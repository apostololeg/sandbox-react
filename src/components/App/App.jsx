import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import React, { Fragment } from 'react';
import { Link } from '@reach/router';

import userStore from 'store/user';
import Routes from 'components/Routes';

function App() {
  const { name, isLogged, roles } = userStore;
  const isAdmin = roles.includes('admin');

  return (
    <div>
      {isLogged && (
        <Fragment>
          <h1>Hi, {name}!</h1>
          {isAdmin && <Link to="admin">Admin Page</Link>}
        </Fragment>
      )}
      <Routes />
    </div>
  );
}

export default hot(App);
