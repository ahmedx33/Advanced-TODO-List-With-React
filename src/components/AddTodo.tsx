import { createContext, useEffect, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import Todos from "./Todos";
import { TodoContext, TodoType } from "../ts/types";

export const TodosContext = createContext<TodoContext | null>(null);

export default function AddTodo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const completed: boolean = false;
  const inputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem("todos") === "null" && todos?.length === 0) {
      localStorage.setItem("todos", "[]");
    }
  }, []);

  useEffect(() => {
    const data: TodoType[] = JSON.parse(`${localStorage.getItem("todos")}`);
    if (todos?.length !== 0) {
      return localStorage.setItem("todos", JSON.stringify(todos));
    }
    setTodos(data);
  }, [todos]);

  const addNewTodo = () => {
    const newTodoTitle = inputValue.current?.value.trim();
    if (newTodoTitle === "") return;

    setTodos(
      (prev) =>
        prev &&
        ([
          ...prev,
          {
            id: crypto.randomUUID(),
            title: newTodoTitle,
            completed,
          },
        ] as TodoType[])
    );

    if (inputValue.current) {
      inputValue.current.value = "";
    }
  };
  return (
    <>
      <div className="flex items-center justify-center flex-col mt-10 gap-5 ">
        <div className="flex items-center gap-5">
          <input
            ref={inputValue}
            className="w-[350px] h-[35px] bg-[#283447] border border-[#353F4F] rounded-sm text-white indent-3 "
            type="text"
          />
          <div
            className="text-[45px] text-white duration-200 hover:text-[#70BBE2] cursor-pointer "
            onClick={addNewTodo}
          >
            <CiCirclePlus />
          </div>
        </div>

        <TodosContext.Provider value={{ todos, setTodos }}>
          <Todos />
        </TodosContext.Provider>
      </div>
    </>
  );
}
