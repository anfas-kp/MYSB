import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Container } from '../ui/Container';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { SITE_CONTENT, StatementLine } from '../../content/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface WordData {
  word: string;
  isAccent: boolean;
  globalIndex: number;
}

interface LineData {
  id: string;
  words: WordData[];
}

// Sub-component for individual word with progressive scroll illumination
interface PhilosophyWordProps {
  word: string;
  isAccent: boolean;
  globalIndex: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
  prefersReduced: boolean;
}

const PhilosophyWord: React.FC<PhilosophyWordProps> = ({
  word,
  isAccent,
  globalIndex,
  totalWords,
  scrollYProgress,
  prefersReduced,
}) => {
  // Fast, responsive progression: all words finish illuminating by ~0.80 of scroll range
  const animSpan = 0.78;
  const wordStep = animSpan / totalWords;
  const start = globalIndex * wordStep;
  const end = Math.min(1.0, start + wordStep * 2.2);

  // Smooth transform from resting opacity (0.28) to 100% illumination (1.0)
  const opacity = useTransform(scrollYProgress, [start, end], [0.28, 1]);

  if (prefersReduced) {
    return (
      <span
        className={cn(
          isAccent
            ? "font-serif italic font-normal text-teal-700 dark:text-mint-400"
            : "text-ink-900 dark:text-cream-50"
        )}
      >
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity }}
      className={cn(
        "inline-block select-none will-change-[opacity]",
        isAccent
          ? "font-serif italic font-normal text-teal-700 dark:text-mint-400"
          : "text-ink-900 dark:text-cream-50"
      )}
    >
      {word}
    </motion.span>
  );
};

export const Statement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Target the text block directly so reveal speed is snappy and finishes when centered
  const { scrollYProgress } = useScroll({
    target: textBlockRef,
    offset: ['start 0.88', 'end 0.52'],
  });

  const lines = SITE_CONTENT.statement.lines;

  // Process the 6 intentional lines into structured words with accent tagging & global indexing
  const { lineGroups, totalWords } = useMemo(() => {
    let runningIndex = 0;
    const groups: LineData[] = lines.map((line: StatementLine) => {
      const words = line.text.split(' ');
      const accentTokens = line.accentPhrase
        .toLowerCase()
        .split(/\s+/)
        .map((w) => w.replace(/[.,;:!?]/g, ''));

      const lineWords: WordData[] = words.map((w) => {
        const cleanWord = w.toLowerCase().replace(/[.,;:!?]/g, '');
        const isAccent = accentTokens.includes(cleanWord);
        const item: WordData = {
          word: w,
          isAccent,
          globalIndex: runningIndex,
        };
        runningIndex += 1;
        return item;
      });

      return {
        id: line.id,
        words: lineWords,
      };
    });

    return { lineGroups: groups, totalWords: runningIndex };
  }, [lines]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-cream-100 dark:bg-teal-950 hairline-b transition-colors overflow-hidden"
    >
      {/* Soft Ambient Radial Backdrop for Editorial Clarity */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(45,212,191,0.06),transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(94,234,212,0.04),transparent_75%)]" 
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Refined Minimal Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 dark:bg-mint-400/10 border border-teal-600/15 dark:border-mint-400/20 mb-6 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-700 dark:bg-mint-400" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-teal-900 dark:text-mint-300">
              Our Philosophy & Ethos
            </span>
          </div>

          {/* Primary Lead Statement */}
          <div className="mb-10 sm:mb-14 max-w-3xl px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-serif italic text-teal-950 dark:text-mint-300 leading-snug tracking-tight">
              "{SITE_CONTENT.statement.lead}"
            </h2>
          </div>

          {/* Cinematic 6-Line Display Architecture with Progressive Word Illumination */}
          <div 
            ref={textBlockRef}
            className="relative flex flex-col items-center space-y-3.5 sm:space-y-4 md:space-y-5 text-center max-w-5xl xl:max-w-6xl mx-auto w-full px-2 sm:px-4"
          >
            {lineGroups.map((lineData) => (
              <div
                key={lineData.id}
                className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-x-1.5 sm:gap-x-2 md:gap-x-2.5 lg:gap-x-3 text-base sm:text-lg md:text-xl lg:text-[1.65rem] xl:text-[1.85rem] font-display font-semibold tracking-tight leading-[1.3] lg:whitespace-nowrap"
              >
                {lineData.words.map((item) => (
                  <PhilosophyWord
                    key={item.globalIndex}
                    word={item.word}
                    isAccent={item.isAccent}
                    globalIndex={item.globalIndex}
                    totalWords={totalWords}
                    scrollYProgress={scrollYProgress}
                    prefersReduced={prefersReduced}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* 3 Grounded Ethos Anchors (Micro-Pillars of Practice) with staggered scroll reveal */}
          <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto w-full text-left">
            {/* Anchor 1: Radical Warmth */}
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-teal-900/40 border border-teal-800/10 dark:border-mint-400/15 border-t-white/90 dark:border-t-white/20 shadow-subtle-card backdrop-blur-md transition-[transform,box-shadow,border-color] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-card hover:border-teal-700/30 active:scale-[0.985] group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-750 dark:text-mint-400">
                  01 · Safe Harbor
                </span>
                <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-mint-400 group-hover:animate-live-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-ink-900 dark:text-cream-50 mb-1.5 group-hover:text-teal-900 transition-colors">
                Radical Warmth & Empathy
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-cream-200 leading-relaxed font-normal">
                No countdown timers, no interruptions, zero pressure. A circle of 10 young people who truly understand what it feels like to stammer.
              </p>
            </motion.div>

            {/* Anchor 2: Zero Pressure Fluency */}
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-teal-900/40 border border-teal-800/10 dark:border-mint-400/15 border-t-white/90 dark:border-t-white/20 shadow-subtle-card backdrop-blur-md transition-[transform,box-shadow,border-color] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-card hover:border-teal-700/30 active:scale-[0.985] group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-coral-600 dark:text-coral-400">
                  02 · Authenticity
                </span>
                <span className="w-2 h-2 rounded-full bg-coral-500 group-hover:animate-live-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-ink-900 dark:text-cream-50 mb-1.5 group-hover:text-coral-600 transition-colors">
                Zero Pressure to be Fluent
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-cream-200 leading-relaxed font-normal">
                We never promise a "cure" or chase artificial fluency. We practice to speak comfortably, authentically, and without apologizing for our voice.
              </p>
            </motion.div>

            {/* Anchor 3: Daily Micro-Habits */}
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="p-5 sm:p-6 rounded-3xl bg-white/85 dark:bg-teal-900/40 border border-teal-800/10 dark:border-mint-400/15 border-t-white/90 dark:border-t-white/20 shadow-subtle-card backdrop-blur-md transition-[transform,box-shadow,border-color] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-card hover:border-teal-700/30 active:scale-[0.985] group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-750 dark:text-mint-400">
                  03 · Momentum
                </span>
                <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-mint-400 group-hover:animate-live-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-ink-900 dark:text-cream-50 mb-1.5 group-hover:text-teal-900 transition-colors">
                Daily Repetition & SLP Review
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 dark:text-cream-200 leading-relaxed font-normal">
                20 minutes a day with the Zlaqa app and weekly 1-on-1 Speech Language Pathologist reviews turn speaking into a steady, reliable habit.
              </p>
            </motion.div>
          </div>

          {/* Reassurance Seal Badge */}
          <div className="mt-12 sm:mt-14 flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/70 dark:bg-teal-900/40 border border-teal-800/15 dark:border-mint-400/20 shadow-2xs backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-mint-400 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-ink-700 dark:text-cream-200 font-semibold">
                {SITE_CONTENT.statement.footnote}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
