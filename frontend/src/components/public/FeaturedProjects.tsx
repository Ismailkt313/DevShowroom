import type { Project } from '../../data/mockData';
import PublicProjectCard from './PublicProjectCard';

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <section className="space-y-10 py-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight animate-in fade-in slide-in-from-left duration-700">
          Featured Projects
        </h2>
        <div className="h-1.5 w-20 bg-blue-600 rounded-full animate-in scale-x-100 duration-1000 origin-left" />
      </div>
      
      <div className="flex flex-col gap-10 sm:gap-16">
        {projects.map((project) => (
          <PublicProjectCard key={project.id} project={project} featured={true} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
