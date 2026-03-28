import React, { useState } from 'react';
import { Copy, ExternalLink, Check, Globe, X } from 'lucide-react';

interface ProfileLinkCardProps {
  profileUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileLinkCard: React.FC<ProfileLinkCardProps> = ({ profileUrl, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleView = () => {
    window.open(profileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative bg-[#1e293b] border border-slate-800 w-full max-w-xl rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 rounded-xl">
              <Globe size={18} className="text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Share Your Profile</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8 relative z-10">
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              Public Profile Link
            </label>
            <div className="relative group">
              <input
                type="text"
                readOnly
                value={profileUrl}
                className="w-full bg-[#0f172a] border-2 border-slate-800 text-slate-300 px-5 py-4 rounded-2xl text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all cursor-default select-all shadow-inner"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              {copied && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase bg-[#0f172a] px-3 py-1.5 rounded-lg border border-emerald-500/20 animate-in fade-in zoom-in duration-300 shadow-xl">
                  <Check size={12} />
                  <span>Copied!</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <CopyButton onClick={handleCopy} copied={copied} />
            <ViewButton onClick={handleView} />
          </div>
        </div>

        {/* Modal Footer Decorative */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600" />
      </div>

      {/* Close on Overlay Click */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  copied?: boolean;
}

const CopyButton: React.FC<ActionButtonProps> = ({ onClick, copied }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full sm:flex-1 flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-xs font-black transition-all duration-300 active:scale-95 ${
        copied
          ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/30'
          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 shadow-lg shadow-black/20'
      }`}
    >
      {copied ? <Check size={18} /> : <Copy size={16} />}
      <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY PROFILE LINK'}</span>
    </button>
  );
};

const ViewButton: React.FC<ActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full sm:flex-1 flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
    >
      <ExternalLink size={16} />
      <span>VIEW PUBLIC PAGE</span>
    </button>
  );
};

export default ProfileLinkCard;
