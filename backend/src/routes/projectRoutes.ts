import { Router } from "express";
import { createProject, getProjects, getUserProjects } from "../controller/projectController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = Router();


router.get("/", getProjects);
router.get("/myprojects", protect, getUserProjects);
router.post("/", protect, upload.single("coverImage"), createProject);

export default router;
