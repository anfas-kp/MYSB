import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import speakupThreeGroup from '../../assets/speakup-three-group.png';

export interface HeroProps {
  onWatchVideoClick?: () => void;
}

export const Hero: React.FC<HeroProps> = (_props) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY  = useTransform(scrollYProgress, [0, 0.6], [0, prefersReduced ? 0 : -12]);
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, prefersReduced ? 1 : 0]);
  const imgY      = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -8]);

  const easeOut = [0.22, 1, 0.36, 1] as const;

  const appear = (delay: number) => ({
    hidden:  { opacity: 0, y: prefersReduced ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut, delay: prefersReduced ? 0 : delay } },
  });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-white to-[#FAF8FF] pb-6 sm:pb-8"
    >
      {/* ── BACKGROUND CANVAS & ATMOSPHERIC LIGHTING ───────────────────────── */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 98%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 72%, transparent 98%)',
        }}
      >
        {/* Soft lavender ambient lighting behind left typography */}
        <div
          className="absolute -top-32 -left-24 rounded-full"
          style={{
            width: 580,
            height: 580,
            background: 'radial-gradient(circle, rgba(109,40,217,0.05) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Subtle dot matrix — upper portion only */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(109,40,217,0.08) 0.85px, transparent 0.85px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse 70% 45% at 30% 18%, black 0%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 45% at 30% 18%, black 0%, transparent 85%)',
          }}
        />

        {/* ── LAYERED FLOWING 3D PAPER LAVENDER WAVES (BEHIND CONTENT & STATS) ── */}
        {/*
          Taller wave crests (height: clamp(280px, 34vw, 440px)) that reach up behind
          the lower jeans and under the statistics pill to eliminate any stark white gaps.
        */}
        <svg
          className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
          viewBox="0 0 1440 380"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ 
            height: 'clamp(280px, 34vw, 440px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 96%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 96%)'
          }}
        >
          <defs>
            {/* Soft ambient drop shadows between overlapping wave layers */}
            <filter id="waveShadow1" x="-5%" y="-30%" width="110%" height="160%">
              <feDropShadow dx="0" dy="-4" stdDeviation="10" floodColor="#6D28D9" floodOpacity="0.06" />
            </filter>
            <filter id="waveShadow2" x="-5%" y="-30%" width="110%" height="160%">
              <feDropShadow dx="0" dy="-3" stdDeviation="8" floodColor="#6D28D9" floodOpacity="0.04" />
            </filter>

            {/* Gradient fills for the 3 wave layers */}
            <linearGradient id="waveLayer1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ECE3FD" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#E0CFF8" stopOpacity="0.97" />
              <stop offset="100%" stopColor="#D4BEF8" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="waveLayer2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5EEFF" stopOpacity="0.90" />
              <stop offset="55%" stopColor="#EBDEFB" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#DFCDF9" stopOpacity="0.92" />
            </linearGradient>

            <linearGradient id="waveLayer3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FAF7FF" stopOpacity="0.98" />
              <stop offset="60%" stopColor="#F5EDFF" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#EDE0FC" stopOpacity="0.96" />
            </linearGradient>
          </defs>

          {/* Wave 1 (Back layer): sweeps high up the right edge and under the group visual */}
          <path
            d="M 0 380 L 0 305 C 240 290, 500 325, 760 300 C 1020 270, 1240 140, 1440 30 L 1440 380 Z"
            fill="url(#waveLayer1)"
            filter="url(#waveShadow1)"
          />

          {/* Wave 2 (Middle layer): smooth organic flowing curve under the stats card */}
          <path
            d="M 0 380 L 0 330 C 260 315, 520 345, 800 325 C 1060 295, 1260 190, 1440 90 L 1440 380 Z"
            fill="url(#waveLayer2)"
            filter="url(#waveShadow2)"
          />

          {/* Wave 3 (Front layer): delicate airy lavender-white crest */}
          <path
            d="M 0 380 L 0 355 C 300 340, 560 365, 860 345 C 1100 320, 1280 240, 1440 160 L 1440 380 Z"
            fill="url(#waveLayer3)"
          />
        </svg>

        {/* Ambient violet backlight behind the right wave crest */}
        <div
          className="absolute -bottom-10 right-0 w-[800px] h-[450px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 75% 75%, rgba(167,139,250,0.30) 0%, rgba(224,204,252,0.15) 50%, transparent 75%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* ── 1. TWO-COLUMN EDITORIAL HERO CONTAINER (UNIFIED SECTION) ────────── */}
      <div className="relative z-20 mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 xl:px-16 pt-28 sm:pt-32 lg:pt-[148px] xl:pt-[156px]">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[43%_57%] lg:gap-4 xl:gap-7">

          {/* ══════════════════════════════════════════════════════════════════
              LEFT COLUMN — 43% WIDTH: EDITORIAL TYPOGRAPHY & CTAS
          ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ opacity: contentOp, y: contentY }}
            className="flex flex-col justify-start pt-1"
          >
            {/* Cohort announcement badge */}
            <motion.div
              variants={appear(0)}
              initial="hidden"
              animate="visible"
              className="mb-2.5 sm:mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#6D28D9]/20 bg-[#F5F0FF] px-3.5 py-1 sm:px-4 sm:py-1.5"
            >
              <span className="relative flex h-[7px] w-[7px] flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6EC000] opacity-80" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#6EC000]" />
              </span>
              <span className="font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#6D28D9]">
                COHORT 01 NOVEMBER · STRICTLY 15 SEATS
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="overflow-visible">
              {/* First line: oversized, extra-bold modern sans-serif */}
              <motion.h1
                variants={appear(0.08)}
                initial="hidden"
                animate="visible"
                className="font-display font-extrabold leading-[1.03] tracking-[-0.04em] text-[#111111]"
                style={{ fontSize: 'clamp(2.3rem, 4.1vw, 3.7rem)' }}
              >
                Find your voice.
              </motion.h1>

              {/* Second line: elegant italic serif in violet #6D28D9 with lime underline */}
              <motion.div
                variants={appear(0.14)}
                initial="hidden"
                animate="visible"
                className="mt-0.5"
                style={{ fontSize: 'clamp(2.3rem, 4.1vw, 3.7rem)' }}
              >
                <span
                  className="font-serif italic font-normal text-[#6D28D9] tracking-[-0.018em]"
                  style={{ fontSize: 'inherit', lineHeight: 1.05 }}
                >
                  Own your{' '}
                  <span className="relative inline-block">
                    words.
                    {/* Delicate lime-green hand-drawn underline SVG beneath words */}
                    <svg
                      className="absolute left-0 w-full"
                      viewBox="0 0 220 14"
                      fill="none"
                      aria-hidden="true"
                      preserveAspectRatio="none"
                      style={{ bottom: '-5px', height: '11px', pointerEvents: 'none' }}
                    >
                      <motion.path
                        d="M3 8 C38 3, 86 11, 132 7 C172 3, 200 9, 218 6"
                        stroke="#6EC000"
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.5, ease: easeOut }}
                      />
                    </svg>
                  </span>
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              variants={appear(0.20)}
              initial="hidden"
              animate="visible"
              className="mt-3 sm:mt-3.5 max-w-[420px] text-[14px] sm:text-[14.5px] leading-[1.60] text-[#536178]"
            >
              An 8-week speech program for young people aged 15 to 30 who stammer.
              Daily practice in the Zlaqa app, weekly live sessions with
              Speech-Language Pathologists, and a safe cohort of 15.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={appear(0.26)}
              initial="hidden"
              animate="visible"
              className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3"
            >
              <Button
                href="#register"
                variant="primary"
                size="lg"
                trackingName="hero_apply_now"
                icon={<ArrowRight className="w-[16px] h-[16px] text-black" />}
                className="rounded-full px-6 py-2.5 text-[14.5px] font-bold shadow-[0_5px_20px_rgba(110,192,0,0.40)]"
              >
                Apply now
              </Button>
              <a
                href="#daily-rhythm"
                className="inline-flex items-center gap-2 rounded-full border border-[#6D28D9]/35 bg-white px-5 py-2.5 text-[14.5px] font-semibold text-[#6D28D9] shadow-sm transition-all duration-150 hover:border-[#6D28D9] hover:bg-[#F5F0FF] active:scale-[0.97]"
              >
                How it works
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Trust indicators — 100% visible with clean clearance above stats pill */}
            <motion.div
              variants={appear(0.32)}
              initial="hidden"
              animate="visible"
              className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 pb-2"
            >
              {['100% judgment-free space', 'Certified SLP guidance', 'Ages 15–30'].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 text-[12px] sm:text-[12.5px] text-[#536178]">
                  <CheckCircle className="h-[13.5px] w-[13.5px] flex-shrink-0 text-[#6EC000]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT COLUMN — 56% WIDTH: THREE-PERSON GROUP COMPOSITION
              Extended downward with lavender blob and waves filling the lower gap!
          ═══════════════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: easeOut }}
            className="relative flex w-full items-center justify-center pt-1 lg:pt-0 lg:translate-y-6 xl:translate-y-8"
          >
            {/* Visual presentation wrapper */}
            <div className="relative w-full max-w-[680px] xl:max-w-[720px]">

              {/* ── 2. PROMINENT ORGANIC LAVENDER BLOBS & GAP FILLER ART ────── */}
              {/*
                Fills the entire background including the lower gap between jeans and stats panel!
                Extends from above the heads down to the bottom waves.
              */}
              <div
                className="pointer-events-none absolute -inset-x-8 -top-12 -bottom-24 select-none z-0 overflow-visible"
                aria-hidden="true"
              >
                {/* Radial ambient backlight centered behind the heads */}
                <div
                  className="absolute left-[10%] top-[4%] h-[80%] w-[82%] rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 50% 36%, rgba(109,40,217,0.24) 0%, rgba(139,92,246,0.14) 45%, transparent 75%)',
                    filter: 'blur(32px)',
                  }}
                />

                {/* Lower violet blob fill: specifically fills behind the lap, jeans, and under stats panel */}
                <div
                  className="absolute left-[5%] bottom-[-22%] h-[65%] w-[90%] rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(225,208,252,0.96) 0%, rgba(235,223,254,0.85) 45%, rgba(245,239,255,0.40) 75%, transparent 100%)',
                    filter: 'blur(22px)',
                  }}
                />

                {/* Main organic SVG blob shapes (scaled to 800x740 to cover the entire lower region) */}
                <svg
                  className="h-[132%] w-[118%]"
                  viewBox="0 0 800 740"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Primary large organic blob: rich pastel lavender with soft gradient */}
                    <linearGradient id="mainLavenderGrad" x1="20%" y1="10%" x2="80%" y2="90%">
                      <stop offset="0%" stopColor="#DFCEFB" stopOpacity="0.96" />
                      <stop offset="40%" stopColor="#E8DCFC" stopOpacity="0.94" />
                      <stop offset="75%" stopColor="#EDE2FD" stopOpacity="0.90" />
                      <stop offset="100%" stopColor="#E2D0FA" stopOpacity="0.88" />
                    </linearGradient>

                    {/* Secondary overlapping translucent lavender contour for rich depth */}
                    <linearGradient id="accentLavenderGrad" x1="70%" y1="15%" x2="30%" y2="85%">
                      <stop offset="0%" stopColor="#D5BEF8" stopOpacity="0.85" />
                      <stop offset="55%" stopColor="#E3D2FA" stopOpacity="0.70" />
                      <stop offset="100%" stopColor="#EADBFA" stopOpacity="0.55" />
                    </linearGradient>

                    {/* Controlled feathered blur so the organic shape remains visibly defined */}
                    <filter id="softBlobFeather" x="-10%" y="-10%" width="120%" height="120%">
                      <feGaussianBlur stdDeviation="6" />
                    </filter>
                  </defs>

                  {/* Primary large organic blob: extends all the way down to y:710 to connect with the wave! */}
                  <path
                    d="M 400 30 C 580 15, 740 60, 770 200 C 800 350, 765 530, 710 650 C 630 730, 370 740, 210 690 C 95 640, 70 490, 95 330 C 125 180, 220 50, 400 30 Z"
                    fill="url(#mainLavenderGrad)"
                    filter="url(#softBlobFeather)"
                  />

                  {/* Secondary overlapping organic contour extending behind the center guy, girl, and lap */}
                  <path
                    d="M 450 70 C 580 45, 710 95, 730 220 C 750 360, 710 520, 590 620 C 450 700, 280 660, 210 540 C 160 410, 240 220, 320 120 C 360 80, 410 75, 450 70 Z"
                    fill="url(#accentLavenderGrad)"
                    filter="url(#softBlobFeather)"
                  />
                </svg>
              </div>

              {/* ── 3. THIN PURPLE ORBITAL CURVE DECORATION ────────────────── */}
              {/*
                Delicate violet elliptical orbit stroke surrounding the group,
                visible above background shapes but behind people and floating pills.
              */}
              <svg
                className="pointer-events-none absolute inset-0 -top-4 -left-4 h-[108%] w-[108%] select-none z-0"
                viewBox="0 0 740 540"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="purpleOrbitGrad" x1="0%" y1="70%" x2="100%" y2="20%">
                    <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.40" />
                    <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.80" />
                    <stop offset="80%" stopColor="#A78BFA" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.30" />
                  </linearGradient>
                </defs>
                <path
                  d="M 30 330 C 30 170, 180 40, 400 30 C 600 20, 710 105, 700 245 C 690 375, 550 460, 410 480"
                  stroke="url(#purpleOrbitGrad)"
                  strokeWidth="1.8"
                  fill="none"
                />
              </svg>

              {/* ── 4. THE THREE-PERSON HERO PHOTOGRAPH ──────────────────────── */}
              {/*
                Standalone cutout PNG with transparent background.
                Fades gently at the bottom into the rich violet blob and wave layers!
              */}
              <img
                src={speakupThreeGroup}
                alt="Three young South Asian adults in a friendly, supportive speech practice conversation"
                loading="eager"
                className="relative z-10 block h-auto w-full object-contain"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 90%, rgba(0,0,0,0.85) 96%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 90%, rgba(0,0,0,0.85) 96%, transparent 100%)',
                }}
              />

            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          5. ULTRA-PREMIUM GLASS PILL STATISTICS PANEL (z-30)
          Enhanced to a luxury continuous pill capsule with Apple-grade frosted glass,
          specular rim lighting, elegant vertical dividers, and subtle brand accents.
      ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        variants={appear(0.38)}
        initial="hidden"
        animate="visible"
        className="relative z-30 mx-auto w-full px-4 sm:px-8 lg:px-12 xl:px-16 mt-4 sm:mt-6 lg:-mt-3 xl:-mt-4"
        style={{ maxWidth: 1220 }}
      >
        {/* Soft atmospheric violet glow behind stats pill to blend seamlessly with the lavender wave */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 -inset-y-6 sm:-inset-y-8 bg-[radial-gradient(ellipse_80%_65%_at_50%_50%,rgba(167,139,250,0.22),rgba(224,204,252,0.12)_50%,transparent_75%)] blur-2xl -z-10"
        />

        <div
          className="relative overflow-hidden rounded-[28px] sm:rounded-full bg-white border border-white/95 shadow-[0_20px_50px_-10px_rgba(109,40,217,0.13),0_4px_16px_rgba(0,0,0,0.03)]"
        >
          {/* Subtle top specular glass rim light */}
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 items-center">
            {[
              {
                value: '15–30',
                label: 'AGE RANGE',
                color: '#111111',
              },
              {
                value: '8 Weeks',
                label: 'DURATION',
                color: '#111111',
              },
              {
                value: '15 Seats',
                label: 'STRICT CAP',
                color: '#6D28D9',
              },
              {
                value: '₹449',
                label: 'COHORT FEE',
                color: '#5EB700',
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className="relative flex flex-col items-center justify-center text-center px-4 py-5 sm:py-6 lg:py-6.5"
              >
                {/* Desktop vertical divider */}
                {i > 0 && (
                  <div
                    className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-slate-200/80"
                    aria-hidden="true"
                  />
                )}

                {/* Mobile vertical divider between column pairs */}
                {(i === 1 || i === 3) && (
                  <div
                    className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 h-9 w-[1px] bg-slate-200/80"
                    aria-hidden="true"
                  />
                )}

                {/* Mobile horizontal divider between row 1 and row 2 */}
                {i >= 2 && (
                  <div
                    className="sm:hidden absolute top-0 left-6 right-6 h-[1px] bg-slate-200/60"
                    aria-hidden="true"
                  />
                )}

                <span
                  className="font-display text-[1.85rem] sm:text-[2.05rem] lg:text-[2.25rem] font-extrabold leading-none tracking-tight"
                  style={{ color: s.color }}
                >
                  {s.value}
                </span>

                <span className="mt-2 font-mono text-[9px] sm:text-[10px] lg:text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#536178]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
