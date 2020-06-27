import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './core/store';
import './core/i18n';

const render = () => {
  // eslint-disable-next-line global-require
  const App = require('./core/App').default;

  ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<div />}>
        <App />
      </Suspense>
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./core/App', render);
}
