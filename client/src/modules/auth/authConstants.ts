import { AuthState, AuthContextValue } from './authTypes';

export const initAuthState: AuthState = {
  username: '',
  id: 0,
};

export const initAuthContextValue: AuthContextValue = {
  authState: initAuthState,
  login: () => (undefined as unknown) as Promise<void>,
};
