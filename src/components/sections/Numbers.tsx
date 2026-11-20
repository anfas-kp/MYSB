import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GlassCard } from '../ui/GlassCard';
import { Container } from '../ui/Container';
import { AmbientGlow } from '../ui/AmbientGlow';
import { OrganicBlob } from '../ui/OrganicBlob';

interface StatFact {
  tag: string;
  value: number;
  suffix?: string;
  label: string;
  detail: string;
  highlight?: boolean;
  metaRight: string;
}

const FACTS: StatFact[] = [
  {
    tag: '01 / HORIZON',
    value: 8,
    suffix: 'Wks',
    label: 'Structured Program Duration',
    detail: 'Long enough to build neurological automaticity and calm speaking habits, short enough to maintain high momentum.',
    metaRight: 'Guaranteed',
  },
  {
    tag: '02 / CAPACITY',
    value: 15,
    suffix: '',
    label: 'Strict Circle Capacity',
    detail: 'Strictly capped at 15 participants. A small cohort protects psychological safety and guarantees everyone speaks daily.',
    highlight: true,
    metaRight: 'Hard Maximum',
  },
  {
    tag: '03 / RHYTHM',
    value: 20,
    suffix: 'Min',
    label: 'Daily Micro-Practice',
    detail: '10 mins voice drills in the Zlaqa app + 10 mins Google Meet peer practice that fits into school, college, or work routines.',
    metaRight: 'Guaranteed',
  },
  {
    tag: '04 / EXPRESSION',
    value: 8,
    suffix: 'Wks',
    label: 'Audio Journaling & Guidance',
    detail: 'Continuous speech tracking in the Zlaqa app with weekly personalized feedback from licensed Speech-Language Pathologists.',
    metaRight: 'Guaranteed',
  },
];

const CountUpStat: React.FC<{ value: number; suffix?: string; prefersReduced: boolean; highlight?: boolean }> = ({
  value,
  suffix,
  prefersReduced,
  highlight,
}) => {
  const [count, setCount] = useState(prefersReduced ? value : 0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView || prefersReduced) {
      if (prefersReduced) setCount(value);
      return;
    }

    const duration = 1100;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, prefersReduced]);

  return (
    <div ref={ref} className="mt-6 mb-4 flex items-baseline select-none">
      <span className={`font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none tabular-nums ${
        highlight ? 'text-[#6D28D9]' : 'text-slate-900'
      }`}>
        {count}
      </span>
      {suffix && (
        <span className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#3F7300] leading-none ml-1.5 sm:ml-2">
          {suffix}
        </span>
      )}
    </div>
  );
};

export const Numbers: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section 
      id="numbers"
      aria-label="Program Constraints and Numbers"
      className="relative scroll-mt-24 sm:scroll-mt-28 pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14 bg-gradient-to-b from-[#FAF8FF] via-white to-white overflow-hidden select-none"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      <AmbientGlow
        variant="dual"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px]"
      />

      {/* Starting Orb Blob: sits top-right safely within section bounds */}
      <OrganicBlob
        variant="secondary"
        silhouette="soft-orb"
        className="top-10 -right-20 w-[540px] h-[460px] pointer-events-none"
      />

      <Container size="wide" className="relative z-10 max-w-6xl">
        {/* Architectural Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10 text-left">
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold text-[#6D28D9] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#6EC000] flex-shrink-0" />
            <span>The Philosophy of Small Numbers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B0B0B] leading-tight">
            Strict boundaries.{' '}
            <span className="font-serif italic font-normal text-[#6D28D9]">
              By design.
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Why 15 seats, 8 weeks, and 20 daily minutes work when everything else feels overwhelming.
          </p>
        </div>

        {/* 4 Architectural Floating Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {FACTS.map((stat, idx) => (
            <motion.div
              key={stat.tag}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: prefersReduced ? 0.2 : 0.45,
                delay: prefersReduced ? 0 : idx * 0.06,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="h-full"
            >
              <GlassCard
                variant={stat.highlight ? 'violet' : 'default'}
                hoverEffect
                className="h-full p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Fixed height header row keeps all 4 big numbers aligned */}
                  <div className="flex h-8 items-center justify-between gap-2">
                    <span className="font-mono text-xs sm:text-[12px] font-semibold tracking-wider uppercase text-slate-500 whitespace-nowrap group-hover:text-[#6D28D9] transition-colors">
                      {stat.tag}
                    </span>
                    {stat.highlight && (
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#6D28D9]/20 bg-white/90 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#6D28D9] shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6EC000] animate-live-pulse" />
                        <span>Strict Cap</span>
                      </span>
                    )}
                  </div>

                  {/* Giant Stat Number */}
                  <CountUpStat
                    value={stat.value}
                    suffix={stat.suffix}
                    prefersReduced={prefersReduced}
                    highlight={stat.highlight}
                  />

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#0B0B0B] leading-snug mt-4 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal">
                    {stat.detail}
                  </p>
                </div>

                {/* Bottom Metadata Line */}
                <div className="mt-8 sm:mt-10 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs sm:text-[12px] font-mono text-slate-400">
                  <span>Standard</span>
                  <span className="font-semibold text-slate-700">{stat.metaRight}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
