"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const projectRoutes_1 = __importDefault(require("./projectRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = (0, express_1.Router)();
exports.router = router;
router.use("/auth", authRoutes_1.default);
router.use("/projects", projectRoutes_1.default);
router.use("/users", userRoutes_1.default);
