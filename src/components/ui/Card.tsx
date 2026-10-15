import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface' | 'elevated' | 'teal' | 'coral-subtle' | 'glass';
  spotlight?: boolean;
  hoverLift?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'surface',
  spotlight = false,
  hoverLift = false,
  padding = 'lg',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
  };

  const variantStyles = {
    surface: 'bg-white dark:bg-teal-900 border border-ink-900/[0.12] dark:border-cream-100/10 shadow-sm text-ink-900 dark:text-cream-100',
    elevated: 'bg-white dark:bg-teal-900 border border-ink-900/[0.14] dark:border-cream-100/15 shadow-md text-ink-900 dark:text-cream-100',
    teal: 'bg-teal-900 dark:bg-teal-950 border border-teal-700/40 text-cream-100 shadow-sm',
    'coral-subtle': 'bg-coral-50/50 dark:bg-coral-950/20 border border-coral-500/20 text-ink-900 dark:text-cream-100',
    glass: 'bg-white dark:bg-teal-900 border border-ink-900/[0.12] dark:border-cream-100/10 shadow-sm text-ink-900 dark:text-cream-100',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6 lg:p-8',
    lg: 'p-5 sm:p-7 lg:p-9',
    xl: 'p-5 sm:p-8 lg:p-12',
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        spotlight && 'card-spotlight',
        'relative rounded-3xl transition-[transform,box-shadow,border-color] duration-200 ease-out overflow-hidden',
        hoverLift && '[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-md active:scale-[0.995]',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};

