import { h, Component } from 'preact';

import { setTitle } from 'store/page';

class NoMatch extends Component {
  componentDidMount() {
    setTitle('404');
  }

  render() {
    const { route } = this.props;

    return (
      <div className="NoMatch">
        <h2>Not found "{route.path}".</h2>
      </div>
    );
  }
}

export default NoMatch;
