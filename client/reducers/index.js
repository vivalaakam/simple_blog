import Rx from 'rxjs';
import CounterReducer$ from './CounterReducer';
import HistoryReducer$ from './HistoryReducer';

const reducer$ = Rx.Observable.merge(
  CounterReducer$.map(reducer => ['counter', reducer]),
  HistoryReducer$.map(reducer => ['history', reducer])
);

export default reducer$;
