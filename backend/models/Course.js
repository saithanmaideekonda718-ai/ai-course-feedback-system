import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  department: {
    type: String
  },
  semester: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);