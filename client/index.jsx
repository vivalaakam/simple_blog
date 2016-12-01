import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import style from './styles/main.scss';
import Root from './containers/Root';
import HmrContainer from './containers/HmrContainer';
import RxStateProvider from './containers/RxStateProvider';
import { createState } from './state/RxState';
import reducer$ from './reducers';

const App = (
  <HmrContainer>
    <RxStateProvider state$={createState(reducer$)}>
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
    const NextApp = require('./containers/Root'); // eslint-disable-line
    ReactDOM.render(
      <HmrContainer>
        <RxStateProvider state$={createState(reducer$)}>
          <NextApp />
        </RxStateProvider>
      </HmrContainer>,
      root
    );
  });
}
