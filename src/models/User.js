import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

//Map MongoDB _id to id
// userSchema.set("toJSON", {
//   virtuals: true,
//   transform: (doc, ret) => {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   },
// });

export default mongoose.models.User || mongoose.model("User", userSchema);
