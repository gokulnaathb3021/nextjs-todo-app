"use server";

import { revalidatePath } from "next/cache";
import ToDoModel from "./todo-model";
import dbConnect from "./db-connect";

export async function createToDo(formData: FormData) {
  console.log(formData);
  try {
    await dbConnect();
    const { username, todo } = Object.fromEntries(formData);
    const newToDo = new ToDoModel({
      username,
      todo,
    });
    await newToDo.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create new user!");
  }
}

export async function fetchToDos(email: string) {
  try {
    await dbConnect();
    const todos = await ToDoModel.find({ username: email });
    return { todos };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch todos!");
  }
}

export async function deleteToDo(formData: FormData) {
  try {
    await dbConnect();
    const { id } = Object.fromEntries(formData);
    await ToDoModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete the todo!");
  }
}
