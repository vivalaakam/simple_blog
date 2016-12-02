import Rx from 'rxjs';
import query from '../utils/query';
import { redirect } from './HistoryReducer';

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

const applyData = data => reset$.next(data);

const reset = () => query('mutation { counterReset ) { counter } }')
  .then(({ counterReset }) => {
    applyData(counterReset);
  });

const increment = n => query(`mutation { counterIncrement(payload: ${n}) { counter } }`)
  .then(({ counterIncrement }) => {
    applyData(counterIncrement);
  });

const decrement = n => query(`mutation { counterDecrement(payload: ${n}) { counter } }`)
  .then(({ counterDecrement }) => {
    applyData(counterDecrement);
  });

const redirectToMain = () => redirect('/');

export {
  reset, increment, decrement, applyData, redirectToMain
};
