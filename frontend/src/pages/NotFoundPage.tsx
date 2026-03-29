import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Terminal } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden flex items-center justify-center selection:bg-blue-500/30">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />

      {/* Floating code particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['{ }', '</>', '404', '/**/', '!!', '??', '===', '( )', '[ ]', '...'].map((char, i) => (
          <span
            key={i}
            className="absolute text-slate-700/30 font-mono text-sm animate-float"
            style={{
              left: `${10 + i * 9}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDuration: `${6 + i * 1.2}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1
            className={`text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter 
              bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 bg-clip-text text-transparent
              transition-all duration-100
              ${glitchActive ? 'translate-x-1 skew-x-2' : ''}`}
            style={{
              textShadow: glitchActive
                ? '3px 0 #3b82f6, -3px 0 #6366f1'
                : 'none',
              filter: glitchActive ? 'hue-rotate(20deg)' : 'none',
            }}
          >
            404
          </h1>

          {/* Glitch overlay layers */}
          {glitchActive && (
            <>
              <span className="absolute inset-0 text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter text-blue-500/30 -translate-x-1 translate-y-0.5">
                404
              </span>
              <span className="absolute inset-0 text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter text-indigo-500/30 translate-x-1 -translate-y-0.5">
                404
              </span>
            </>
          )}
        </div>

        {/* Terminal-style error message */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 mb-10 backdrop-blur-sm text-left max-w-lg mx-auto">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-slate-500 font-mono flex items-center gap-1.5">
              <Terminal size={12} /> devshowroom
            </span>
          </div>

          {/* Terminal content */}
          <div className="font-mono text-sm space-y-2">
            <p className="text-slate-500">
              <span className="text-green-400">$</span> navigate --to <span className="text-blue-400">"{typeof window !== 'undefined' ? window.location.pathname : '/unknown'}"</span>
            </p>
            <p className="text-red-400 flex items-start gap-2">
              <span className="text-red-500 font-bold">ERROR:</span>
              <span>Route not found. The page you're looking for doesn't exist or has been moved.</span>
            </p>
            <p className="text-slate-500">
              <span className="text-yellow-400">hint:</span> Try navigating back or head to the homepage.
            </p>
            <p className="text-slate-600 animate-pulse">
              <span className="text-green-400">$</span> <span className="inline-block w-2 h-4 bg-slate-400 align-middle" />
            </p>
          </div>
        </div>

        {/* Heading & Description */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-md mx-auto">
          Looks like this route doesn't exist in the showroom. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="group px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2.5 active:scale-95"
          >
            <Home size={18} />
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-semibold rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all flex items-center gap-2.5 active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>

      {/* Inline keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) rotate(5deg); opacity: 0.5; }
          50% { transform: translateY(-40px) rotate(-3deg); opacity: 0.3; }
          75% { transform: translateY(-15px) rotate(7deg); opacity: 0.5; }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
