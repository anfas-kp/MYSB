import React from 'react';
import { cn } from '../../lib/utils';

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'teal' | 'coral' | 'mint' | 'neutral';
  withDot?: boolean;
  pill?: boolean;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className,
  icon,
  variant = 'teal',
  withDot = true,
  pill = false,
  ...props
}) => {
  const textColors = {
    teal: 'text-teal-850 dark:text-mint-400',
    coral: 'text-coral-600 dark:text-coral-400',
    mint: 'text-teal-900 dark:text-teal-950',
    neutral: 'text-ink-600 dark:text-cream-300',
  };

  const pillStyles = {
    teal: 'px-3 py-1 rounded-full bg-teal-500/10 border border-teal-600/20 text-teal-850 dark:text-mint-400',
    coral: 'px-3 py-1 rounded-full bg-coral-500/10 border border-coral-500/20 text-coral-600 dark:text-coral-400',
    mint: 'px-3 py-1 rounded-full bg-mint-400/20 border border-mint-400/30 text-teal-900 dark:text-teal-950',
    neutral: 'px-3 py-1 rounded-full bg-ink-900/5 dark:bg-cream-100/10 border border-ink-900/10 dark:border-cream-100/15 text-ink-600 dark:text-cream-300',
  };

  const dotColors = {
    teal: 'bg-teal-700 dark:bg-mint-400',
    coral: 'bg-coral-500',
    mint: 'bg-teal-800',
    neutral: 'bg-ink-500 dark:bg-cream-300',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase select-none',
        pill ? pillStyles[variant] : textColors[variant],
        className
      )}
      {...props}
    >
      {withDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} />
      )}
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{children}</span>
    </div>
  );
};
