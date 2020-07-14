import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import React, { ReactNode } from 'react';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { useAuthState } from '../auth/AuthProvider';

let appJwtToken: string;
let logout: () => void;

const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: 'http://localhost:3000/graphql',
});

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions.code === 'invalid-jwt') {
        logout();
      }
    });
  }
  if (
    networkError &&
    'statusCode' in networkError &&
    networkError.statusCode === 401
  ) {
    logout();
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  if (appJwtToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${appJwtToken}`,
      },
    });
  }
  return forward(operation);
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([logoutLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

interface GraphqlProviderProps {
  children: ReactNode;
}

const GraphqlProvider = ({ children }: GraphqlProviderProps) => {
  const { accessToken } = useAuthState();
  appJwtToken = accessToken;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
