import React, { Component } from 'react';
import Raven from 'raven-js';

// const KEY = '906c3e2f81a34fc38a5b2df8a56f6dbe';
// const PROJECT = '1214627'
// const config = {
//     release: '0-0-0',
//     environment: 'development-test',
// };

Raven
  // .config(`https://${KEY}@sentry.io/${PROJECT}`, config)
  .install();

// @inject('store')
// @observer
class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    Raven.captureException(error, { extra: info });
    console.warn('Error Happend', error);
  }

  render() {
    return this.props.children
  }
}

export default ErrorBoundary;
