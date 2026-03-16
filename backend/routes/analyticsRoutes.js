import express from "express"

import {
  courseSentimentAnalytics,
  courseRatings,
  feedbackTrend
} from "../controllers/analyticsController.js"

const router = express.Router()
router.get("/analytics", (req, res) => {
  res.json({ message: "Analytics API working" })
})

router.get("/analytics/course-sentiment", courseSentimentAnalytics)

router.get("/analytics/course-ratings", courseRatings)

router.get("/analytics/feedback-trend", feedbackTrend)

export default router