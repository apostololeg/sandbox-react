import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'

import Flex from 'components/UI/Flex'
import Spinner from 'components/UI/Spinner'

function LazyComponent({ loader, preload, visible, ...props }) {
  const LoadableComponent = Loadable({
    loader,
    loading: () => <Flex centered><Spinner size="l" /></Flex>,
    render: ({ default: Component }) => <Component {...props} />
  });

  if (preload) {
    LoadableComponent.preload();

    if (!visible) {
      return null
    }
  }

  return <LoadableComponent {...props} />;
}

LazyComponent.propTypes = {
  // loader: PropTypes.oneOfType([
  //   PropTypes.element,
  //   PropTypes.node
  // ]),
  preload: PropTypes.bool,
  visible: PropTypes.bool
};

export default LazyComponent;
