import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronDown,
  Sparkles,
  Users, 
  Compass, 
  Wind, 
  Timer, 
  Key, 
  MessageSquare, 
  ShieldCheck, 
  Mic, 
  Award,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Container } from '../ui/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SITE_CONTENT, JourneyStop } from '../../content/content';
import { cn } from '../../lib/utils';
import { OrganicBlob } from '../ui/OrganicBlob';
import { AmbientGlow } from '../ui/AmbientGlow';

// Structured session outcomes for each milestone
const SESSION_OUTCOMES: Record<string, string[]> = {
  'stop-0': [
    'Understand your baseline speech patterns without judgement',
    'Meet your licensed SLP team and fellow cohort peers',
    'Set personalized 8-week fluency goals and communication targets',
  ],
  'stop-1': [
    'Map specific stammering triggers and physical speech blocks',
    'Identify feared words, syllables, and speaking situations',
    'Eliminate anticipation panic before conversations begin',
  ],
  'stop-2': [
    'Learn diaphragmatic breathing foundation for speech',
    'Master gentle vocal cord onset techniques to prevent blocks',
    'Anchor breath pacing before every sentence as a daily reflex',
  ],
  'stop-3': [
    'Shift from rushed, panicked speech to intentional pacing',
    'Master purposeful conversational pauses without losing your turn',
    'Reclaim your speaking time and space with calm composure',
  ],
  'stop-4': [
    'Desensitize feared consonant and vowel combinations',
    'Master pull-out and easy-stutter techniques in live speech',
    'Disarm the psychological hold of stuck words permanently',
  ],
  'stop-5': [
    'Order food, coffee, and ask questions with calm confidence',
    'Answer phone calls and introduce yourself to new acquaintances',
    'Bridge practice room tools into real, everyday social life',
  ],
  'stop-6': [
    'Simulate job interviews, viva exams, and meeting presentations',
    'Stay grounded under high-stakes social and academic pressure',
    'Handle debate and fast-paced group discussions without freezing',
  ],
  'stop-7': [
    'Draft your 2-minute personal capstone presentation',
    'Receive 1-on-1 diagnostic feedback from your SLP mentor',
    'Frame your speech journey and authentic communication story',
  ],
  'stop-8': [
    'Deliver capstone speech in front of cohort, friends & mentors',
    'Receive accredited certificate of program completion',
    'Join permanent alumni network and ongoing practice circles',
  ],
};

// Supportive icons for each session
const SESSION_ICONS: Record<string, React.ElementType> = {
  'stop-0': Users,
  'stop-1': Compass,
  'stop-2': Wind,
  'stop-3': Timer,
  'stop-4': Key,
  'stop-5': MessageSquare,
  'stop-6': ShieldCheck,
  'stop-7': Mic,
  'stop-8': Award,
};

// Phase metadata for the 4 Bento blocks
interface PhaseData {
  phaseNumber: number;
  phaseId: string;
  badge: string;
  weeksLabel: string;
  title: string;
  summary: string;
  keyTechnique: string;
  themeColor: string;
  isSummit?: boolean;
  stopIds: string[];
}

const PHASES: PhaseData[] = [
  {
    phaseNumber: 1,
    phaseId: 'phase-01',
    badge: 'Phase 01',
    weeksLabel: 'Kickoff + Weeks 01–02',
    title: 'Awareness & Breath Mechanics',
    summary: 'Demystify your speech patterns, pinpoint sound blocks without judgment, and anchor the diaphragmatic breathing reflex.',
    keyTechnique: 'Trigger Sound Mapping · Diaphragmatic Breath Anchor · Gentle Onsets',
    themeColor: '#6D28D9',
    stopIds: ['stop-0', 'stop-1', 'stop-2'],
  },
  {
    phaseNumber: 2,
    phaseId: 'phase-02',
    badge: 'Phase 02',
    weeksLabel: 'Weeks 03–04',
    title: 'Vocal Motor Control',
    summary: 'Shift from rushed anticipation to calm, deliberate conversational pacing. Disarm stuck words with clinical pull-outs.',
    keyTechnique: 'Continuous Phonation · Purposeful Pausing · Block Desensitization',
    themeColor: '#8B5CF6',
    stopIds: ['stop-3', 'stop-4'],
  },
  {
    phaseNumber: 3,
    phaseId: 'phase-03',
    badge: 'Phase 03',
    weeksLabel: 'Weeks 05–06',
    title: 'Real-World Transfer',
    summary: 'Bridge the clinical practice room into real life: food ordering, phone calls, job interviews, and viva presentations.',
    keyTechnique: 'Social Transfer Drills · Live Phone Calls · High-Stakes Composure',
    themeColor: '#7C3AED',
    stopIds: ['stop-5', 'stop-6'],
  },
  {
    phaseNumber: 4,
    phaseId: 'phase-04',
    badge: 'Phase 04 · Summit',
    weeksLabel: 'Weeks 07–08',
    title: 'Voice Ownership & Summit',
    summary: 'Frame your authentic personal narrative and deliver your capstone 2-minute speech with conviction and zero apologies.',
    keyTechnique: 'Authentic Storytelling · Cohort Capstone Talk · Accredited Certificate',
    themeColor: '#6EC000',
    isSummit: true,
    stopIds: ['stop-7', 'stop-8'],
  },
];

export const Journey: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const stops = SITE_CONTENT.journey.stops;

  // Active expanded phase in the 2x2 Bento Matrix (defaults to Phase 1)
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
  
  // Selected week/stop within each phase
  const [selectedStops, setSelectedStops] = useState<Record<number, string>>({
    1: 'stop-0',
    2: 'stop-3',
    3: 'stop-5',
    4: 'stop-8',
  });

  const getStopById = (id: string): JourneyStop => {
    return stops.find((s) => s.id === id) || stops[0];
  };

  const handlePhaseToggle = (phaseNumber: number) => {
    setExpandedPhase((prev) => (prev === phaseNumber ? null : phaseNumber));
  };

  const handleStopSelect = (phaseNumber: number, stopId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStops((prev) => ({ ...prev, [phaseNumber]: stopId }));
    setExpandedPhase(phaseNumber);
  };

  return (
    <section
      id="journey"
      className="relative pt-28 pb-28 sm:pt-36 sm:pb-32 bg-gradient-to-b from-[#FBF9FE] via-[#F8F5FF] to-[#FAF8FF] scroll-mt-28 sm:scroll-mt-36 overflow-hidden"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      <AmbientGlow
        variant="lavender"
        className="top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[600px]"
      />

      {/* Starting Lavender Cloud Blob: sits top-right safely within section bounds */}
      <OrganicBlob
        variant="primary"
        silhouette="asymmetric-cloud"
        className="top-10 -right-20 w-[600px] h-[500px] pointer-events-none"
      />

      {/* Ending Lavender Flow Blob: sits bottom-left safely within section bounds */}
      <OrganicBlob
        variant="secondary"
        silhouette="diagonal-flow"
        className="bottom-10 -left-20 w-[580px] h-[480px] pointer-events-none"
      />

      <Container size="wide" className="relative z-10">
        {/* =========================================================================
            1. REFINED EDITORIAL HEADER
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            {/* Minimal Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EDE9FE] mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#6EC000] animate-pulse" />
              <span className="text-[11px] sm:text-[11.5px] font-mono font-bold uppercase tracking-[0.16em] text-[#6D28D9]">
                The 8-Week Curriculum
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#111111] leading-[1.12] tracking-tight">
              Eight weeks.{' '}
              <span className="font-serif italic font-normal text-[#6D28D9]">
                One steady climb.
              </span>
            </h2>
          </div>

          {/* Right-Side Supporting Narrative */}
          <div className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-slate-200/80">
            <p className="text-sm sm:text-base text-[#536178] leading-relaxed font-normal">
              A structured 4-phase architectural matrix guided by certified Speech-Language Pathologists. Every week builds directly upon the last.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. THE 4-PHASE BENTO MATRIX (2×2 ARCHITECTURAL GRID)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 items-start">
          {PHASES.map((phase) => {
            const isExpanded = expandedPhase === phase.phaseNumber;
            const currentStopId = selectedStops[phase.phaseNumber] || phase.stopIds[0];
            const currentStop = getStopById(currentStopId);
            const StopIcon = SESSION_ICONS[currentStop.id] || Users;
            const stopOutcomes = SESSION_OUTCOMES[currentStop.id] || SESSION_OUTCOMES['stop-0'];

            return (
              <motion.div
                key={phase.phaseId}
                layout
                transition={prefersReduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "relative rounded-[28px] bg-white/95 backdrop-blur-md transition-all duration-300 overflow-hidden",
                  "border shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
                  isExpanded
                    ? phase.isSummit
                      ? "border-[#6EC000]/50 ring-2 ring-[#6EC000]/20 shadow-[0_16px_40px_rgba(110,192,0,0.12)]"
                      : "border-[#6D28D9]/40 ring-2 ring-[#6D28D9]/15 shadow-[0_16px_40px_rgba(109,40,217,0.10)]"
                    : "border-slate-200/80 hover:border-violet-200 hover:shadow-md"
                )}
              >
                {/* Top ambient highlight on the active card */}
                {isExpanded && (
                  <div 
                    className={cn(
                      "absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90",
                      phase.isSummit ? "bg-gradient-to-r from-transparent via-[#6EC000]/60 to-transparent" : "bg-gradient-to-r from-transparent via-[#6D28D9]/50 to-transparent"
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* ── CARD HEADER (CLICKABLE TO EXPAND / COLLAPSE) ── */}
                <div 
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => handlePhaseToggle(phase.phaseNumber)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handlePhaseToggle(phase.phaseNumber);
                    }
                  }}
                  className="p-6 sm:p-7 lg:p-8 cursor-pointer select-none"
                >
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-mono font-bold tracking-wider uppercase",
                        phase.isSummit
                          ? "bg-[#F2FBEA] text-[#3F7300] border border-[#DCFCE7]"
                          : isExpanded
                          ? "bg-[#F5F0FF] text-[#6D28D9] border border-[#EDE9FE]"
                          : "bg-slate-100 text-slate-700 border border-slate-200/60"
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          phase.isSummit ? "bg-[#6EC000]" : "bg-[#6D28D9]"
                        )} />
                        {phase.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {phase.weeksLabel}
                      </span>
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200",
                        isExpanded ? "bg-violet-100/70 text-[#6D28D9] rotate-180" : "bg-slate-100 text-slate-500"
                      )}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Phase Title */}
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#111111] leading-tight tracking-tight mb-2.5">
                    {phase.title}
                  </h3>

                  {/* Phase Summary */}
                  <p className="text-sm text-[#536178] leading-relaxed font-normal mb-5">
                    {phase.summary}
                  </p>

                  {/* Clinical Technique Key Tag */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-100 mb-5">
                    <Sparkles className="w-3.5 h-3.5 text-[#6D28D9] flex-shrink-0" />
                    <span className="truncate">{phase.keyTechnique}</span>
                  </div>

                  {/* Interactive Week Pills Strip */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100/80">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mr-1">
                      Milestones:
                    </span>
                    {phase.stopIds.map((stopId) => {
                      const stop = getStopById(stopId);
                      const isStopActive = isExpanded && currentStopId === stopId;

                      return (
                        <button
                          key={stop.id}
                          type="button"
                          onClick={(e) => handleStopSelect(phase.phaseNumber, stop.id, e)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer",
                            isStopActive
                              ? phase.isSummit
                                ? "bg-[#6EC000] text-black shadow-xs font-black"
                                : "bg-[#6D28D9] text-white shadow-xs font-black"
                              : "bg-slate-100/90 text-slate-700 hover:bg-violet-50 hover:text-[#6D28D9] border border-slate-200/50"
                          )}
                        >
                          {stop.stepNumber === '00' ? 'Kickoff' : `Week ${stop.stepNumber}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── EXPANDABLE IN-PLACE DETAIL DRAWER ── */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`drawer-${phase.phaseId}`}
                      initial={prefersReduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      animate={prefersReduced ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto' }}
                      exit={prefersReduced ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 lg:px-8 lg:pb-8 pt-0">
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8FF] border border-violet-100/90 space-y-4">
                          {/* Selected Session Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-violet-100/80">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs",
                                phase.isSummit ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F3E8FF] text-[#6D28D9]"
                              )}>
                                <StopIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="font-mono text-[10px] font-bold text-[#6D28D9] uppercase tracking-wider block">
                                  {currentStop.badge} · {currentStop.stepNumber === '00' ? 'Orientation' : `Week ${currentStop.stepNumber}`}
                                </span>
                                <h4 className="text-base sm:text-lg font-bold text-[#111111] leading-snug">
                                  {currentStop.title}
                                </h4>
                              </div>
                            </div>

                            <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-[11px] font-mono text-slate-600 font-medium">
                              <Calendar className="w-3 h-3 text-[#6D28D9]" />
                              {currentStop.duration}
                            </span>
                          </div>

                          {/* Session Description */}
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {currentStop.description}
                          </p>

                          {/* Clinical Key Takeaway Callout */}
                          <div className="p-3 rounded-xl bg-white border border-violet-100 text-xs text-slate-700 italic font-serif flex items-start gap-2.5">
                            <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-[#6D28D9] not-italic px-1.5 py-0.5 rounded bg-violet-50 shrink-0">
                              Takeaway
                            </span>
                            <span>&ldquo;{currentStop.keyTakeaway}&rdquo;</span>
                          </div>

                          {/* "This session helps you:" Checklist */}
                          <div>
                            <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                              This session helps you:
                            </span>
                            <div className="space-y-2">
                              {stopOutcomes.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-normal">
                                  <div className="w-4 h-4 rounded-full bg-[#F2FBEA] border border-[#DCFCE7] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 text-[#3F7300] stroke-[2.5]" />
                                  </div>
                                  <span className="leading-tight">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bottom Rhythm Note */}
                          <div className="pt-3 border-t border-violet-100/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6EC000]" />
                              <span>10 mins app daily + weekly live SLP</span>
                            </span>
                            <a
                              href="#register"
                              className="font-bold text-[#6D28D9] hover:underline inline-flex items-center gap-1"
                            >
                              Join Cohort <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── BOTTOM OVERVIEW BANNER (ALL 8 WEEKS AT A GLANCE) ── */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-violet-100/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#6D28D9] flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111111]">
                Full 8-Week Progressive Arc
              </p>
              <p className="text-xs text-[#536178]">
                Small cohort cap: strictly 15 seats. Every member receives individualized SLP calibration every week.
              </p>
            </div>
          </div>
          <a
            href="#register"
            className="px-5 py-2.5 rounded-xl bg-[#6EC000] hover:bg-[#62AD00] text-black font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex-shrink-0 active:scale-95"
          >
            Apply for Cohort 01
          </a>
        </div>
      </Container>
    </section>
  );
};
