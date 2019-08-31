import React, { Component } from 'react'
import { setTitle } from 'store/page'

export default function(title) {
  return function HOC(HocComponent) {
    return class extends Component {
      componentDidMount() {
        this.prevTitle = setTitle(title);
      }

      componentWillUnmount() {
        setTitle(this.prevTitle);
      }

      prevTitle;

      render() {
        return <HocComponent {...this.props} />
      }
    }
  }
}
