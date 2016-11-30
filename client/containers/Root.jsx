import React from 'react';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import routes from '../routes';

const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1;
export const history = isBrowser ? browserHistory : createMemoryHistory();

export default function Root() {
  return (
    <Router history={history}>
      {routes()}
    </Router>
  );
}
