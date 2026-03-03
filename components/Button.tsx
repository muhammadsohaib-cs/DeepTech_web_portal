import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'nav' | 'nav-primary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary:
      'bg-sky-400 text-black hover:bg-sky-300 active:bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] active:shadow-[0_0_15px_rgba(56,189,248,0.3)] border border-sky-400/50',
    secondary:
      'bg-white/10 text-white hover:bg-white/20 active:bg-white/5 border border-white/20 hover:border-white/30',
    outline:
      'bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/30 active:bg-white/10',
    ghost: 'bg-transparent text-white/90 hover:bg-white/10 hover:text-white',
    nav: 'bg-white/5 text-white/90 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white text-xs font-semibold tracking-wide',
    'nav-primary':
      'bg-sky-500 text-white hover:bg-sky-400 active:bg-sky-600 border border-sky-500/80 shadow-[0_0_12px_rgba(56,189,248,0.25)] hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] text-xs font-semibold tracking-wide',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
};

export default Button;
