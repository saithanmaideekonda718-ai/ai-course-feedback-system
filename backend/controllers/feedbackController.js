import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;

    const feedback = await Feedback.create({
      courseId,
      rating,
      comment,
      sentiment: "neutral" // you can update later using AI
    });

    res.json(feedback);

  } catch (error) {
    res.status(500).json({ message: "Error creating feedback" });
  }
};