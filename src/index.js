import React from 'react'
import ReactDOM from 'react-dom'

import store from 'store'

import App from 'components/App'
import ErrorBoundary from 'components/ErrorBoundary'
import Routes from 'components/Routes'

const Root = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </Provider>
);

ReactDOM.render(<Root/>, document.querySelector('#root'));
