import { Router } from "express";
import { getUserProfile, updateUserProfile } from "../controller/userController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/profile/:id", getUserProfile);

router.put("/profile", protect, updateUserProfile);

export default router;