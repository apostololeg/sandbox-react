import 'react-hot-loader'
import { hot } from 'react-hot-loader/root'
import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { connect } from 'react-redux'

import { initUser } from 'store/actions/user';
import Routes from 'components/Routes'

import './App.styl'

const mapStateToProps = ({ user }) => ({ user });

@connect(mapStateToProps)
class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(initUser());
  }

  render() {
    const { user } = this.props;
    const { name, isLogged } = user;

    return (
      <div className="App">
        {isLogged && (
          <Fragment>
            <h1>Hi, {name}!</h1>
            {<Link to="admin">Admin Page</Link>}
          </Fragment>
        )}
        <Routes />

      </div>
    );
  }
}

export default hot(App)
