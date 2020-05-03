import { render } from 'preact';
import { Link } from 'components/Router';

const COMPONENTS_TO_HYDRATE = {
  Link,
};

export function hydrateComponents(rootNode) {
  const nodes = rootNode.querySelectorAll('[data-props]:not([data-inited])');

  nodes.forEach(node => {
    const { component, ...props } = JSON.parse(node.dataset.props);
    const C = COMPONENTS_TO_HYDRATE[component];

    if (C) {
      node.innerHTML = '';
      render(<C {...props} />, node);
      node.setAttribute('data-inited', '');
    }
  });
}
