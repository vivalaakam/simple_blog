import React, { PropTypes } from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './layout';
import App from './containers/App';
import Page1 from './containers/Page1';
import Page2 from './containers/Page2';
import Counter from './containers/Counter';

export default function Routes({ first }) {
  function run(loader, nextState, replaceState, callback) {
    return loader(nextState, replaceState, callback);
  }

  function w(loader) {
    return (nextState, replaceState, callback) => {
      if (first.time) {
        first.time = false;
        return callback();
      }

      if (loader) {
        if (loader.onEnter) {
          return run(loader.onEnter, nextState, replaceState, callback);
        }

        if (loader.wrappedComponent && loader.wrappedComponent.onEnter) {
          return run(loader.wrappedComponent.onEnter, nextState, replaceState, callback);
        }
      }

      return callback();
    };
  }

  function c(prevState, nextState, replace, callback) {
    first.time = false;
    return callback();
  }

  return (
    <Route path="/" component={Layout} onChange={c}>
      <IndexRoute component={App} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
      <Route path="/counter" component={Counter} onEnter={w(Counter)} />
    </Route>
  );
}

Routes.propTypes = {
  first: PropTypes.object.isRequired
};
