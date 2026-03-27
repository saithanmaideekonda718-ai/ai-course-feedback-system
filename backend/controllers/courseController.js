import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {

    const { courseName, department, semester } = req.body;

    const course = await Course.create({
      courseName,
      department,
      semester,
      facultyId: req.user.id   
    });

    res.json(course);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("facultyId", "name email");

    res.json(courses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};