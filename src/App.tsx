import AddTodo from "./components/AddTodo";

export default function App() {
  return (
    <div className="bg-[#0F172A] w-screen h-screen p-4 flex justify-center items-center flex-col ">
      <div className="mb-[10rem]">
        <AddTodo />
      </div>
    </div>
  );
}
