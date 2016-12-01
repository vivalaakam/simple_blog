import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../html';

export default function render(req, res) {
  if (process.env.NODE_ENV === 'development') {
    webpackIsomorphicTools.refresh();
  }

  const html = ReactDOM.renderToString(
    <Html
      assets={webpackIsomorphicTools.assets()}
      component={res.routerContext}
      state={res.currentState}
    />
  );

  res.send(
    `<!doctype html>\n${html}`
  );
}
