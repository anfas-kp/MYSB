import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'violet' | 'lime' | 'elevated' | 'subtle';
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  hoverEffect = true,
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-white/90 border border-white/90 ring-1 ring-[#6D28D9]/[0.06] shadow-[0_16px_40px_rgba(109,40,217,0.06),0_2px_8px_rgba(0,0,0,0.02)]',
    violet:
      'bg-white/92 border border-[#6D28D9]/20 ring-1 ring-[#6D28D9]/10 shadow-[0_20px_48px_rgba(109,40,217,0.09),0_2px_8px_rgba(0,0,0,0.02)]',
    lime:
      'bg-white/92 border border-[#6EC000]/30 ring-1 ring-[#6EC000]/15 shadow-[0_20px_48px_rgba(110,192,0,0.08),0_2px_8px_rgba(0,0,0,0.02)]',
    elevated:
      'bg-white/96 border border-white ring-1 ring-[#6D28D9]/[0.08] shadow-[0_28px_60px_-10px_rgba(109,40,217,0.12),0_8px_20px_-6px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)]',
    subtle:
      'bg-white/80 border border-white/70 shadow-[0_10px_25px_rgba(109,40,217,0.04)]',
  };

  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -4,
              boxShadow:
                variant === 'lime'
                  ? '0 26px 55px -10px rgba(110,192,0,0.14), 0 8px 20px -6px rgba(0,0,0,0.04)'
                  : '0 26px 55px -10px rgba(109,40,217,0.14), 0 8px 20px -6px rgba(0,0,0,0.04)',
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      className={cn(
        'relative overflow-hidden rounded-[24px] backdrop-blur-[24px] transition-all duration-300',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Top subtle specular edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-85"
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
};
