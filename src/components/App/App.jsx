import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

import React from 'react';
import cn from 'classnames';
import { view } from 'react-easy-state';

import Container from 'components/UI/Container';
import Notifications from 'components/UI/Notifications';

import Routes from 'components/Routes';
import Header from 'components/Header';

import PageStore from 'store/page';

import s from './App.styl';

const App = () => {
  const contentClasses = cn(
    s.content,
    PageStore.centeredContent && s.contentCentered
  );

  return (
    <div className={s.root}>
      <Header className={s.header} />
      <Container className={contentClasses}>
        <Routes />
      </Container>
      <Notifications />
    </div>
  );
}

export default hot(view(App));
