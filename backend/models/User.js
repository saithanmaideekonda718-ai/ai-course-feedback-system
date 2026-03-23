import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },

  username: {
    type: String,
    required: false
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  }
});

export default mongoose.model("User", userSchema);