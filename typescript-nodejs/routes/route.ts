import express, { Request, Response } from "express";
const router = express.Router();
import Postschema from "../models/dbmodel";
import Counterschema from "../models/counter";
import mongoose from "mongoose";

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Postschema.find();
    res.json(posts);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  var latestCounter = await Counterschema.findOne({ type: "ORDER" });
  console.log(latestCounter);
  const counters = (latestCounter?.counter || 0) + 1;
  console.log(counters);
  const count = {
    counter: counters,
    type: "ORDER",
  };
  const count1 = new Counterschema(count);
  count1.save();
  await Counterschema.findOneAndUpdate(
    { type: "ORDER" },
    { counter: counters },
    { returnOriginal: false }
  );

  console.log(latestCounter);
  const post = new Postschema({
    orderNo: counters,
    date: req.body.date,
    price: req.body.price,
    item: req.body.item,
  });
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

router.get("/:postId", async (req: Request, res: Response) => {
  try {
    const post = await Postschema.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.delete("/:postId", async (req: Request, res: Response) => {
  try {
    const removedpost = await Postschema.remove({ _id: req.params.postId });
    res.json(removedpost);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

export default router;
