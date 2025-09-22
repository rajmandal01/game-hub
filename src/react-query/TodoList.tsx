import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export default function TodoList() {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.data);
  //   .catch((error) => setError(error));

  const { data: todos, error } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}> {todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
