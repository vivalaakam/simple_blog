import React, { PropTypes } from 'react';
import Counter from '../components/Counter';
import * as actions from '../reducers/CounterReducer';
import { connect } from '../state/RxState';
import query from '../utils/query';

function CounterContainer({ counter, reset, increment, decrement }) {
  return (
    <Counter {...{ counter, reset, increment, decrement }} />
  );
}

CounterContainer.queryData = () => 'query{ counter { counter }}';

CounterContainer.onEnter = function onEnter(nextState, replace, callback) {
  return query(CounterContainer.queryData())
    .then(({ counter }) => {
      callback();
      actions.applyData(counter);
    });
};

CounterContainer.propTypes = {
  counter: PropTypes.object.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default connect(state => ({
  counter: state.counter,
  ...actions
}))(CounterContainer);
