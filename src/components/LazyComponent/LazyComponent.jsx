import { h } from 'preact'
import Loadable from 'preact-loadable'

import Flex from 'components/UI/Flex'
import Spinner from 'components/UI/Spinner'

function Loading() {
  return <Flex centered><Spinner size="l" /></Flex>;
}

export default function LazyComponent({ loading, ...props }) {
  return <Loadable
    fn={() => loading().then(m => m.default)}
    loading={Loading}
    success={Component => <Component {...props} />}
  />;
}

export function LazyArray(routes) {
  return routes.map(([ path, loading ]) =>
    <LazyComponent path={path} loading={loading} key={path} />
  );
}
