// import { createToDo } from "@/lib/actions";

// export default function Home() {
//   return (
//     <form action={createToDo}>
//       <input
//         name="username"
//         type="hidden"
//         value="gokulnaathb2001@gmail.com"
//       ></input>
//       <input placeholder="todo" type="text" name="todo"></input>
//       <button type="submit">Add</button>
//     </form>
//   );
// }

"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import classes from "./login.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRef, useState, useContext } from "react";
import { FcTodoList } from "react-icons/fc";
import { auth } from "@/firebase/config";
import { AuthContext } from "./context/AuthContext";

export default function Home() {
  const user = useContext(AuthContext);
  if (user?.email) {
    // useRouter().push("/todos");
    redirect("/todos");
  }
  const [areCredentialsInvalid, setAreCredentialsInvalid] =
    useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        redirect("/todos");
      })
      .catch((error) => {
        setAreCredentialsInvalid(true);
        console.log(`${error.message} - Code is ${error.code}`);
      });
  }
  return (
    <>
      <div className={classes.loginContainer}>
        <div className={classes.header}>
          <span>
            <FcTodoList size={100} />
          </span>
          <div className={classes.title}>
            <h1>To-Dos List App, Stay On The Track!</h1>
            <h2>Register/Login to create your To-Dos.</h2>
          </div>
        </div>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your registered email."
            ref={emailInputRef}
          />
          <input
            type="password"
            placeholder="Enter your password."
            ref={passwordInputRef}
          />
          <button type="submit">Login</button>
          {areCredentialsInvalid && (
            <p style={{ color: "white" }}>Invalid Credentials!</p>
          )}
        </form>
        <div className={classes.register}>
          <span>New user?</span>
          <Link href="/sign-up">
            <button>REGISTER</button>
          </Link>
        </div>
      </div>
    </>
  );
}
