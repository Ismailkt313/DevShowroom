import { GitHub, LinkedIn, Twitter } from '../common/BrandIcons';

interface UserProfile {
  name: string;
  profilePicture?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

interface ProfileHeaderProps {
  user: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex flex-row items-center justify-between gap-4">
        {/* Left Side: Socials */}
        <div className="flex items-center gap-3 sm:gap-6">
          {user.github && (
            <a
              href={user.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-110"
              title="GitHub"
            >
              <GitHub size={20} />
            </a>
          )}
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-[#0077b5] transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <LinkedIn size={20} />
            </a>
          )}
          {user.twitter && (
            <a
              href={user.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-[#1da1f2] transition-all duration-300 hover:scale-110"
              title="Twitter"
            >
              <Twitter size={20} />
            </a>
          )}
        </div>

        {/* Right Side: Identity */}
        <div className="flex items-center gap-4 group cursor-default text-right">
          <div className="flex flex-col items-end">
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
              {user.name}
            </h1>
            <span className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">
              Engineering Portfolio
            </span>
          </div>

          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500" />
            <div className="relative">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-slate-800 object-cover shadow-lg transition-transform group-hover:scale-105 duration-300"
                />
              ) : (
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-slate-800 bg-slate-900 flex items-center justify-center">
                  <span className="text-xs font-black text-blue-500">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
