import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, Mic2, Shield } from 'lucide-react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Heading } from '../ui/Heading';
import { Card } from '../ui/Card';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface CirclePeer {
  id: number;
  label: string;
  role: string;
  angle: number; // In degrees
}

const PEERS: CirclePeer[] = [
  { id: 1, label: 'Peer 01', role: 'Calicut · College student', angle: 0 },
  { id: 2, label: 'Peer 02', role: 'Kochi · Working professional', angle: 36 },
  { id: 3, label: 'Peer 03', role: 'Trivandrum · High schooler', angle: 72 },
  { id: 4, label: 'Peer 04', role: 'Kannur · Engineering graduate', angle: 108 },
  { id: 5, label: 'Peer 05', role: 'Malappuram · Designer', angle: 144 },
  { id: 6, label: 'Peer 06', role: 'Palakkad · Aspirant', angle: 180 },
  { id: 7, label: 'Peer 07', role: 'Kollam · Teacher', angle: 216 },
  { id: 8, label: 'Peer 08', role: 'Thrissur · Accountant', angle: 252 },
  { id: 9, label: 'Peer 09', role: 'Wayanad · Student', angle: 288 },
  { id: 10, label: 'Peer 10', role: 'Kottayam · Developer', angle: 324 },
];

export const CircleOfTen: React.FC = () => {
  const [activePeer, setActivePeer] = useState<CirclePeer | null>(null);
  const prefersReduced = useReducedMotion();

  // Circle geometric dimensions for SVG calculation
  const size = 380;
  const center = size / 2;
  const radius = 135;

  return (
    <section id="circle-of-10" className="relative py-16 sm:py-20 lg:py-24 bg-white dark:bg-teal-900 hairline-b overflow-hidden">
      {/* Soft Ambient Aurora Mesh */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-mint-400/10 via-teal-600/5 to-transparent blur-3xl pointer-events-none -z-0" 
      />

      <Container size="wide" className="relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Eyebrow variant="teal" className="mb-4">
            Intentionally Intimate
          </Eyebrow>
          <Heading as="h2" size="section" animate>
            10 people.{' '}
            <span className="font-serif italic font-normal text-teal-700 dark:text-mint-400">
              Not a crowd. A circle.
            </span>
          </Heading>
          <p className="mt-4 text-base sm:text-lg text-ink-600 dark:text-cream-300 leading-relaxed max-w-2xl">
            Most online programs scale to hundreds of nameless faces. MYSB is capped strictly at 10 participants per cohort—because genuine speech confidence only grows when you know and trust every single person in the room.
          </p>
        </div>

        {/* Dual Layout: Interactive 10-Node Circle + Value Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: The Human 10-Person Circle Graphic */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
              {/* SVG Connecting Web */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox={`0 0 ${size} ${size}`}
                aria-hidden="true"
              >
                {/* Outer Connecting Orbit Ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="text-teal-600/25 dark:text-mint-400/25"
                />

                {/* Subtle Inner Connection Chords */}
                {PEERS.map((peer, i) => {
                  const rad1 = (peer.angle * Math.PI) / 180;
                  const x1 = center + radius * Math.cos(rad1);
                  const y1 = center + radius * Math.sin(rad1);

                  // Connect to peer 3 steps away for geometric star network
                  const nextPeer = PEERS[(i + 3) % PEERS.length];
                  const rad2 = (nextPeer.angle * Math.PI) / 180;
                  const x2 = center + radius * Math.cos(rad2);
                  const y2 = center + radius * Math.sin(rad2);

                  const isHighlighted = activePeer && (activePeer.id === peer.id || activePeer.id === nextPeer.id);

                  return (
                    <line
                      key={`line-${peer.id}-${nextPeer.id}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth={isHighlighted ? '2' : '1'}
                      className={cn(
                        'transition-all duration-300',
                        isHighlighted 
                          ? 'text-coral-500 opacity-90' 
                          : 'text-teal-600/15 dark:text-mint-400/15'
                      )}
                    />
                  );
                })}
              </svg>

              {/* Central Safe Space Core with Floating Levitation */}
              <motion.div
                animate={prefersReduced ? {} : { 
                  y: [0, -5, 0],
                  scale: [1, 1.04, 1] 
                }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-cream-50/95 dark:bg-teal-950/95 backdrop-blur-md border-2 border-teal-600/25 dark:border-mint-400/30 shadow-[0_12px_32px_-4px_rgba(15,118,110,0.2)] flex flex-col items-center justify-center p-3 text-center group cursor-pointer"
              >
                {/* Floating Ripple Aura Ring */}
                <div 
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-teal-500/30 dark:border-mint-400/30 animate-ping opacity-25 pointer-events-none"
                />

                <div className="w-8 h-8 rounded-full bg-mint-400/25 dark:bg-mint-400/20 flex items-center justify-center mb-1 text-teal-700 dark:text-mint-300 shadow-2xs group-hover:scale-110 transition-transform">
                  <Mic2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-800 dark:text-mint-400 font-bold">
                  Safe Circle
                </span>
                <span className="text-[11px] font-semibold text-ink-600 dark:text-cream-300 leading-tight">
                  Zero Pressure
                </span>
              </motion.div>

              {/* 10 Interactive Peer Nodes */}
              {PEERS.map((peer, idx) => {
                const rad = (peer.angle * Math.PI) / 180;
                // Percentage coordinates
                const left = 50 + (radius / (size / 2)) * 50 * Math.cos(rad);
                const top = 50 + (radius / (size / 2)) * 50 * Math.sin(rad);

                const isActive = activePeer?.id === peer.id;

                return (
                  <button
                    key={peer.id}
                    type="button"
                    onMouseEnter={() => setActivePeer(peer)}
                    onMouseLeave={() => setActivePeer(null)}
                    onFocus={() => setActivePeer(peer)}
                    onBlur={() => setActivePeer(null)}
                    aria-label={`${peer.label} — ${peer.role}`}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className={cn(
                      'absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500',
                      isActive
                        ? 'bg-coral-500 text-white shadow-glow-coral scale-125 z-30'
                        : idx === 0
                        ? 'bg-teal-700 text-cream-100 border border-teal-500 shadow-sm dark:bg-mint-400 dark:text-teal-950'
                        : 'bg-cream-100 text-teal-900 border border-ink-900/15 dark:bg-teal-800 dark:text-cream-100 dark:border-cream-100/15 hover:border-teal-500 hover:scale-110'
                    )}
                  >
                    {peer.id}
                  </button>
                );
              })}
            </div>

            {/* Active Node Info Pill */}
            <div className="mt-6 h-8 flex items-center justify-center">
              {activePeer ? (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-1 rounded-full bg-cream-100 dark:bg-teal-950 border border-ink-900/10 dark:border-cream-100/15 text-xs font-mono text-ink-700 dark:text-cream-200 flex items-center gap-2 shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                  <strong>{activePeer.label}</strong>
                  <span>·</span>
                  <span>{activePeer.role}</span>
                </motion.div>
              ) : (
                <span className="text-xs font-mono text-ink-400 dark:text-cream-400">
                  Hover any node to see cohort representation
                </span>
              )}
            </div>
          </div>

          {/* Right: Three Human Intimacy Pillars with Floating Micro-Levitation */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <motion.div
              animate={prefersReduced ? {} : { y: [0, -3.5, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            >
              <Card variant="surface" padding="md" className="border border-ink-900/10 dark:border-cream-100/10 rounded-2xl bg-white/90 backdrop-blur-md shadow-subtle-card hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-800/60 text-teal-700 dark:text-mint-300 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-ink-900 dark:text-cream-50">
                      You Know Every Face & Voice
                    </h3>
                    <p className="mt-1 text-sm text-ink-600 dark:text-cream-300 leading-relaxed">
                      In a massive webinar, nobody notices if you hold back. In a circle of 10, everyone knows your name, remembers your speech blocks, and genuinely cheers every milestone.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              animate={prefersReduced ? {} : { y: [0, -4, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            >
              <Card variant="surface" padding="md" className="border border-ink-900/10 dark:border-cream-100/10 rounded-2xl bg-white/90 backdrop-blur-md shadow-subtle-card hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-mint-50 dark:bg-mint-950/60 text-teal-800 dark:text-mint-300 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-ink-900 dark:text-cream-50">
                      Individual Clinical Attention
                    </h3>
                    <p className="mt-1 text-sm text-ink-600 dark:text-cream-300 leading-relaxed">
                      With only 10 members, your Speech Language Pathologist actually listens to your specific daily audio journals and tailors 1-on-1 pacing exercises just for you.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              animate={prefersReduced ? {} : { y: [0, -3.5, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            >
              <Card variant="surface" padding="md" className="border border-ink-900/10 dark:border-cream-100/10 rounded-2xl bg-white/90 backdrop-blur-md shadow-subtle-card hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-coral-50 dark:bg-coral-950/40 text-coral-600 dark:text-coral-400 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-ink-900 dark:text-cream-50">
                      Zero Pressure to be Fluent
                    </h3>
                    <p className="mt-1 text-sm text-ink-600 dark:text-cream-300 leading-relaxed">
                      Taking 30 seconds to push past a block? In MYSB, nobody interrupts, nobody looks uncomfortable, and nobody finishes your sentence for you.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

