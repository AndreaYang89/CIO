import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`relative bg-card-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:border-white/20 overflow-hidden group ${className}`}>
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary-neon to-primary-neon opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <h2 className="text-lg font-semibold mb-6 text-white flex items-center gap-3">
        <span className="text-primary-neon">{icon}</span>
        {title}
      </h2>
      
      {children}
    </div>
  );
};