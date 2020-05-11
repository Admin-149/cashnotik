import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './app/serviceWorker';
import store from './app/store';
import './app/i18n';

const render = () => {
  const App = require('./app/App').default

  ReactDOM.render(
      <Provider store={store}>
        <Suspense fallback={<div />}>
          <App />
        </Suspense>
      </Provider>,
      document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
