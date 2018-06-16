import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { bind } from 'decko'
import cn from 'classnames'

import withContext from 'components/HOC/withContext'
import ErrorBoundary from 'components/ErrorBoundary'
import Routes from 'components/Routes/Routes.jsx'
import './App.styl'

@withContext('user')
class App extends Component {
    @bind
    toggleLogged() {
        const { isLogged } = Object(this.props.user);

        if (isLogged) {
            this.props.user.unsetUserData()
        } else {
            this.props.user.setUserData({
                name: 'Vasya',
                email: 'vasya@mail.ru'
            });
        }
    }

    render() {
        const { name, isLogged } = Object(this.props.user);

        return <ErrorBoundary>
            <div className="App">
                {isLogged && <h1>Hi, {name}!</h1>}
                <Routes />
                <Link to="admin">Admin Page</Link>
                <button onClick={this.toggleLogged}>
                    {isLogged ? 'logout' : 'login'}
                </button>
            </div>
        </ErrorBoundary>
    }
}

export default App
