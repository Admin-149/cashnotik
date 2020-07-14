import { useCallback, useEffect, useState } from 'react';

const useDataApi = <T>(
  url: string,
  options?: RequestInit,
): {
  data: T | null;
  loading: boolean;
  error: any;
  refetch: () => Promise<void>;
} => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [endpointUrl] = useState(url);

  const fetchDataFromApi = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(endpointUrl, options).then(async (res) => {
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
  }, [url, options]);

  useEffect(() => {
    fetchDataFromApi();
  }, []); // Runs once

  const refetch = useCallback(() => {
    return fetchDataFromApi();
  }, [url, options]);

  return { data, loading, error, refetch };
};

export default useDataApi;
