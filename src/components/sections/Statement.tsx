import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Container } from '../ui/Container';
import { ShieldCheck, Heart, Volume2, CalendarCheck } from 'lucide-react';
import { SITE_CONTENT, StatementLine } from '../../content/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';
import { GlassCard } from '../ui/GlassCard';
import { AmbientGlow } from '../ui/AmbientGlow';

interface WordData {
  word: string;
  isAccent: boolean;
  isHeading?: boolean;
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
  isHeading?: boolean;
  globalIndex: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
  prefersReduced: boolean;
}

const PhilosophyWord: React.FC<PhilosophyWordProps> = ({
  word,
  isAccent,
  isHeading,
  globalIndex,
  totalWords,
  scrollYProgress,
  prefersReduced,
}) => {
  // Fast, responsive progression: all words finish illuminating by ~0.80 of scroll range
  const animSpan = 0.82;
  const wordStep = animSpan / totalWords;
  const start = globalIndex * wordStep;
  const end = Math.min(1.0, start + wordStep * 2.2);

  // High contrast resting opacity (0.78) so words are ALWAYS crisp, dark, and meet WCAG AAA
  const opacity = useTransform(scrollYProgress, [start, end], [0.78, 1]);

  const styleClass = isHeading
    ? "font-display font-extrabold text-[#111111]"
    : isAccent
    ? "font-serif italic font-normal text-[#6D28D9]"
    : "font-sans font-medium text-[#1E293B]";

  if (prefersReduced) {
    return (
      <span className={cn(styleClass, "inline-block")}>
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity }}
      className={cn(
        "inline-block select-none will-change-[opacity]",
        styleClass
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

    // Exact accent targets matching editorial design
    const LINE_ACCENT_MAP: Record<string, string[]> = {
      'line-1': ['answer.', 'You know the words.'],
      'line-2': ['your voice goes quiet.'],
      'line-3': ['you', 'the introduction.', 'You swap the word.'],
      'line-4': ['someone else order for you.'],
      'line-5': ['SPEAKUP is built to end that.'],
      'line-6': ['speak on your own terms.'],
    };

    const groups: LineData[] = lines.map((line: StatementLine) => {
      const fullText = line.text;
      const accentPhrases = LINE_ACCENT_MAP[line.id] || [line.accentPhrase];

      // Build character-level boolean mask for accents
      const isAccentChar = new Array(fullText.length).fill(false);
      const normFull = fullText.replace(/[\u2018\u2019]/g, "'").toLowerCase();

      accentPhrases.forEach((phrase) => {
        const normPhrase = phrase.replace(/[\u2018\u2019]/g, "'").toLowerCase();
        let searchStart = 0;
        let foundIdx = normFull.indexOf(normPhrase, searchStart);
        while (foundIdx !== -1) {
          for (let c = foundIdx; c < foundIdx + normPhrase.length; c++) {
            isAccentChar[c] = true;
          }
          searchStart = foundIdx + normPhrase.length;
          foundIdx = normFull.indexOf(normPhrase, searchStart);
        }
      });

      const words = fullText.split(' ');
      let charCursor = 0;

      const lineWords: WordData[] = words.map((w) => {
        const wordStart = fullText.indexOf(w, charCursor);
        const wordEnd = wordStart + w.length;
        charCursor = wordEnd;

        // Check if characters of this word are marked as accent
        let accentCount = 0;
        for (let i = wordStart; i < wordEnd; i++) {
          if (isAccentChar[i]) accentCount++;
        }
        const inAccent = accentCount > w.length * 0.4;

        const item: WordData = {
          word: w,
          isAccent: inAccent,
          isHeading: false,
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
      id="problem"
      ref={containerRef}
      className="relative pt-8 pb-4 sm:pt-10 sm:pb-6 lg:pt-12 lg:pb-8 bg-gradient-to-b from-[#FAF8FF] via-white to-white transition-colors overflow-hidden"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      {/* Soft Ambient Radial Backdrop — provides clean, non-colliding illumination */}
      <AmbientGlow
        variant="lavender"
        className="top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[600px]"
      />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Refined Minimal Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EDE9FE] mb-4 sm:mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#6EC000]" />
            <span className="text-[11px] sm:text-[11.5px] font-mono font-bold uppercase tracking-[0.16em] text-[#6D28D9]">
              The Problem We Solve
            </span>
          </div>

          {/* Primary Lead Statement */}
          <div className="mb-6 sm:mb-8 max-w-4xl px-4 mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display font-extrabold text-[#111111] leading-[1.16] tracking-tight">
              &ldquo;You are not the problem. Silence is.&rdquo;
            </h2>
          </div>

          {/* Cinematic Manifesto Architecture with Progressive Word Illumination */}
          <div 
            ref={textBlockRef}
            className="relative flex flex-col items-center text-center max-w-3xl mx-auto w-full px-4"
          >
            {/* Movement 1: The Lived Reality (Lines 1 to 4) */}
            <div className="flex flex-col items-center space-y-4 sm:space-y-5 w-full">
              {lineGroups.slice(0, 4).map((lineData) => (
                <div
                  key={lineData.id}
                  className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-2.5 text-lg sm:text-xl md:text-2xl lg:text-[1.55rem] font-sans font-medium tracking-tight leading-[1.6]"
                >
                  {lineData.words.map((item) => (
                    <PhilosophyWord
                      key={item.globalIndex}
                      word={item.word}
                      isAccent={item.isAccent}
                      isHeading={item.isHeading}
                      globalIndex={item.globalIndex}
                      totalWords={totalWords}
                      scrollYProgress={scrollYProgress}
                      prefersReduced={prefersReduced}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Movement 2: The Turning Point & Resolution (Lines 5 and 6) */}
            <div className="mt-8 sm:mt-10 max-w-3xl mx-auto w-full flex flex-col items-center space-y-3 sm:space-y-3.5">
              {/* Line 5 Declaration & Context */}
              <div className="flex flex-wrap justify-center items-center gap-x-2 text-base sm:text-lg md:text-xl font-sans font-normal tracking-tight leading-[1.7] text-[#475569] max-w-2xl mx-auto text-center">
                {lineGroups[4]?.words.map((item) => (
                  <PhilosophyWord
                    key={item.globalIndex}
                    word={item.word}
                    isAccent={Boolean(item.isAccent || item.isHeading)}
                    isHeading={false}
                    globalIndex={item.globalIndex}
                    totalWords={totalWords}
                    scrollYProgress={scrollYProgress}
                    prefersReduced={prefersReduced}
                  />
                ))}
              </div>

              {/* Line 6 Resolution */}
              <div className="flex flex-wrap justify-center items-center gap-x-1.5 sm:gap-x-2 text-base sm:text-lg md:text-xl font-sans font-normal tracking-tight leading-[1.7] text-[#475569] max-w-2xl mx-auto text-center">
                {lineGroups[5]?.words.map((item) => (
                  <PhilosophyWord
                    key={item.globalIndex}
                    word={item.word}
                    isAccent={item.isAccent}
                    isHeading={false}
                    globalIndex={item.globalIndex}
                    totalWords={totalWords}
                    scrollYProgress={scrollYProgress}
                    prefersReduced={prefersReduced}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3 Grounded Ethos Anchors */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto w-full text-left">
            {/* Anchor 1: Radical Warmth */}
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.05, ease: [0.23, 1, 0.32, 1] }}
            >
              <GlassCard
                variant="default"
                hoverEffect
                className="h-full p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5EFFF] text-[11px] font-mono font-bold uppercase tracking-wider text-[#6D28D9]">
                      <Heart className="w-3 h-3 text-[#6D28D9]" />
                      01 · Safe Space
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#6EC000]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#0B0B0B] mb-2 group-hover:text-[#6D28D9] transition-colors">
                    Radical Warmth & Empathy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    No countdown timers, no interruptions, zero shame. A cohort of 15 young people who truly get what stammering feels like.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Anchor 2: Speak On Your Own Terms */}
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <GlassCard
                variant="default"
                hoverEffect
                className="h-full p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5EFFF] text-[11px] font-mono font-bold uppercase tracking-wider text-[#6D28D9]">
                      <Volume2 className="w-3 h-3 text-[#6D28D9]" />
                      02 · Your Own Terms
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#6EC000]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#0B0B0B] mb-2 group-hover:text-[#6D28D9] transition-colors">
                    Never Promise a "Cure"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    We never say "fix your stammer". We give you tools, SLP coaching, and structured practice so you can speak without fear.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Anchor 3: Daily 20-Min Habit */}
            <motion.div
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <GlassCard
                variant="default"
                hoverEffect
                className="h-full p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5EFFF] text-[11px] font-mono font-bold uppercase tracking-wider text-[#6D28D9]">
                      <CalendarCheck className="w-3 h-3 text-[#6D28D9]" />
                      03 · 20 Mins Daily
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#6EC000]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#0B0B0B] mb-2 group-hover:text-[#6D28D9] transition-colors">
                    Daily Repetition & Live SLP
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    10 mins in the Zlaqa app and 10 mins in daily group meet turn your voice into a steady, reliable instrument.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Reassurance Seal Badge */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#6D28D9]/20 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#0B0B0B] font-semibold">
                {SITE_CONTENT.statement.footnote}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
