import type { Project } from '../../data/mockData';
import PublicProjectCard from './PublicProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <section className="space-y-12 py-16 border-t border-slate-800/50">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          All Projects
        </h2>
        <div className="h-1 w-12 bg-slate-700 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
        {projects.map((project) => (
          <PublicProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
