import express from "express";
import {
  createFeedback,
  getFeedbackByCourse,
  getAverageRating
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", createFeedback);
router.get("/:courseId", getFeedbackByCourse);
router.get("/average/:courseId", getAverageRating);

export default router;