import { h, Component, Fragment } from 'preact'
import { view } from 'preact-easy-state'
import PathParser from 'path-parser'
import { bind } from 'decko'

import RouteStore, { navigate } from './store';

function parseRouteParams(routes) {
  const items = [];
  const exactItems = [];

  function parse(route) {
    if (!route) {
      return
    }

    if (Array.isArray(route)) {
      route.forEach(parse);
      return
    }

    if (route.children) {
      route.children.forEach(parse);
      return
    }

    const { path, exact } = route.props;
    const defaultParams = { path, exact, render: route };

    if (!path) {
      exactItems.unshift(defaultParams);
      return
    }

    (exact ? exactItems : items).push({
      ...defaultParams,
      parsed: new PathParser(path)
    });
  }

  parse(routes);

  return [...exactItems, ...items];
}

function updateRouteState() {
  RouteStore.path = location.pathname;
}

@view
class Router extends Component {
  constructor(props) {
    super(props);
    this.rebuildRoutes();
  }

  componentDidMount() {
    window.addEventListener('popstate', updateRouteState);
    window.addEventListener('pushstate', updateRouteState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', updateRouteState);
    window.removeEventListener('pushstate', updateRouteState);
  }

  shouldComponentUpdate(nextProps) {
    this.rebuildRoutes(nextProps.children);
    return true
  }

  rebuildRoutes(items = this.props.children) {
    this.routes = parseRouteParams(items);
  }

  getRoute() {
    let index = 0;
    let params = {};

    this.routes.some(({ path, exact, parsed }, i) => {
      if (!parsed) {
        return false
      }

      if (exact && path === RouteStore.path) {
        index = i;
        return true;
      }

      params = parsed.test(RouteStore.path);

      if (params) {
        index = i;
        return true;
      }

      return false
    });

    const { render } = this.routes[index];
    const routePatch = {
      route: { ...RouteStore, navigate }
    };

    Object.assign(render.props, params, routePatch);

    return render;
  }

  render() {
    const Route = this.getRoute();

    return <Fragment key={Route.props.path || 'default'}>
      {Route}
    </Fragment>
  }
}

export default Router;
export { default as Link } from './Link'
export { default as Redirect } from './Redirect'
