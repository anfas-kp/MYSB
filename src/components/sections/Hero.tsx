import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import heroArtwork from '../../assets/image.png';

export interface HeroProps {
  onWatchVideoClick?: () => void;
}

export const Hero: React.FC<HeroProps> = (_props) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll-driven layered transition
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Content fades and gently lifts out as next section approaches
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, prefersReduced ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], [0, prefersReduced ? 0 : -45]);

  // Artwork parallax: moves slower than page scroll with subtle scale interpolation
  const artworkY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -32]);
  const artworkScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 1.03]);

  // Staggered load animation variants with refined studio easing
  const lineVariants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReduced ? 0 : custom * 0.12,
        duration: prefersReduced ? 0.2 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section 
      ref={heroRef}
      className="relative flex flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-16 overflow-hidden bg-[#F7F5EE] dark:bg-[#071B1C]"
    >
      {/* Desktop Atmospheric Hero Visual Layer with continuous scroll-linked motion and gentle organic drift */}
      <motion.div
        style={{ 
          y: artworkY, 
          scale: artworkScale,
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: prefersReduced ? 0.3 : 0.9, delay: prefersReduced ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute right-[-2vw] xl:right-[-1vw] top-[6%] lg:top-[8%] w-[82vw] xl:w-[80vw] 2xl:w-[78vw] max-w-[1900px] min-w-[1050px] pointer-events-none select-none z-1"
      >
        <motion.div 
          animate={prefersReduced ? {} : { y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          <img
            src={heroArtwork || '/assets/image.png'}
            alt="A supportive circle of young people practicing voice and speech together in MYSB"
            loading="eager"
            className="w-full h-auto object-contain max-h-[1150px] xl:max-h-[1250px] 2xl:max-h-[1400px] select-none pointer-events-none [mask-image:radial-gradient(ellipse_78%_75%_at_55%_48%,black_45%,rgba(0,0,0,0.85)_65%,rgba(0,0,0,0.25)_86%,transparent_100%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_8%,black_24%,black_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_8%,black_84%,rgba(0,0,0,0.6)_92%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_78%_75%_at_55%_48%,black_45%,rgba(0,0,0,0.85)_65%,rgba(0,0,0,0.25)_86%,transparent_100%),linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_8%,black_24%,black_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_8%,black_84%,rgba(0,0,0,0.6)_92%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('/assets/image.png')) {
                target.src = '/assets/image.png';
              }
            }}
          />
        </motion.div>
      </motion.div>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-center">
          {/* Left Column: Editorial Headline, CTAs & 4 Metrics with scroll fade */}
          <motion.div 
            style={{ 
              opacity: contentOpacity, 
              y: contentY 
            }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col items-start max-w-xl z-20"
          >
            {/* Editorial Cohort Kicker with live indicator */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="inline-flex items-center gap-2 mb-5 font-mono text-xs font-bold tracking-widest uppercase text-teal-850 dark:text-mint-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 animate-live-pulse" />
              <span>Cohort 01 · October 2026 · Applications Open</span>
            </motion.div>

            {/* Hero Headline with Strict Single-Line Accent */}
            <div className="overflow-hidden">
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="text-display-hero font-display font-extrabold text-ink-900 dark:text-cream-50 leading-[1.05] tracking-[-0.035em]"
              >
                <span className="block">Find your voice,</span>
                <span className="inline-block whitespace-nowrap font-serif italic font-normal text-teal-800 dark:text-mint-400 tracking-[-0.015em] pr-1">
                  one day at a time.
                </span>
              </motion.h1>
            </div>

            {/* Support Paragraph */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="mt-5 sm:mt-6 text-base sm:text-lg text-ink-700 dark:text-cream-200 leading-relaxed max-w-lg font-normal tracking-[-0.005em]"
            >
              An 8-week guided speech practice program for young people aged 15–30 who stammer — with daily practice, weekly SLP support and a small circle of people who understand.
            </motion.p>

            {/* CTAs Group */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Button
                href="#register"
                variant="coral"
                size="lg"
                trackingName="hero_join_primary"
                icon={<ArrowRight className="w-5 h-5" />}
                className="px-6 sm:px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-center justify-center w-full sm:w-auto shadow-sm"
              >
                Join the Program
              </Button>

              <a
                href="#daily-rhythm"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white dark:bg-teal-900/80 hover:bg-cream-50 dark:hover:bg-teal-800 text-ink-800 dark:text-cream-100 border border-ink-900/15 dark:border-cream-100/15 shadow-2xs transition-[transform,background-color,border-color] duration-150 ease-out text-sm sm:text-base font-semibold active:scale-[0.97] [@media(hover:hover)]:hover:-translate-y-[1.5px] text-center w-full sm:w-auto"
              >
                <span>Explore A Day in MYSB</span>
                <ArrowDown className="w-4 h-4 text-ink-600 dark:text-cream-300" />
              </a>
            </motion.div>

            {/* 4 Bottom Horizontal Metrics in Plain Text with tactile hover interaction */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-xl pt-6 border-t border-ink-900/[0.08] dark:border-cream-100/10"
            >
              {/* Metric 1: Age */}
              <div className="flex flex-col group cursor-default transition-transform duration-160 ease-out hover:-translate-y-0.5">
                <span className="text-lg sm:text-xl font-display font-extrabold text-ink-900 dark:text-cream-50 leading-none group-hover:text-teal-900 transition-colors">
                  15–30
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-cream-400 mt-1 font-semibold">
                  Age range
                </span>
              </div>

              {/* Metric 2: Duration */}
              <div className="flex flex-col group cursor-default transition-transform duration-160 ease-out hover:-translate-y-0.5">
                <span className="text-lg sm:text-xl font-display font-extrabold text-ink-900 dark:text-cream-50 leading-none group-hover:text-teal-900 transition-colors">
                  8 Weeks
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-cream-400 mt-1 font-semibold">
                  Duration
                </span>
              </div>

              {/* Metric 3: Cohort */}
              <div className="flex flex-col group cursor-default transition-transform duration-160 ease-out hover:-translate-y-0.5">
                <span className="text-lg sm:text-xl font-display font-extrabold text-teal-850 dark:text-mint-400 leading-none group-hover:text-teal-700 transition-colors">
                  10 Seats
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-cream-400 mt-1 font-semibold">
                  Strict cap
                </span>
              </div>

              {/* Metric 4: Fee */}
              <div className="flex flex-col group cursor-default transition-transform duration-160 ease-out hover:-translate-y-0.5">
                <span className="text-lg sm:text-xl font-display font-extrabold text-coral-600 dark:text-coral-400 leading-none group-hover:text-coral-500 transition-colors">
                  ₹199
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-coral-600/80 dark:text-coral-400/80 mt-1 font-semibold">
                  Program fee
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile / Tablet In-flow Illustration (below CTA & stats) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block lg:hidden mt-8 w-full max-w-xl mx-auto flex items-center justify-center relative"
          >
            <img
              src={heroArtwork || '/assets/image.png'}
              alt="A supportive circle of young people practicing voice and speech together in MYSB"
              loading="eager"
              className="w-full h-auto object-contain select-none pointer-events-none [mask-image:radial-gradient(ellipse_85%_80%_at_50%_50%,black_50%,rgba(0,0,0,0.85)_72%,rgba(0,0,0,0.2)_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_5%,black_92%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_85%_80%_at_50%_50%,black_50%,rgba(0,0,0,0.85)_72%,rgba(0,0,0,0.2)_90%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_5%,black_92%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/assets/image.png')) {
                  target.src = '/assets/image.png';
                }
              }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

