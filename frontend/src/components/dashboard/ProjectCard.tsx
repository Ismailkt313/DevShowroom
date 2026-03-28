import React from 'react';
import { ExternalLink, Edit2, Trash2, Code2 } from 'lucide-react';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    description: string;
    coverImage?: string;
    techStack: string[];
    status: 'Live' | 'Ongoing' | 'GitHub only';
    liveLink?: string;
    githubLink?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const statusColors = {
    'Live': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Ongoing': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'GitHub only': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div className="group bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/5">
      {/* Cover Image */}
      <div className="relative aspect-video bg-slate-800 overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <Code2 size={40} className="text-slate-700 group-hover:text-blue-500 transition-colors" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border backdrop-blur-md ${statusColors[project.status]}`}>
          {project.status.toUpperCase()}
        </div>

        {/* Action Icons (Hover Overlay) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(project._id)}
            className="p-2 bg-slate-900/60 backdrop-blur-md rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-all"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="p-2 bg-slate-900/60 backdrop-blur-md rounded-lg text-slate-300 hover:text-red-400 hover:bg-slate-900 transition-all"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed h-10">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 min-h-[56px] content-start">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-slate-800/50 text-slate-400 rounded-md text-[10px] font-semibold border border-slate-700/50 hover:border-slate-600 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl text-xs font-bold border border-blue-500/20 transition-all duration-300"
            >
              <ExternalLink size={14} />
              <span>Live Preview</span>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition-all duration-300"
            >
              <Code2 size={14} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
