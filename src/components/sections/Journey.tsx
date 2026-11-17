import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
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
  BookOpen,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Container } from '../ui/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SITE_CONTENT, JourneyStop } from '../../content/content';
import { cn } from '../../lib/utils';
import { OrganicBlob } from '../ui/OrganicBlob';
import { AmbientGlow } from '../ui/AmbientGlow';

// Distinct clinical outcomes for each milestone (zero repetition with keyTakeaways)
const SESSION_OUTCOMES: Record<string, string[]> = {
  'stop-0': [
    'Establish comfortable, shame-free speaking baseline with clinicians',
    'Meet your licensed SLP team and 14 fellow cohort peers',
    'Set personalized 8-week fluency goals and individual communication targets',
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

// Phase metadata for the 4 curriculum stages
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

  // Active Phase displayed in the Master-Detail Inspector
  const [activePhase, setActivePhase] = useState<number>(1);
  
  // Selected milestone/week within each phase
  const [selectedStops, setSelectedStops] = useState<Record<number, string>>({
    1: 'stop-0',
    2: 'stop-3',
    3: 'stop-5',
    4: 'stop-8',
  });

  const getStopById = (id: string): JourneyStop => {
    return stops.find((s) => s.id === id) || stops[0];
  };

  const currentPhaseData = PHASES.find((p) => p.phaseNumber === activePhase) || PHASES[0];
  const nextPhaseData = PHASES.find((p) => p.phaseNumber === activePhase + 1);
  const prevPhaseData = PHASES.find((p) => p.phaseNumber === activePhase - 1);

  const currentStopId = selectedStops[activePhase] || currentPhaseData.stopIds[0];
  const currentStop = getStopById(currentStopId);
  const StopIcon = SESSION_ICONS[currentStop.id] || Users;
  const stopOutcomes = SESSION_OUTCOMES[currentStop.id] || SESSION_OUTCOMES['stop-0'];

  const handlePhaseClick = (phaseNumber: number) => {
    setActivePhase(phaseNumber);
    const targetPhase = PHASES.find((p) => p.phaseNumber === phaseNumber);
    if (targetPhase && !selectedStops[phaseNumber]) {
      setSelectedStops((prev) => ({ ...prev, [phaseNumber]: targetPhase.stopIds[0] }));
    }
  };

  const handleMilestoneClick = (stopId: string) => {
    setSelectedStops((prev) => ({ ...prev, [activePhase]: stopId }));
  };

  const handleNextPhase = () => {
    if (nextPhaseData) {
      handlePhaseClick(nextPhaseData.phaseNumber);
    }
  };

  const handlePrevPhase = () => {
    if (prevPhaseData) {
      handlePhaseClick(prevPhaseData.phaseNumber);
    }
  };

  return (
    <section
      id="journey"
      className="relative pt-24 pb-28 sm:pt-32 sm:pb-36 bg-gradient-to-b from-[#FBF9FE] via-[#F8F5FF] to-[#FAF8FF] scroll-mt-28 sm:scroll-mt-36"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP (Safely clips blobs without breaking position:sticky) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AmbientGlow
          variant="lavender"
          className="top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[600px]"
        />

        {/* Starting Lavender Cloud Blob: sits top-right safely within section bounds */}
        <OrganicBlob
          variant="primary"
          silhouette="asymmetric-cloud"
          className="top-10 -right-20 w-[600px] h-[500px]"
        />

        {/* Ending Lavender Flow Blob: sits bottom-left safely within section bounds */}
        <OrganicBlob
          variant="secondary"
          silhouette="diagonal-flow"
          className="bottom-10 -left-20 w-[580px] h-[480px]"
        />
      </div>

      <Container size="wide" className="relative z-10">
        {/* =========================================================================
            1. REFINED EDITORIAL HEADER
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-14">
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
              A structured 4-phase sequential progression guided by certified Speech-Language Pathologists. Select any phase to inspect its clinical syllabus and weekly milestones.
            </p>
          </div>
        </div>

        {/* =========================================================================
            MOBILE/TABLET PHASE SWITCHER (HORIZONTAL TABS FOR TOUCH SCREENS)
           ========================================================================= */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {PHASES.map((phase) => {
              const isActive = activePhase === phase.phaseNumber;
              return (
                <button
                  key={phase.phaseId}
                  type="button"
                  onClick={() => handlePhaseClick(phase.phaseNumber)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-2xs cursor-pointer",
                    isActive
                      ? phase.isSummit
                        ? "bg-[#6EC000] text-black ring-2 ring-[#6EC000]"
                        : "bg-[#6D28D9] text-white ring-2 ring-[#6D28D9]"
                      : "bg-white text-slate-700 border border-slate-200"
                  )}
                >
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isActive ? (phase.isSummit ? "bg-black" : "bg-[#6EC000]") : "bg-slate-400"
                  )} />
                  <span>{phase.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            2. SIDE-BY-SIDE SPLIT-PANE ARCHITECTURE (DESKTOP & TABLET LANDSCAPE)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ───────────────────────────────────────────────────────────────────────
              LEFT RAIL: 4 PHASE SELECTOR CARDS (DESKTOP)
             ─────────────────────────────────────────────────────────────────────── */}
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 flex-col gap-3.5">
            {PHASES.map((phase) => {
              const isActive = activePhase === phase.phaseNumber;

              return (
                <button
                  key={phase.phaseId}
                  type="button"
                  onClick={() => handlePhaseClick(phase.phaseNumber)}
                  className={cn(
                    "w-full text-left rounded-2xl p-5 transition-all duration-200 cursor-pointer relative overflow-hidden group",
                    "border backdrop-blur-md flex flex-col justify-between",
                    isActive
                      ? phase.isSummit
                        ? "bg-white border-[#6EC000] ring-2 ring-[#6EC000]/30 shadow-lg shadow-[#6EC000]/10"
                        : "bg-white border-[#6D28D9] ring-2 ring-[#6D28D9]/25 shadow-lg shadow-[#6D28D9]/10"
                      : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-violet-300 hover:shadow-sm"
                  )}
                >
                  {/* Left Active Strip Accent */}
                  {isActive && (
                    <div 
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 inset-y-0 w-1.5",
                        phase.isSummit ? "bg-[#6EC000]" : "bg-[#6D28D9]"
                      )} 
                    />
                  )}

                  <div>
                    {/* Top Row: Phase Tag & Weeks */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider",
                        isActive
                          ? phase.isSummit ? "bg-[#6EC000] text-black" : "bg-[#6D28D9] text-white"
                          : "bg-slate-100 text-slate-700"
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          isActive ? (phase.isSummit ? "bg-black" : "bg-[#6EC000]") : "bg-slate-400"
                        )} />
                        {phase.badge}
                      </span>
                      <span className="font-mono text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                        {phase.weeksLabel}
                      </span>
                    </div>

                    {/* Phase Title */}
                    <h3 className={cn(
                      "text-base sm:text-lg font-display font-extrabold leading-snug tracking-tight mb-1.5 transition-colors",
                      isActive ? (phase.isSummit ? "text-emerald-950" : "text-[#6D28D9]") : "text-[#111111] group-hover:text-[#6D28D9]"
                    )}>
                      {phase.title}
                    </h3>

                    {/* Brief Summary */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3 font-normal">
                      {phase.summary}
                    </p>
                  </div>

                  {/* Bottom Row: Key Focus & Inspection Prompt */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">
                      {phase.stopIds.length} Milestones
                    </span>
                    <span className={cn(
                      "font-bold flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-0.5",
                      isActive ? "text-[#6D28D9]" : "text-slate-400 group-hover:text-slate-700"
                    )}>
                      {isActive ? "Inspecting" : "Select phase"}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ───────────────────────────────────────────────────────────────────────
              RIGHT PANE: MASTER-DETAIL SYLLABUS INSPECTOR (STICKY SCROLL)
             ─────────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 xl:col-span-8 lg:sticky lg:top-24 xl:top-28 self-start transition-all duration-300">
            <div className="relative rounded-[32px] bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(109,40,217,0.07)] overflow-hidden">
              {/* Top Specular Accent Rim */}
              <div 
                aria-hidden="true" 
                className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-[#6EC000]"
              />

              <div className="p-6 sm:p-8 lg:p-9">
                {/* Top Inspector Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#6D28D9] mb-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{currentPhaseData.badge} Detailed Syllabus</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{currentPhaseData.weeksLabel}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#111111] tracking-tight">
                      {currentPhaseData.title}
                    </h3>
                  </div>

                  {/* Milestone Pill Switchers */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mr-1">
                      Milestone:
                    </span>
                    {currentPhaseData.stopIds.map((stopId) => {
                      const stop = getStopById(stopId);
                      const isSelected = currentStopId === stopId;

                      return (
                        <button
                          key={stop.id}
                          type="button"
                          onClick={() => handleMilestoneClick(stop.id)}
                          className={cn(
                            "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5",
                            isSelected
                              ? currentPhaseData.isSummit
                                ? "bg-[#6EC000] text-black shadow-xs font-black ring-1 ring-black/10"
                                : "bg-[#6D28D9] text-white shadow-xs font-black ring-1 ring-[#6D28D9]"
                              : "bg-slate-100/90 text-slate-700 hover:bg-violet-50 hover:text-[#6D28D9] border border-slate-200/60"
                          )}
                        >
                          <span>{stop.stepNumber === '00' ? 'Kickoff' : `Week ${stop.stepNumber}`}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white/80" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Milestone Detail View */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStop.id}
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-6 sm:pt-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                      
                      {/* LEFT COLUMN: Milestone Title, Description & Takeaway */}
                      <div className="md:col-span-6 space-y-4">
                        <div className="flex items-start gap-3.5">
                          <div className={cn(
                            "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xs",
                            currentPhaseData.isSummit ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F3E8FF] text-[#6D28D9]"
                          )}>
                            <StopIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                                {currentStop.stepNumber === '00' ? 'Orientation Kickoff' : `Week ${currentStop.stepNumber} Session`}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-mono text-slate-600 font-medium border border-slate-200/70">
                                <Calendar className="w-3 h-3 text-[#6D28D9]" />
                                {currentStop.duration}
                              </span>
                            </div>
                            <h4 className="text-lg sm:text-xl font-display font-extrabold text-[#111111] leading-tight">
                              {currentStop.title}
                            </h4>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-700 leading-relaxed font-normal">
                          {currentStop.description}
                        </p>

                        {/* Takeaway Quote Box */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF8FF] to-white border border-[#EDE9FE] shadow-2xs">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#6D28D9] mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#6EC000]" />
                            <span>Core Clinical Takeaway</span>
                          </div>
                          <p className="text-xs sm:text-sm font-serif italic text-slate-900 leading-relaxed">
                            &ldquo;{currentStop.keyTakeaway}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Mastered Competencies Checklist */}
                      <div className="md:col-span-6 space-y-3.5">
                        <span className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mb-2">
                          Clinical Competencies You Master:
                        </span>
                        
                        <div className="space-y-2.5">
                          {stopOutcomes.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                              <div className="w-5 h-5 rounded-full bg-[#EBF7DE] border border-[#D3F0B3] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                                <Check className="w-3 h-3 text-[#3F7300] stroke-[2.5]" />
                              </div>
                              <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* ───────────────────────────────────────────────────────────────────
                    INSPECTOR FOOTER: SEQUENTIAL NEXT/PREV CONTROLS (ZERO SCROLL NEEDED)
                   ─────────────────────────────────────────────────────────────────── */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Prev Phase Button */}
                  <div>
                    {prevPhaseData ? (
                      <button
                        type="button"
                        onClick={handlePrevPhase}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-[#6D28D9] px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous: {prevPhaseData.badge}</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6EC000]" />
                        Certified SLP Led Cohort
                      </span>
                    )}
                  </div>

                  {/* Next Phase or Application Link */}
                  <div>
                    {nextPhaseData ? (
                      <button
                        type="button"
                        onClick={handleNextPhase}
                        className={cn(
                          "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-xs cursor-pointer",
                          nextPhaseData.isSummit
                            ? "bg-[#6EC000] text-black hover:bg-[#65b000] ring-1 ring-black/10"
                            : "bg-[#6D28D9] text-white hover:bg-[#5b21b6]"
                        )}
                      >
                        <span>Next: {nextPhaseData.badge} — {nextPhaseData.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <a
                        href="#register"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#6EC000] text-black hover:bg-[#65b000] shadow-sm transition-all"
                      >
                        <span>Ready to Join? Apply for Cohort 01</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};
