import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  from,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import React, { ReactNode } from 'react';
import { onError } from '@apollo/client/link/error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { getAccessToken, setAccessToken } from '../auth/accessToken';
import { HttpMethod } from '../../core/appTypes';
import { API_REFRESH_TOKEN } from '../api/api';

let logout: () => void;

const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: 'http://localhost:3000/graphql',
});

const logoutLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === 'invalid-jwt') {
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
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});

const refreshMiddleware = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();
    if (!token) return true;

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },
  handleFetch: (accessToken) => setAccessToken(accessToken),
  fetchAccessToken: () => {
    return fetch(API_REFRESH_TOKEN, {
      credentials: 'same-origin',
      method: HttpMethod.POST,
    });
  },
});

const client = new ApolloClient({
  link: from([refreshMiddleware, logoutLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

interface GraphqlProviderProps {
  children: ReactNode;
}

const GraphqlProvider = ({ children }: GraphqlProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
