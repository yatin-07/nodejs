import express, { Request, Response } from "express";
const authrouter = express.Router();
import Userschema from "../models/users";
import schema from "../models/validate";
import "joi";
var bcrypt = require("bcryptjs");

authrouter.post("/register", async (req: Request, res: Response) => {
  //validating the data
  const { error } = schema.validate(req.body);
  if (error) return res.send(error.details[0].message);

  //checking the user
  const emailexist = await Userschema.findOne({ email: req.body.email });
  if (emailexist) return res.status(400).send("email alread exist");

  //password
  var salt = await bcrypt.genSalt(10);
  var hashPassword = await bcrypt.hash(req.body.password, salt);

  // creating a new user
  const user = new Userschema({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const saveduser = await user.save();
    res.send(saveduser);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default authrouter;
