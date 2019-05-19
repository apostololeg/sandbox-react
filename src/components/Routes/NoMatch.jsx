import React, { Component } from 'react';
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
    const { location } = this.props;

    return (
      <div className="NoMatch">
        <h2>Not found "{location.pathname}".</h2>
      </div>
    );
  }
}

export default NoMatch;
