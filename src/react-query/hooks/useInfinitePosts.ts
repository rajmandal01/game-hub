import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostQuery {
  pageSize: number;
  userId?: number;
}

const useInfinitePosts = (query: PostQuery) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
            userId: query.userId,
          },
        })
        .then((response) => response.data),
    staleTime: 1 * 60 * 1000, // 1m
    // keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default useInfinitePosts;
