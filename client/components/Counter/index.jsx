import React, { PropTypes } from 'react';

export default function Counter({ counter, reset, increment, decrement, redirectToMain }) {
  return (
    <div>
      <h1>{ counter.counter}</h1>
      <hr />
      <button onClick={() => increment(1)} id="increment">+</button>
      <button onClick={() => increment(10)} id="increment10">+10</button>
      <button onClick={() => reset()} id="reset">Reset</button>
      <button onClick={() => decrement(1)} id="decrement">-</button>
      <button onClick={() => decrement(10)} id="decrement10">-10</button>
      <button onClick={() => redirectToMain()}>To main</button>
    </div>
  );
}

Counter.propTypes = {
  counter: PropTypes.object.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  redirectToMain: PropTypes.func.isRequired
};
