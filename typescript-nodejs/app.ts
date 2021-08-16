import express, { Request, Response } from "express";

const app = express();

import mongoose from "mongoose";
require("dotenv").config();

import router from "./routes/route";
import authrouter from "./routes/auth";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", authrouter);
app.use("/posts", router);

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

if (process.env.DataBase_Connection) {
  try {
    mongoose.connect(process.env.DataBase_Connection, {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log("errr  while connecting db", "errr");
  }
}

app.listen(3000);
