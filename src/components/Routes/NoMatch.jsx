import { h, Component } from 'preact';
// import PropTypes from 'prop-types';

class NoMatch extends Component {
  static propTypes = {
    // page: PropTypes.shape({
    //     setTitle: PropTypes.func
    // })
  };

  componentDidMount() {
    // const { setTitle } = this.props.store.page;

    // setTitle('404 | Not found');
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
