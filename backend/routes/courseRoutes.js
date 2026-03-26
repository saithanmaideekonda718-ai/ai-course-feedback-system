import express from "express";
import { getCourses, createCourse } from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getCourses);
router.post("/", protect, (req, res, next) => {
  if (req.user.role !== "faculty" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, createCourse);

export default router;