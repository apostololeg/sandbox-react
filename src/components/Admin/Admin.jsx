import React, { Component } from 'react'
import { Redirect } from '@reach/router'
import withContext from 'components/HOC/withContext'

@withContext({
    name: 'user',
    fields: 'isLogged'
})
class Admin extends Component {
    render() {
        if (!this.props.user.isLogged) {
            return <Redirect to="/signin"/>
        }

        return <div className="Admin">
            <h1>Protected Admin Page!</h1>
        </div>
    }
}

export default Admin
