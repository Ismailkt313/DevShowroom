import { ExternalLink } from 'lucide-react';
import { GitHub, LinkedIn, Twitter } from '../common/BrandIcons';
import type { UserProfile } from '../../data/mockData';

interface ProfileHeaderProps {
  user: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-12 px-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        <div className="relative block">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#0f172a] object-cover shadow-2xl transition-transform group-hover:scale-[1.05] duration-500"
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white animate-in slide-in-from-bottom duration-700">
          {user.name}
        </h1>
        <p className="text-lg font-medium text-slate-400 bg-gradient-to-r from-slate-400 to-slate-200 bg-clip-text text-transparent animate-in slide-in-from-bottom duration-1000">
          {user.bio}
        </p>
      </div>

      <div className="flex items-center gap-6 mt-10">
        {user.socials.github && (
          <a
            href={user.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 hover:scale-110 transition-all shadow-lg shadow-black/20 text-slate-300 hover:text-white"
            title="GitHub Profile"
          >
            <GitHub size={22} />
          </a>
        )}
        {user.socials.linkedin && (
          <a
            href={user.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 hover:scale-110 transition-all shadow-lg shadow-black/20 text-[#0077b5] hover:text-[#0077b5]/80"
            title="LinkedIn Profile"
          >
            <LinkedIn size={22} />
          </a>
        )}
        {user.socials.twitter && (
          <a
            href={user.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 hover:scale-110 transition-all shadow-lg shadow-black/20 text-[#1da1f2] hover:text-[#1da1f2]/80"
            title="Twitter Profile"
          >
            <Twitter size={22} />
          </a>
        )}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest animate-pulse">
        <ExternalLink size={14} />
        Open for opportunities
      </div>
    </div>
  );
};

export default ProfileHeader;
