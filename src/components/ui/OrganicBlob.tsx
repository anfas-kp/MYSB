import React from 'react';
import { cn } from '../../lib/utils';

export interface OrganicBlobProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'mint' | 'glow';
  silhouette?: 'asymmetric-cloud' | 'diagonal-flow' | 'bottom-mound' | 'soft-orb';
  className?: string;
  style?: React.CSSProperties;
}

export const OrganicBlob: React.FC<OrganicBlobProps> = ({
  variant = 'primary',
  silhouette = 'asymmetric-cloud',
  className,
  style,
}) => {
  if (variant === 'glow') {
    return (
      <div
        className={cn('pointer-events-none absolute rounded-full select-none z-0', className)}
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(224,204,252,0.22) 50%, transparent 75%)',
          filter: 'blur(50px)',
          ...style,
        }}
        aria-hidden="true"
      />
    );
  }

  const gradId = `blobGrad-${variant}-${silhouette}`;
  const blurId = `blobBlur-${variant}-${silhouette}`;
  const shadowId = `blobShadow-${variant}-${silhouette}`;

  return (
    <svg
      className={cn('pointer-events-none absolute select-none z-0', className)}
      viewBox="0 0 760 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={style}
    >
      <defs>
        <linearGradient id={gradId} x1="15%" y1="10%" x2="85%" y2="90%">
          {variant === 'primary' && (
            <>
              <stop offset="0%" stopColor="#DFCEFB" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#E8DCFC" stopOpacity="0.92" />
              <stop offset="75%" stopColor="#EDE2FD" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#DFCDF9" stopOpacity="0.82" />
            </>
          )}
          {variant === 'secondary' && (
            <>
              <stop offset="0%" stopColor="#D5BEF8" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#E3D2FA" stopOpacity="0.86" />
              <stop offset="100%" stopColor="#EADBFA" stopOpacity="0.75" />
            </>
          )}
          {variant === 'accent' && (
            <>
              <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.65" />
            </>
          )}
          {variant === 'mint' && (
            <>
              <stop offset="0%" stopColor="#C6EF9E" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#DCF5C0" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#EBF9DD" stopOpacity="0.60" />
            </>
          )}
        </linearGradient>

        {/* Soft edge blur so the organic shape is defined yet gentle */}
        <filter id={blurId} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        {/* Tactile paper shadow for 3D depth matching reference images */}
        <filter id={shadowId} x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#6D28D9" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Silhouette 1: Asymmetric organic cloud */}
      {silhouette === 'asymmetric-cloud' && (
        <path
          d="M 390 35 C 560 15, 720 65, 745 215 C 770 370, 710 510, 535 550 C 370 590, 195 515, 145 385 C 95 250, 220 55, 390 35 Z"
          fill={`url(#${gradId})`}
          filter={`url(#${shadowId})`}
        />
      )}

      {/* Silhouette 2: Diagonal sweeping organic flow */}
      {silhouette === 'diagonal-flow' && (
        <path
          d="M 450 40 C 600 20, 710 110, 730 250 C 750 390, 640 490, 480 520 C 320 550, 160 480, 120 350 C 80 220, 300 60, 450 40 Z"
          fill={`url(#${gradId})`}
          filter={`url(#${shadowId})`}
        />
      )}

      {/* Silhouette 3: Bottom-anchored organic mound */}
      {silhouette === 'bottom-mound' && (
        <path
          d="M 120 450 C 180 280, 310 140, 470 120 C 610 100, 710 220, 740 380 C 760 490, 650 540, 480 545 C 310 550, 80 540, 120 450 Z"
          fill={`url(#${gradId})`}
          filter={`url(#${shadowId})`}
        />
      )}

      {/* Silhouette 4: Soft floating organic orb */}
      {silhouette === 'soft-orb' && (
        <path
          d="M 380 60 C 530 50, 680 120, 690 260 C 700 400, 590 500, 450 510 C 310 520, 160 440, 140 300 C 120 160, 230 70, 380 60 Z"
          fill={`url(#${gradId})`}
          filter={`url(#${shadowId})`}
        />
      )}
    </svg>
  );
};
