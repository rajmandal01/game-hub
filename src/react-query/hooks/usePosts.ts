import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const usePosts = (userId: number | undefined) => {
  return useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?`, { params: { userId } })
        .then((response) => response.data),
    staleTime: 1 * 60 * 1000, // 1m
  });
};
export default usePosts;
