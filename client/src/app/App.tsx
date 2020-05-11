import { CSSReset, ThemeProvider } from '@chakra-ui/core/dist';
import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation(['login']);

  return (
    <ThemeProvider>
      <CSSReset />
      {t('password')}
    </ThemeProvider>
  );
};

export default App;
