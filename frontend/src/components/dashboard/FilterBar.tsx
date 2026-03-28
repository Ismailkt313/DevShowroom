import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  onAddProject: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  onAddProject,
}) => {
  const filterOptions = [
    'All',
    'Live',
    'GitHub Only',
    'Ongoing',
    'Featured',
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-[#1e293b]/50 border-b border-slate-800 backdrop-blur-sm sticky top-[65px] z-40">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative group w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name..."
            className="w-full pl-10 pr-4 py-2 bg-[#0f172a] border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-100 placeholder:text-slate-500 text-sm transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative group min-w-[140px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-[#0f172a] border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-slate-200 text-sm appearance-none cursor-pointer transition-all"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-slate-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Add Project Button */}
      <button
        onClick={onAddProject}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Plus size={18} />
        <span>Add Project</span>
      </button>
    </div>
  );
};

export default FilterBar;
