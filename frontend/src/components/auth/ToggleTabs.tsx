import React from 'react';

interface ToggleTabsProps {
  activeTab: 'login' | 'register';
  setActiveTab: (tab: 'login' | 'register') => void;
}

const ToggleTabs: React.FC<ToggleTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex bg-[#0f172a] p-1.5 rounded-2xl border-2 border-slate-800 w-full mb-8 relative">
      {/* Animated background highlighter */}
      <div 
        className={`absolute top-1.5 bottom-1.5 transition-all duration-300 ease-in-out bg-[#1e293b] rounded-xl shadow-lg border border-slate-700/50`}
        style={{
          left: activeTab === 'login' ? '6px' : 'calc(50% + 1.5px)',
          width: 'calc(50% - 7.5px)',
        }}
      />
      
      <button
        type="button"
        onClick={() => setActiveTab('login')}
        className={`
          relative z-10 flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200
          ${activeTab === 'login' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-400'}
        `}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('register')}
        className={`
          relative z-10 flex-1 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200
          ${activeTab === 'register' ? 'text-blue-400' : 'text-slate-500 hover:text-slate-400'}
        `}
      >
        Create Account
      </button>
    </div>
  );
};

export default ToggleTabs;
