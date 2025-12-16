import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface LabelProps {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children }) => (
  <label className="block text-xs text-text-muted mb-2 font-mono tracking-wide">
    {children}
  </label>
);

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-lg font-mono text-sm transition-all duration-300 focus:border-primary-neon focus:shadow-[0_0_15px_rgba(0,242,255,0.1)] outline-none placeholder:text-gray-600"
  />
);

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-lg font-mono text-sm transition-all duration-300 focus:border-primary-neon focus:shadow-[0_0_15px_rgba(0,242,255,0.1)] outline-none appearance-none"
  >
    {props.children}
  </select>
);

export const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full bg-black/40 border border-white/10 text-white p-3 rounded-lg font-mono text-sm transition-all duration-300 focus:border-primary-neon focus:shadow-[0_0_15px_rgba(0,242,255,0.1)] outline-none placeholder:text-gray-600 resize-none"
  />
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "w-full py-3.5 rounded-lg font-mono font-bold text-sm cursor-pointer uppercase tracking-wider transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-br from-secondary-neon to-[#4a00e0] text-white hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] hover:brightness-110",
    success: "bg-[#00ff9d1a] text-success border border-success hover:bg-success hover:text-black hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};