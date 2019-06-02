import React, { Component } from 'react';
import { bind } from 'decko';

import ControlBase from 'components/UI/ControlBase';

class Input extends Component {
  componentWillUnmount() {
    debugger
  }

  @bind
  renderControl(inputProps) {
    return <input {...inputProps} />;
  }

  render() {
    return (
      <ControlBase {...this.props}>
        {this.renderControl}
      </ControlBase>
    );
  }
}

export default Input;
