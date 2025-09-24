import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  interface AddTodoContext {
    previousTodos: Todo[];
  }

  /**
   * Optimistic update
   * 1.
   *
   */
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    // useMutation <ServerResponse Type, Error type, Mutation/Post data type>
    mutationFn: (todo: Todo) =>
      axios
        .post("https://jsonplaceholder.typicode.com/todosx", todo)
        .then((respose) => respose.data),

    onMutate: (newTodo: Todo) => {
      // Updates the cache before sending data to server
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [newTodo, ...(todos || [])]);
      if (ref.current) ref.current.value = "";

      return { previousTodos }; // return old data in context such that incase of error in new data add/update this can be set to cache, basically rollback!
    },
    onSuccess: (savedTodo, newTodo) => {
      // APPROACH 1: Invalidating the cache, React Query then automatically fetch todos
      //   queryClient.invalidateQueries({ queryKey: ["todos"] });
      // APPROACH 2: Updating the data in cache
      // queryClient.setQueryData<Todo[]>(["todos"], (todos) => [savedTodo, ...(todos || [])]);
      //  if (ref.current) ref.current.value = "";

      // Replacing the todo returned from server with the dummy one added for optimistic udpate
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    onError: (error: Error, newTodo, context) => {
      if (!context) return;
      // Rollback
      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });

  return (
    <>
      {addTodo.error && <div>{addTodo.error.message}</div>}
      <form onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <Input ref={ref} borderRadius={20} placeholder="Add Todo..." variant="filled" />
          <Button
            whiteSpace="normal"
            textAlign="right"
            onClick={() => {
              if (ref.current && ref.current.value) {
                addTodo.mutate({ id: 0, title: ref.current.value, completed: false, userId: 1 });
              }
            }}
            fontSize="md"
            marginStart={"4"}
            variant="ghost"
            disabled={addTodo.isLoading}
          >
            {addTodo.isLoading ? "Adding..." : "Add Todo"}
          </Button>
        </InputGroup>
      </form>
    </>
  );
}
