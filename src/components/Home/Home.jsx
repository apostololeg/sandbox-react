import Menu, { MenuItem } from 'components/UI/Menu';
import { Title } from 'components/Header';
import { Link } from 'components/Router';

function Home() {
  return [
    <Title text="~/apostol" />,
    <Menu>
      <MenuItem>
        <Link href="posts">Posts</Link>
      </MenuItem>
    </Menu>,
  ];
}

export default Home;
