import React from 'react';
import { Lock } from 'lucide-react';

interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-4 bg-[#0f172a] text-slate-100 font-sans overflow-hidden">
      <div className="w-full max-w-md relative p-1 sm:p-0">
        {/* Decorative elements for premium feel */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl opacity-50 sm:opacity-100" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl opacity-50 sm:opacity-100" />

        <div className="relative bg-[#1e293b] border border-slate-700/50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="mb-6 sm:mb-10 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && <p className="text-xs sm:text-sm text-slate-400 font-medium">{subtitle}</p>}
          </div>

          <div className="space-y-6">
            {children}
          </div>

          {/* Trust Section */}
          <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-slate-500 hover:text-slate-400 transition-colors cursor-default">
              <Lock size={14} className="text-blue-500/70" />
              <span className="text-xs font-medium tracking-wide">
                Your data is securely stored and never shared.
              </span>
            </div>
            
            <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>
          </div>
        </div>
        
        {/* Bottom branding or links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 font-medium tracking-wide">
            Powered by <span className="text-blue-500/80 hover:text-blue-400 cursor-pointer transition-colors font-semibold">DevShowroom Core</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
