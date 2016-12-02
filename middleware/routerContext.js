/* eslint-disable no-param-reassign */
import { match } from 'react-router';
import { graphql } from 'graphql';
import routes from '../client/routes';
import renderContext from './renderContext';
import reducer$ from '../client/reducers';
import schema from '../graphql/schema';

export default function routerContext(req, res, next) {
  match({
    routes: routes({ first: { time: true } }),
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

      const context = renderContext(reducer$, renderProps);

      if (!renderProps.components) {
        res.routerContext = context();
        next();

        return undefined;
      }

      const actions = renderProps.components.reduce((acts, component) => {
        if (component.wrappedComponent && component.wrappedComponent.queryData) {
          acts.push(component.wrappedComponent.queryData());
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

          res.routerContext = context(res.currentState);
          next();
        });
    }
    return undefined;
  })
  ;
}
