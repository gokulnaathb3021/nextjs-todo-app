import mongoose from "mongoose";

// export type ToDo = {
//   _id: string;
//   todo: string;
//   username: string;
// };

const toDoSchema = new mongoose.Schema(
  {
    todo: { type: String, required: true },
    username: { type: String, required: true, min: 3, max: 50 },
  },
  { timestamps: true }
);

const ToDoModel = mongoose.models.ToDo || mongoose.model("ToDo", toDoSchema);
export default ToDoModel;
