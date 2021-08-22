import express, { Request, Response } from "express";
const router = express.Router();
import Postschema from "../models/dbmodel";
import Counterschema from "../models/counter";
import mongoose from "mongoose";
import ImageSchema from "../models/images-model";
import upload from "../middleware/multer-middleware";


import multer from "multer";
import path from "path";



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


router.post('/Images', upload.single('profileImg'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const image = new ImageSchema({
    
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    profileImg: url + '/public/'//+// req.file.filename
});
image.save().then(result => {
    res.status(201).json({
        message: "Image uploaded ",
        userCreated: {
            _id: result._id,
            //profileImg: result.profileImg
        }
    })
  }).catch(err => {
    console.log(err),
        res.status(500).json({
            error: err
        });
})
})

router.post("/", async (req: Request, res: Response) => {
  var latestCounter = await Counterschema.findOne({ type: "ORDER" });
  
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
