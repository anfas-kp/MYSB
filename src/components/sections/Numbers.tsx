import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

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
    value: 10,
    suffix: '',
    label: 'Strict Circle Capacity',
    detail: 'Strictly capped at 10 participants. A small cohort protects psychological safety and guarantees everyone speaks daily.',
    highlight: true,
    metaRight: 'Hard Maximum',
  },
  {
    tag: '03 / RHYTHM',
    value: 20,
    suffix: 'Min',
    label: 'Daily Micro-Practice',
    detail: 'Gentle vocal warm-ups and diaphragmatic pacing that fit comfortably into school, college, or work routines.',
    metaRight: 'Guaranteed',
  },
  {
    tag: '04 / EXPRESSION',
    value: 3,
    suffix: 'Min+',
    label: 'Daily Audio Journaling',
    detail: 'Continuous voice recording in the Zlaqa app with visual prompts to track rhythm awareness and speech progression.',
    metaRight: 'Guaranteed',
  },
];

const CountUpStat: React.FC<{ value: number; suffix?: string; prefersReduced: boolean }> = ({
  value,
  suffix,
  prefersReduced,
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
    <div ref={ref} className="mt-8 sm:mt-10 mb-4 flex items-baseline select-none">
      <span className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-ink-900 leading-none">
        {count}
      </span>
      {suffix && (
        <span className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#FF7A5C] leading-none ml-1.5 sm:ml-2">
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
      className="relative py-16 sm:py-20 lg:py-24 bg-[#F7F5EE] overflow-hidden select-none"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="relative">
          {/* Subtle Extended Top Line */}
          <div 
            aria-hidden="true"
            className="absolute -top-px -left-4 -right-4 sm:-left-8 sm:-right-8 border-t border-ink-900/[0.12] pointer-events-none" 
          />

          {/* 4 Architectural Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-ink-900/[0.12]">
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
                className={`p-6 sm:p-8 lg:p-9 flex flex-col justify-between transition-[transform,background-color] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 cursor-default group ${
                  stat.highlight ? 'bg-[#EFECE3] dark:bg-mint-400/[0.04]' : 'bg-transparent hover:bg-white/50'
                }`}
              >
                <div>
                  {/* Top Kicker Row */}
                  <div className="flex items-center justify-between min-h-[26px]">
                    <span className="font-mono text-xs sm:text-[12.5px] font-bold tracking-[0.16em] uppercase text-ink-600 group-hover:text-teal-900 transition-colors">
                      {stat.tag}
                    </span>
                    {stat.highlight && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] sm:text-[10.5px] font-mono font-bold tracking-wider uppercase bg-[#DDF1E8] text-[#1B634B] border border-[#BDE5D3]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-live-pulse" />
                        <span>STRICT CAP</span>
                      </span>
                    )}
                  </div>

                  {/* Giant Stat Number + Coral Suffix */}
                  <CountUpStat
                    value={stat.value}
                    suffix={stat.suffix}
                    prefersReduced={prefersReduced}
                  />

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink-900 leading-snug mt-4 mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13.5px] text-ink-600 leading-relaxed font-normal">
                    {stat.detail}
                  </p>
                </div>

                {/* Bottom Metadata Line: Standard / Guaranteed */}
                <div className="mt-12 sm:mt-16 flex items-center justify-between text-xs sm:text-[12.5px] font-mono text-ink-500">
                  <span>Standard</span>
                  <span>{stat.metaRight}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subtle Extended Bottom Line */}
          <div 
            aria-hidden="true"
            className="absolute -bottom-px -left-4 -right-4 sm:-left-8 sm:-right-8 border-b border-ink-900/[0.12] pointer-events-none" 
          />
        </div>
      </div>
    </section>
  );
};
