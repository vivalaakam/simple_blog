import Rx from 'rxjs';
import { browserHistory, createMemoryHistory } from 'react-router';

const initialState = process.env.BROWSER ? browserHistory : createMemoryHistory();
const push$ = new Rx.Subject();

const CounterReducer$ = Rx.Observable.of(() => initialState)
  .merge(
    push$.map(payload => state => state.push(payload))
  );

export default CounterReducer$;

const redirect = (url) => {
  push$.next(url);
};

export {
  redirect
};
