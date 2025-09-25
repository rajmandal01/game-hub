import axios from "axios";

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

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  post = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
