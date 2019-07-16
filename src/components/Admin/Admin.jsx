import React from 'react'
import { Redirect } from '@reach/router'
import { view } from 'react-easy-state'

import userStore from 'store/user'

import FullPage from 'components/UI/FullPage'
import Menu, { MenuItem } from 'components/UI/Menu'
import Link from 'components/UI/Link'

function Admin() {
  if (!userStore.isLogged) {
    return <Redirect to="/login"/>
  }

  return (
    <FullPage className="Admin">
      <Menu>
        <MenuItem>
          <Link to="posts">Posts</Link>
        </MenuItem>
      </Menu>
    </FullPage>
  );
}

export default view(Admin);
