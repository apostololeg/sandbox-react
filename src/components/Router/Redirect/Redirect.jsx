import { Component } from 'preact'

import { navigate } from '../store';

export default class Redirect extends Component {
  componentWillMount() {
    navigate(this.props.to, { replace: true });
  }

  render() {
    return null;
  }
}
