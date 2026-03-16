import Course from "../models/Course.js";

export const createCourse = async (req, res) => {
  try {

    const { courseName, semester } = req.body;

    const course = await Course.create({
      courseName,
      semester
    });

    res.json(course);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {

    const courses = await Course.find();

    res.json(courses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};