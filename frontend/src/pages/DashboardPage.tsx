import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/dashboard/Header';
import FilterBar from '../components/dashboard/FilterBar';
import ProjectCard from '../components/dashboard/ProjectCard';
import EmptyState from '../components/dashboard/EmptyState';
import AddProjectModal from '../components/dashboard/AddProjectModal';
import api from '../api/api';

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'Live' | 'Ongoing' | 'GitHub only';
  liveLink?: string;
  githubLink?: string;
  coverImage?: string;
}

// Removed INITIAL_PROJECTS

const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects/myprojects');
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

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
    const project = projects.find((p) => p._id === id);
    if (project) {
      setEditingProject(project);
      setIsModalOpen(true);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } catch (error) {
        console.error('Failed to delete project', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleSaveProject = async () => {
    // This will be called after the modal handles the API call since it's cleaner
    // or we can refresh the list
    try {
        const { data } = await api.get('/projects/myprojects');
        setProjects(data);
    } catch (error) {
        console.error('Failed to refresh projects', error);
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

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project._id}
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
