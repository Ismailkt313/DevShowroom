import React, { useState } from 'react';
import { LogOut, User, Layout } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileLinkCard from './ProfileLinkCard';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed', error);
      // Still navigate for UX
      navigate('/auth');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Layout size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white sm:block hidden">
              DevShowroom
            </span>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">{user?.name || 'Developer'}</p>
                <p className="text-xs text-slate-500 font-medium tracking-tight">{user?.title || 'Fullstack Developer'}</p>
              </div>
              {/* Avatar - Click to open Profile Modal */}
              <div 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500/50 hover:bg-slate-700 transition-all duration-300 active:scale-95 group"
                onClick={() => setIsProfileModalOpen(true)}
                title="Profile Share Settings"
              >
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
              title="Log Out"
            >
              <LogOut size={18} />
              <span className="text-sm font-semibold hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Share Modal */}
      <ProfileLinkCard 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        profileUrl={`${window.location.origin}/profile/${user?._id}`}
      />
    </>
  );
};

export default Header;
