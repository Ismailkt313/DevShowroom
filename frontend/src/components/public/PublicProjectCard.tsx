import { ExternalLink, Code2 } from 'lucide-react';
import type { Project } from '../../data/mockData';

interface PublicProjectCardProps {
  project: Project;
  featured?: boolean;
}

const PublicProjectCard: React.FC<PublicProjectCardProps> = ({ project, featured = false }) => {
  const statusColors = {
    'Live': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Ongoing': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'GitHub only': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div 
      className={`group relative bg-[#111827]/80 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-blue-500/30 shadow-2xl ${
        featured 
          ? 'md:flex md:items-stretch min-h-[450px] shadow-blue-900/10' 
          : 'flex flex-col h-full'
      }`}
    >
      {/* Decorative Glow for Featured */}
      {featured && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[2.6rem] blur-2xl group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-700 -z-10" />
      )}

      {/* Cover Image */}
      <div className={`relative bg-slate-900/50 overflow-hidden ${
        featured ? 'md:w-[55%] aspect-[16/10]' : 'aspect-video'
      }`}>
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <Code2 size={48} className="text-slate-800 group-hover:text-blue-500/50 transition-colors duration-700" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] border backdrop-blur-md shadow-2xl ${statusColors[project.status]}`}>
          {project.status.toUpperCase()}
        </div>
      </div>

      {/* Content Area */}
      <div className={`p-8 sm:p-10 flex flex-col justify-between ${
        featured ? 'md:w-[45%] bg-gradient-to-br from-transparent to-blue-500/[0.02]' : 'flex-1'
      }`}>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              {featured && (
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2 block">
                  Featured Case Study
                </span>
              )}
            </div>
            <h3 className={`font-black text-white group-hover:text-blue-400 transition-colors duration-500 leading-tight ${
              featured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
            }`}>
              {project.title}
            </h3>
          </div>
          
          <p className={`text-slate-400 font-medium leading-relaxed ${
            featured ? 'text-lg line-clamp-4' : 'text-sm line-clamp-2'
          }`}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 bg-slate-900/50 text-slate-400 rounded-xl text-[10px] font-bold border border-slate-800 group-hover:border-blue-500/20 group-hover:text-slate-200 transition-all duration-500 uppercase tracking-widest"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center gap-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 flex items-center justify-center gap-2.5 py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-500 hover:-translate-y-1"
            >
              <ExternalLink size={16} />
              <span>LIVE PROJECT</span>
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 flex items-center justify-center gap-2.5 py-4 px-8 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-2xl text-xs font-black border border-slate-800 transition-all duration-500 hover:-translate-y-1"
            >
              <Code2 size={16} />
              <span>REPOSITORY</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProjectCard;
