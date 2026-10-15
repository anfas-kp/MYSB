import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Container } from '../ui/Container';
import { useSeatCount } from '../../hooks/useSeatCount';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/utils';

interface InclusionDeepPoint {
  label: string;
  text: string;
}

interface InclusionsItem {
  id: string;
  number: string;
  kicker: string;
  title: string;
  italicPhrase: string;
  description: string;
  meta: string[];
  hasAudioWave?: boolean;
  extendedDetails: string;
  deepPoints: InclusionDeepPoint[];
}

const INCLUSIONS: InclusionsItem[] = [
  {
    id: 'zlaqa-app',
    number: '01',
    kicker: 'COMPANION SOFTWARE & ROUTINE',
    title: 'Daily Guided Practice',
    italicPhrase: 'via Zlaqa App',
    description:
      'Full access to the Zlaqa speech companion app included with your cohort. Record 3-minute daily audios from spontaneous image prompts to desensitize block tension and build natural speech rhythm.',
    meta: ['20 Mins / Day', 'Full Access Included', 'Spontaneous Visual Prompts', 'Block Self-Log'],
    hasAudioWave: true,
    extendedDetails:
      'Engineered around progressive desensitization and neural repetition. Instead of feeling communicative pressure in front of others right away, you build a steady habit in a quiet, low-stakes private space every morning.',
    deepPoints: [
      {
        label: 'Diaphragmatic Warmup',
        text: '5 minutes of low-pressure vocal cord vibration drills to release throat clutching before you speak.',
      },
      {
        label: 'Visual Rhythm Prompts',
        text: 'Daily image cues designed to bypass cognitive over-monitoring, fear anticipation, and word substitution.',
      },
      {
        label: 'Shame-Free Log',
        text: 'Objectively note block sensations, duration, and release feelings in the app tracker without judgment.',
      },
    ],
  },
  {
    id: 'clinical-slp',
    number: '02',
    kicker: 'CLINICAL GUIDANCE',
    title: 'Speech Pathologist Reviews',
    italicPhrase: '1-on-1 Calibration',
    description:
      'Direct clinical partnership with an assigned Speech Language Pathologist. Your clinician reviews your recorded speech patterns weekly and calibrates personalized vocal pacing drills.',
    meta: ['Weekly 1-on-1 Video', 'Licensed SLP (MASLP)', 'Gentle Vocal Onset', 'Continuous Phonation'],
    extendedDetails:
      'Stammering mechanics are highly individualized. Your assigned clinician analyzes your asynchronous waveform logs to identify your specific phonetic trigger boundaries before meeting you weekly on video.',
    deepPoints: [
      {
        label: 'Acoustic Diagnosis',
        text: 'Clinical isolation of hard glottal attacks versus relaxed open vocal onset on problem consonants.',
      },
      {
        label: 'Weekly 1-on-1 Video',
        text: 'Dedicated private sessions to calibrate breath-phrase boundaries under direct professional guidance.',
      },
      {
        label: 'Certified Expertise',
        text: 'Oversight led by licensed clinicians with recognized Master of Speech-Language Pathology credentials.',
      },
    ],
  },
  {
    id: 'peer-circle',
    number: '03',
    kicker: 'PEER HAVEN',
    title: '10-Peer "Daily Voice" Circle',
    italicPhrase: 'Zero Interruptions',
    description:
      'An intimate, unhurried virtual room where stammering is 100% normalized. Speak at your own speed with cohort peers who walk the exact same journey without judgment or fear.',
    meta: ['Daily Google Meet', 'Strict 10-Seat Limit', 'Unhurried Speaking Floor', '5-Min Quick Calls'],
    extendedDetails:
      'The loneliness of stammering ends when you are surrounded by people who understand the internal experience completely. Every evening, our private Google Meet circle creates an environment of total psychological safety.',
    deepPoints: [
      {
        label: 'Inviolable Floor Rule',
        text: 'Zero interruptions permitted. You have unlimited time to complete your thought without feeling rushed.',
      },
      {
        label: '5-Minute Quick Calls',
        text: 'Randomized, low-stakes 1-on-1 phone pairings with peers to systematically conquer phone call anxiety.',
      },
      {
        label: 'Strict 10-Seat Cap',
        text: 'Never an overwhelming or faceless webinar. An intimate circle where every member is heard every night.',
      },
    ],
  },
  {
    id: 'offline-gathering',
    number: '04',
    kicker: 'IN-PERSON MILESTONE',
    title: 'Offline Cohort Gathering',
    italicPhrase: 'In Planning',
    description:
      'An optional in-person milestone gathering with your 10 cohort peers for live speech workshops, shared meals, and real-world confidence practice. Date and venue decided collaboratively with all confirmed participants.',
    meta: ['Collaborative Venue', 'Real-World Speech Drills', 'All-Inclusive Grant', 'Alumni Fellowship'],
    extendedDetails:
      'Towards the end of the 8-week journey, all 10 peers have the opportunity to transition virtual camaraderie into lifelong real-world confidence through shared experiences in an accessible retreat setting.',
    deepPoints: [
      {
        label: 'Real-World Challenges',
        text: 'Gentle, supported speaking drills in real public environments (ordering at a cafe, asking directions).',
      },
      {
        label: 'Collaborative Location',
        text: 'Date, timing, and venue decided democratically with all confirmed cohort peers to ensure accessibility.',
      },
      {
        label: 'Enduring Alumni Network',
        text: 'Graduate into an ongoing alumni community for continuous encouragement, friendship, and regular catch-ups.',
      },
    ],
  },
];

export const WhatYouGet: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { seatsRemaining } = useSeatCount();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Scroll progress through the inclusions list for the thin connecting indicator line
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 70%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const toggleExpand = (id: string) => {
    const nextState = expandedId === id ? null : id;
    setExpandedId(nextState);
    if (nextState) {
      trackEvent('faq_expand', {
        item_id: id,
        section: 'what_you_get_inclusions',
      });
    }
  };

  return (
    <section
      id="features"
      aria-label="What You Get: Program Inclusions"
      className="relative py-24 sm:py-32 bg-cream-100/90 text-ink-900 border-t border-ink-900/[0.08]"
    >
      <Container className="relative z-10 max-w-5xl">
        {/* ══ 1. Section Header ══ */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-2xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold text-teal-850 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-teal-850 flex-shrink-0" />
            <span>04 · Program Inclusions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-950 leading-tight">
            Everything you need to{' '}
            <span className="font-serif italic font-normal text-teal-800 block sm:inline">
              build steady speech.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-ink-700 leading-relaxed font-normal">
            No fragmented tips or clinical isolation. A structured 8-week system engineered around
            daily practice, weekly speech pathologist oversight, and an unhurried peer circle.
          </p>
        </motion.div>

        {/* ══ 2. Editorial Inclusions List with Vertical Connecting Line ══ */}
        <div ref={listRef} className="relative">
          {/* Thin Desktop Connecting Progress Line */}
          <div className="hidden lg:block absolute left-[-28px] top-4 bottom-4 w-[1.5px] bg-ink-900/[0.08] pointer-events-none">
            <motion.div
              style={{ height: prefersReduced ? '100%' : lineHeight }}
              className="w-full bg-teal-700 origin-top will-change-[height]"
            />
          </div>

          <div className="divide-y divide-ink-900/[0.09] border-y border-ink-900/[0.09]">
            {INCLUSIONS.map((item, index) => {
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReduced ? 0 : index * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className={cn(
                    "group relative py-8 sm:py-11 px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-2xl transition-[background-color,border-color] duration-250 ease-out cursor-pointer",
                    "hover:bg-[#7FE0CF]/[0.07]",
                    isExpanded && "bg-[#7FE0CF]/[0.05]"
                  )}
                  onClick={() => toggleExpand(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={`inclusion-detail-${item.id}`}
                  aria-label={`${item.title} ${item.italicPhrase} - click to view details`}
                >
                  {/* Subtle Left Accent Line Reveal on Hover */}
                  <span
                    className={cn(
                      "hidden sm:block absolute left-0 top-6 bottom-6 w-1 rounded-full bg-teal-700 transition-all duration-250 ease-out origin-center pointer-events-none",
                      isExpanded
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100"
                    )}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
                    {/* ── Large Hollow Number & Kicker ── */}
                    <div className="lg:col-span-3 flex lg:flex-col items-baseline justify-between lg:justify-start gap-2.5">
                      <span className="text-hollow font-mono font-black text-6xl sm:text-7xl lg:text-8xl select-none leading-none tracking-tighter block">
                        {item.number}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-teal-800/80 tracking-[0.16em] uppercase">
                        {item.kicker}
                      </span>
                    </div>

                    {/* ── Content & Expandable Details ── */}
                    <div className="lg:col-span-9 space-y-3.5 group-hover:translate-x-1 sm:group-hover:translate-x-1.5 transition-transform duration-200 ease-out">
                      {/* Heading Row with Optional Audio Wave & Expand Toggle */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-950 leading-snug group-hover:text-teal-950 transition-colors">
                            {item.title}{' '}
                            <span className="font-serif italic font-normal text-teal-800">
                              {item.italicPhrase}
                            </span>
                          </h3>

                          {/* Animated Mini Audio Waveform for Inclusion 01 */}
                          {item.hasAudioWave && (
                            <div className="pt-0.5 flex items-center gap-2">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-800/[0.06] text-teal-800 text-[10.5px] font-mono font-medium">
                                <span className="flex items-end gap-[2px] h-3 w-3.5" aria-hidden="true">
                                  <span className="w-[1.5px] h-2 rounded-full bg-teal-700 animate-voice-bar-1" />
                                  <span className="w-[1.5px] h-3 rounded-full bg-teal-700 animate-voice-bar-2" />
                                  <span className="w-[1.5px] h-1.5 rounded-full bg-teal-700 animate-voice-bar-3" />
                                  <span className="w-[1.5px] h-2.5 rounded-full bg-teal-700 animate-voice-bar-4" />
                                </span>
                                <span>Guided Daily Routine</span>
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Subtle Editorial Expand Indicator */}
                        <div
                          className="flex items-center gap-1.5 pt-1.5 text-xs font-mono text-ink-500 group-hover:text-teal-800 transition-colors flex-shrink-0 select-none"
                          aria-hidden="true"
                        >
                          <span className="hidden sm:inline text-[11px] font-medium">
                            {isExpanded ? 'Hide' : 'Details'}
                          </span>
                          <span
                            className={cn(
                              "w-6 h-6 rounded-full border border-ink-900/10 flex items-center justify-center transition-transform duration-250 ease-out",
                              isExpanded ? "rotate-180 bg-teal-800 text-cream-50 border-teal-800" : "bg-white text-ink-600 group-hover:border-teal-700"
                            )}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>

                      {/* Primary Description */}
                      <p className="text-sm sm:text-base text-ink-700 leading-relaxed max-w-3xl font-normal">
                        {item.description}
                      </p>

                      {/* Benefit Metadata Labels with Short Stroke Animation */}
                      <div className="pt-1.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-ink-600">
                        {item.meta.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-2 group-hover:text-ink-800 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5 text-teal-700 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* ── Expandable Deep-Dive Drawer ── */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={`inclusion-detail-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: prefersReduced ? 0.01 : 0.35,
                              ease: [0.25, 1, 0.5, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-ink-900/[0.08] space-y-3.5">
                              <p className="text-xs sm:text-sm text-ink-800 leading-relaxed max-w-3xl font-medium">
                                {item.extendedDetails}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                                {item.deepPoints.map((dp, dpIdx) => (
                                  <div
                                    key={dpIdx}
                                    className="p-3 rounded-xl bg-white/70 border border-ink-900/8 text-left space-y-1"
                                  >
                                    <div className="text-[11px] font-mono font-bold text-teal-800 tracking-wide uppercase">
                                      {dp.label}
                                    </div>
                                    <p className="text-xs text-ink-600 leading-snug">
                                      {dp.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ══ 3. Minimal Bottom Conversion Bar ══ */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-600">
              <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 animate-live-pulse" />
              <span>
                Cohort 01 Applications Open · <strong className="text-ink-950 font-bold">{seatsRemaining} of 10 Seats Remaining</strong>
              </span>
            </div>
            <p className="text-xs text-ink-500 font-mono">
              ₹199 Program Fee · Strictly Capped at 10 Young People (Ages 15–30)
            </p>
          </div>

          <a
            href="#register"
            onClick={() =>
              trackEvent('cta_click', {
                placement: 'what_you_get_plain_text',
                link_label: 'Join the Program',
              })
            }
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-900 text-cream-50 font-bold text-xs sm:text-sm hover:bg-teal-950 transition-colors shadow-2xs btn-tactile cursor-pointer"
          >
            <span>Join the Program</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};
