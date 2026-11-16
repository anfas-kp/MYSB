import React from 'react';
import { cn } from '../../lib/utils';

export interface AmbientGlowProps {
  variant?: 'violet' | 'lime' | 'lavender' | 'dual' | 'subtle';
  className?: string;
  style?: React.CSSProperties;
}

export const AmbientGlow: React.FC<AmbientGlowProps> = ({
  variant = 'violet',
  className,
  style,
}) => {
  const getGradient = () => {
    switch (variant) {
      case 'lime':
        return 'radial-gradient(circle, rgba(110,192,0,0.22) 0%, rgba(163,230,53,0.12) 45%, transparent 70%)';
      case 'dual':
        return 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(167,139,250,0.22) 0%, rgba(110,192,0,0.14) 50%, transparent 75%)';
      case 'lavender':
        return 'radial-gradient(circle, rgba(224,204,252,0.65) 0%, rgba(235,223,254,0.38) 45%, transparent 75%)';
      case 'subtle':
        return 'radial-gradient(circle, rgba(167,139,250,0.20) 0%, rgba(224,204,252,0.12) 50%, transparent 75%)';
      case 'violet':
      default:
        return 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, rgba(167,139,250,0.15) 50%, transparent 75%)';
    }
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute select-none rounded-full blur-2xl sm:blur-3xl transform-gpu z-0',
        className
      )}
      style={{
        background: getGradient(),
        ...style,
      }}
    />
  );
};
