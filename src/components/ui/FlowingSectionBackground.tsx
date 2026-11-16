import React from 'react';
import { cn } from '../../lib/utils';
import { AmbientGlow } from './AmbientGlow';
import { OrganicBlob } from './OrganicBlob';
import { OrbitVector } from './OrbitVector';

export interface FlowingSectionBackgroundProps {
  theme?: 'white-lavender' | 'lavender-mint' | 'clean-white' | 'deep-violet';
  hasGlow?: boolean;
  glowVariant?: 'violet' | 'lime' | 'lavender' | 'dual' | 'subtle';
  hasBlob?: boolean;
  blobSilhouette?: 'asymmetric-cloud' | 'diagonal-flow' | 'bottom-mound' | 'soft-orb';
  blobPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  hasOrbit?: boolean;
  orbitVariant?: 'default' | 'guilloche' | 's-curve' | 'wave' | 'lime-flow';
  className?: string;
  children?: React.ReactNode;
}

export const FlowingSectionBackground: React.FC<FlowingSectionBackgroundProps> = ({
  theme = 'white-lavender',
  hasGlow = true,
  glowVariant = 'violet',
  hasBlob = false,
  blobSilhouette = 'asymmetric-cloud',
  blobPosition = 'top-right',
  hasOrbit = false,
  orbitVariant = 'default',
  className,
  children,
}) => {
  const getBlobClasses = () => {
    switch (blobPosition) {
      case 'top-left':
        return '-top-32 -left-32 w-[600px] h-[500px] opacity-40';
      case 'top-right':
        return '-top-32 -right-32 w-[650px] h-[550px] opacity-45';
      case 'bottom-left':
        return '-bottom-32 -left-24 w-[580px] h-[480px] opacity-40';
      case 'bottom-right':
        return '-bottom-32 -right-24 w-[620px] h-[520px] opacity-45';
      case 'center':
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] opacity-35';
    }
  };

  const getThemeBackground = () => {
    switch (theme) {
      case 'lavender-mint':
        return 'bg-gradient-to-b from-[#FAF8FF] via-[#F4FBF0] to-[#FAF8FF]';
      case 'clean-white':
        return 'bg-white';
      case 'deep-violet':
        return 'bg-gradient-to-b from-[#1E0E38] via-[#15072B] to-[#0D041A]';
      case 'white-lavender':
      default:
        return 'bg-gradient-to-b from-white via-[#FBF9FE] to-white';
    }
  };

  return (
    <div className={cn('relative w-full overflow-hidden', getThemeBackground(), className)}>
      {/* Ambient Radial Lighting */}
      {hasGlow && (
        <AmbientGlow 
          variant={glowVariant}
          className="top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px]"
        />
      )}

      {/* Organic Silhouette Blob */}
      {hasBlob && (
        <OrganicBlob
          variant={theme === 'lavender-mint' ? 'mint' : 'primary'}
          silhouette={blobSilhouette}
          className={getBlobClasses()}
        />
      )}

      {/* Decorative Guilloche or Orbit Line */}
      {hasOrbit && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <OrbitVector 
            variant={orbitVariant} 
            className="w-full h-full opacity-60"
          />
        </div>
      )}

      {/* Section Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};
