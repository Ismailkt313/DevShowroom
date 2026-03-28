import React from 'react';
import { Upload, Globe, Zap, Shield, Share2, Code } from 'lucide-react';

const FEATURE_DATA = [
  {
    icon: <Upload className="text-blue-500" />,
    title: "Instant Uploads",
    description: "Drag and drop your project cover images directly from your computer. Powered by Cloudinary for lightning fast delivery."
  },
  {
    icon: <Globe className="text-indigo-400" />,
    title: "Public Showroom",
    description: "Every developer receives a unique, public profile URL to share their entire portfolio with the community."
  },
  {
    icon: <Zap className="text-yellow-400" />,
    title: "Zero Setup",
    description: "Focus on your code, not your portfolio website. DevShowroom provides a professional interface right out of the box."
  },
  {
    icon: <Shield className="text-green-400" />,
    title: "Secure & Trusted",
    description: "Your data is protected with JWT authentication and secure cookie management, ensuring your profile is safe."
  },
  {
    icon: <Share2 className="text-pink-400" />,
    title: "Social Integration",
    description: "Easily link your GitHub repositories and live demo URLs to drive traffic to your production apps."
  },
  {
    icon: <Code className="text-slate-200" />,
    title: "Dev-First Design",
    description: "Built by developers, for developers. Tech stacks, status flags, and clean typography designed specifically for code."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Built for the Modern <span className="text-blue-500">Developer</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            DevShowroom provides all the tools you need to build a professional profile in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_DATA.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl bg-[#1e293b] border border-slate-700/50 hover:border-blue-500/30 transition-all group hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="p-3 bg-slate-900 rounded-2xl w-fit mb-6 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
