import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import APIClient, { FetchResponse } from "../services/api-client";

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const apiClient = new APIClient<T>(endpoint);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .getAll({ signal: controller.signal, ...requestConfig })
        .then((res) => {
          setData(res.results);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
