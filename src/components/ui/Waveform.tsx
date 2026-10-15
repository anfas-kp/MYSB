import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  smoothness?: number; // 0 (fragmented/jittery) to 1 (pure harmonic steady wave)
  color?: string;
  secondaryColor?: string;
  height?: number;
  interactive?: boolean;
  frequency?: number;
  amplitude?: number;
  speed?: number;
  glow?: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({
  smoothness = 0.5,
  color = '#0F766E', // Primary teal
  secondaryColor = '#7FE0CF', // Mint
  height = 140,
  interactive = true,
  frequency = 0.015,
  amplitude = 28,
  speed = 0.02,
  glow = true,
  className,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    // Visibility Observer to pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
      canvas.width = rect.width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        };
      } else {
        mouseRef.current.active = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Render loop
    const render = () => {
      if (!isVisibleRef.current) {
        animationId = requestAnimationFrame(render);
        return;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || 800;
      const h = height;

      ctx.clearRect(0, 0, width, h);

      if (prefersReduced) {
        // Static serene harmonic wave
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        const midY = h / 2;
        for (let x = 0; x <= width; x += 4) {
          const y = midY + Math.sin(x * frequency) * amplitude * 0.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      phase += speed;

      const currentSmoothness = Math.max(0, Math.min(1, smoothness));
      const midY = h / 2;

      // Draw secondary ethereal mint background wave
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = secondaryColor;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1.5;

      for (let x = 0; x <= width; x += 3) {
        const harmonic1 = Math.sin(x * frequency * 0.8 + phase * 0.9);
        const harmonic2 = Math.cos(x * frequency * 1.6 - phase * 0.6) * 0.4;
        const y = midY + (harmonic1 + harmonic2) * (amplitude * 0.8);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Draw primary signature wave (transitioning from fragmented noise to smooth curve)
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
      }

      for (let x = 0; x <= width; x += 2) {
        // Base smooth sinusoidal wave
        const smoothWave = Math.sin(x * frequency + phase) * amplitude;

        // Fragmented / hesitant noise component (simulating blocks & stutter)
        const noiseFreq1 = Math.sin(x * 0.12 + phase * 4.5);
        const noiseFreq2 = Math.cos(x * 0.35 - phase * 6.2);
        const jitterNoise = (noiseFreq1 * 0.6 + noiseFreq2 * 0.4) * (amplitude * 1.4);

        // Interpolate between jittery noise and pure harmonic smooth wave
        let y = midY + (smoothWave * currentSmoothness + jitterNoise * (1 - currentSmoothness));

        // Interactive mouse magnetic pull
        if (mouseRef.current.active) {
          const dx = x - mouseRef.current.x;
          const dist = Math.abs(dx);
          if (dist < 180) {
            const pull = Math.cos((dist / 180) * (Math.PI / 2));
            const mouseOffset = (mouseRef.current.y - midY) * 0.45;
            y += mouseOffset * pull;
          }
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [smoothness, color, secondaryColor, height, interactive, frequency, amplitude, speed, glow, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden select-none', className)}
      style={{ height: `${height}px` }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: `${height}px` }}
      />
    </div>
  );
};
