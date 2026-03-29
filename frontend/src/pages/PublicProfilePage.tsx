import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rocket, ArrowRight, Sparkles } from 'lucide-react';
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
      {/* Sticky Header */}
      <ProfileHeader user={user} />

      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-8 pb-24">
        {/* Intro Section: Bio & Status */}
        <section className="pt-16 sm:pt-24 flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
            <span>Open for opportunities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
            Building digital experiences with <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">purpose and precision.</span>
          </h2>

          <p className="text-lg font-medium text-slate-400 leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            {user.bio}
          </p>
        </section>

        <div className="mt-24">
          <FeaturedProjects projects={featuredProjects} />
          <ProjectGrid projects={otherProjects} />
        </div>

        {/* CTA Footer — Make Your DevShowroom */}
        <footer className="mt-32 relative">
          {/* Separator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          <div className="relative pt-20 pb-12 flex flex-col items-center text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/[0.07] blur-[100px] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-purple-600/[0.05] blur-[80px] rounded-full" />
            </div>

            {/* Sparkle Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 backdrop-blur-sm">
              <Sparkles size={14} className="text-blue-400 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-400">
                Free to use
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">
              Make Your Own{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                DevShowroom
              </span>
            </h2>

            {/* Tagline */}
            <p className="mt-5 text-slate-400 text-sm sm:text-base font-medium max-w-md leading-relaxed">
              Showcase your projects, highlight your skills, and share a stunning portfolio with the world — in minutes.
            </p>

            {/* CTA Button */}
            <Link
              to="/auth"
              className="group/cta mt-10 inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl text-sm font-black shadow-2xl shadow-blue-600/25 hover:shadow-blue-500/40 transition-all duration-500 hover:-translate-y-1"
            >
              <Rocket size={18} className="group-hover/cta:rotate-12 transition-transform duration-300" />
              <span>Get Started — It's Free</span>
              <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Bottom Branding */}
            <div className="mt-16 flex items-center gap-2.5 opacity-40">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-black text-[9px]">DS</span>
              </div>
              <span className="text-[11px] font-bold tracking-tight text-slate-500">
                Powered by DevShowroom
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PublicProfilePage;
