import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

import React from 'react';

import Container from 'components/UI/Container';
import Routes from 'components/Routes';
import Header from 'components/Header';

import s from './App.styl';

const App = () => (
  <div className={s.root}>
    <Header className={s.header} />
    <Container className={s.content}>
      <Routes />
    </Container>
  </div>
);

export default hot(App);
