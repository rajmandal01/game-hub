import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo>({
    // useMutation <ServerResponse Type, Error type, Mutation/Post data type>
    mutationFn: (todo: Todo) =>
      axios
        .post("https://jsonplaceholder.typicode.com/todos", todo)
        .then((respose) => respose.data),
    onSuccess: (savedTodo, todo) => {
      // APPROACH 1: Invalidating the cache, React Query then automatically fetch todos
      //   queryClient.invalidateQueries({ queryKey: ["todos"] });

      // APPROACH 2: Updating the data in cache
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [savedTodo, ...(todos || [])]);
      if (ref.current) ref.current.value = "";
    },
  });

  return (
    <>
      {addTodo.error && <div>{addTodo.error.message}</div>}
      <form>
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
