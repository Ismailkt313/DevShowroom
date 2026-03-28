import { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

// @desc    Get user profile and projects
// @route   GET /api/users/profile/:id
// @access  Public
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password -isAdmin");
    console.log(user, 'user');
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const projects = await Project.find({ user: user._id }).sort({ createdAt: -1 });

    res.json({
      user,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.title = req.body.title || user.title;
      user.bio = req.body.bio || user.bio;
      user.profilePicture = req.body.profilePicture || user.profilePicture;
      user.github = req.body.github || user.github;
      user.linkedin = req.body.linkedin || user.linkedin;
      user.twitter = req.body.twitter || user.twitter;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        title: updatedUser.title,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
        github: updatedUser.github,
        linkedin: updatedUser.linkedin,
        twitter: updatedUser.twitter,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};
