import { MdDone, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import useTodos from "../hooks/useTodos";
import { useRef, useState } from "react";

export default function Todo({
  todoId,
  title,
  completed,
}: {
  todoId: string;
  title: string;
  completed: boolean;
}) {
  const { setTodos } = useTodos();
  const newInputValue = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const deleteTodo = () => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);

      if (updatedTodos.length > 0) {
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      } else {
        localStorage.setItem("todos", "[]");
      }

      return updatedTodos;
    });
  };

  const toggleComplete = () => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const editTodo = () => {
    const newValue = newInputValue.current?.value.trim();

    if (newValue === "") return;

    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              title: newValue!,
            }
          : todo
      )
    );

    setIsEdit(false);
  };

  return (
    <div className="flex  items-center justify-between gap-4 w-[350px] my-3 border border-[#353F4F]  p-3 rounded-md bg-[#283447]">
      <div
        className={`title text-white text-[1.5rem] max-w-[200px]  break-words `}
      >
        {isEdit ? (
          <div className="flex items-center  gap-3">
            <input
              defaultValue={title}
              ref={newInputValue}
              className="w-[150px] h-[35px] bg-[#283447] border border-[#353F4F] rounded-sm text-white indent-3 "
              type="text"
            />
            <button
              className="text-[2rem] duration-200 hover:text-slate-500"
              onClick={editTodo}
            >
              <IoIosAddCircle />
            </button>
          </div>
        ) : (
          <div className={`${completed ? "line-through" : ""}`}>{title}</div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div
          className="text-[2rem] cursor-pointer text-[#64748B] duration-200 hover:text-green-500"
          onClick={toggleComplete}
        >
          <MdDone />
        </div>

        <div
          onClick={() => setIsEdit(true)}
          className="text-[2rem] cursor-pointer text-[#64748B] duration-200 hover:text-blue-500"
        >
          <MdEdit />
        </div>
        <div
          className="text-[1.5rem] cursor-pointer text-[#64748B] duration-200 hover:text-red-500"
          onClick={deleteTodo}
        >
          <FaTrash />
        </div>
      </div>
    </div>
  );
}
