import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 transform
        active:scale-[0.98] flex items-center justify-center gap-2
        ${loading || disabled
          ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed border-slate-600/30 border-2'
          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
        }
        ${className}
      `}
    >
      {loading && <Loader2 className="animate-spin" size={18} />}
      {children}
    </button>
  );
};

export default Button;
