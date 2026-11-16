import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/utils';
import { SITE_CONTENT } from '../../content/content';
import { GlassCard } from '../ui/GlassCard';
import { OrganicBlob } from '../ui/OrganicBlob';
import { AmbientGlow } from '../ui/AmbientGlow';

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
  extendedDetails: string;
  deepPoints: InclusionDeepPoint[];
}

const INCLUSIONS: InclusionsItem[] = [
  {
    id: 'slp-sessions',
    number: '01',
    kicker: 'CLINICAL GUIDANCE',
    title: 'Weekly Live SLP Sessions',
    italicPhrase: 'Real guidance, real feedback',
    description: 'Live interactive sessions with a licensed Speech-Language Pathologist. Receive direct analysis on your vocal onsets, individualized diagnostic exercises, and steady reinforcement.',
    meta: ['Weekly Live Video', 'Certified SLP Team', 'Vocal Pacing Drills', 'Individualized Review'],
    extendedDetails: 'Stammering mechanics are unique to each person. Your clinician identifies your specific block triggers and phonetic boundaries to calibrate your speaking tools.',
    deepPoints: [
      { label: 'Live Feedback', text: 'Clinical guidance on gentle onset, easy stuttering, and diaphragmatic breathing.' },
      { label: 'Targeted Exercises', text: 'Tailored practice drills designed around the sounds and situations you find hardest.' },
      { label: 'Safe Floor', text: 'A completely unhurried clinical environment where you have all the time you need to speak.' }
    ]
  },
  {
    id: 'zlaqa-app',
    number: '02',
    kicker: 'COMPANION AI SOFTWARE',
    title: '10 Mins Daily in App',
    italicPhrase: 'Breathe. Practice. Speak.',
    description: 'AI voice practice and guided exercises in the Zlaqa app. Build muscle memory and acoustic confidence in a low-stakes private space every morning.',
    meta: ['10 Mins Daily', 'Full App Access', 'Spontaneous Visual Prompts', 'Self-Paced Drills'],
    extendedDetails: 'Engineered around progressive desensitization and neural motor repetition. Practice breathing, phonation, and continuous voice flow.',
    deepPoints: [
      { label: 'Visual Image Prompts', text: 'Prompts designed to bypass anticipation panic and fear-based word avoidance.' },
      { label: 'Diaphragmatic Drills', text: 'Short vocal warmup exercises that relax chest and throat tension before speaking.' },
      { label: 'Speech Flow Tracking', text: 'Track your daily consistency and notice subtle fluency improvements week over week.' }
    ]
  },
  {
    id: 'group-meet',
    number: '03',
    kicker: 'PEER CIRCLE',
    title: '10 Mins Daily Group Meet',
    italicPhrase: 'No judgement. Zero shame.',
    description: 'Your cohort of 15, together every Monday to Saturday on Google Meet. Say something, hear someone else say something, and normalize your voice.',
    meta: ['Mon–Sat Circle', '15 Peers Who Get It', 'Zero Pressure', 'Google Meet'],
    extendedDetails: 'The silence and isolation of stammering ends when you are surrounded by people who understand the internal experience completely.',
    deepPoints: [
      { label: 'Uncut Speaking Floor', text: 'Nobody interrupts. Nobody finishes your sentence. You speak in your own time.' },
      { label: 'Shared Empathy', text: 'Discuss common challenges: ordering food, viva exams, phone calls, and introductions.' },
      { label: 'Mutual Accountability', text: 'A small group that notices when you show up and celebrates every milestone.' }
    ]
  },
  {
    id: 'expert-talks',
    number: '04',
    kicker: 'SPECIALIST MASTERCLASSES',
    title: '2 to 3 Expert Talks',
    italicPhrase: 'Voice, speech & confidence',
    description: 'Interactive sessions with guest specialists in vocal projection, neurodiversity, stuttering psychology, and workplace self-advocacy.',
    meta: ['2–3 Masterclasses', 'Guest Speakers', 'Q&A Discussions', 'Recorded Access'],
    extendedDetails: 'Learn cutting-edge perspectives on speech science, cognitive desensitization, and real-world public speaking.',
    deepPoints: [
      { label: 'Speech Mechanics', text: 'Deep dives into how vocal cords, breath support, and nervous system arousal interact.' },
      { label: 'Psychological Resilience', text: 'Managing anticipatory anxiety and speaking freely in high-stakes environments.' },
      { label: 'Live Q&A', text: 'Ask your most pressing questions directly to experienced speech experts.' }
    ]
  },
  {
    id: 'offline-meetup',
    number: '05',
    kicker: 'IN-PERSON MILESTONE',
    title: '1 In-Person Meetup',
    italicPhrase: 'Meet face to face',
    description: 'In the first month, meet your therapists and cohort in person for a half-day gathering. Step away from screens into a relaxed, welcoming environment.',
    meta: ['Half-Day Meetup', 'Face-to-Face Workshop', 'Casual Atmosphere', 'First Month'],
    extendedDetails: 'Translate online bonds into real-world friendship and practice gentle conversational confidence in a safe, warm physical room.',
    deepPoints: [
      { label: 'Face-to-Face Practice', text: 'Low-pressure conversational activities with your cohort peers and therapists.' },
      { label: 'Community Bond', text: 'Share food, laugh, talk openly, and deepen lifelong connections.' },
      { label: 'Optional but Encouraged', text: 'Venue and date coordinated collaboratively with enrolled participants.' }
    ]
  },
  {
    id: 'progress-assessments',
    number: '06',
    kicker: 'DIAGNOSTIC FEEDBACK',
    title: 'Progress You Can See',
    italicPhrase: 'Baseline, mid-point & final',
    description: 'Baseline speech assessment on Day 1, mid-point review at Week 4, and final evaluation at Week 8 with written diagnostic feedback from your SLP.',
    meta: ['Written Reports', 'Baseline Assessment', 'Week 4 Review', 'Final Certificate'],
    extendedDetails: 'Concrete data and written qualitative feedback tracking your diaphragmatic control, speech block management, and overall communication confidence.',
    deepPoints: [
      { label: 'Baseline Assessment', text: 'Clarify your speech starting point and define personalized goals with your clinician.' },
      { label: 'Mid-Point Calibration', text: 'Assess technique mastery halfway through and adjust specific challenge drills.' },
      { label: 'Completion Certificate', text: 'Celebrate your 8-week climb with a verifiable certificate and progress report.' }
    ]
  },
  {
    id: 'alumni-community',
    number: '07',
    kicker: 'LIFELONG NETWORK',
    title: 'A Community That Stays',
    italicPhrase: 'Beyond week 8',
    description: 'Your cohort does not vanish after week 8. Stay connected with your peers, access alumni catch-ups, and enjoy continuous encouragement in the SPEAKUP network.',
    meta: ['Permanent Network', 'Alumni Circles', 'Ongoing WhatsApp', 'Peer Support'],
    extendedDetails: 'Confidence is sustained through community. You remain part of the ZLAQA AI Labs speech community long after your cohort concludes.',
    deepPoints: [
      { label: 'Alumni Circles', text: 'Join periodic alumni voice rooms and informal group meetups.' },
      { label: 'Peer Accountability', text: 'Keep in touch with your cohort buddies for practice before interviews or talks.' },
      { label: 'Mentorship', text: 'Share your journey with future cohorts and inspire others who stammer.' }
    ]
  }
];

export const WhatYouGet: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      className="relative scroll-mt-24 sm:scroll-mt-32 pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 bg-white text-[#0B0B0B] overflow-hidden"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      {/* Ambient Lighting Backdrop */}
      <AmbientGlow
        variant="lavender"
        className="top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px]"
      />

      {/* Starting Lavender Blob: sits comfortably on top-left without boundary bleed */}
      <OrganicBlob
        variant="primary"
        silhouette="asymmetric-cloud"
        className="top-10 -left-20 w-[560px] h-[460px] pointer-events-none"
      />

      {/* Ending Mint-Lime Blob: sits bottom-right transitioning into Daily Rhythm */}
      <OrganicBlob
        variant="mint"
        silhouette="bottom-mound"
        className="bottom-10 right-0 w-[580px] h-[440px] pointer-events-none"
      />

      <Container className="relative z-10 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold text-[#6D28D9] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#6EC000] flex-shrink-0" />
            <span>What You Get</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B0B0B] leading-tight">
            Everything you need.{' '}
            <span className="font-serif italic font-normal text-[#6D28D9] block sm:inline">
              Nothing you don’t.
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            A comprehensive, structured 8-week system designed for steady progress without clinical overwhelm or artificial gimmicks.
          </p>
        </motion.div>

        {/* Inclusions Cards List */}
        <div ref={listRef} className="relative space-y-3.5 sm:space-y-4">
          {INCLUSIONS.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.45,
                  delay: prefersReduced ? 0 : index * 0.05,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                <GlassCard
                  variant={isExpanded ? 'violet' : 'default'}
                  hoverEffect={!isExpanded}
                  className={cn(
                    "p-6 sm:p-7 transition-all duration-200 ease-out cursor-pointer group",
                    isExpanded && "ring-2 ring-[#6D28D9]/40 shadow-md"
                  )}
                  onClick={() => toggleExpand(item.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(item.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs font-bold text-[#6D28D9]">
                          {item.number}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                          {item.kicker}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B0B0B] group-hover:text-[#6D28D9] transition-colors">
                        {item.title}{' '}
                        <span className="font-serif italic font-normal text-slate-500 text-lg sm:text-xl ml-1">
                          — {item.italicPhrase}
                        </span>
                      </h3>

                      <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                        {item.description}
                      </p>

                      {/* Meta Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.meta.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 border border-slate-200/80 text-slate-700 shadow-2xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-1 flex-shrink-0">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200",
                        isExpanded
                          ? "bg-[#6D28D9] text-white border-[#6D28D9] rotate-180"
                          : "bg-white text-slate-500 border-slate-300 group-hover:border-[#6D28D9] group-hover:text-[#6D28D9]"
                      )}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expandable Deep Dive */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-slate-200/80">
                          <p className="text-sm text-slate-700 leading-relaxed font-normal mb-5">
                            {item.extendedDetails}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {item.deepPoints.map((point) => (
                              <div
                                key={point.label}
                                className="p-4 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs"
                              >
                                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-[#6D28D9]">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6EC000]" />
                                  <span>{point.label}</span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  {point.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Small cohort guarantee badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EDE9FE] text-xs font-bold text-[#6D28D9] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#6EC000]" />
            <span>{SITE_CONTENT.whoItsFor.badge}</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
