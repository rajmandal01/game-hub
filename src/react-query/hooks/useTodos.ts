import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_TODOS_KEY } from "../constants";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.data);
  const query = useQuery<Todo[], Error>({
    queryKey: [CACHE_TODOS_KEY],
    queryFn: fetchTodos,
    staleTime: 1 * 60 * 1000, // 1m
  });
  return query;
};

export default useTodos;
