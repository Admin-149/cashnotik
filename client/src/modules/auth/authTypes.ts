export interface AccessToken {
  accessToken: string;
}

export interface AuthState {
  username: string;
  id: number;
}

export interface TokenPayload extends AuthState {
  iat: number;
  exp: number;
}
export interface LoginFormData {
  username: string;
  password: string;
}

export interface AuthContextValue {
  authState: AuthState;
  login: (formaData: LoginFormData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
