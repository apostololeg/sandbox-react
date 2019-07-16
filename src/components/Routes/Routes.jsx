import React from 'react'
import { Router } from '@reach/router'
import { view } from 'react-easy-state'
import userStore from 'store/user'

import LazyComponent from 'components/LazyComponent'

import Home from 'components/Home'
import Profile from 'components/Profile'
import Auth from 'components/Auth'

import NoMatch from './NoMatch'

function Routes() {
  const { isLogged, isAdmin } = userStore;

  return (
    <Router style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
      <Home path="/"/>
      {isLogged && <Profile path="profile" />}
      {isAdmin && (
        <LazyComponent path="admin" loader={() => import('components/Admin')} />
      )}
      <Auth path="register" type="register"/>
      <Auth path="login" type="login"/>
      <Auth path="logout" type="logout" />
      <NoMatch default />
    </Router>
  );
}

export default view(Routes);
