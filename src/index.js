import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from 'store';

import App from 'components/App';
import ErrorBoundary from 'components/ErrorBoundary';

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary>
        <AppContainer>
          <Component />
        </AppContainer>
      </ErrorBoundary>
    </Provider>,
    document.querySelector('#root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('components/App', () => { render(App) });
}
