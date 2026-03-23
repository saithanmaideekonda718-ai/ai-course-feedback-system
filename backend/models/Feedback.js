import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  course: String,
  faculty: String,
  rating: Number,
  comment: String,

  anonymousId: String,   
  sentiment: String

}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);