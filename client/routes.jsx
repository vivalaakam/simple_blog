import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Page1 from './containers/Page1';
import Page2 from './containers/Page2';

export default function Routes() {
  return (
    <Route path="/" component={App}>
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </Route>
  );
}
