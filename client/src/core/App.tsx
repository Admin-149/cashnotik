import React from 'react';
import { AppProviders } from './AppProviders';
import { AppRouter } from '../modules/router/AppRouter';

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
