import React from 'react';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import routes from '../routes';

export const history = process.env.BROWSER ? browserHistory : createMemoryHistory();

export default function Root() {
  return (
    <Router history={history}>
      {routes({ first: { time: true } })}
    </Router>
  );
}
