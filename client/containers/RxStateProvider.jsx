import { PropTypes, Component } from 'react';

export default class RxStateProvider extends Component {
  static propTypes = {
    state$: PropTypes.object.isRequired,
    children: PropTypes.element
  };

  static childContextTypes = {
    state$: PropTypes.object.isRequired
  };

  getChildContext() {
    return { state$: this.props.state$ };
  }

  render() {
    return this.props.children;
  }
}
