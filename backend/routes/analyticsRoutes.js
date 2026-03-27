import express from "express";

import {
  courseSentimentAnalytics,
  courseRatings,
  feedbackTrend,
  semesterPerformance
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

router.get("/semester-performance", semesterPerformance);

export default router;