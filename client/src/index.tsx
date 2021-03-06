import React from 'react';
import ReactDOM from 'react-dom';
import './modules/translation/i18n';

const render = () => {
  // eslint-disable-next-line global-require
  const App = require('./app/App').default;

  ReactDOM.render(<App />, document.getElementById('root'));
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}
