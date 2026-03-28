import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { generateTokens, setRefreshTokenCookie } from "../utils/generateToken";


export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
               
    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
    }) as IUser;

    if (user) {
        const { accessToken, refreshToken } = generateTokens(user._id.toString());
        setRefreshTokenCookie(res, refreshToken);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken,
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};


export const authUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) as IUser;

    if (user && (await user.matchPassword(password))) {
        const { accessToken, refreshToken } = generateTokens(user._id.toString());
        setRefreshTokenCookie(res, refreshToken);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken,
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};


export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret") as { id: string };
        const user = await User.findById(decoded.id) as IUser;

        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        const { accessToken } = generateTokens(user._id.toString());

        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};


export const logoutUser = (req: Request, res: Response): void => {
    res.cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
};
