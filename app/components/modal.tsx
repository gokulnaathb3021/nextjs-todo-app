import { updateToDo } from "@/lib/actions";
import { FormEvent, ForwardedRef, useState } from "react";
import { TiTick } from "react-icons/ti";
import { forwardRef } from "react";
import classes from "../todos/todos.module.css";

const EditTodoModal: React.FC<{
  id: string;
  todo: string;
  stopEditing: () => void;
}> = (props) => {
  const [inputToDo, setInputTodo] = useState<string>(props.todo);

  function handleChange(e: FormEvent) {
    setInputTodo((e.target as HTMLInputElement).value);
  }
  return (
    <dialog open className={classes.modal}>
      <h1>You're editing your ToDo</h1>
      <form action={updateToDo} className={classes.inputnupdate}>
        <input type="hidden" name="id" value={props.id}></input>
        <input
          type="text"
          name="todo"
          value={inputToDo}
          onChange={(e) => handleChange(e)}
        ></input>

        <button
          type="submit"
          onClick={() => alert("ToDo updated!")}
          className={classes.update}
        >
          Update
          <TiTick />
        </button>
      </form>
      <form method="dialog">
        <button onClick={props.stopEditing} className={classes.close}>
          Close
        </button>
      </form>
    </dialog>
  );
};

export default EditTodoModal;
