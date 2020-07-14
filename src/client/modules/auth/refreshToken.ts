import { API_REFRESH_TOKEN } from '../../core/api';
import { HttpMethod } from '../../core/appTypes';

const refreshToken = async () => {
  try {
    const response = await fetch(API_REFRESH_TOKEN, {
      method: HttpMethod.GET,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    return {
      error: {
        code: 'failed',
      },
    };
  }
};

export default refreshToken;
