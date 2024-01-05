import { useContext } from "react";
import { TodosContext } from "../components/AddTodo";

export default function useTodos() {
    const todos = useContext(TodosContext)

    if (todos === null || todos === undefined) throw new Error("todos is undefined or null")


    return todos
    
}