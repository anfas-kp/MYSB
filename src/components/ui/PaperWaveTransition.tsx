import React from 'react';
import { cn } from '../../lib/utils';

export interface PaperWaveTransitionProps {
  position?: 'top' | 'bottom';
  variant?: 'standard' | 'hero-to-problem' | 'flowing-silk' | 'journey-to-numbers' | 'faq-to-footer';
  className?: string;
  style?: React.CSSProperties;
}

export const PaperWaveTransition: React.FC<PaperWaveTransitionProps> = ({
  position = 'bottom',
  variant = 'standard',
  className,
  style,
}) => {
  const isTop = position === 'top';
  const prefix = `pw-${variant}-${position}`;

  if (variant === 'faq-to-footer') {
    // Grand layered wave transition leading into ClosingBand
    return (
      <div
        className={cn(
          'pointer-events-none absolute left-0 right-0 w-full overflow-hidden select-none z-10',
          isTop ? 'top-0' : 'bottom-0',
          className
        )}
        style={style}
        aria-hidden="true"
      >
        <svg
          className={cn('w-full', isTop ? 'rotate-180' : '')}
          viewBox="0 0 1440 280"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: 'clamp(90px, 9vw, 140px)' }}
        >
          <defs>
            <linearGradient id={`${prefix}-layer1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EDE2FF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#DFCEFB" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.80" />
            </linearGradient>
            <linearGradient id={`${prefix}-layer2`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DFCEFB" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#C4B5FD" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`${prefix}-layer3`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="1.0" />
            </linearGradient>
            <filter id={`${prefix}-shadow`} x="-5%" y="-20%" width="110%" height="150%">
              <feDropShadow dx="0" dy="-3" stdDeviation="8" floodColor="#6D28D9" floodOpacity="0.08" />
            </filter>
          </defs>
          <path
            d="M 0 280 L 0 120 C 320 60, 680 180, 1020 80 C 1220 20, 1360 40, 1440 60 L 1440 280 Z"
            fill={`url(#${prefix}-layer1)`}
            filter={`url(#${prefix}-shadow)`}
          />
          <path
            d="M 0 280 L 0 170 C 260 130, 580 220, 920 140 C 1180 80, 1340 120, 1440 110 L 1440 280 Z"
            fill={`url(#${prefix}-layer2)`}
            filter={`url(#${prefix}-shadow)`}
          />
          <path
            d="M 0 280 L 0 220 C 340 180, 720 240, 1060 190 C 1260 160, 1380 180, 1440 170 L 1440 280 Z"
            fill={`url(#${prefix}-layer3)`}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'hero-to-problem') {
    // Flowing layered waves receiving the Hero's bottom swells into Problem
    return (
      <div
        className={cn(
          'pointer-events-none absolute left-0 right-0 w-full overflow-hidden select-none z-0',
          isTop ? 'top-0' : 'bottom-0',
          className
        )}
        style={style}
        aria-hidden="true"
      >
        <svg
          className={cn('w-full', isTop ? 'rotate-180' : '')}
          viewBox="0 0 1440 240"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: 'clamp(90px, 10vw, 150px)' }}
        >
          <defs>
            <linearGradient id={`${prefix}-h2p-1`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DFCEFB" stopOpacity="0.88" />
              <stop offset="50%" stopColor="#EADBFA" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#F5EEFF" stopOpacity="0.96" />
            </linearGradient>
            <linearGradient id={`${prefix}-h2p-2`} x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ECE3FD" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#F5EEFF" stopOpacity="0.90" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
            </linearGradient>
            <filter id={`${prefix}-h2p-shadow`} x="-5%" y="-20%" width="110%" height="150%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6D28D9" floodOpacity="0.06" />
            </filter>
          </defs>
          <path
            d="M 0 0 L 0 140 C 320 180, 680 70, 1040 150 C 1240 190, 1380 160, 1440 130 L 1440 0 Z"
            fill={`url(#${prefix}-h2p-1)`}
            filter={`url(#${prefix}-h2p-shadow)`}
          />
          <path
            d="M 0 0 L 0 90 C 300 130, 640 40, 980 110 C 1200 150, 1360 110, 1440 80 L 1440 0 Z"
            fill={`url(#${prefix}-h2p-2)`}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'flowing-silk') {
    // Flowing translucent wave matching Image 1
    return (
      <div
        className={cn(
          'pointer-events-none absolute left-0 right-0 w-full overflow-hidden select-none z-0',
          isTop ? 'top-0' : 'bottom-0',
          className
        )}
        style={style}
        aria-hidden="true"
      >
        <svg
          className={cn('w-full', isTop ? 'rotate-180' : '')}
          viewBox="0 0 1440 220"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: 'clamp(90px, 10vw, 160px)' }}
        >
          <defs>
            <linearGradient id={`${prefix}-silk1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5EFFF" stopOpacity="0.90" />
              <stop offset="45%" stopColor="#EDE2FD" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#DFCEFB" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`${prefix}-silk2`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F5EEFF" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#EDE2FD" stopOpacity="0.88" />
            </linearGradient>
            <filter id={`${prefix}-silkShadow`} x="-5%" y="-20%" width="110%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6D28D9" floodOpacity="0.06" />
            </filter>
          </defs>
          <path
            d="M 0 220 L 0 110 C 380 50, 720 150, 1080 80 C 1260 40, 1370 60, 1440 70 L 1440 220 Z"
            fill={`url(#${prefix}-silk1)`}
            filter={`url(#${prefix}-silkShadow)`}
          />
          <path
            d="M 0 220 L 0 160 C 320 120, 660 180, 980 135 C 1200 105, 1350 125, 1440 120 L 1440 220 Z"
            fill={`url(#${prefix}-silk2)`}
          />
        </svg>
      </div>
    );
  }

  // Standard multi-layered paper wave
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-0 right-0 w-full overflow-hidden select-none z-0',
        isTop ? 'top-0' : 'bottom-0',
        className
      )}
      style={style}
      aria-hidden="true"
    >
      <svg
        className={cn('w-full', isTop ? 'rotate-180' : '')}
        viewBox="0 0 1440 220"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: 'clamp(90px, 11vw, 160px)' }}
      >
        <defs>
          <filter id={`${prefix}-shadow1`} x="-5%" y="-30%" width="110%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#6D28D9" floodOpacity="0.06" />
          </filter>
          <linearGradient id={`${prefix}-grad1`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFCEFB" stopOpacity="0.90" />
            <stop offset="50%" stopColor="#EADBFA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F5EEFF" stopOpacity="0.96" />
          </linearGradient>
          <linearGradient id={`${prefix}-grad2`} x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#EDE2FD" stopOpacity="0.88" />
            <stop offset="55%" stopColor="#F5EEFF" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
          </linearGradient>
        </defs>
        <path
          d="M 0 220 L 0 120 C 330 90, 650 140, 960 90 C 1170 55, 1330 30, 1440 10 L 1440 220 Z"
          fill={`url(#${prefix}-grad1)`}
          filter={`url(#${prefix}-shadow1)`}
        />
        <path
          d="M 0 220 L 0 160 C 310 130, 620 160, 900 125 C 1140 90, 1300 70, 1440 50 L 1440 220 Z"
          fill={`url(#${prefix}-grad2)`}
        />
      </svg>
    </div>
  );
};
