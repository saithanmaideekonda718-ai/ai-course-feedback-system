export const getFacultyFeedback = async (req, res) => {

  try {

    const facultyId = req.user.id;
    const { courseId } = req.query;   

    const courses = await Course.find({ facultyId });

    const courseIds = courses.map(c => c._id);

    let filter = { courseId: { $in: courseIds } };

    //  If faculty selects a course
    if (courseId) {
      filter = { courseId };
    }

    const feedback = await Feedback.find(filter).populate("courseId");

    res.json(feedback);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};