'use client';

import React from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  // Define color schemes for different variants
  const variantClasses = {
    primary: 'border-neon-purple text-white hover:bg-neon-purple/10',
    secondary: 'border-neon-pink text-white hover:bg-neon-pink/10',
    danger: 'border-neon-red text-white hover:bg-neon-red/10',
  };

  // Define sizing classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Disabled state
  const disabledClass = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'transition-all duration-300 neon-glow';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        border-2 rounded-lg font-medium
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default NeonButton;