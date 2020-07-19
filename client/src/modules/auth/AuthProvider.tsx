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

  return (
    <>
      {/*<span>{JSON.stringify(data)}</span>*/}
      {/*<span>{error}</span>*/}
      {children}
    </>
  );
};

export default AuthProvider;
