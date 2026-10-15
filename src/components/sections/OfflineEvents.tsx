import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SITE_CONTENT } from '../../content/content';

export const OfflineEvents: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const gatheringPillars = [
    {
      index: '01',
      title: 'The Face-to-Face Circle',
      description: 'Step away from screens and connect directly with your 10 cohort members and Speech Language Pathologist in an intimate, private setting.',
      meta: 'Intimate peer circle',
    },
    {
      index: '02',
      title: 'Real-World Speech Practice',
      description: 'Gentle, supported real-life speaking exercises and casual conversation games where stammers, pauses, and speech blocks are met with patience.',
      meta: 'Zero-pressure environment',
    },
    {
      index: '03',
      title: 'In-Person SLP Coaching',
      description: 'Receive personalized technique advice, gentle diaphragmatic pacing feedback, and vocal encouragement directly from our licensed Speech Language Pathologist.',
      meta: 'Professional guidance',
    },
    {
      index: '04',
      title: 'Shared Milestones & Friendship',
      description: 'Share a relaxed meal together, celebrate individual speaking breakthroughs, and build genuine friendships that continue long after Cohort 1 ends.',
      meta: 'Lifelong community',
    },
  ];

  return (
    <section 
      id="events" 
      aria-label="Offline Cohort Gathering"
      className="relative py-24 sm:py-32 bg-cream-100 dark:bg-teal-950 hairline-b text-ink-900 dark:text-cream-50 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,122,92,0.05),transparent_70%)]" 
      />

      <Container size="wide" className="relative z-10 max-w-5xl">
        {/* ══ 1. Section Header in Plain Text ══ */}
        <motion.div 
          className="max-w-3xl mb-14 sm:mb-18"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <Eyebrow variant="coral" className="mb-4">
            {SITE_CONTENT.offlineEvents.eyebrow}
          </Eyebrow>

          <Heading as="h2" size="section" animate>
            Connect in real life.{' '}
            <span className="font-serif italic font-normal text-coral-600 dark:text-coral-400 block sm:inline">
              An offline gathering with your 10 members.
            </span>
          </Heading>

          <p className="mt-5 text-base sm:text-lg text-ink-600 dark:text-cream-300 leading-relaxed font-normal max-w-2xl">
            {SITE_CONTENT.offlineEvents.subheadline}
          </p>
        </motion.div>

        {/* ══ 2. Lead Narrative Manifesto (Uncontained, Plain Text) ══ */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="mb-14 sm:mb-16 pb-12 border-b border-ink-900/[0.09] dark:border-cream-100/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-coral-600 dark:text-coral-400 font-bold block mb-2">
                The Experience
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-950 dark:text-cream-50 tracking-tight leading-snug">
                Ten voices. One shared table. Zero pressure.
              </h3>
            </div>

            <div className="lg:col-span-8 space-y-4 text-base sm:text-lg text-ink-700 dark:text-cream-200 leading-relaxed font-normal">
              <p>
                Virtual practice builds the daily habit; meeting in person cements the confidence. We gather all 10 participants and our Speech Language Pathologist in an intimate, private space designed for ease and connection.
              </p>
              <p className="text-sm sm:text-base text-ink-500 dark:text-cream-400">
                There are no stages, no spotlights, and no forced speeches. Just honest conversation, shared laughter, gentle real-world speaking drills, and good food with peers who understand your exact journey.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ══ 3. 4 Editorial Plain-Text Inclusions (Hairline Separators) ══ */}
        <div className="divide-y divide-ink-900/[0.09] dark:divide-cream-100/10 border-b border-ink-900/[0.09] dark:border-cream-100/10">
          {gatheringPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: prefersReduced ? 0 : idx * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="py-7 sm:py-8 px-4 -mx-4 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-baseline group transition-[background-color,transform] duration-200 ease-out hover:bg-white/60 cursor-default"
            >
              {/* Left Column: Number & Meta */}
              <div className="md:col-span-4 flex items-baseline gap-4 group-hover:translate-x-1 transition-transform duration-200 ease-out">
                <span className="font-mono text-xs sm:text-sm font-semibold text-coral-600 dark:text-coral-400">
                  {pillar.index}
                </span>
                <div>
                  <h4 className="text-lg sm:text-xl font-display font-bold text-ink-900 dark:text-cream-50 tracking-tight group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors duration-150">
                    {pillar.title}
                  </h4>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-500 dark:text-cream-400 block mt-0.5">
                    {pillar.meta}
                  </span>
                </div>
              </div>

              {/* Right Column: Narrative Description */}
              <div className="md:col-span-8 group-hover:translate-x-1 transition-transform duration-200 ease-out">
                <p className="text-sm sm:text-base text-ink-600 dark:text-cream-300 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ══ 4. Collaborative Planning & Free Reassurance (Plain Text) ══ */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 sm:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6"
        >
          {/* Left: Planning reassurance */}
          <div className="border-l-2 border-coral-500 pl-4 py-1 max-w-xl">
            <p className="text-xs sm:text-sm text-ink-700 dark:text-cream-200 leading-relaxed">
              <strong className="text-ink-950 dark:text-white font-semibold">Planned collaboratively with your cohort: </strong>
              Date, timing, and venue will be decided together with all 10 confirmed members once the program starts, ensuring a comfortable and accessible location for everyone.
            </p>
            <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-ink-500 dark:text-cream-400">
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                <Check className="w-3.5 h-3.5" />
                Included with ₹199 Cohort Registration
              </span>
              <span>·</span>
              <span>Exclusive to Cohort 01</span>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex-shrink-0">
            <Button
              href="#register"
              variant="coral"
              size="lg"
              trackingName="offline_gathering_join"
              icon={<ArrowRight className="w-4 h-4" />}
              className="shadow-glow-coral text-sm sm:text-base font-semibold px-7"
            >
              Join Cohort 01 to Participate
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
