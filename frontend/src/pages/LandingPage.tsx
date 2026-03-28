import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import { ArrowRight, Mail } from 'lucide-react';
import { LinkedIn, Twitter, GitHub } from '../components/common/BrandIcons';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        
        {/* Simple Footer/CTA */}
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/20 rounded-3xl p-12 text-center">
                    <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Ready to Show Your Work?</h2>
                    <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                        Join hundreds of developers showcasing their journey. No credit card, no complex configuration.
                    </p>
                    <button 
                         onClick={() => navigate('/auth')}
                         className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 mx-auto active:scale-95"
                    >
                        Create Your Showroom <ArrowRight size={20} />
                    </button>
                    
                    <div className="mt-16 pt-16 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                             <div className="p-1.5 bg-blue-600 rounded-lg">
                                <ArrowRight size={16} className="text-white" />
                             </div>
                             <span className="text-lg font-bold text-white tracking-tight">DevShowroom</span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <Twitter size={20} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
                            <GitHub size={20} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
                            <LinkedIn size={20} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
                            <Mail size={20} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
                        </div>
                        
                        <p className="text-sm text-slate-500 font-medium">
                            © {new Date().getFullYear()} DevShowroom. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
