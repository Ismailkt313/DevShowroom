import React from 'react';
import { PackageOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddProject: () => void;
  isFiltering?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddProject, isFiltering = false }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-[#1e293b]/30 rounded-3xl border-2 border-dashed border-slate-800 backdrop-blur-sm">
      <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700 shadow-xl shadow-slate-900/50">
        <PackageOpen size={40} className="text-slate-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
        {isFiltering ? "No projects match your search" : "No projects yet"}
      </h3>
      <p className="text-slate-400 max-w-sm mb-8 font-medium">
        {isFiltering 
          ? "Try adjusting your filters or search terms to find what you're looking for." 
          : "Start building your professional showroom today by adding your first project."
        }
      </p>

      {!isFiltering && (
        <button
          onClick={onAddProject}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={20} />
          <span>Add your first project</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
