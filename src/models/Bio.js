import mongoose from "mongoose";

const { Schema } = mongoose;

const bioSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Bio || mongoose.model("Bio", bioSchema);
