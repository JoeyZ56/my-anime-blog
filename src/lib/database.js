require("dotenv").config();
import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    throw new Error("failed to connect to the database");
  }
};

export default connect;
