import { store } from 'preact-easy-state'

const RouteStore = store({ path: location.pathname });

export default RouteStore;

export function navigate(href, { replace } = {}) {
  history[replace ? 'replaceState' : 'pushState']({}, '', href);
  RouteStore.path = href;
}
