import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router as locationRouter} from "./routes/locationRoutes";
import cors from "cors"
const app: Express = express();


app.use(cors());

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || "";

export const Main = async () => {
  try {
    const connection = await mongoose.connect(DATABASE_URL, {
      retryWrites: true,
      w: "majority",
    });
  } catch (error) {
    console.log(error,"Connection error")
  }
};

Main()

app.use('/api',locationRouter)

app.listen(3000, () => {
  console.log("app running");
});
