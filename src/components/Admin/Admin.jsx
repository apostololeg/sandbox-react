import { h } from 'preact'
import { view } from 'preact-easy-state'

import userStore from 'store/user'

import withTitle from 'components/HOC/withTitle'
import Redirect from 'components/UI/Redirect'
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
          <Link href="posts">Posts</Link>
        </MenuItem>
      </Menu>
    </Flex>
  );
}

export default withTitle('Admin')(view(Admin));
