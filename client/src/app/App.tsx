import { CSSReset, ThemeProvider } from '@chakra-ui/core/dist';
import React from 'react';

const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      Test
    </ThemeProvider>
  );
};

export default App;
