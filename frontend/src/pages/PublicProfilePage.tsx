import { MOCK_USER, MOCK_PROJECTS } from '../data/mockData';
import ProfileHeader from '../components/public/ProfileHeader';
import FeaturedProjects from '../components/public/FeaturedProjects';
import ProjectGrid from '../components/public/ProjectGrid';

const PublicProfilePage: React.FC = () => {
  const featuredProjects = MOCK_PROJECTS.filter(p => p.featured);
  const otherProjects = MOCK_PROJECTS.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 antialiased flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-6 sm:px-8 py-16 sm:py-24">
        <ProfileHeader user={MOCK_USER} />
        
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
