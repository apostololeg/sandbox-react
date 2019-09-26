import { h, Component, Fragment } from 'preact'
import { view } from 'preact-easy-state'
import PathParser from 'path-parser'

import RouteStore from './store';

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

@view
class Router extends Component {
  constructor(props) {
    super(props);
    this.update();
  }

  shouldComponentUpdate(nextProps) {
    this.update(nextProps.children);
    return true
  }

  update(items = this.props.children) {
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

    return this.routes[index].render;
  }

  render() {
    const Route = this.getRoute();

    return Route;
  }
}

export default Router;
