import { Dispatch, SetStateAction } from "react";

type TodoType = {
    id: string;
    title: string;
    completed: boolean;

  };

  type TodoContext = {
    todos: TodoType[];
    setTodos: Dispatch<SetStateAction<TodoType[]>>
  };