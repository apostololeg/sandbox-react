import { h, Component } from 'preact';

import { setTitle } from 'store/page';

class NoMatch extends Component {
  componentDidMount() {
    setTitle('404');
  }

  render() {
    const { url } = this.props;

    return (
      <div className="NoMatch">
        <h2>Not found "{url}".</h2>
      </div>
    );
  }
}

export default NoMatch;
