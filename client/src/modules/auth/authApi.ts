import { useDataApi } from '../../hooks/useDataApi';
import { AccessToken } from './authTypes';
import { API_REFRESH_TOKEN, API_LOGIN, API_LOGOUT } from '../api/api';
import { HttpMethod } from '../../app/appTypes';

export const useRefreshToken = () =>
  useDataApi<AccessToken>(API_REFRESH_TOKEN, {
    credentials: 'same-origin',
    method: HttpMethod.POST,
  });

export const useLogin = () =>
  useDataApi<AccessToken>(
    API_LOGIN,
    { method: HttpMethod.POST },
    { isPreventFetchOnRender: true },
  );

export const useLogout = () =>
  useDataApi<null>(
    API_LOGOUT,
    { method: HttpMethod.POST },
    { isPreventFetchOnRender: true },
  );
