import Feedback from "../models/Feedback.js";

// Generate random anonymous ID
const generateAnonymousId = () => {
  return "anon_" + Math.random().toString(36).substring(2, 8);
};

// Simple sentiment logic
const getSentiment = (text) => {
  text = text.toLowerCase();

  if (text.includes("good") || text.includes("excellent")) return "Positive";
  if (text.includes("bad") || text.includes("poor")) return "Negative";
  return "Neutral";
};

export const submitFeedback = async (req, res) => {
  try {
    const { course, faculty, rating, comment } = req.body;

    const feedback = await Feedback.create({
      course,
      faculty,
      rating,
      comment,
      anonymousId: generateAnonymousId(),  
      sentiment: getSentiment(comment)
    });

    res.json({
      message: "Feedback submitted successfully",
      feedback
    });

  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback" });
  }
};