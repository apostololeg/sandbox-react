import React from 'react';

import Container from 'components/UI/Container';
import User from 'components/User';
import Logo from 'components/Logo';

import s from './Header.styl';

const Header = () => (
  <Container className={s.root}>
    <Logo />
    <div className={s.gap} />
    <User />
  </Container>
);

export default Header;
