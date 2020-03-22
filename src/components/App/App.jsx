import { h } from 'preact';
import { hot } from 'react-hot-loader/root';

import Flex from 'components/UI/Flex';
import Container from 'components/UI/Container';
import Notifications from 'components/UI/Notifications';

import Routes from 'components/Routes';
import Header from 'components/Header';

import s from './App.styl';

const App = () => (
  <Flex className={s.root}>
    <Header className={s.header} />
    <Container className={s.content} vertical>
      <Routes />
    </Container>
    <Notifications />
  </Flex>
);

export default (PRODUCTION ? App : hot(App));
