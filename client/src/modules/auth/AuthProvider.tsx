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
import { useRefreshToken, useLogin, useLogout } from './authApi';
import { FullPageLoader } from '../../components/Loader/FullPageLoader';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>(initAuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(initAuthState);
  const [loading, setLoading] = useState<boolean>(false);
  const [initLoad, setInitLoad] = useState<boolean>(true);

  const {
    data: refreshTokenData,
    loading: loadingRefreshToken,
    error,
  } = useRefreshToken();
  const {
    data: loginData,
    refetch: fetchLogin,
    loading: loadingLogin,
  } = useLogin();
  const { loading: loadingLogout, refetch: fetchLogout } = useLogout();

  useEffect(() => {
    const data = loginData || (refreshTokenData ?? null);
    if (data) {
      const { accessToken } = data;
      setAccessToken(accessToken);
      const decoded = jwtDecode<TokenPayload>(accessToken);
      const { iat, exp, ...payload } = decoded;
      setAuthState(payload);
      setInitLoad(false);
    }
  }, [loginData, refreshTokenData]);

  useEffect(() => {
    if (error) setInitLoad(false);
  }, [error]);

  useEffect(() => {
    if (loadingLogin || loadingRefreshToken || loadingLogout) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingLogin, loadingRefreshToken, loadingLogout]);

  const login = (formData: LoginFormData) => fetchLogin(formData);

  const logout = async () => {
    await fetchLogout();
    setAccessToken('');
    setAuthState(initAuthState);
  };

  if (loadingRefreshToken || initLoad) return <FullPageLoader />;

  return (
    <AuthContext.Provider value={{ authState, login, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
