import { h } from 'preact'

import withTitle from 'components/HOC/withTitle'
import Menu, { MenuItem } from 'components/UI/Menu'
import Link from 'components/Routes/Link'

function Home() {
  return (
    <Menu>
      <MenuItem>
        <Link href="posts">Posts</Link>
      </MenuItem>
    </Menu>
  );
}

export default withTitle('~/apostol')(Home);
