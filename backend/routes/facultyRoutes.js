import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getFacultyFeedback } from "../controllers/facultyController.js";

const router = express.Router();

router.get("/faculty-feedback", protect, getFacultyFeedback);

export default router;