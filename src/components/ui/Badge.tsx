import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'teal' | 'coral' | 'mint' | 'outline' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'teal',
  size = 'md',
  ...props
}) => {
  const variantStyles = {
    teal: 'bg-teal-50 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200 border-teal-600/20',
    coral: 'bg-coral-50 dark:bg-coral-950/40 text-coral-700 dark:text-coral-300 border-coral-500/20',
    mint: 'bg-mint-100 dark:bg-mint-900/40 text-teal-950 dark:text-mint-300 border-mint-400/30',
    outline: 'bg-transparent text-ink-700 dark:text-cream-200 border-ink-900/15 dark:border-cream-100/20',
    neutral: 'bg-ink-100/60 dark:bg-ink-800/60 text-ink-800 dark:text-cream-100 border-ink-900/10',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-xs sm:text-sm px-3.5 py-1 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors select-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
