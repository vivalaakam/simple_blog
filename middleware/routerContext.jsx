/* eslint-disable no-param-reassign */
import React from 'react';
import { match, RouterContext } from 'react-router';
import routes from '../client/routes';
import { createState } from '../client/state/RxState';
import RxStateProvider from '../client/containers/RxStateProvider';
import reducer$ from '../client/reducers';

export default function routerContext(req, res, next) {
  match({
    routes: routes(),
    location: req.url
  }, (error, redirect, renderProps) => {
    if (error) {
      throw error;
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else {
      // path * will return a 404
      const isNotFound = renderProps.routes.find(route => route.path === '*');
      res.status(isNotFound ? 404 : 200);
      res.routerContext = (
        <RxStateProvider state$={createState(reducer$)}>
          <RouterContext {...renderProps} />
        </RxStateProvider>
      );
      next();
    }
  });
}
