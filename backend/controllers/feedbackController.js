import Feedback from "../models/Feedback.js";
import mongoose from "mongoose";

/* Helper: Sentiment Logic */
const getSentiment = (comment) => {
  if (!comment) return "neutral";

  const text = comment.toLowerCase();

  if (text.includes("good") || text.includes("excellent") || text.includes("great")) {
    return "positive";
  }

  if (text.includes("bad") || text.includes("poor") || text.includes("worst")) {
    return "negative";
  }

  return "neutral";
};

/* Create Feedback */
export const createFeedback = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    
    // Validation
    if (!courseId || !rating) {
      return res.status(400).json({ message: "courseId and rating are required" });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }
    const anonymousId = Math.random().toString(36).substring(2, 8);
    const sentiment = getSentiment(comment);

    const feedback = await Feedback.create({
      courseId,
      rating,
      comment,
      sentiment,
      anonymousId
    });

    res.status(201).json(feedback);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating feedback" });
  }
};

/* Get Feedback by Course */
export const getFeedbackByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    const feedbacks = await Feedback.find({ courseId }).sort({ createdAt: -1 });

    res.json(feedbacks);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching feedback" });
  }
};

/* Get Average Rating */
export const getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    const result = await Feedback.aggregate([
      { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          totalFeedbacks: { $sum: 1 }
        }
      }
    ]);

    res.json(result[0] || { avgRating: 0, totalFeedbacks: 0 });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error calculating rating" });
  }
};