import React from 'react';
import { Router } from '@reach/router';
import { view } from 'react-easy-state';
import userStore from 'store/user';

import LazyComponent from 'components/LazyComponent';
import Home from 'components/Home';
import Profile from 'components/Profile';
import Auth from 'components/Auth';
import Logout from 'components/Auth/Logout';
import NoMatch from './NoMatch';

function Routes() {
  const { isLogged, isAdmin } = userStore;

  return (
    <Router>
      <Home path="/"/>
      {isLogged && <Profile path="profile" />}
      {isAdmin && (
        <LazyComponent path="admin" loader={() => import('components/Admin')} />
      )}
      <Auth path="register" type="register"/>
      <Auth path="login" type="login"/>
      <Logout path="logout" />
      <NoMatch default />
    </Router>
  );
}

export default view(Routes);
