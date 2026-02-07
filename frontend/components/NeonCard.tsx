'use client';

import React from 'react';

interface NeonCardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const NeonCard: React.FC<NeonCardProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  // Define color schemes for different variants
  const variantClasses = {
    primary: 'border-neon-purple/30 bg-gray-900/50',
    secondary: 'border-neon-pink/30 bg-gray-900/50',
    accent: 'border-neon-blue/30 bg-gray-900/50',
  };

  return (
    <div 
      className={`
        p-6 rounded-xl border backdrop-blur-sm
        ${variantClasses[variant]}
        neon-glow
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default NeonCard;