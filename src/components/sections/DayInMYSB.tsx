import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Users, Moon, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GlassCard } from '../ui/GlassCard';
import { OrganicBlob } from '../ui/OrganicBlob';
import { AmbientGlow } from '../ui/AmbientGlow';

export const DayInMYSB: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="daily-rhythm"
      aria-label="A Day in SPEAKUP"
      className="relative scroll-mt-32 sm:scroll-mt-40 pt-28 pb-20 sm:pt-36 sm:pb-28 bg-gradient-to-b from-white via-[#F7FBF4] to-[#FAF8FF] text-[#0B0B0B] overflow-hidden"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      {/* Soft dual lime-lavender ambient glow harmonizing the two practice modes */}
      <AmbientGlow
        variant="dual"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[600px]"
      />

      {/* Starting Mint Mound Blob: sits top-left safely within section bounds */}
      <OrganicBlob
        variant="mint"
        silhouette="bottom-mound"
        className="top-10 -left-20 w-[580px] h-[480px] pointer-events-none"
      />

      {/* Ending Lavender Flow Blob: sits bottom-right safely within section bounds */}
      <OrganicBlob
        variant="secondary"
        silhouette="diagonal-flow"
        className="bottom-10 -right-20 w-[600px] h-[500px] pointer-events-none"
      />

      <Container className="relative z-10 max-w-5xl">
        {/* Header */}
        <div className="max-w-2xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold text-[#6D28D9] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#6EC000] flex-shrink-0" />
            <span>A Day in SPEAKUP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B0B0B] leading-tight">
            20 minutes.{' '}
            <span className="font-serif italic font-normal text-[#6D28D9]">
              That’s all we ask.
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Short, focused, and low-friction. Built to fit effortlessly into your work, college, or school routine without burnout.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EFFF] border border-[#EDE9FE] text-xs font-mono font-semibold text-[#6D28D9]">
            <Sparkles className="w-3.5 h-3.5 text-[#6EC000]" />
            <span>10 Mins Solo App + 10 Mins Live Peer Circle</span>
          </div>
        </div>

        {/* Two-Step Visual Graphic with Connecting Energy & Continuous Daily Flow */}
        <div className="relative">
          {/* Connecting Energy Bridge Header */}
          <div className="mb-6 flex items-center justify-center relative">
            {/* Connecting Flow Gradient Line */}
            <div 
              aria-hidden="true"
              className="absolute inset-x-8 sm:inset-x-16 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#6EC000]/70 via-[#8B5CF6] to-[#6D28D9]/70 pointer-events-none rounded-full" 
            />
            
            {/* Floating Glass Pill */}
            <div className="relative z-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-white/90 shadow-[0_12px_28px_rgba(109,40,217,0.10)] ring-1 ring-[#6D28D9]/15">
              <span className="w-2 h-2 rounded-full bg-[#6EC000] animate-live-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                20 Mins Daily Total · Low Friction
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Step 1: Lime Card (Zlaqa App) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="h-full"
            >
              <GlassCard
                variant="lime"
                hoverEffect
                className="h-full p-7 sm:p-9 flex flex-col justify-between group"
              >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6EC000] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-2xs">
                    <Clock className="w-3.5 h-3.5" />
                    Step 01 · 10 Minutes
                  </span>
                  <span className="w-10 h-10 rounded-2xl bg-white/90 text-[#3F7300] flex items-center justify-center font-bold shadow-2xs border border-[#6EC000]/30 group-hover:scale-105 transition-transform">
                    <Smartphone className="w-5 h-5 text-[#3F7300]" />
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0B0B0B] mb-2 tracking-tight group-hover:text-[#3F7300] transition-colors">
                  Zlaqa App Practice
                </h3>

                <p className="text-sm sm:text-base font-semibold text-[#3F7300] mb-4">
                  Breathe. Practice. Speak.
                </p>

                <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                  Open the Zlaqa companion app on your phone. Follow guided diaphragmatic breathing routines, spontaneous image prompts, and gentle vocal exercises in your own private room.
                </p>
              </div>

              <div className="pt-5 border-t border-[#6EC000]/25 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7300] flex-shrink-0" />
                  <span>Diaphragmatic vocal relaxation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7300] flex-shrink-0" />
                  <span>Spontaneous speech rhythm prompts</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#3F7300] flex-shrink-0" />
                  <span>Private recording reviewed with your SLP</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Step 2: Violet Card (Group Meet) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="h-full"
          >
            <GlassCard
              variant="violet"
              hoverEffect
              className="h-full p-7 sm:p-9 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6D28D9] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-2xs">
                    <Clock className="w-3.5 h-3.5" />
                    Step 02 · 10 Minutes
                  </span>
                  <span className="w-10 h-10 rounded-2xl bg-white/90 text-[#6D28D9] flex items-center justify-center font-bold shadow-2xs border border-[#6D28D9]/30 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5 text-[#6D28D9]" />
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0B0B0B] mb-2 tracking-tight group-hover:text-[#6D28D9] transition-colors">
                  Daily Group Meet
                </h3>

                <p className="text-sm sm:text-base font-semibold text-[#6D28D9] mb-4">
                  Say something. Hear someone else say something.
                </p>

                <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                  Jump on a quick Google Meet with your cohort of 15. A safe circle where stammering is 100% normalized. No rush, no interruptions, and zero shame.
                </p>
              </div>

              <div className="pt-5 border-t border-[#6D28D9]/20 space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
                  <span>Unlimited time to finish your thought</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
                  <span>Active listening & genuine peer empathy</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9] flex-shrink-0" />
                  <span>Zero pressure to sound "fluent"</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

        {/* Schedule & Sunday Rest Banner */}
        <div className="mt-8">
          <GlassCard
            variant="default"
            className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#F5EFFF] border border-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-[#6D28D9]" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0B0B0B]">
                  Monday to Saturday · Around 8:30 PM IST
                </p>
                <p className="text-xs text-slate-600">
                  <strong className="text-[#6D28D9]">Sunday is complete rest</strong> — no recordings, no meetings. Voice recovery.
                </p>
              </div>
            </div>

            <a
              href="#journey"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 border border-slate-200 hover:border-[#6D28D9] text-xs font-bold font-mono uppercase tracking-wider text-[#6D28D9] hover:bg-[#F5EFFF] transition-all flex-shrink-0 shadow-2xs"
            >
              <span>View 8-Week Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
};
