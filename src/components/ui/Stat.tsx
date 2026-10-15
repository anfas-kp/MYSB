import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail?: string;
  duration?: number;
}

export const Stat: React.FC<StatProps> = ({
  value,
  suffix = '',
  prefix = '',
  label,
  detail,
  duration = 2000,
  className,
  ...props
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setCount(value);
      return;
    }

    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * value);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, duration, prefersReduced]);

  return (
    <div
      ref={ref}
      className={cn('flex flex-col select-none', className)}
      {...props}
    >
      <div className="flex items-baseline gap-1 font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-teal-900 dark:text-cream-50">
        <span className="text-teal-600 dark:text-mint-400">{prefix}</span>
        <span>{count}</span>
        <span className="text-coral-500 text-3xl sm:text-4xl lg:text-5xl">{suffix}</span>
      </div>
      <h3 className="mt-2 text-base sm:text-lg font-semibold tracking-normal text-ink-900 dark:text-cream-100">
        {label}
      </h3>
      {detail && (
        <p className="mt-1 text-sm text-ink-500 dark:text-cream-400 leading-relaxed max-w-xs">
          {detail}
        </p>
      )}
    </div>
  );
};
