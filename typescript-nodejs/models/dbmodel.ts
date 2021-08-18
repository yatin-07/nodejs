import mongoose from "mongoose";
let counter = 1;
let CountedId = {type: Number, default: () => counter++};
const Postschema = new mongoose.Schema({
  orderNo: CountedId,
  date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

export default mongoose.model("posts", Postschema);
