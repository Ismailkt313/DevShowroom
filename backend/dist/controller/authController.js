"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.refreshAccessToken = exports.authUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password, 'reached controller');
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }
    const user = await User_1.default.create({
        name,
        email,
        password,
    });
    if (user) {
        const { accessToken, refreshToken } = (0, generateToken_1.generateTokens)(user._id.toString());
        (0, generateToken_1.setRefreshTokenCookie)(res, refreshToken);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken,
        });
    }
    else {
        res.status(400).json({ message: "Invalid user data" });
    }
};
exports.registerUser = registerUser;
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const { accessToken, refreshToken } = (0, generateToken_1.generateTokens)(user._id.toString());
        (0, generateToken_1.setRefreshTokenCookie)(res, refreshToken);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken,
        });
    }
    else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};
exports.authUser = authUser;
const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret");
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const { accessToken } = (0, generateToken_1.generateTokens)(user._id.toString());
        res.json({ accessToken });
    }
    catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};
exports.refreshAccessToken = refreshAccessToken;
const logoutUser = (req, res) => {
    res.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logoutUser = logoutUser;
