import { useCallback, useEffect, useState } from 'react';
import { HttpMethod } from '../core/appTypes';

interface CustomRequestOptions {
  isPreventFetchOnRender?: boolean;
}

export const useDataApi = <T>(
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
  const abortController = new AbortController();

  const allOptions: RequestInit = {
    method: HttpMethod.GET,
    headers: {
      'Content-Type': 'application/json',
    },
    ...requestOptions,
  };

  const fetchDataFromApi = useCallback(
    async (body) => {
      try {
        const currentBody = body ? JSON.stringify(body) : body;
        setLoading(true);
        const res = await fetch(endpointUrl, {
          ...allOptions,
          body: currentBody,
          signal: abortController.signal,
        });
        const fetchData = await res.json();
        if (res.ok) {
          setData(fetchData);
        } else {
          throw new Error(fetchData);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [url, requestOptions],
  );

  useEffect(() => {
    if (!customOptions?.isPreventFetchOnRender) {
      fetchDataFromApi(requestOptions?.body);
    }
    return () => abortController.abort();
  }, []); // Runs once

  const refetch = useCallback(
    (body) => {
      return fetchDataFromApi(body);
    },
    [url, requestOptions],
  );

  return { data, loading, error, refetch };
};
