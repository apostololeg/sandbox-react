import { h } from 'preact';

import Container from 'components/UI/Container';
import User from 'components/User';
import Logo from 'components/Logo';

import s from './Header.styl';

const Header = () => (
  <Container className={s.root}>
    <Logo />
    <div className={s.title} id="app-title" />
    <User />
  </Container>
);

export default Header;
export { default as Title, Gap } from './Title';
