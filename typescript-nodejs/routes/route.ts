import express, { Request, Response } from "express";
const router = express.Router();
import Postschema from "../models/dbmodel";

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

router.post("/", (req: Request, res: Response) => {
  const post = new Postschema({
    orderNo: req.body.orderNo,
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
