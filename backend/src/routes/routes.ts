import { Router,type Request,type Response } from "express";
import authRoutes from "./authRoutes";
import projectRoutes from "./projectRoutes";
import userRoutes from "./userRoutes";

const router:Router = Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);


export {router};
