import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative pt-32 pb-20 overflow-hidden isolate">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent h-[800px] w-[800px] blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent h-[600px] w-[600px] blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Star size={14} className="fill-blue-500" />
            <span>The premier developer showcase platform</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Showcase Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">Projects</span> Like a Professional
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            A dedicated space for developers to build their portfolio, share their work, and get discovered. No complex setup, just pure code showcasing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <button 
              onClick={() => navigate('/auth')}
              className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              Start Your Showroom
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')} // Let them see what's inside (will redirect if not auth)
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700 active:scale-95"
            >
              Explore Showcase
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <div className="flex items-center gap-2 text-white font-bold italic tracking-wider">
              <CheckCircle2 size={18} className="text-blue-500" />
              <span>GITHUB</span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold italic tracking-wider">
              <CheckCircle2 size={18} className="text-blue-500" />
              <span>LINKEDIN</span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold italic tracking-wider">
              <CheckCircle2 size={18} className="text-blue-500" />
              <span>CLOUDINARY</span>
            </div>
            <div className="flex items-center gap-2 text-white font-bold italic tracking-wider">
              <CheckCircle2 size={18} className="text-blue-500" />
              <span>TAILWIND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
