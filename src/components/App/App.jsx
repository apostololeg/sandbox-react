import 'react-hot-loader'
import { hot } from 'react-hot-loader/root'

import React from 'react'
import { view } from 'react-easy-state'

import FullPage from 'components/UI/FullPage'
import Container from 'components/UI/Container'
import Notifications from 'components/UI/Notifications'

import Routes from 'components/Routes'
import Header from 'components/Header'

import s from './App.styl'

const App = () => (
  <FullPage className={s.root}>
    <Header className={s.header} />
    <Container className={s.content} vertical>
      <Routes />
    </Container>
    <Notifications />
  </FullPage>
);

export default hot(view(App));
