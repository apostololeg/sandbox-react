import { h, Component } from 'preact'
import { setTitle } from 'store/page'

export default function(title) {
  return function HOC(Comp) {
    return class extends Component {
      componentDidMount() {
        this.prevTitle = setTitle(title);
      }

      componentWillUnmount() {
        setTitle(this.prevTitle);
      }

      prevTitle;

      render() {
        return <Comp {...this.props} />
      }
    }
  }
}
