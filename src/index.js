import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'components/App';
import ErrorBoundary from 'components/ErrorBoundary';

const render = Component => {
  ReactDOM.render(
    <ErrorBoundary>
      <AppContainer>
        <Component />
      </AppContainer>
    </ErrorBoundary>,
    document.querySelector('#root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('components/App', () => { render(App) });
}
