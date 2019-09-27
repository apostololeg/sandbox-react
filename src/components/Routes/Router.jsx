import { h, Component, Fragment } from 'preact'
import { view } from 'preact-easy-state'
import PathParser from 'path-parser'
import { bind } from 'decko'

import RouteStore, { navigate } from './store';

function parseRouteParams(routes) {
  const items = [];

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

    const { path } = route.props;
    const defaultParams = { render: route };

    if (!path) {
      items.unshift(defaultParams);
      return
    }

    items.push({
      ...defaultParams,
      parsed: new PathParser(path)
    });
  }

  parse(routes);

  return items;
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

    this.routes.some(({ parsed }, i) => {
      if (!parsed) {
        return false
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
