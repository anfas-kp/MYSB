import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: 'cream' | 'surface' | 'dark' | 'muted' | 'mesh';
  hasHairlineBorder?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'hero';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  variant = 'cream',
  hasHairlineBorder = true,
  padding = 'lg',
  ...props
}) => {
  const variantStyles = {
    cream: 'bg-cream-100 text-ink-900 dark:bg-teal-950 dark:text-cream-100',
    surface: 'bg-white text-ink-900 dark:bg-teal-900 dark:text-cream-100',
    dark: 'bg-teal-900 text-cream-100 dark:bg-teal-950 dark:text-cream-50',
    muted: 'bg-cream-200/50 text-ink-900 dark:bg-teal-950/80 dark:text-cream-100',
    mesh: 'bg-mesh-aurora text-ink-900 dark:bg-mesh-dark dark:text-cream-100',
  };

  const paddingStyles = {
    none: 'py-0',
    sm: 'py-12 sm:py-16',
    md: 'py-16 sm:py-20 lg:py-24',
    lg: 'py-20 sm:py-28 lg:py-36',
    hero: 'pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden transition-colors duration-400',
        variantStyles[variant],
        paddingStyles[padding],
        hasHairlineBorder && 'hairline-b',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
