import Rx from 'rxjs';

const initialState = 0;

const reset$ = new Rx.Subject();
const increment$ = new Rx.Subject();
const decrement$ = new Rx.Subject();

const CounterReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    increment$.map(payload => state => state + payload),
    decrement$.map(payload => state => state - payload),
    reset$.map(() => () => initialState)
  );

export default CounterReducer$;

const reset = () => reset$.next();

const increment = n => increment$.next(n);

const decrement = n => decrement$.next(n);

const async = (n) => {
  setTimeout(() => increment$.next(n), 100);
};

export {
  reset, increment, decrement, async
};
