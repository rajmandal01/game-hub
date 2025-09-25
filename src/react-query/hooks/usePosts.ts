import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import APIClient from "../../services/apiClient";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface PostQuery {
  page: number;
  pageSize: number;
  userId?: number;
}

const usePosts = (query: PostQuery) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () => {
      return axios
        .get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize,
            userId: query.userId,
          },
        })
        .then((response) => response.data);
    },
    staleTime: 1 * 60 * 1000, // 1m
    keepPreviousData: true,
    enabled: query.userId ? true : false,
  });
};
export default usePosts;
