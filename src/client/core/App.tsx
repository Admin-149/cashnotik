import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import React from 'react';
import AppRouter from './AppRouter';

const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
