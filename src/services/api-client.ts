import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next?: string | null;
}

const axiosInstance = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "5de2bf227b1b4a0caa8877934cbc6a73",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(enpoint: string) {
    this.endpoint = enpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
