import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  rating: {
    type: Number,
    min: 1,
    max: 5
  }

});

export default mongoose.model("Rating", ratingSchema);