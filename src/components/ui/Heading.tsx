import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'hero' | 'statement' | 'section' | 'subsection' | 'card' | 'small';
  animate?: boolean;
  serif?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  as: Component = 'h2',
  size = 'section',
  animate = false,
  serif = false,
  ...props
}) => {
  const prefersReduced = useReducedMotion();

  const sizeStyles = {
    hero: 'text-display-hero font-bold tracking-tight',
    statement: 'text-display-statement font-medium tracking-tight',
    section: 'text-display-section font-bold tracking-tight',
    subsection: 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight',
    card: 'text-xl sm:text-2xl font-bold tracking-tight',
    small: 'text-lg sm:text-xl font-semibold tracking-normal',
  };

  const fontClass = serif ? 'font-serif italic' : 'font-display';

  if (animate && !prefersReduced) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Component
          className={cn(fontClass, sizeStyles[size], 'text-ink-900 dark:text-cream-50', className)}
          {...props}
        >
          {children}
        </Component>
      </motion.div>
    );
  }

  return (
    <Component
      className={cn(fontClass, sizeStyles[size], 'text-ink-900 dark:text-cream-50', className)}
      {...props}
    >
      {children}
    </Component>
  );
};
