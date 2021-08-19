import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  counter: {
    type: Number,
    required: true,
    default: 0,
  },
  type: {
    type: String,
    //required: true,
    enum: ["ORDER"],
  },
});

export default mongoose.model("counter", CounterSchema);
