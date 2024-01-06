import useTodos from "../hooks/useTodos";
import Todo from "./Todo";

export default function Todos() {
  const { todos } = useTodos();

  return (
    <div className="flex justify-center items-center flex-col max-h-[250px] h-fit overflow-y-auto mt-6 mr-[3.5rem] rounded-sm ">
      {todos && todos.map(({ id, title, completed }) => (
        <Todo
          key={crypto.randomUUID()}
          todoId={id}
          title={title}
          completed={completed}
        />
      ))}
    </div>
  );
}
