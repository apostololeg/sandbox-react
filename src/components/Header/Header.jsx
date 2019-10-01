import { h } from 'preact';
import { view } from 'preact-easy-state';

import Container from 'components/UI/Container';
import User from 'components/User';
import Logo from 'components/Logo';

import PageStore from 'store/page';

import Title, { Gap } from './Title';
import s from './Header.styl';

const Header = () => (
  <Container className={s.root}>
    <Logo />
    <div className={s.title} id="app-title" />
    <User />
  </Container>
);

export default view(Header);
export { Title, Gap } from './Title';
