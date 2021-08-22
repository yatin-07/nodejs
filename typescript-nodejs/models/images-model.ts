import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
      type: String,
    },
  },
  {
    collection: "image",
  }
);

export default mongoose.model("image", ImageSchema);
