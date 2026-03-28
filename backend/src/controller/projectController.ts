import { Response } from "express";
import Project from "../models/Project";
import { AuthRequest } from "../middleware/authMiddleware";
import cloudinary from "../config/cloudinary";

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, techStack, status, liveLink, githubLink } = req.body;

    if (!title || !description || !techStack) {
      res.status(400).json({ message: "Please provide all required fields (title, description, techStack)" });
      return;
    }

    let imageUrl = "";

    if (req.file) {
      const uploadToCloudinary = (): Promise<string> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "devshowroom/projects" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                resolve(result?.secure_url || "");
              }
            }
          );
          stream.end(req.file?.buffer);
        });
      };

      try {
        imageUrl = await uploadToCloudinary();
      } catch (uploadError) {
        res.status(500).json({ message: "Failed to upload image to Cloudinary" });
        return;
      }
    } else {
      res.status(400).json({ message: "Project cover image is required" });
      return;
    }

    const project = await Project.create({
      title,
      description,
      techStack: typeof techStack === "string" ? techStack.split(",").map(s => s.trim()) : techStack,
      status: status || "Live",
      liveLink,
      githubLink,
      coverImage: imageUrl,
      user: req.user?._id,
    });

    if (project) {
      res.status(201).json(project);
    } else {
      res.status(400).json({ message: "Invalid project data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating project" });
  }
};

 export const getProjects = async (_req: any, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching projects" });
  }
};


export const getUserProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({ user: req.user?._id })
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching user projects" });
  }
};

export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, techStack, status, liveLink, githubLink } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
       res.status(404).json({ message: "Project not found" });
       return;
    }

    // Check ownership
    if (project.user.toString() !== req.user?._id.toString()) {
       res.status(401).json({ message: "User not authorized" });
       return;
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.techStack = techStack ? (typeof techStack === "string" ? techStack.split(",").map(s => s.trim()) : techStack) : project.techStack;
    project.status = status || project.status;
    project.liveLink = liveLink || project.liveLink;
    project.githubLink = githubLink || project.githubLink;

    if (req.file) {
      // Upload new image if provided
      const uploadToCloudinary = (): Promise<string> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "devshowroom/projects" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result?.secure_url || "");
            }
          );
          stream.end(req.file?.buffer);
        });
      };
      project.coverImage = await uploadToCloudinary();
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating project" });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
       res.status(404).json({ message: "Project not found" });
       return;
    }

    // Check ownership
    if (project.user.toString() !== req.user?._id.toString()) {
       res.status(401).json({ message: "User not authorized" });
       return;
    }

    await project.deleteOne();
    res.json({ message: "Project removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting project" });
  }
};
