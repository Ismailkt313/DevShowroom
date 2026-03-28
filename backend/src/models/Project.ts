import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  status: "Live" | "Ongoing" | "GitHub only";
  liveLink?: string;
  githubLink?: string;
  coverImage: string;
  user: mongoose.Types.ObjectId;
}

const projectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    techStack: {
      type: [String],
      required: [true, "Tech stack is required"],
    },
    status: {
      type: String,
      enum: ["Live", "Ongoing", "GitHub only"],
      default: "Live",
    },
    liveLink: {
      type: String,
      trim: true,
    },
    githubLink: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "Cover image is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Project", projectSchema);
