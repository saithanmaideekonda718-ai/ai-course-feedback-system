import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  comment: String,

  sentiment: {
    type: String,
    enum: ["positive", "neutral", "negative"]
  },

}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);