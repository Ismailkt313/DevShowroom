import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokens = (id: string) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "7days",
  });

  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret", {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
};
