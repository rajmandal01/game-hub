import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_TODOS_KEY } from "../constants";
import APIClient from "../../services/apiClient";
import todoService, { Todo } from "../../services/todoService";

const useTodos = () => {
  const query = useQuery<Todo[], Error>({
    queryKey: [CACHE_TODOS_KEY],
    queryFn: todoService.getAll,
    staleTime: 1 * 60 * 1000, // 1m
  });
  return query;
};

export default useTodos;
