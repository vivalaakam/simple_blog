import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import style from './styles/main.scss';
import Root from './containers/Root';
import HmrContainer from './containers/HmrContainer';
import RxStateProvider from './containers/RxStateProvider';
import { createState } from './state/RxState';
import reducer$ from './reducers';

const state = createState(reducer$);
const App = (
  <HmrContainer>
    <RxStateProvider state$={state}>
      <Root />
    </RxStateProvider>
  </HmrContainer>
);

const root = document.getElementById('root');
root.classList.add(style.root);
ReactDOM.render(
  App,
  root
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default; // eslint-disable-line

    ReactDOM.render(
      <HmrContainer>
        <RxStateProvider state$={state}>
          <NextApp />
        </RxStateProvider>
      </HmrContainer>,
      root
    );
  });
}
