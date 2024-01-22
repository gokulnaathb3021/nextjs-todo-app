import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    throw new Error("Connection failed!");
  }
}
