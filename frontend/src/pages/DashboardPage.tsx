import React, { useState, useMemo } from 'react';
import Header from '../components/dashboard/Header';
import FilterBar from '../components/dashboard/FilterBar';
import ProjectCard from '../components/dashboard/ProjectCard';
import EmptyState from '../components/dashboard/EmptyState';
import AddProjectModal from '../components/dashboard/AddProjectModal';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'Live' | 'Ongoing' | 'GitHub only';
  liveLink?: string;
  githubLink?: string;
  coverImage?: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ErrorLens AI',
    description: 'A premium AI-powered debugging tool for developers to analyze and fix code errors in seconds.',
    techStack: ['React', 'TypeScript', 'Tailwind', 'OpenAI'],
    status: 'Live',
    liveLink: 'https://errorlens.ai',
    githubLink: 'https://github.com/dev/errorlens',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'QuickWork Marketplace',
    description: 'Cloud-based marketplace connecting service providers with clients for micro-tasks and scheduled jobs.',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
    status: 'Ongoing',
    githubLink: 'https://github.com/dev/quickwork',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    title: 'CodeShowify',
    description: 'An open-source library for creating beautiful code snippets and documentation walkthroughs.',
    techStack: ['React', 'Vite', 'MDX', 'Framer Motion'],
    status: 'GitHub only',
    githubLink: 'https://github.com/dev/codeshowify',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'
  }
];

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'All' || project.status === filterStatus;
      
      // Handle special filters if needed
      if (filterStatus === 'Featured') {
         // for demo, let's say "Live" is featured
         return matchesSearch && project.status === 'Live';
      }
      
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, filterStatus]);

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setEditingProject(project);
      setIsModalOpen(true);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSaveProject = (projectData: any) => {
    if (editingProject) {
      setProjects((prev) => 
        prev.map((p) => (p.id === editingProject.id ? { ...p, ...projectData } : p))
      );
    } else {
      const newProject = {
        ...projectData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setProjects((prev) => [newProject, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 antialiased flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-8">
          {/* Header Stats / Title */}
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Project Showroom</h2>
            <p className="text-slate-400 font-medium tracking-wide">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            onAddProject={handleAddProject}
          />

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              onAddProject={handleAddProject} 
              isFiltering={projects.length > 0} 
            />
          )}
        </div>
      </main>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
      />
      
      {/* Footer Branding */}
      <footer className="py-8 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-600 font-bold uppercase tracking-[0.2em]">
          Designed for high-performance developers
        </p>
      </footer>
    </div>
  );
};

export default DashboardPage;
