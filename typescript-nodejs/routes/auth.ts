import express, { Request, Response } from "express";
const authrouter = express.Router();
import Userschema from "../models/users";
import schema from "../models/validate";
import "joi";

//const {registervalidation} = require('../models/validate')
authrouter.post("/register", async (req: Request, res: Response) => {
  const { error } =  schema.validate(req.body);
  if (error) return res.send(error);

  const user = new Userschema({
    name: req.body.name,
    
    email: req.body.email,
    password: req.body.password
  });
  try {
    const saveduser = await user.save();
    res.send(saveduser);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default authrouter;
