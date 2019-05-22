import React, { Component } from 'react'
import { Redirect } from '@reach/router'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }) => ({ user });

@connect(mapStateToProps)
class Admin extends Component {
  render() {
    const { user } = this.props;

    if (!user.isLogged) {
      return <Redirect to="/login"/>
    }

    return <div className="Admin">
      <h1>This is Protected Admin Page!</h1>
    </div>
  }
}

export default Admin
