import React from 'react';
import { view } from 'react-easy-state';

import Container from 'components/UI/Container';
import User from 'components/User';
import Logo from 'components/Logo';

import PageStore from 'store/page';

import s from './Header.styl';

const Header = () => (
  <Container className={s.root}>
    <Logo />
    <h1 className={s.title}>{PageStore.title}</h1>
    <div className={s.gap} />
    <User />
  </Container>
);

export default view(Header);
