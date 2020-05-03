import { Component } from 'preact';
import omit from 'lodash.omit';

import Flex from 'components/UI/Flex';
import Spinner from 'components/UI/Spinner';

export default class LazyComponent extends Component {
  state = { loading: false };

  componentDidMount() {
    this.update();
  }

  componentDidUpdate({ loading }) {
    if (this.props.loading !== loading) this.update();
  }

  update() {
    const { loading } = this.props;

    this.setState({ loading: true });
    loading().then(m => {
      if (loading !== this.props.loading) return;
      this.C = m.default;
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Flex centered>
          <Spinner size="l" />
        </Flex>
      );
    }

    const { C, props } = this;

    return <C {...omit(props, ['loading'])} />;
  }
}
