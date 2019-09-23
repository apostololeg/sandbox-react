import { h, render } from 'preact'
import compare from 'compareq'

import App from 'components/App'
import ErrorBoundary from 'components/ErrorBoundary'

let root;

function init() {
  root = render(
    <ErrorBoundary><App/></ErrorBoundary>,
    document.body,
    root
  );
}

init();

if (module.hot) {
  module.hot.accept('./components/App', () => requestAnimationFrame(init));
}
