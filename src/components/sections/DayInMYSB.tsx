import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sun,
  Mic,
  Users,
  UserCheck,
  Leaf,
  Clock,
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
  Wind,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

// ── Complete Step Data Matching Reference Image ──
interface MomentData {
  id: string;
  badgeLabel: string;
  badgeIcon: React.ComponentType<{ className?: string }>;
  mainIcon: React.ComponentType<{ className?: string }>;
  image: string;
  imagePosition?: string;
  timeEstimate: string;
  metaTag: string;
  title: string;
  description: string;
  takeaways: { text: string; icon: React.ComponentType<{ className?: string }> }[];
  isRest?: boolean;
}

const MOMENTS: MomentData[] = [
  {
    id: 'step-01',
    badgeLabel: '01 MORNING HABIT',
    badgeIcon: Sun,
    mainIcon: Sun,
    image: '/assets/moment-01-vocal.jpg',
    imagePosition: 'object-[center_95%]',
    timeEstimate: '20 Mins',
    metaTag: 'Morning or Evening · App & Meet',
    title: 'Daily Practice Session',
    description: 'Gentle vocalization, diaphragmatic pacing, and warm-up exercises to ease into your day.',
    takeaways: [
      { text: 'Breathing & vocal warm-ups', icon: Wind },
      { text: 'Gentle onset practice', icon: Sparkles },
      { text: 'Pacing drills', icon: Activity },
    ],
  },
  {
    id: 'step-02',
    badgeLabel: '02 3-MIN AUDIO',
    badgeIcon: Mic,
    mainIcon: Mic,
    image: '/assets/moment-02-audio.jpg',
    imagePosition: 'object-center',
    timeEstimate: '3 Mins',
    metaTag: 'Image Prompt · Speech Evaluation',
    title: 'Daily Audio Recording',
    description: 'Record a short 3-minute audio on a given topic using the Zlaqa app to explore speech rhythm.',
    takeaways: [
      { text: 'Simple daily prompts', icon: Sparkles },
      { text: 'Build rhythm awareness', icon: Activity },
      { text: 'Track daily audio progress', icon: Mic },
    ],
  },
  {
    id: 'step-03',
    badgeLabel: '03 SAFE CIRCLE',
    badgeIcon: Users,
    mainIcon: Users,
    image: '/assets/moment-03-circle.jpg',
    imagePosition: 'object-[center_65%]',
    timeEstimate: 'Daily Group',
    metaTag: 'Google Meet · All 10 Peers',
    title: '"Daily Voice" Meet',
    description: 'Our daily safe circle to talk through how the day felt, discuss speaking blocks, celebrate wins, and bond with peers who get it.',
    takeaways: [
      { text: 'Zero pressure to be fluent', icon: ShieldCheck },
      { text: 'Active listening & empathy', icon: Users },
      { text: 'Shared peer support', icon: Heart },
    ],
  },
  {
    id: 'step-04',
    badgeLabel: '04 1-ON-1 SLP',
    badgeIcon: UserCheck,
    mainIcon: UserCheck,
    image: '/assets/moment-04-slp.jpg',
    imagePosition: 'object-[center_25%]',
    timeEstimate: '20–30 Mins',
    metaTag: 'Individual · Speech Pathologist',
    title: 'Weekly 1-on-1 Check-In',
    description: 'Your assigned Speech Language Pathologist reviews your audio, analyzes patterns, and offers personalized guidance.',
    takeaways: [
      { text: 'Personalized SLP review', icon: Activity },
      { text: 'Targeted fluency strategies', icon: Sparkles },
      { text: 'Practical next week steps', icon: Check },
    ],
  },
  {
    id: 'step-05',
    badgeLabel: '05 REST & RESET',
    badgeIcon: Leaf,
    mainIcon: Leaf,
    image: '/assets/moment-05-rest.jpg',
    imagePosition: 'object-[center_35%]',
    timeEstimate: 'Flexible',
    metaTag: 'Voice Rest & Recharge · Every Week',
    title: 'Sunday Reflection',
    description: 'A lighter day to reflect, recharge, and prepare for the week ahead. Rest your voice and let habits consolidate.',
    takeaways: [
      { text: 'Review weekly milestones', icon: Sparkles },
      { text: 'Set simple intentions', icon: Leaf },
      { text: 'Rest and vocal recharge', icon: Heart },
    ],
    isRest: true,
  },
];

export const DayInMYSB: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0); // Starts at Moment 01
  const activeStepIndexRef = useRef(0);
  activeStepIndexRef.current = activeStepIndex;
  const prefersReduced = useReducedMotion();

  // 3D Pointer Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 250 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardStageRef.current) return;
    const rect = cardStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isProgrammaticRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastStepChangeTimeRef = useRef<number>(0);
  const MIN_STEP_DWELL_MS = 400;

  const stepOffsets = [0.08, 0.28, 0.50, 0.72, 0.92];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isProgrammaticRef.current) {
      const targetOffset = stepOffsets[activeStepIndexRef.current];
      if (Math.abs(latest - targetOffset) <= 0.04) {
        isProgrammaticRef.current = false;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      }
      return;
    }

    const now = Date.now();
    const current = activeStepIndexRef.current;
    let candidate = current;

    if (current === 0) {
      if (latest >= 0.20) candidate = 1;
    } else if (current === 1) {
      if (latest < 0.15) candidate = 0;
      else if (latest >= 0.40) candidate = 2;
    } else if (current === 2) {
      if (latest < 0.35) candidate = 1;
      else if (latest >= 0.62) candidate = 3;
    } else if (current === 3) {
      if (latest < 0.57) candidate = 2;
      else if (latest >= 0.82) candidate = 4;
    } else if (current === 4) {
      if (latest < 0.77) candidate = 3;
    }

    if (candidate !== current) {
      if (now - lastStepChangeTimeRef.current < MIN_STEP_DWELL_MS) {
        return;
      }
      const next = candidate > current ? current + 1 : current - 1;
      lastStepChangeTimeRef.current = now;
      setActiveStepIndex(next);
      trackEvent('section_view', {
        section: 'daily_rhythm_step',
        step_number: `0${next + 1}`,
        step_title: MOMENTS[next].title,
      });
    }
  });

  useEffect(() => {
    const handleManualScroll = () => {
      if (isProgrammaticRef.current) {
        isProgrammaticRef.current = false;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      }
    };
    window.addEventListener('wheel', handleManualScroll, { passive: true });
    window.addEventListener('touchmove', handleManualScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleManualScroll);
      window.removeEventListener('touchmove', handleManualScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const clampedIndex = Math.max(0, Math.min(MOMENTS.length - 1, index));
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalScrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + stepOffsets[clampedIndex] * totalScrollableDistance;

    isProgrammaticRef.current = true;
    lastStepChangeTimeRef.current = Date.now();
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    setActiveStepIndex(clampedIndex);

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticRef.current = false;
    }, 800);

    window.scrollTo({ top: targetScrollY, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="daily-rhythm"
      ref={containerRef}
      className="relative h-[480vh] bg-[#F7F6F1] hairline-b select-none overflow-clip"
      aria-label="A Day in MYSB Daily Rhythm"
    >
      {/* ── Sticky 100vh Viewport Stage (Fitted Cleanly with Generous Top/Bottom Margin) ── */}
      <div className="sticky top-0 h-[100dvh] max-h-[100dvh] min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between [transform:translateZ(0)] pt-20 sm:pt-[82px] lg:pt-[86px] pb-4 sm:pb-5">



        <div className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ══ 1. Section Header ══ */}
          <div className="flex-shrink-0 flex flex-col items-center text-center">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 mb-2 font-mono text-xs font-bold tracking-widest text-teal-850 uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-850 flex-shrink-0" />
              <span>A Day in MYSB</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-extrabold text-ink-900 tracking-tight leading-[1.15]">
              Small daily commitments. <br className="hidden sm:block" />
              <span className="font-serif italic font-normal text-teal-900">
                Lasting speech transformation.
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-1.5 text-xs sm:text-[13.5px] text-ink-600 max-w-xl leading-relaxed hidden sm:block font-normal">
              Designed to fit seamlessly into school, college, or work routines without overwhelm.
            </p>
          </div>

          {/* ══ 2. 3D Fanned Coverflow Stage with Illustrated Artwork Cards ══ */}
          <div
            ref={cardStageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex-1 min-h-0 flex items-center justify-center py-2 [perspective:1400px] w-full"
          >
            {/* Flanking Floating Side Arrow Buttons */}
            <button
              type="button"
              disabled={activeStepIndex === 0}
              onClick={() => scrollToStep(activeStepIndex - 1)}
              aria-label="Previous Moment"
              className={cn(
                "hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full",
                "bg-white/95 backdrop-blur-xl border border-ink-900/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
                "items-center justify-center text-ink-700 hover:text-teal-900 hover:border-teal-700/40 hover:scale-110",
                "active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              disabled={activeStepIndex === MOMENTS.length - 1}
              onClick={() => scrollToStep(activeStepIndex + 1)}
              aria-label="Next Moment"
              className={cn(
                "hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full",
                "bg-white/95 backdrop-blur-xl border border-ink-900/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
                "items-center justify-center text-ink-700 hover:text-teal-900 hover:border-teal-700/40 hover:scale-110",
                "active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
              )}
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 3D Card Stack */}
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[420px] lg:max-w-[430px] grid grid-cols-1 grid-rows-1 [&>*]:col-start-1 [&>*]:row-start-1">
              {MOMENTS.map((moment, index) => {
                const isActive = activeStepIndex === index;
                const isRest = moment.isRest;
                const diff = index - activeStepIndex;
                const BadgeIcon = moment.badgeIcon;
                const MainIcon = moment.mainIcon;

                // 3D Fanning Parameters
                let xPos = '0%';
                let yPos = 0;
                let scaleVal = 1;
                let rotateZVal = 0;
                let rotateYVal = 0;
                let opacityVal = 1;
                let zIndexVal = 30;
                let filterVal = 'blur(0px)';
                let isClickable = true;

                if (diff === 0) {
                  // Center Active Hero Card
                  xPos = '0%';
                  yPos = 0;
                  scaleVal = 1;
                  rotateZVal = 0;
                  rotateYVal = 0;
                  opacityVal = 1;
                  zIndexVal = 30;
                  filterVal = 'blur(0px)';
                } else if (diff === 1) {
                  // Right Neighbor Card
                  xPos = '68%';
                  yPos = 16;
                  scaleVal = 0.88;
                  rotateZVal = 6;
                  rotateYVal = -8;
                  opacityVal = 0.82;
                  zIndexVal = 20;
                  filterVal = 'blur(0px)';
                } else if (diff === -1) {
                  // Left Neighbor Card
                  xPos = '-68%';
                  yPos = 16;
                  scaleVal = 0.88;
                  rotateZVal = -6;
                  rotateYVal = 8;
                  opacityVal = 0.82;
                  zIndexVal = 20;
                  filterVal = 'blur(0px)';
                } else if (diff === 2) {
                  // Far Right Card
                  xPos = '126%';
                  yPos = 32;
                  scaleVal = 0.78;
                  rotateZVal = 12;
                  rotateYVal = -14;
                  opacityVal = 0.50;
                  zIndexVal = 10;
                  filterVal = 'blur(0.5px)';
                } else if (diff === -2) {
                  // Far Left Card
                  xPos = '-126%';
                  yPos = 32;
                  scaleVal = 0.78;
                  rotateZVal = -12;
                  rotateYVal = 14;
                  opacityVal = 0.50;
                  zIndexVal = 10;
                  filterVal = 'blur(0.5px)';
                } else {
                  // Offscreen Cards
                  xPos = diff < 0 ? '-180%' : '180%';
                  yPos = 50;
                  scaleVal = 0.7;
                  rotateZVal = diff < 0 ? -16 : 16;
                  rotateYVal = diff < 0 ? 18 : -18;
                  opacityVal = 0;
                  zIndexVal = 0;
                  filterVal = 'blur(2px)';
                  isClickable = false;
                }

                return (
                  <motion.div
                    key={moment.id}
                    initial={false}
                    animate={{
                      opacity: opacityVal,
                      x: xPos,
                      y: yPos,
                      scale: scaleVal,
                      rotateY: rotateYVal,
                      rotateZ: rotateZVal,
                      filter: filterVal,
                    }}
                    style={{
                      zIndex: zIndexVal,
                      pointerEvents: isClickable ? 'auto' : 'none',
                    }}
                    transition={{
                      type: prefersReduced ? 'tween' : 'spring',
                      damping: 28,
                      stiffness: 160,
                      mass: 1.05,
                      duration: prefersReduced ? 0.3 : undefined,
                    }}
                    className="w-full will-change-[opacity,transform,filter]"
                  >
                    {/* Floating / Levitation Wrapper with 3D Pointer Tilt */}
                    <motion.div
                      style={prefersReduced || !isActive ? {} : {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        transformStyle: 'preserve-3d',
                      }}
                      animate={prefersReduced ? {} : (
                        isActive ? {
                          y: [0, -4, 0],
                        } : {
                          y: [0, -2, 0],
                        }
                      )}
                      transition={{
                        duration: isActive ? 6 : 7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                      className={cn(
                        "relative w-full transition-all duration-300",
                        !isActive && "cursor-pointer hover:scale-[1.02] hover:-translate-y-1 hover:opacity-100"
                      )}
                      onClick={() => {
                        if (!isActive) {
                          scrollToStep(index);
                        }
                      }}
                    >
                      {/* ── Card Container Matching Reference Mockup ── */}
                      <div className={cn(
                        "group relative overflow-hidden",
                        "rounded-[24px] sm:rounded-[26px]",
                        "bg-white border",
                        isActive
                          ? "shadow-[0_16px_38px_-8px_rgba(18,38,42,0.14)] border-teal-850/40"
                          : "shadow-[0_8px_24px_rgba(18,38,42,0.06)] border-[#DDE4DE]",
                        "flex flex-col justify-between",
                        "transition-all duration-300"
                      )}>
                        {/* ── Illustrated Header Banner ── */}
                        <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-cream-100 flex-shrink-0">
                          {/* Integrated Moment Badge */}
                          <div
                            className={cn(
                              "absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[9px] sm:text-[9.5px] font-bold tracking-wider uppercase border shadow-sm",
                              isRest
                                ? "bg-[#2A1B0E]/95 text-[#FBBF24] border-[#784618]/70"
                                : "bg-[#0B3529]/95 text-[#6EE7B7] border-[#1E604C]"
                            )}
                          >
                            <BadgeIcon className={cn("w-3 h-3", isRest ? "text-[#FBBF24]" : "text-[#34D399]")} />
                            <span>{moment.badgeLabel}</span>
                          </div>

                          <img
                            src={moment.image}
                            alt={moment.title}
                            className={cn(
                              "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                              moment.imagePosition || "object-center"
                            )}
                            loading="lazy"
                          />
                          {/* Soft Bottom Gradient Fade into Card Body */}
                          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/40 to-transparent" />
                        </div>

                        {/* ── Card Body Content ── */}
                        <div className="p-4 sm:p-5 pt-2 sm:pt-2.5 flex flex-col justify-between flex-1">

                          <div>
                            {/* Top Meta Line: Icon + Moment Count + Time Badge */}
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-xl bg-teal-900/10 border border-teal-800/15 flex items-center justify-center text-teal-800 flex-shrink-0 shadow-2xs">
                                  <MainIcon className="w-3.5 h-3.5 text-teal-800" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-800" />
                                    <span className="text-[9.5px] sm:text-[10px] font-mono font-bold tracking-wider text-teal-900 uppercase">
                                      MOMENT 0{index + 1} OF 05
                                    </span>
                                  </div>
                                  <span className="text-[10.5px] sm:text-[11px] text-[#556F66] font-medium truncate max-w-[150px] sm:max-w-[190px]">
                                    {moment.metaTag}
                                  </span>
                                </div>
                              </div>

                              {/* Time Capsule Badge */}
                              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ink-900/[0.04] border border-ink-900/[0.08] font-mono text-[10px] sm:text-[10.5px] font-semibold text-ink-800 flex-shrink-0 shadow-2xs">
                                <Clock className="w-3 h-3 text-teal-750" />
                                <span>{moment.timeEstimate}</span>
                              </div>
                            </div>

                            {/* Step Headline & Description */}
                            <h3 className="text-base sm:text-lg font-display font-extrabold text-ink-900 tracking-tight leading-snug mt-1.5">
                              {moment.title}
                            </h3>

                            <p className="mt-1 text-[11px] sm:text-xs text-[#526B63] leading-relaxed font-normal line-clamp-2">
                              {moment.description}
                            </p>
                          </div>

                          {/* Highlights Key Takeaways in Vertical Stack */}
                          <div className="mt-2.5 flex flex-col gap-1.5">
                            {moment.takeaways.map((takeaway, tIdx) => {
                              const ItemIcon = takeaway.icon;
                              return (
                                <div
                                  key={tIdx}
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAF8] border border-[#E3ECE6] text-[11px] sm:text-[11.5px] font-medium text-ink-800 hover:bg-white hover:border-teal-700/30 transition-colors shadow-2xs"
                                >
                                  <div className="w-4 h-4 rounded-full bg-teal-900/10 text-teal-800 flex items-center justify-center flex-shrink-0">
                                    <ItemIcon className="w-2.5 h-2.5 text-teal-800" />
                                  </div>
                                  <span className="leading-tight truncate">{takeaway.text}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Bottom Controls Bar: Step Dots + Prev/Next Buttons */}
                          <div className="mt-3 pt-2.5 border-t border-ink-900/[0.07] flex items-center justify-between">
                            {/* Progress step dots */}
                            <div className="flex items-center gap-1.5">
                              {MOMENTS.map((_, dotIdx) => (
                                <button
                                  key={dotIdx}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    scrollToStep(dotIdx);
                                  }}
                                  aria-label={`Jump to Moment 0${dotIdx + 1}`}
                                  className={cn(
                                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                                    dotIdx === index
                                      ? "w-6 bg-teal-800"
                                      : "w-1.5 bg-ink-900/20 hover:bg-ink-900/40"
                                  )}
                                />
                              ))}
                            </div>

                            {/* Prev / Next controls */}
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  scrollToStep(index - 1);
                                }}
                                aria-label="Previous Moment"
                                className="w-7 h-7 rounded-full border border-ink-900/15 bg-white text-ink-800 hover:bg-cream-50 hover:border-teal-700 hover:text-teal-900 active:scale-95 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center transition-all duration-150 shadow-2xs cursor-pointer focus-visible:outline-none"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={index === MOMENTS.length - 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  scrollToStep(index + 1);
                                }}
                                aria-label="Next Moment"
                                className="w-7 h-7 rounded-full border border-ink-900/15 bg-white text-ink-800 hover:bg-cream-50 hover:border-teal-700 hover:text-teal-900 active:scale-95 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center transition-all duration-150 shadow-2xs cursor-pointer focus-visible:outline-none"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


