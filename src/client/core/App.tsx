import React, { Suspense } from 'react';
import AppRouter from '../modules/router/AppRouter';
import AppProviders from './AppProviders';

const App = () => (
  <AppProviders>
    <Suspense fallback={<div />}>
      <AppRouter />
    </Suspense>
  </AppProviders>
);

export default App;
