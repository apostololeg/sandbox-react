import React from 'react';
import { connect } from 'react-redux'
import { Router } from '@reach/router';

import LazyComponent from 'components/LazyComponent';
import Home from 'components/Home';
import Auth from 'components/Auth';
import NoMatch from './NoMatch';

function Routes({ user }) {
  return (
    <Router>
      <Home path="/"/>
      {user.roles.includes('admin') && (
        <LazyComponent
          path="admin"
          loader={() => import('components/Admin')}
        />
      )}
      <Auth path="login" type="login"/>
      <Auth path="logout" type="logout"/>
      <Auth path="register" type="register"/>
      <NoMatch default />
    </Router>
  );
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Routes);
