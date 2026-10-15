import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  Image as ImageIcon,
  UserCheck,
  Users,
  Wind,
  MessageSquare,
  Activity,
  Presentation,
  TrendingUp,
  Zap,
  Compass,
  Heart,
  Trophy,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/utils';

// ─── TYPES & DATA DEFINITIONS ──────────────────────────────────────────────────

interface MilestoneCardData {
  tag: string;
  badgeRight?: string;
  icon: React.ElementType;
  title: string;
  description: string;
  isAudio?: boolean;
}

interface ChapterData {
  id: string;
  stepNumber: string;
  actLabel: string;
  weekRange: string;
  timelineLabel: string;
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  storySentence: string;
  scriptPhraseLine1: string;
  scriptPhraseLine2: string;
  scriptPhraseLine3: string;
  heroImage: string;
  theme: 'teal' | 'sky' | 'indigo' | 'amber';
  transformationText: string;
  milestones: MilestoneCardData[];
}

const CHAPTERS: ChapterData[] = [
  {
    id: 'act-1',
    stepNumber: '01',
    actLabel: 'ACT I',
    weekRange: 'WEEKS 1-2',
    timelineLabel: 'Foundation',
    badge: 'ONLINE',
    headlineLine1: 'Voice Habit &',
    headlineLine2: 'Safe Foundations',
    storySentence:
      'The transformation begins in quiet courage. Before speaking in public, you build private muscle memory in the MYSB app and establish your baseline in a safe, zero-judgment circle.',
    scriptPhraseLine1: 'Small Steps',
    scriptPhraseLine2: 'Brighter',
    scriptPhraseLine3: 'Voices',
    heroImage: '/assets/journey-act-1.jpg',
    theme: 'teal',
    transformationText:
      'Removing initial speaking anxiety by normalizing your natural voice in private daily repetition.',
    milestones: [
      {
        tag: 'DAILY AUDIO',
        badgeRight: '3 min/day',
        icon: Mic,
        title: '3-Min Voice Practice',
        description: 'Private daily habit in app',
        isAudio: true,
      },
      {
        tag: 'MYSB APP',
        icon: ImageIcon,
        title: 'Spontaneous Prompts',
        description: 'Warm-up speaking prompts',
      },
      {
        tag: '1-ON-1 SLP',
        icon: UserCheck,
        title: 'Clinical Baseline',
        description: 'Initial speech assessment',
      },
      {
        tag: 'PEER CIRCLE',
        icon: Users,
        title: 'Safe Peer Space',
        description: 'Circle of people who understand',
      },
    ],
  },
  {
    id: 'act-2',
    stepNumber: '02',
    actLabel: 'ACT II',
    weekRange: 'WEEKS 3-4',
    timelineLabel: 'Practice',
    badge: 'ONLINE',
    headlineLine1: 'Structured Practice',
    headlineLine2: '& Real Conversations',
    storySentence:
      'You move from simple exercises to short real-life conversations. With guided practice and feedback, you start noticing smoother speech and better control in everyday situations.',
    scriptPhraseLine1: 'Practice Today',
    scriptPhraseLine2: 'Progress',
    scriptPhraseLine3: 'Tomorrow',
    heroImage: '/assets/journey-act-2.jpg',
    theme: 'sky',
    transformationText:
      'Developing speaking control and confidence through consistent, guided practice.',
    milestones: [
      {
        tag: 'GUIDED EXERCISES',
        icon: Wind,
        title: 'Breathing & Flow Drills',
        description: 'Proven speech techniques',
      },
      {
        tag: 'INTERACTIVE TASKS',
        icon: MessageSquare,
        title: 'Real-Life Scenarios',
        description: 'Practice for daily situations',
      },
      {
        tag: 'AI FEEDBACK',
        icon: Activity,
        title: 'Speech Insights',
        description: 'Instant, personalized feedback',
      },
      {
        tag: 'PEER PRACTICE',
        icon: Users,
        title: 'Live Practice Circle',
        description: 'Supportive group sessions',
      },
    ],
  },
  {
    id: 'act-3',
    stepNumber: '03',
    actLabel: 'ACT III',
    weekRange: 'WEEKS 5-6',
    timelineLabel: 'Confidence',
    badge: 'ONLINE',
    headlineLine1: 'Confidence in',
    headlineLine2: 'Real Environments',
    storySentence:
      'You apply your skills in more challenging situations — school, work, and social settings. With continuous feedback and peer support, you learn to stay calm and speak freely.',
    scriptPhraseLine1: 'Real Voices',
    scriptPhraseLine2: 'Real',
    scriptPhraseLine3: 'Progress',
    heroImage: '/assets/journey-act-3.jpg',
    theme: 'indigo',
    transformationText:
      'Gaining confidence and fluency in real-world environments with ongoing support and feedback.',
    milestones: [
      {
        tag: 'SITUATION PRACTICE',
        icon: Presentation,
        title: 'School & Work Scenarios',
        description: 'Real-world speaking',
      },
      {
        tag: 'AI ANALYSIS',
        icon: TrendingUp,
        title: 'Detailed Progress',
        description: 'Track fluency improvements',
      },
      {
        tag: 'PEER SESSIONS',
        icon: Users,
        title: 'Group Discussions',
        description: 'Build social confidence',
      },
      {
        tag: 'CLINICAL SUPPORT',
        icon: UserCheck,
        title: 'Expert Guidance',
        description: 'Personalized recommendations',
      },
    ],
  },
  {
    id: 'act-4',
    stepNumber: '04',
    actLabel: 'ACT IV',
    weekRange: 'WEEKS 7-8',
    timelineLabel: 'Independence',
    badge: 'ONLINE',
    headlineLine1: 'Independence',
    headlineLine2: '& Lifelong Skills',
    storySentence:
      'You consolidate your progress and build lifelong habits. You now have the tools, confidence, and support network to continue speaking freely beyond the program.',
    scriptPhraseLine1: 'A Brighter',
    scriptPhraseLine2: 'You',
    scriptPhraseLine3: 'Ahead',
    heroImage: '/assets/journey-act-4.jpg',
    theme: 'amber',
    transformationText:
      'Becoming an independent, confident speaker with lifelong skills and a supportive community by your side.',
    milestones: [
      {
        tag: 'ADVANCED PRACTICE',
        icon: Zap,
        title: 'Independent Speaking',
        description: 'Apply skills confidently',
      },
      {
        tag: 'LONG-TERM PLAN',
        icon: Compass,
        title: 'Personal Growth Plan',
        description: 'Maintain your progress',
      },
      {
        tag: 'COMMUNITY',
        icon: Heart,
        title: 'Lifelong Peer Support',
        description: 'Stay connected',
      },
      {
        tag: 'GRADUATION',
        icon: Trophy,
        title: 'Celebrate Progress',
        description: 'Your next beginning',
      },
    ],
  },
];

// ─── THEME TOKENS MATCHING REFERENCE MOCKUP ────────────────────────────────────

const THEME_STYLES = {
  teal: {
    sectionBg: 'bg-[#EDF5F0]',
    ambientRadial:
      'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(20, 184, 166, 0.16) 0%, transparent 65%)',
    ambientGlow: 'rgba(20, 184, 166, 0.22)',
    vignetteColor: '#EDF5F0',
    metaText: 'text-[#1B4D3E]',
    metaDot: 'bg-[#10B981]',
    watermarkText: 'text-[#0C2E25]/[0.08]',
    headlineText: 'text-[#0C241D]',
    narrativeText: 'text-[#3E5B52]',
    scriptText: 'text-[#165646]',
    soundwaveStroke: '#14B8A6',
    // Timeline
    timelineActiveCircle: 'bg-[#0B3529] text-white shadow-sm ring-4 ring-[#0B3529]/15',
    timelineInactiveCircle: 'border border-[#0B3529]/25 text-[#0B3529]/75 bg-white/70 hover:bg-white',
    timelineActiveText: 'text-[#0B3529] font-bold',
    timelineInactiveText: 'text-[#4F685F]',
    timelineLine: 'bg-[#0B3529]/20',
    // Milestone cards
    cardBg: 'bg-white/95 backdrop-blur-md',
    cardBorder: 'border-black/[0.06] hover:border-[#0B3529]/25',
    cardShadow: 'shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(11,53,41,0.08)]',
    cardTag: 'bg-[#E5F2EB] text-[#0B3529]',
    cardIconBg: 'bg-[#E5F2EB] text-[#0B3529]',
    cardTitle: 'text-[#0C241D]',
    cardSubtitle: 'text-[#556F66]',
    // Transformation
    transBg: 'bg-[#E2EFE7] border border-[#0B3529]/15 text-[#0C241D]',
    transBadge: 'bg-[#0B3529] text-white',
    transText: 'text-[#0C2E25]',
    // Prev / Next controls
    prevBtn:
      'border border-[#0B3529]/25 text-[#0B3529] bg-white hover:bg-cream-50 active:scale-95 disabled:opacity-20 disabled:pointer-events-none',
    nextBtn:
      'bg-[#0B3529] text-white hover:bg-[#124B3C] active:scale-95 shadow-sm',
  },
  sky: {
    sectionBg: 'bg-[#E2F1F9]',
    ambientRadial:
      'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(14, 165, 233, 0.16) 0%, transparent 65%)',
    ambientGlow: 'rgba(14, 165, 233, 0.22)',
    vignetteColor: '#E2F1F9',
    metaText: 'text-[#124B73]',
    metaDot: 'bg-[#0284C7]',
    watermarkText: 'text-[#0E2E4E]/[0.08]',
    headlineText: 'text-[#0A263E]',
    narrativeText: 'text-[#38566E]',
    scriptText: 'text-[#124C73]',
    soundwaveStroke: '#0284C7',
    // Timeline
    timelineActiveCircle: 'bg-[#0E2E4E] text-white shadow-sm ring-4 ring-[#0E2E4E]/15',
    timelineInactiveCircle: 'border border-[#0E2E4E]/25 text-[#0E2E4E]/75 bg-white/70 hover:bg-white',
    timelineActiveText: 'text-[#0E2E4E] font-bold',
    timelineInactiveText: 'text-[#50687C]',
    timelineLine: 'bg-[#0E2E4E]/20',
    // Milestone cards
    cardBg: 'bg-white/95 backdrop-blur-md',
    cardBorder: 'border-black/[0.06] hover:border-[#0E2E4E]/25',
    cardShadow: 'shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(14,46,78,0.08)]',
    cardTag: 'bg-[#DDEEF8] text-[#0E2E4E]',
    cardIconBg: 'bg-[#DDEEF8] text-[#0E2E4E]',
    cardTitle: 'text-[#0A263E]',
    cardSubtitle: 'text-[#4E6B82]',
    // Transformation
    transBg: 'bg-[#D8ECF8] border border-[#0E2E4E]/15 text-[#0A263E]',
    transBadge: 'bg-[#0E2E4E] text-white',
    transText: 'text-[#092842]',
    // Prev / Next controls
    prevBtn:
      'border border-[#0E2E4E]/25 text-[#0E2E4E] bg-white hover:bg-cream-50 active:scale-95 disabled:opacity-20 disabled:pointer-events-none',
    nextBtn:
      'bg-[#0E2E4E] text-white hover:bg-[#184874] active:scale-95 shadow-sm',
  },
  indigo: {
    sectionBg: 'bg-[#373066]',
    ambientRadial:
      'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(167, 139, 250, 0.25) 0%, transparent 65%)',
    ambientGlow: 'rgba(167, 139, 250, 0.30)',
    vignetteColor: '#373066',
    metaText: 'text-[#C9C2EB]',
    metaDot: 'bg-[#A78BFA]',
    watermarkText: 'text-white/[0.12]',
    headlineText: 'text-white',
    narrativeText: 'text-[#D2CCEC]',
    scriptText: 'text-[#E0DBFF]',
    soundwaveStroke: '#C4B5FD',
    // Timeline
    timelineActiveCircle: 'bg-[#5F4EBE] text-white shadow-sm ring-4 ring-white/25 border border-white/40',
    timelineInactiveCircle: 'border border-white/30 text-white/80 bg-white/10 hover:bg-white/20',
    timelineActiveText: 'text-white font-bold',
    timelineInactiveText: 'text-[#B8B1DA]',
    timelineLine: 'bg-white/25',
    // Milestone cards (clean white cards contrasting on deep indigo)
    cardBg: 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.22)]',
    cardBorder: 'border-white/10 hover:border-white/40',
    cardShadow: 'shadow-[0_8px_24px_rgba(0,0,0,0.20)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.30)]',
    cardTag: 'bg-[#EDE9FE] text-[#4338CA]',
    cardIconBg: 'bg-[#EDE9FE] text-[#4F46E5]',
    cardTitle: 'text-[#1E1B4B]',
    cardSubtitle: 'text-[#5C568A]',
    // Transformation
    transBg: 'bg-white/12 border border-white/20 text-white backdrop-blur-md',
    transBadge: 'bg-[#5F4EBE] text-white border border-white/30',
    transText: 'text-[#F1EFFF]',
    // Prev / Next controls
    prevBtn:
      'border border-white/30 text-white bg-white/10 hover:bg-white/20 active:scale-95 disabled:opacity-20 disabled:pointer-events-none',
    nextBtn:
      'bg-[#5F4EBE] text-white hover:bg-[#7261D1] active:scale-95 border border-white/30 shadow-sm',
  },
  amber: {
    sectionBg: 'bg-[#FCEBD8]',
    ambientRadial:
      'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(245, 158, 11, 0.20) 0%, transparent 65%)',
    ambientGlow: 'rgba(245, 158, 11, 0.25)',
    vignetteColor: '#FCEBD8',
    metaText: 'text-[#7C400C]',
    metaDot: 'bg-[#F59E0B]',
    watermarkText: 'text-[#3D1E06]/[0.08]',
    headlineText: 'text-[#2D1603]',
    narrativeText: 'text-[#5C3B22]',
    scriptText: 'text-[#964E11]',
    soundwaveStroke: '#F59E0B',
    // Timeline
    timelineActiveCircle: 'bg-[#3D1E06] text-white shadow-sm ring-4 ring-[#3D1E06]/15',
    timelineInactiveCircle: 'border border-[#3D1E06]/25 text-[#3D1E06]/75 bg-white/70 hover:bg-white',
    timelineActiveText: 'text-[#3D1E06] font-bold',
    timelineInactiveText: 'text-[#70523C]',
    timelineLine: 'bg-[#3D1E06]/20',
    // Milestone cards
    cardBg: 'bg-white/95 backdrop-blur-md',
    cardBorder: 'border-black/[0.06] hover:border-[#3D1E06]/25',
    cardShadow: 'shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(61,30,6,0.08)]',
    cardTag: 'bg-[#FDEBD8] text-[#7C400C]',
    cardIconBg: 'bg-[#FDEBD8] text-[#8C4708]',
    cardTitle: 'text-[#2D1603]',
    cardSubtitle: 'text-[#684C36]',
    // Transformation
    transBg: 'bg-[#F8E2CD] border border-[#3D1E06]/15 text-[#2D1603]',
    transBadge: 'bg-[#3D1E06] text-white',
    transText: 'text-[#361904]',
    // Prev / Next controls
    prevBtn:
      'border border-[#3D1E06]/25 text-[#3D1E06] bg-white hover:bg-cream-50 active:scale-95 disabled:opacity-20 disabled:pointer-events-none',
    nextBtn:
      'bg-[#FF765F] text-white hover:bg-[#F2644D] active:scale-95 shadow-sm',
  },
};

// ─── DECORATIVE SOUNDWAVE SVG COMPONENT ────────────────────────────────────────

const SoundwaveGraphic: React.FC<{ strokeColor: string; className?: string }> = ({
  strokeColor,
  className,
}) => (
  <svg
    className={cn('w-28 sm:w-36 h-12 select-none pointer-events-none opacity-80', className)}
    viewBox="0 0 140 48"
    fill="none"
    aria-hidden="true"
  >
    <line x1="10" y1="20" x2="10" y2="28" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="18" y1="16" x2="18" y2="32" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="26" y1="12" x2="26" y2="36" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="34" y1="8" x2="34" y2="40" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="42" y1="14" x2="42" y2="34" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="18" x2="50" y2="30" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="58" y1="6" x2="58" y2="42" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="66" y1="10" x2="66" y2="38" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="74" y1="4" x2="74" y2="44" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="82" y1="12" x2="82" y2="36" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="90" y1="16" x2="90" y2="32" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="98" y1="8" x2="98" y2="40" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="106" y1="14" x2="106" y2="34" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="114" y1="20" x2="114" y2="28" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="122" y1="16" x2="122" y2="32" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="130" y1="22" x2="130" y2="26" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export const Journey: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [activeChapterId, setActiveChapterId] = useState<string>('act-1');

  // Smooth scroll handler targeting chapter section anchors
  const scrollToChapter = useCallback(
    (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      el.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
      trackEvent('cta_click', {
        cta_name: `journey_nav_${targetId}`,
        destination: targetId,
      });
    },
    [prefersReduced]
  );

  // IntersectionObserver to sync the active chapter indicator accurately
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveChapterId(entry.target.id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.15,
    });

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="journey" className="relative w-full selection:bg-teal-900 selection:text-white">
      {/* ══ CHAPTER SECTIONS (ACTS I, II, III, IV) ══ */}
      {CHAPTERS.map((chapter, chapterIndex) => {
        const theme = THEME_STYLES[chapter.theme];
        const isDark = chapter.theme === 'indigo';
        const isFirst = chapterIndex === 0;
        const isLast = chapterIndex === CHAPTERS.length - 1;
        const prevId = isFirst ? null : CHAPTERS[chapterIndex - 1].id;
        const nextId = isLast ? 'daily-rhythm' : CHAPTERS[chapterIndex + 1].id;

        return (
          <section
            key={chapter.id}
            id={chapter.id}
            aria-label={`${chapter.actLabel} — ${chapter.headlineLine1} ${chapter.headlineLine2}`}
            className={cn(
              'relative w-full py-12 sm:py-14 lg:py-16 px-5 sm:px-8 lg:px-12 xl:px-16',
              'scroll-mt-20 sm:scroll-mt-24',
              'transition-colors duration-500 overflow-hidden',
              theme.sectionBg
            )}
          >
            {/* Ambient Background Radial Glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: theme.ambientRadial }}
            />

            {/* Content Container (Two-region: Left Timeline + Main Content) */}
            <div className="relative z-10 max-w-[1440px] mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr] xl:grid-cols-[190px_1fr] gap-6 lg:gap-8 xl:gap-12 items-start">

                {/* ══ 1. PERSISTENT LEFT CURRICULUM TIMELINE (DESKTOP) ══ */}
                <aside
                  aria-label="Curriculum Navigation Timeline"
                  className="hidden lg:flex flex-col sticky top-28 pt-1 select-none"
                >
                  <div className="flex flex-col space-y-6 xl:space-y-7 relative">
                    {CHAPTERS.map((c, idx) => {
                      const isActive = activeChapterId === c.id;
                      const isLastNode = idx === CHAPTERS.length - 1;

                      return (
                        <div key={c.id} className="relative flex items-start group">
                          {/* Connecting vertical line */}
                          {!isLastNode && (
                            <div
                              aria-hidden="true"
                              className={cn(
                                'absolute left-4.5 top-9 w-[1.5px] h-9 xl:h-10 -ml-[0.75px]',
                                theme.timelineLine
                              )}
                            />
                          )}

                          {/* Interactive Step Node */}
                          <button
                            type="button"
                            onClick={() => scrollToChapter(c.id)}
                            className="flex items-center gap-3 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-lg p-0.5"
                            aria-label={`Jump to ${c.actLabel}: ${c.timelineLabel}`}
                          >
                            {/* Circle Node */}
                            <span
                              className={cn(
                                'w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 transition-all duration-200',
                                isActive
                                  ? theme.timelineActiveCircle
                                  : theme.timelineInactiveCircle
                              )}
                            >
                              {c.stepNumber}
                            </span>

                            {/* Label: Week range + Act title */}
                            <div className="flex flex-col min-w-0">
                              <span
                                className={cn(
                                  'text-[10px] font-mono font-bold tracking-wider uppercase leading-tight',
                                  isActive
                                    ? theme.timelineActiveText
                                    : theme.timelineInactiveText
                                )}
                              >
                                {c.weekRange.replace('WEEKS ', 'Weeks ')}
                              </span>
                              <span
                                className={cn(
                                  'text-xs font-semibold leading-tight mt-0.5',
                                  isActive
                                    ? theme.timelineActiveText
                                    : theme.timelineInactiveText
                                )}
                              >
                                {c.timelineLabel}
                              </span>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </aside>

                {/* ══ 2. MAIN REGION: CHAPTER EDITORIAL STAGE ══ */}
                <div className="flex flex-col w-full">

                  {/* ── TWO-COLUMN HERO: UNIFIED TEXT COMPOSITION (LEFT) & BLENDED ARTWORK (RIGHT) ── */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-10 xl:gap-12 items-center">

                    {/* Left: Metadata + Integrated Watermark + Heading + Description */}
                    <div className="relative flex flex-col justify-center min-w-0 max-w-xl xl:max-w-2xl">

                      {/* Chapter Metadata Row */}
                      <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                        <span
                          className={cn(
                            'text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2',
                            theme.metaText
                          )}
                        >
                          <span>{chapter.actLabel}</span>
                          <span className="opacity-40">•</span>
                          <span>{chapter.weekRange}</span>
                          <span className="opacity-40">•</span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className={cn('w-2 h-2 rounded-full animate-pulse', theme.metaDot)} />
                            <span>{chapter.badge}</span>
                          </span>
                        </span>

                        {/* Mobile Stepper Indicator (< lg) */}
                        <div className="lg:hidden flex items-center gap-1.5">
                          {CHAPTERS.map((c, dotIdx) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => scrollToChapter(c.id)}
                              aria-label={`Jump to Act 0${dotIdx + 1}`}
                              className={cn(
                                'h-1.5 rounded-full transition-all duration-200 cursor-pointer',
                                activeChapterId === c.id
                                  ? 'w-6 bg-teal-800'
                                  : 'w-1.5 bg-black/20 dark:bg-white/30'
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Heading Block with Integrated Watermark in Depth Layer */}
                      <div className="relative">
                        {/* Oversized Translucent Chapter Number Watermark */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            'absolute -left-2 sm:-left-6 -top-10 sm:-top-14 select-none pointer-events-none -z-10',
                            'font-display font-black tracking-[-0.08em] leading-none',
                            'text-[clamp(7.5rem,13vw,12.5rem)]',
                            theme.watermarkText
                          )}
                        >
                          {chapter.stepNumber}
                        </div>

                        {/* Bold Editorial Headline (2 Lines) */}
                        <h2
                          className={cn(
                            'font-display font-black tracking-[-0.035em] leading-[1.08] [text-wrap:balance]',
                            'text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px]',
                            theme.headlineText
                          )}
                        >
                          <span>{chapter.headlineLine1}</span>
                          <br />
                          <span>{chapter.headlineLine2}</span>
                        </h2>

                        {/* Supporting Narrative Paragraph (16-24px below heading) */}
                        <p
                          className={cn(
                            'text-sm sm:text-[15px] lg:text-base leading-relaxed font-normal mt-4 sm:mt-5 max-w-lg xl:max-w-xl [text-wrap:balance]',
                            theme.narrativeText
                          )}
                        >
                          {chapter.storySentence}
                        </p>
                      </div>

                    </div>

                    {/* Right: Softly Blended Portrait Artwork with Calligraphy & Waveform */}
                    <div className="relative flex items-center justify-center lg:justify-end mt-2 lg:mt-0">
                      <div className="relative w-64 sm:w-72 md:w-80 lg:w-[320px] xl:w-[350px] h-56 sm:h-64 lg:h-[270px] xl:h-[290px]">

                        {/* Ambient behind-image glow matching chapter palette */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 rounded-[32px] blur-2xl pointer-events-none opacity-40 scale-105"
                          style={{ background: theme.ambientGlow }}
                        />

                        {/* Softly Blended Rounded-Rect Portrait with Vignette Edge Masks */}
                        <div
                          className="relative w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden select-none pointer-events-none"
                          style={{
                            maskImage:
                              'radial-gradient(ellipse 95% 85% at 50% 45%, black 60%, rgba(0,0,0,0.85) 80%, transparent 100%)',
                            WebkitMaskImage:
                              'radial-gradient(ellipse 95% 85% at 50% 45%, black 60%, rgba(0,0,0,0.85) 80%, transparent 100%)',
                          }}
                        >
                          <img
                            src={chapter.heroImage}
                            alt=""
                            className="w-full h-full object-cover object-top scale-105"
                            loading="lazy"
                          />
                          {/* Soft bottom edge fade into chapter background */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                            style={{
                              background: `linear-gradient(to top, ${theme.vignetteColor} 0%, transparent 100%)`,
                            }}
                          />
                          {/* Soft left edge fade into chapter background */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-12 pointer-events-none"
                            style={{
                              background: `linear-gradient(to right, ${theme.vignetteColor} 0%, transparent 100%)`,
                            }}
                          />
                        </div>

                        {/* Free-floating Calligraphy Script Accent in top right */}
                        <div
                          aria-hidden="true"
                          className="absolute -top-1 sm:-top-2 right-1 sm:-right-3 text-right select-none pointer-events-none z-20"
                        >
                          <span
                            className={cn(
                              'font-serif italic font-normal text-sm sm:text-base lg:text-[17px] leading-[1.15] block drop-shadow-xs',
                              theme.scriptText
                            )}
                          >
                            {chapter.scriptPhraseLine1}
                          </span>
                          <span
                            className={cn(
                              'font-serif italic font-normal text-sm sm:text-base lg:text-[17px] leading-[1.15] block drop-shadow-xs',
                              theme.scriptText
                            )}
                          >
                            {chapter.scriptPhraseLine2}
                          </span>
                          <span
                            className={cn(
                              'font-serif italic font-normal text-sm sm:text-base lg:text-[17px] leading-[1.15] block drop-shadow-xs',
                              theme.scriptText
                            )}
                          >
                            {chapter.scriptPhraseLine3}
                          </span>
                        </div>

                        {/* Decorative Soundwave Graphic integrated near the image */}
                        <div
                          aria-hidden="true"
                          className="absolute -bottom-2 -right-4 sm:-right-8 pointer-events-none z-10"
                        >
                          <SoundwaveGraphic strokeColor={theme.soundwaveStroke} />
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* ── 3. FOUR ALIGNED MILESTONE CARDS (ROW) ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 xl:gap-4 w-full mt-7 sm:mt-8 lg:mt-9">
                    {chapter.milestones.map((card, mIdx) => {
                      const CardIcon = card.icon;

                      return (
                        <motion.div
                          key={mIdx}
                          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
                          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-30px' }}
                          transition={{ duration: 0.3, delay: mIdx * 0.04 }}
                          className={cn(
                            'group relative rounded-2xl p-4 sm:p-4.5',
                            'border flex flex-col justify-between h-full min-h-[105px]',
                            'transition-all duration-200 ease-out select-none',
                            theme.cardBg,
                            theme.cardBorder,
                            theme.cardShadow
                          )}
                        >
                          {/* Card Header: Category Tag + Audio/Badge */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span
                              className={cn(
                                'text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md leading-none',
                                theme.cardTag
                              )}
                            >
                              {card.tag}
                            </span>

                            {/* Optional Right Duration/Audio indicator */}
                            {card.badgeRight && (
                              <div className="flex items-center gap-1">
                                {card.isAudio && (
                                  <div
                                    className="flex items-end gap-[1.5px] h-2.5 mr-0.5"
                                    aria-hidden="true"
                                  >
                                    <span className="w-[1.5px] h-1.5 bg-emerald-600 rounded-full animate-pulse" />
                                    <span
                                      className="w-[1.5px] h-2.5 bg-emerald-700 rounded-full animate-pulse"
                                      style={{ animationDelay: '150ms' }}
                                    />
                                    <span
                                      className="w-[1.5px] h-1 bg-emerald-600 rounded-full animate-pulse"
                                      style={{ animationDelay: '300ms' }}
                                    />
                                  </div>
                                )}
                                <span className="text-[9px] font-mono font-medium text-ink-600">
                                  {card.badgeRight}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Card Body: Icon + Title + Description */}
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs',
                                theme.cardIconBg
                              )}
                            >
                              <CardIcon className="w-4 h-4 stroke-[2.2]" />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <h3
                                className={cn(
                                  'font-bold text-[13px] sm:text-sm leading-snug tracking-[-0.01em]',
                                  theme.cardTitle
                                )}
                              >
                                {card.title}
                              </h3>
                              <p
                                className={cn(
                                  'text-[11px] sm:text-[11.5px] mt-0.5 leading-snug line-clamp-2',
                                  theme.cardSubtitle
                                )}
                              >
                                {card.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* ── 4. TRANSFORMATION SUMMARY BANNER + CHAPTER NAVIGATION ── */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mt-7 sm:mt-8 w-full">
                    {/* The Transformation Summary Pill */}
                    <div
                      className={cn(
                        'flex-1 flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl backdrop-blur-md',
                        theme.transBg
                      )}
                    >
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs',
                          theme.transBadge
                        )}
                      >
                        <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>

                      <span
                        className={cn(
                          'text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md whitespace-nowrap',
                          theme.transBadge
                        )}
                      >
                        THE TRANSFORMATION
                      </span>

                      <div
                        aria-hidden="true"
                        className={cn(
                          'h-4 w-px hidden sm:block flex-shrink-0',
                          isDark ? 'bg-white/20' : 'bg-black/10'
                        )}
                      />

                      <p
                        className={cn(
                          'text-xs sm:text-[12.5px] font-medium leading-snug [text-wrap:balance]',
                          theme.transText
                        )}
                      >
                        {chapter.transformationText}
                      </p>
                    </div>

                    {/* Previous / Next Chapter Controls */}
                    <div className="flex items-center gap-2.5 self-end sm:self-center flex-shrink-0">
                      {/* Previous Chapter Button */}
                      <button
                        type="button"
                        disabled={isFirst}
                        onClick={() => prevId && scrollToChapter(prevId)}
                        aria-label={`Go to ${isFirst ? 'start' : CHAPTERS[chapterIndex - 1].actLabel}`}
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700',
                          theme.prevBtn
                        )}
                      >
                        <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                      </button>

                      {/* Next Chapter Button */}
                      <button
                        type="button"
                        onClick={() => scrollToChapter(nextId)}
                        aria-label={`Go to ${isLast ? 'Next Section' : CHAPTERS[chapterIndex + 1].actLabel}`}
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700',
                          theme.nextBtn
                        )}
                      >
                        <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
