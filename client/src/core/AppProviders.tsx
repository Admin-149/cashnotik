import React, { ReactNode } from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { AuthProvider } from '../modules/auth/AuthProvider';
import { GraphqlProvider } from '../modules/graphql/GraphqlProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <AuthProvider>
    <GraphqlProvider>
      <ThemeProvider>
        <CSSReset />
        {children}
      </ThemeProvider>
    </GraphqlProvider>
  </AuthProvider>
);
