import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import ErrorBoundary from 'components/ErrorBoundary';

const render = Component => {
  ReactDOM.render(
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>,
    document.querySelector('#root')
  );
};

render(App);
