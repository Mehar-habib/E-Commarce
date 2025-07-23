import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};
