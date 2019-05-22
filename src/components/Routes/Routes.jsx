import React from 'react'
import { Router } from '@reach/router'

import LazyComponent from 'components/LazyComponent'
import Home from 'components/Home'
import { Login, Logout, Register } from 'components/Auth';
import NoMatch from './NoMatch'

function Routes({ user }) {
  return (
    <Router>
      <Home path="/"/>
      <LazyComponent
        path="admin"
        loader={() => import('components/Admin')}
      />
      <Login path="login" />
      <Logout path="logout" />
      <NoMatch default />
    </Router>
  );
}

export default Routes;
