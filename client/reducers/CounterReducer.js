import Rx from 'rxjs';
import query from '../utils/query';

const initialState = { counter: 0 };

const reset$ = new Rx.Subject();

const CounterReducer$ = Rx.Observable.of(($initialState) => {
  if ($initialState) {
    return $initialState;
  }
  return initialState;
})
  .merge(
    reset$.map(payload => () => payload || initialState)
  );

export default CounterReducer$;

const reset = () => query('mutation { counterReset ) { counter } }')
  .then(({ counterReset }) => {
    reset$.next(counterReset);
  });

const increment = n => query(`mutation { counterIncrement(payload: ${n}) { counter } }`)
  .then(({ counterIncrement }) => {
    reset$.next(counterIncrement);
  });

const decrement = n => query(`mutation { counterDecrement(payload: ${n}) { counter } }`)
  .then(({ counterDecrement }) => {
    reset$.next(counterDecrement);
  });

export {
  reset, increment, decrement
};
