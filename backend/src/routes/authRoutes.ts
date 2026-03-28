import { Router } from "express";
import { registerUser, authUser, refreshAccessToken, logoutUser } from "../controller/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;
