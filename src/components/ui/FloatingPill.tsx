import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface FloatingPillProps extends HTMLMotionProps<'div'> {
  icon?: React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  rotate?: number;
  variant?: 'white' | 'lavender' | 'lime' | 'violet';
  className?: string;
}

export const FloatingPill: React.FC<FloatingPillProps> = ({
  icon,
  iconBg = 'bg-[#F5F0FF]',
  title,
  subtitle,
  rotate = 0,
  variant = 'white',
  className,
  ...props
}) => {
  const variantStyles = {
    white:
      'bg-white/95 border-white/85 text-[#111111] shadow-[0_12px_32px_rgba(109,40,217,0.08)]',
    lavender:
      'bg-[#F5F0FF] border-[#6D28D9]/20 text-[#6D28D9] shadow-[0_10px_25px_rgba(109,40,217,0.06)]',
    lime:
      'bg-[#F2FBEA] border-[#6EC000]/25 text-[#3F7300] shadow-[0_10px_25px_rgba(110,192,0,0.08)]',
    violet:
      'bg-[#EDE9FE] border-[#6D28D9]/30 text-[#6D28D9] shadow-[0_12px_28px_rgba(109,40,217,0.10)]',
  };

  return (
    <motion.div
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      className={cn(
        'inline-flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 sm:px-4 sm:py-2.5 backdrop-blur-md transition-transform duration-300',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            'flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl',
            iconBg
          )}
        >
          {icon}
        </div>
      )}
      <div className="text-left">
        <p className="text-[12px] sm:text-[12.5px] font-bold leading-tight tracking-[-0.01em]">
          {title}
        </p>
        {subtitle && (
          <p className="text-[10px] sm:text-[10.5px] text-[#536178] leading-tight mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
};
