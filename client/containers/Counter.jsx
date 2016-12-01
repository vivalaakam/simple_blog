import React, { PropTypes } from 'react';
import Counter from '../components/Counter';
import counterActions from '../actions/counterActions';
import { connect } from '../state/RxState';

function CounterContainer({ counter, reset, increment, decrement }) {
  return (
    <Counter {...{ counter, reset, increment, decrement }} />
  );
}

CounterContainer.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default connect(state => ({
  counter: state.counter,
  reset() {
    counterActions.reset$.next();
  },
  increment(n) {
    counterActions.increment$.next(n);
  },
  decrement(n) {
    counterActions.decrement$.next(n);
  }
}))(CounterContainer);
