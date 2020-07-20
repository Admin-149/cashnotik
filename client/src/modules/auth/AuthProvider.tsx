import React, { ReactNode } from 'react';
import { AccessToken } from './authTypes';
import useDataApi from '../../hooks/useDataApi';
import { API_REFRESH_TOKEN } from '../../core/api';
import { HttpMethod } from '../../core/appTypes';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, error } = useDataApi<AccessToken>(API_REFRESH_TOKEN, {
    credentials: 'same-origin',
    method: HttpMethod.POST,
  });

  return <>{children}</>;
};

export default AuthProvider;
