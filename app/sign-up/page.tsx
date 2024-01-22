"use client";
import classes from "../login.module.css";
import { FcTodoList } from "react-icons/fc";
import { useRef, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { redirect } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const user = useContext(AuthContext);
  if (user?.email) {
    redirect("/todos");
  }
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        redirect("/todos");
      })
      .catch((error) => {
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
            <h2>Register to create your To-Dos.</h2>
          </div>
        </div>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <h2>Register</h2>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
