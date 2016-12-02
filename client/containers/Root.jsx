import React from 'react';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import routes from '../routes';
import { connect } from '../state/RxState';
import { redirect } from '../reducers/HistoryReducer';

export const history = process.env.BROWSER ? browserHistory : createMemoryHistory();

function Root() {
  return (
    <Router key={Math.random()} history={history}>
      {routes({ first: { time: true } })}
    </Router>
  );
}

export default connect(() => ({
  redirect
}))(Root);
