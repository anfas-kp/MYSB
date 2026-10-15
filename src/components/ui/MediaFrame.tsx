import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

export interface MediaFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'image' | 'video';
  src?: string;
  poster?: string;
  alt?: string;
  caption?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  objectFit?: 'cover' | 'contain';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  priority?: boolean;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  className,
  type = 'image',
  src,
  poster,
  alt = 'MYSB media showcase',
  caption = '[Replace: candid group practising on a call]',
  aspectRatio = 'video',
  objectFit = 'cover',
  autoPlay = false,
  muted = true,
  loop = true,
  priority = false,
  ...props
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);

  // Normalize string source from direct string or Vite imported ES module object
  const initialResolvedSrc = typeof src === 'string' ? src : (src as any)?.default || '';
  const [currentSrc, setCurrentSrc] = useState(initialResolvedSrc);
  const [hasError, setHasError] = useState(!initialResolvedSrc);

  // Automatically reset error and currentSrc whenever src prop changes
  React.useEffect(() => {
    const nextSrc = typeof src === 'string' ? src : (src as any)?.default || '';
    setCurrentSrc(nextSrc);
    setHasError(!nextSrc);
  }, [src]);

  const aspectStyles = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
    auto: 'h-full w-full',
  };

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    trackEvent(nextState ? 'video_play' : 'video_pause', { caption });
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-ink-900/10 dark:border-cream-100/15 bg-teal-900/10 dark:bg-teal-950 shadow-subtle-card select-none',
        aspectStyles[aspectRatio],
        className
      )}
      {...props}
    >
      {/* Real Media Rendering or Elegant Art-Directed Placeholder */}
      {!hasError && currentSrc ? (
        type === 'video' ? (
          <video
            src={currentSrc}
            poster={poster}
            autoPlay={isPlaying}
            muted={isMuted}
            loop={loop}
            playsInline
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-mint-400/10 via-transparent to-teal-600/10 pointer-events-none" />
            <img
              src={currentSrc}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              className={cn(
                "relative z-10 transition-transform duration-700 group-hover:scale-105 drop-shadow-md",
                objectFit === 'contain' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'
              )}
              onError={() => {
                if (currentSrc !== '/assets/hero-circle.png') {
                  setCurrentSrc('/assets/hero-circle.png');
                } else {
                  setHasError(true);
                }
              }}
            />
          </div>
        )
      ) : (
        /* Art-Directed Placeholder: Cinematic lighting + grain + editorial metadata */
        <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-teal-900 via-teal-800 to-ink-900 text-cream-100">
          {/* Subtle noise grain simulation */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Ambient Lighting Spheres */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-mint-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-coral-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status Pill */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-mono tracking-wide text-mint-300 border border-mint-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
              <span>{type === 'video' ? 'HD VIDEO ASSET' : 'CURATED PHOTOGRAPHY'}</span>
            </div>
            {type === 'video' && (
              <span className="text-xs font-mono text-cream-300/80 bg-black/30 px-2.5 py-1 rounded-md">
                1080p · 24fps
              </span>
            )}
          </div>

          {/* Center Visual Art Motif */}
          <div className="relative z-10 my-auto text-center flex flex-col items-center">
            {type === 'video' ? (
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video preview' : 'Play video preview'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-coral-500/90 hover:bg-coral-500 text-white flex items-center justify-center shadow-glow-coral hover:shadow-xl active:scale-95 transition-all duration-200 ease-out border border-white/20 mb-3"
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1 fill-current" />}
              </button>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md text-mint-300 flex items-center justify-center border border-white/15 mb-3 shadow-inner">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
            <p className="text-sm sm:text-base font-medium text-cream-200 max-w-sm px-4">
              {caption}
            </p>
          </div>

          {/* Bottom Art Direction Tag */}
          <div className="relative z-10 flex items-center justify-between text-xs text-cream-300/80 font-mono pt-4 border-t border-white/10">
            <span>MYSB ASSET REPOSITORY</span>
            <span>CONSENTED CITIZEN ARCHIVE</span>
          </div>
        </div>
      )}

      {/* Visible Controls for real video */}
      {!hasError && src && type === 'video' && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white border border-white/10">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="p-1.5 hover:text-coral-400 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="p-1.5 hover:text-coral-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};
