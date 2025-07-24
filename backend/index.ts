import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { dbConnect } from "./config/dbConnect";
import authRouter from "./routes/authRouter";

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }))
dbConnect();

// api endpoints
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
