"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";
import { createToDo, deleteToDo, fetchToDos } from "@/lib/actions";
import classes from "./todos.module.css";
import { FcTodoList } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import EditTodoModal from "../components/modal";
type X = {
  _id: string;
  todo: string;
  username: string;
};
const Todos: React.FC = () => {
  const user = useContext(AuthContext);
  if (!user) {
    redirect("/");
  }

  const [todos, setToDos] = useState<X[]>([
    { _id: "", todo: "", username: "" },
  ]);
  const [num, setNum] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    fetchToDos(user?.email as string)
      .then((_todos) => setToDos(_todos.todos))
      .catch((error) => console.log(error));
  }, [num]);

  function stopEditing() {
    setTimeout(() => setNum((prevNum) => prevNum + 1), 300);
    setId("");
    setIsEditing(false);
  }

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
                  setTimeout(() => setNum((prevNum) => prevNum + 1), 300);
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
                <button
                  onClick={() => {
                    setId(todo._id);
                    setIsEditing(true);
                  }}
                >
                  <FaPenToSquare size={30} />
                </button>
                {isEditing && id === todo._id && (
                  <EditTodoModal
                    id={todo._id}
                    todo={todo.todo}
                    stopEditing={stopEditing}
                  />
                )}
                <form action={deleteToDo}>
                  <input type="hidden" name="id" value={todo._id}></input>
                  <button
                    type="submit"
                    onClick={() => {
                      setTimeout(() => setNum((prevNum) => prevNum + 1), 300);
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
