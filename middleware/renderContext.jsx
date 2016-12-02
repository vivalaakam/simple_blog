import React from 'react';
import Rx from 'rxjs';
import { RouterContext } from 'react-router';
import RxStateProvider from '../client/containers/RxStateProvider';
import { createState } from '../client/state/RxState';

export default function renderContext(reducer, renderProps) {
  return (state = {}) => (
    <RxStateProvider state$={createState(reducer, Rx.Observable.of(state))}>
      <RouterContext {...renderProps} />
    </RxStateProvider>
  );
}
