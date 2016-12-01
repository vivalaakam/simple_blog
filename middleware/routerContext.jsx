/* eslint-disable no-param-reassign */
import React from 'react';
import Rx from 'rxjs';
import { match, RouterContext } from 'react-router';
import { graphql } from 'graphql';
import routes from '../client/routes';
import { createState } from '../client/state/RxState';
import RxStateProvider from '../client/containers/RxStateProvider';
import reducer$ from '../client/reducers';
import schema from '../graphql/schema';

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
      // const isNotFound = renderProps.routes.find(route => route.path === '*');
      // res.status(isNotFound ? 404 : 200);


      const actions = renderProps.components.reduce((acts, component) => {
        if (component.wrappedComponent && component.wrappedComponent.onEnter) {
          acts.push(component.wrappedComponent.onEnter());
        }

        return acts;
      }, []);

      const promises = actions.map(query => graphql(schema, query));

      Promise.all(promises)
        .then((...args) => {
          res.currentState = args[0].reduce((state, curr) => {
            if (curr.data) {
              return { ...state, ...curr.data };
            }
            return state;
          }, {});

          res.routerContext = (
            <RxStateProvider state$={createState(reducer$, Rx.Observable.of(res.currentState))}>
              <RouterContext {...renderProps} />
            </RxStateProvider>
          );

          next();
        });
    }
  })
  ;
}
