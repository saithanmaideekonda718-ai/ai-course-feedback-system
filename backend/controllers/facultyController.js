import Course from "../models/Course.js";
import Feedback from "../models/Feedback.js";

export const getFacultyFeedback = async (req, res) => {

  const facultyId = req.user.id;

  const courses = await Course.find({ faculty: facultyId });

  const courseIds = courses.map(c => c._id);

  const feedback = await Feedback.find({
    course: { $in: courseIds }
  }).populate("course");

  res.json(feedback);
};