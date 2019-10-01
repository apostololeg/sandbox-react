import { h, Fragment } from 'preact'

import Menu, { MenuItem } from 'components/UI/Menu'
import { Title } from 'components/Header'
import { Link } from 'components/Router'

function Home() {
  return (
    <Fragment>
      <Title text="~/apostol" />
      <Menu>
        <MenuItem>
          <Link href="posts">Posts</Link>
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default Home;
