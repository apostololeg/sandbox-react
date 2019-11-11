import { h, Component } from 'preact'

import Flex from 'components/UI/Flex'
import Spinner from 'components/UI/Spinner'

export default class LazyComponent extends Component {
  state = { loaded: false };

  componentDidMount() {
    this.props.loading().then(m => {
      this.Comp = m.default;
      this.setState({ loaded: true });
    });
  }

  render() {
    if (!this.state.loaded) {
      return <Flex centered><Spinner size="l" /></Flex>;
    }

    const { Comp, props } = this;
    const { loading, ...rest } = props;

    return <Comp {...rest} />
  }
}
