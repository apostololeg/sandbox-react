import { h, render } from 'preact'

import App from 'components/App'
import ErrorBoundary from 'components/ErrorBoundary'

let root;

function init() {
  root = render(
    <ErrorBoundary><App/></ErrorBoundary>,
    document.getElementById('app-root'),
    root
  );
}

if (PRODUCTION) {
  require('./pwa');
}

if (module.hot) {
  module.hot.accept();
  module.hot.accept('./components/App', () => requestAnimationFrame(init));
}

init();
