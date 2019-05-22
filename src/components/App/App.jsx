import 'react-hot-loader'
import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { connect } from 'react-redux'

import Routes from 'components/Routes'

import './App.styl'

const mapStateToProps = ({ user }) => ({ user });

@connect(mapStateToProps)
class App extends Component {
  render() {
    const { name, isLogged } = Object(this.props.user);

    return (
      <div className="App">
        {isLogged && <h1>Hi, {name}!</h1>}
        <Routes />
        <Link to="admin">Admin Page</Link>
      </div>
    );
  }
}

export default hot(App)
