import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Provider, connect } from 'react-redux'
import { bind } from 'decko'
import cn from 'classnames'

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

export default App
