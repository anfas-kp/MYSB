import React from 'react';
import { cn } from '../../lib/utils';

export interface OrbitVectorProps {
  variant?: 'default' | 'guilloche' | 's-curve' | 'wave' | 'lime-flow';
  className?: string;
  style?: React.CSSProperties;
}

export const OrbitVector: React.FC<OrbitVectorProps> = ({ 
  variant = 'default',
  className, 
  style 
}) => {
  if (variant === 'guilloche') {
    // Multi-line concentric ribbon curves matching Image 4
    return (
      <svg
        className={cn('pointer-events-none absolute select-none z-0', className)}
        viewBox="0 0 900 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={style}
      >
        <defs>
          <linearGradient id="guillocheViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.20" />
          </linearGradient>
          <linearGradient id="guillocheLime" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6EC000" stopOpacity="0.50" />
            <stop offset="60%" stopColor="#A3E635" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6EC000" stopOpacity="0.10" />
          </linearGradient>
        </defs>
        {/* Layered concentric flowing wave lines matching Image 4 */}
        {[0, 16, 32, 48, 64, 80, 96, 112, 128].map((offset, i) => (
          <path
            key={i}
            d={`M 0 ${120 + offset} C 260 ${30 + offset * 0.8}, 540 ${280 + offset * 1.1}, 900 ${80 + offset}`}
            stroke={i % 3 === 0 ? "url(#guillocheLime)" : "url(#guillocheViolet)"}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </svg>
    );
  }

  if (variant === 's-curve') {
    // Graceful vertical connecting S-curve to link steps or consecutive sections
    return (
      <svg
        className={cn('pointer-events-none absolute select-none z-0', className)}
        viewBox="0 0 300 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={style}
      >
        <defs>
          <linearGradient id="sCurveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.60" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6EC000" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          d="M 150 0 C 150 180, 260 220, 240 360 C 220 500, 100 480, 150 600"
          stroke="url(#sCurveGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          fill="none"
        />
      </svg>
    );
  }

  if (variant === 'lime-flow') {
    return (
      <svg
        className={cn('pointer-events-none absolute select-none z-0', className)}
        viewBox="0 0 800 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={style}
      >
        <defs>
          <linearGradient id="limeFlowGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#6EC000" stopOpacity="0.20" />
            <stop offset="40%" stopColor="#6EC000" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {[0, 15, 30, 45, 60].map((offset, i) => (
          <path
            key={i}
            d={`M 0 ${140 + offset} C 200 ${60 + offset}, 420 ${240 + offset}, 800 ${100 + offset}`}
            stroke="url(#limeFlowGrad)"
            strokeWidth="1.6"
            fill="none"
          />
        ))}
      </svg>
    );
  }

  // Default: sweeping elliptical orbit vector
  return (
    <svg
      className={cn('pointer-events-none absolute select-none z-0', className)}
      viewBox="0 0 740 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={style}
    >
      <defs>
        <linearGradient id="orbitVectorGrad" x1="0%" y1="70%" x2="100%" y2="20%">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.40" />
          <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.75" />
          <stop offset="80%" stopColor="#A78BFA" stopOpacity="0.60" />
          <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.30" />
        </linearGradient>
      </defs>
      <path
        d="M 30 330 C 30 170, 180 40, 400 30 C 600 20, 710 105, 700 245 C 690 375, 550 460, 410 480"
        stroke="url(#orbitVectorGrad)"
        strokeWidth="2.0"
        fill="none"
      />
    </svg>
  );
};
