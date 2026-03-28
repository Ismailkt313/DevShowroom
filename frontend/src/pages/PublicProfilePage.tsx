import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../components/public/ProfileHeader';
import FeaturedProjects from '../components/public/FeaturedProjects';
import ProjectGrid from '../components/public/ProjectGrid';
import api from '../api/api';

const PublicProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRes = await api.get(`/users/profile/${id}`);
        setUser(userRes.data.user);

        const projectRes = await api.get(`/projects`);
        const userProjects = projectRes.data.filter((p: any) => p.user._id === id);
        setProjects(userProjects);
      } catch (error) {
        console.error('Failed to fetch public profile data', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfileData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        Profile not found
      </div>
    );
  }

  const featuredProjects = projects.filter(p => p.featured || p.status === 'Live');
  const otherProjects = projects.filter(p => !p.featured && p.status !== 'Live');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 antialiased flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-8 py-16 sm:py-24">
        <ProfileHeader user={user} />
        
        <div className="mt-20">
          <FeaturedProjects projects={featuredProjects} />
          <ProjectGrid projects={otherProjects} />
        </div>

        {/* Branding Footer */}
        <footer className="mt-32 pt-16 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center p-1.5 shadow-xl shadow-blue-500/20">
              <span className="text-white font-black text-sm">DS</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-400 capitalize">
              DevShowroom Showcase
            </span>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest leading-loose text-center sm:text-right max-w-[240px]">
            Designed for high-impact engineering portfolio showcases
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PublicProfilePage;
