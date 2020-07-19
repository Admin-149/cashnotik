import { useCallback, useEffect, useState } from 'react';
import { HttpMethod } from '../core/appTypes';

interface CustomRequestOptions {
  isPreventFetchOnRender?: boolean;
}

const useDataApi = <T>(
  url: string,
  requestOptions?: RequestInit,
  customOptions?: CustomRequestOptions,
): {
  data: T | null;
  loading: boolean;
  error: any;
  refetch: (body: any) => Promise<void>;
} => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [endpointUrl] = useState(url);

  const allOptions: RequestInit = {
    method: HttpMethod.GET,
    headers: {
      'Content-Type': 'application/json',
    },
    ...requestOptions,
  };

  const fetchDataFromApi = useCallback(
    async (body) => {
      const currentBody = body ? JSON.stringify(body) : body;
      try {
        setLoading(true);
        const response = await fetch(endpointUrl, {
          ...allOptions,
          body: currentBody,
        }).then(async (res) => {
          const fetchData = await res.json();
          if (res.ok) {
            return fetchData;
          }
          return Promise.reject(fetchData);
        });
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [url, requestOptions],
  );

  useEffect(() => {
    if (!customOptions?.isPreventFetchOnRender)
      fetchDataFromApi(requestOptions?.body);
  }, []); // Runs once

  const refetch = useCallback(
    (body) => {
      return fetchDataFromApi(body);
    },
    [url, requestOptions],
  );

  return { data, loading, error, refetch };
};

export default useDataApi;
