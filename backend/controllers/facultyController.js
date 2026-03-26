export const getFacultyFeedback = async (req, res) => {

  const facultyId = req.user.id;

  const courses = await Course.find({ facultyId });

  const courseIds = courses.map(c => c._id);

  const feedback = await Feedback.find({
    courseId: { $in: courseIds }
  }).populate("courseId");

  res.json(feedback);
};