import React from 'react';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className,
  speed = 'normal',
  pauseOnHover = true,
  ...props
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-6 py-4 overflow-hidden', className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden select-none',
        pauseOnHover && 'hover:[&>div]:[animation-play-state:paused]',
        className
      )}
      {...props}
    >
      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-8 py-4">
        {children}
      </div>
      <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-8 py-4" aria-hidden="true">
        {children}
      </div>
    </div>
  );
};
