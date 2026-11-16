import React from 'react';
import { cn } from '../../lib/utils';

export interface FloatingOrbProps {
  color?: 'lime' | 'violet' | 'lavender';
  size?: number; // e.g. 50, 75, 100
  className?: string;
  style?: React.CSSProperties;
}

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  color = 'lime',
  size = 70,
  className,
  style,
}) => {
  const getGradient = () => {
    switch (color) {
      case 'lime':
        return 'radial-gradient(circle at 35% 30%, #DCFCE7 0%, #A3E635 30%, #6EC000 65%, #365314 100%)';
      case 'violet':
        return 'radial-gradient(circle at 35% 30%, #F5F3FF 0%, #C4B5FD 35%, #8B5CF6 70%, #5B21B6 100%)';
      case 'lavender':
      default:
        return 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #E9D5FF 40%, #C4B5FD 75%, #7C3AED 100%)';
    }
  };

  const getShadow = () => {
    switch (color) {
      case 'lime':
        return '0 16px 36px -6px rgba(110, 192, 0, 0.45), inset 0 -4px 8px rgba(0, 0, 0, 0.25)';
      case 'violet':
        return '0 16px 36px -6px rgba(109, 40, 217, 0.40), inset 0 -4px 8px rgba(0, 0, 0, 0.25)';
      case 'lavender':
      default:
        return '0 14px 32px -6px rgba(167, 139, 250, 0.38), inset 0 -3px 6px rgba(109, 40, 217, 0.20)';
    }
  };

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute select-none rounded-full z-0 transform-gpu', className)}
      style={{
        width: size,
        height: size,
        background: getGradient(),
        boxShadow: getShadow(),
        ...style,
      }}
    />
  );
};
