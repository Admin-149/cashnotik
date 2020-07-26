import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import jwtDecode from 'jwt-decode';
import {
  AccessToken,
  AuthState,
  TokenPayload,
  LoginFormData,
  AuthContextValue,
} from './authTypes';
import useDataApi from '../../hooks/useDataApi';
import { API_REFRESH_TOKEN, API_LOGIN } from '../api/api';
import { HttpMethod } from '../../core/appTypes';
import { setAccessToken } from './accessToken';
import { initAuthContextValue, initAuthState } from './authConstants';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>(initAuthContextValue);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(initAuthState);

  const { data: refreshTokenData } = useDataApi<AccessToken>(
    API_REFRESH_TOKEN,
    {
      credentials: 'same-origin',
      method: HttpMethod.POST,
    },
  );

  const { data: loginData, refetch: fetchLogin } = useDataApi<AccessToken>(
    API_LOGIN,
    {
      method: HttpMethod.POST,
    },
    { isPreventFetchOnRender: true },
  );

  useEffect(() => {
    const data = loginData || (refreshTokenData ?? null);
    if (data) {
      const { accessToken } = data;
      setAccessToken(accessToken);
      const decoded = jwtDecode<TokenPayload>(accessToken);
      const { iat, exp, ...payload } = decoded;
      setAuthState(payload);
    }
  }, [loginData, refreshTokenData]);

  const login = async (formData: LoginFormData) => {
    await fetchLogin(formData);
  };

  return (
    <AuthContext.Provider value={{ authState, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
