import React from 'react'
import { Redirect } from '@reach/router'
import { view } from 'react-easy-state'

import userStore from 'store/user'

import withTitle from 'components/HOC/withTitle'
import Flex from 'components/UI/Flex'
import Menu, { MenuItem } from 'components/UI/Menu'
import Link from 'components/UI/Link'

function Admin() {
  if (!userStore.isLogged) {
    return <Redirect to="/login"/>
  }

  return (
    <Flex className="Admin">
      <Menu>
        <MenuItem>
          <Link to="posts">Posts</Link>
        </MenuItem>
      </Menu>
    </Flex>
  );
}

export default withTitle('Admin')(view(Admin));
