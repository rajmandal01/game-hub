import { Button, Input, InputGroup } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";
import { useAddTodo } from "./hooks/useAddTodo";

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = "";
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
