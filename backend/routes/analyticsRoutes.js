import express from "express";

import {
  courseSentimentAnalytics,
  courseRatings,
  feedbackTrend
} from "../controllers/analyticsController.js";

const router = express.Router();

/* Test Route */
router.get("/", (req, res) => {
  res.json({ message: "Analytics API working" });
});

/* Sentiment Analytics */
router.get("/course-sentiment", courseSentimentAnalytics);

/* Course Ratings */
router.get("/course-ratings", courseRatings);

/* Feedback Trend */
router.get("/feedback-trend", feedbackTrend);

export default router;