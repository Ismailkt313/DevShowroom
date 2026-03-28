"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controller/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMiddleware_1 = __importDefault(require("../middleware/uploadMiddleware"));
const router = (0, express_1.Router)();
router.get("/", projectController_1.getProjects);
router.get("/myprojects", authMiddleware_1.protect, projectController_1.getUserProjects);
router.post("/", authMiddleware_1.protect, uploadMiddleware_1.default.single("coverImage"), projectController_1.createProject);
router.put("/:id", authMiddleware_1.protect, uploadMiddleware_1.default.single("coverImage"), projectController_1.updateProject);
router.delete("/:id", authMiddleware_1.protect, projectController_1.deleteProject);
exports.default = router;
