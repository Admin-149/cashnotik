import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import jwtDecode from 'jwt-decode';
import {
  AuthState,
  TokenPayload,
  LoginFormData,
  AuthContextValue,
} from './authTypes';
import { setAccessToken } from './accessToken';
import { initAuthContextValue, initAuthState } from './authConstants';
import { useRefreshToken, useLogin } from './authApi';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>(initAuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(initAuthState);
  const {
    data: refreshTokenData,
    loading: loadingRefreshToken,
  } = useRefreshToken();
  const {
    data: loginData,
    refetch: fetchLogin,
    loading: loadingLogin,
  } = useLogin();

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

  if (loadingRefreshToken) return <FullPageLoader />;

  return (
    <AuthContext.Provider value={{ authState, login, loading: loadingLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
