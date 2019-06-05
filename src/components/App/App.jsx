import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import React, { Component, Fragment } from 'react';
import { Link } from '@reach/router';

import { initUser } from 'store/user';
import Routes from 'components/Routes';

class App extends Component {
  componentDidMount() {
    initUser();
  }

  render() {
    const { user } = this.props;
    const { name, isLogged, roles } = user;
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
}

export default hot(App)
