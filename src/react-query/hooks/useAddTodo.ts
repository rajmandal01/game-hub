import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_TODOS_KEY } from "../constants";
/**
 * Optimistic update
 */

interface AddTodoContext {
  previousTodos: Todo[];
}

export const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    // useMutation <ServerResponse Type, Error type, Mutation/Post data type>
    mutationFn: (todo: Todo) =>
      axios
        .post("https://jsonplaceholder.typicode.com/todos", todo)
        .then((respose) => respose.data),

    onMutate: (newTodo: Todo) => {
      // Updates the cache before sending data to server
      const previousTodos = queryClient.getQueryData<Todo[]>([CACHE_TODOS_KEY]) || [];
      queryClient.setQueryData<Todo[]>([CACHE_TODOS_KEY], (todos = []) => [newTodo, ...todos]);

      onAdd();

      return { previousTodos }; // return old data in context such that incase of error in new data add/update this can be set to cache, basically rollback!
    },
    onSuccess: (savedTodo, newTodo) => {
      // APPROACH 1: Invalidating the cache, React Query then automatically fetch todos
      //   queryClient.invalidateQueries({ queryKey: ["todos"] });
      // APPROACH 2: Updating the data in cache
      // queryClient.setQueryData<Todo[]>(["todos"], (todos) => [savedTodo, ...(todos || [])]);
      //  if (ref.current) ref.current.value = "";

      // Replacing the todo returned from server with the dummy one added for optimistic udpate
      queryClient.setQueryData<Todo[]>([CACHE_TODOS_KEY], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    onError: (error: Error, newTodo, context) => {
      if (!context) return;
      // Rollback
      queryClient.setQueryData<Todo[]>([CACHE_TODOS_KEY], context.previousTodos);
    },
  });
};
