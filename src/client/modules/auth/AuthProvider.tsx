import React, { createContext, ReactNode, useContext } from 'react';
import initUser from './authConstants';
import { User } from './authTypes';
import useDataApi from '../../hooks/useDataApi';
import { API_REFRESH_TOKEN } from '../../core/api';
import { HttpMethod } from '../../core/appTypes';

const AuthContext = createContext(initUser);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data } = useDataApi<User>(API_REFRESH_TOKEN, {
    method: HttpMethod.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
  const user = useContext(AuthContext);

  return {
    ...user,
  };
};

export default AuthProvider;
