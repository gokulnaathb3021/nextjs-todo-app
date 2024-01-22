"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";
import { createToDo, deleteToDo, fetchToDos } from "@/lib/actions";
import classes from "./todos.module.css";
import { FcTodoList } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
type X = {
  _id: string;
  todo: string;
  username: string;
};
const Todos: React.FC = () => {
  const [todos, setToDos] = useState<X[]>([
    { _id: "", todo: "", username: "" },
  ]);
  const [num, setNum] = useState<number>(1);
  const user = useContext(AuthContext);
  if (!user) {
    redirect("/");
  }

  useEffect(() => {
    fetchToDos(user?.email as string)
      .then((_todos) => setToDos(_todos.todos))
      .catch((error) => console.log(error));
  }, [num]);

  return (
    user && (
      <div className={classes.todosPage}>
        <div className={classes.titlentodosnlogout}>
          <div className={classes.title}>
            <span>
              <FcTodoList size={100} />
            </span>
            <h2>Create your To-Dos</h2>
          </div>
          <div className={classes.formnlogout}>
            <form action={createToDo}>
              <input
                name="username"
                type="hidden"
                value={user?.email as string}
              ></input>
              <input placeholder="todo" type="text" name="todo"></input>
              <button
                type="submit"
                onClick={() => {
                  setTimeout(() => setNum((prevNum) => prevNum + 1), 1000);
                }}
              >
                Add
              </button>
            </form>
            <div className={classes.logout}>
              <button
                onClick={() => {
                  signOut(auth);
                }}
              >
                Logout
              </button>
            </div>
          </div>
          {todos.length !== 0 &&
            todos.map((todo) => (
              <div className={classes.todo}>
                <li key={todo._id}>{todo.todo}</li>
                <form action={deleteToDo}>
                  <input type="hidden" name="id" value={todo._id}></input>
                  <button
                    type="submit"
                    onClick={() => {
                      setTimeout(() => setNum((prevNum) => prevNum + 1), 1000);
                    }}
                  >
                    <MdDelete size={30} />
                  </button>
                </form>
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default Todos;
