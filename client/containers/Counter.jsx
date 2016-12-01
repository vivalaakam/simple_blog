import React, { PropTypes } from 'react';
import Counter from '../components/Counter';
import * as actions from '../reducers/CounterReducer';
import { connect } from '../state/RxState';

function CounterContainer({ counter, reset, increment, decrement, async }) {
  return (
    <Counter {...{ counter, reset, increment, decrement, async }} />
  );
}

CounterContainer.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  async: PropTypes.func.isRequired
};

export default connect(state => ({
  counter: state.counter,
  ...actions
}))(CounterContainer);
