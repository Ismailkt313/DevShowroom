import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Code2, Globe, Upload, Trash2 } from 'lucide-react';
import Button from '../auth/Button';
import InputField from '../auth/InputField';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: any) => void;
  initialData?: any;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    status: 'Live',
    liveLink: '',
    githubLink: '',
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setErrors({}); // Reset errors when modal opens/closes or initialData changes
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        techStack: initialData.techStack ? initialData.techStack.join(', ') : '',
        status: initialData.status || 'Live',
        liveLink: initialData.liveLink || '',
        githubLink: initialData.githubLink || '',
      });
      setPreviewUrl(initialData.coverImage || '');
      setSelectedFile(null);
    } else {
      setFormData({
        title: '',
        description: '',
        techStack: '',
        status: 'Live',
        liveLink: '',
        githubLink: '',
      });
      setPreviewUrl('');
      setSelectedFile(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.techStack.trim()) newErrors.techStack = 'Tech stack is required';
    
    // Check if at least one link is provided
    const hasLiveLink = formData.liveLink.trim() !== '';
    const hasGithubLink = formData.githubLink.trim() !== '';

    if (!hasLiveLink && !hasGithubLink) {
      newErrors.liveLink = 'At least one link (Live or GitHub) is required';
      newErrors.githubLink = 'At least one link (Live or GitHub) is required';
    } else {
      // If provided, validate the format
      if (hasLiveLink && !urlPattern.test(formData.liveLink)) {
        newErrors.liveLink = 'Please enter a valid URL';
      }
      if (hasGithubLink && !urlPattern.test(formData.githubLink)) {
        newErrors.githubLink = 'Please enter a valid URL';
      }
    }

    if (!previewUrl) {
      newErrors.coverImage = 'Project cover image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        techStack: formData.techStack.split(',').map((s) => s.trim()).filter((s) => s !== ''),
        coverImage: previewUrl,
        imageFile: selectedFile,
      });
      onClose();
    }
  };

  const handleChange = (e: any, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#1e293b]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Plus size={18} className="text-white" />
            </div>
            {initialData ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Project Title"
              type="text"
              placeholder="e.g. My Awesome App"
              required
              value={formData.title}
              onChange={(e) => handleChange(e, 'title')}
              error={errors.title}
            />
            
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs sm:text-sm font-medium text-slate-400 ml-1">
                Project Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange(e, 'status')}
                className="w-full px-4 py-2.5 bg-[#0f172a] border-2 border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-slate-200 text-sm appearance-none cursor-pointer"
              >
                <option value="Live">Live</option>
                <option value="Ongoing">Ongoing</option>
                <option value="GitHub only">GitHub only</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs sm:text-sm font-medium text-slate-400 ml-1">
              Description (Short, 2 lines max)
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => handleChange(e, 'description')}
              placeholder="Tell us about your project..."
              className={`w-full px-4 py-3 bg-[#0f172a] border-2 rounded-xl focus:outline-none text-slate-100 text-sm resize-none transition-all duration-200 ${
                errors.description 
                  ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                  : 'border-slate-700 focus:border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 ml-1 mt-0.5">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Tech Stack (comma separated)"
              type="text"
              placeholder="React, Tailwind, Node.js"
              required
              value={formData.techStack}
              onChange={(e) => handleChange(e, 'techStack')}
              error={errors.techStack}
            />
            {/* Cover Image Upload */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs sm:text-sm font-medium text-slate-400 ml-1">
                Project Cover Image
              </label>
              <div 
                className={`relative group border-2 border-dashed rounded-2xl transition-all duration-300 ${
                  errors.coverImage
                    ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                    : previewUrl 
                      ? 'border-blue-500/50 bg-blue-500/5 shadow-[0_0_10px_rgba(59,130,246,0.15)]' 
                      : 'border-slate-700 hover:border-slate-500 bg-[#0f172a]'
                }`}
              >
                {previewUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden m-1">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-lg transition-transform hover:scale-110"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full aspect-video flex flex-col items-center justify-center gap-3 transition-colors ${
                      errors.coverImage ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className={`p-3 rounded-2xl transition-colors ${
                      errors.coverImage ? 'bg-red-500/10' : 'bg-slate-800 group-hover:bg-slate-700'
                    }`}>
                      <Upload size={24} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">
                      {errors.coverImage || 'Upload Cover'}
                    </span>
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {errors.coverImage && <p className="text-xs text-red-500 ml-1 mt-0.5">{errors.coverImage}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-xs sm:text-sm font-medium text-slate-400 ml-1 flex items-center gap-2">
                <Globe size={14} className="text-blue-500" />
                Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://app.com"
                value={formData.liveLink}
                onChange={(e) => handleChange(e, 'liveLink')}
                className={`w-full px-4 py-2.5 bg-[#0f172a] border-2 rounded-xl focus:outline-none text-slate-100 text-sm transition-all duration-200 ${
                  errors.liveLink
                    ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                    : 'border-slate-700 focus:border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                }`}
              />
              {errors.liveLink && <p className="text-xs text-red-500 ml-1 mt-0.5">{errors.liveLink}</p>}
            </div>
            <div className="space-y-4">
              <label className="text-xs sm:text-sm font-medium text-slate-400 ml-1 flex items-center gap-2">
                <Code2 size={14} className="text-slate-200" />
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/user/repo"
                value={formData.githubLink}
                onChange={(e) => handleChange(e, 'githubLink')}
                className={`w-full px-4 py-2.5 bg-[#0f172a] border-2 rounded-xl focus:outline-none text-slate-100 text-sm transition-all duration-200 ${
                  errors.githubLink
                    ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                    : 'border-slate-700 focus:border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                }`}
              />
              {errors.githubLink && <p className="text-xs text-red-500 ml-1 mt-0.5">{errors.githubLink}</p>}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit}
            className="!w-auto px-8"
          >
            {initialData ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
