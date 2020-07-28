import { useDataApi } from '../../hooks/useDataApi';
import { AccessToken } from './authTypes';
import { API_REFRESH_TOKEN, API_LOGIN } from '../api/api';
import { HttpMethod } from '../../core/appTypes';

export const useRefreshToken = () => {
  const responseData = useDataApi<AccessToken>(API_REFRESH_TOKEN, {
    credentials: 'same-origin',
    method: HttpMethod.POST,
  });

  return responseData;
};

export const useLogin = () => {
  const responseData = useDataApi<AccessToken>(
    API_LOGIN,
    {
      method: HttpMethod.POST,
    },
    { isPreventFetchOnRender: true },
  );

  return responseData;
};
