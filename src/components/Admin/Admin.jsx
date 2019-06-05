import React from 'react';
import { Redirect } from '@reach/router';
import { view } from 'react-easy-state';
import userStore from 'store/user';

function Admin() {
  if (!userStore.isLogged) {
    return <Redirect to="/login"/>
  }

  return (
    <div className="Admin">
      <h1>This is Protected Admin Page!</h1>
    </div>
  );
}

export default view(Admin);
