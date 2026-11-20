import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Video, 
  CheckCircle2,
  Sparkles,
  Check,
  ArrowRight
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SITE_CONTENT } from '../../content/content';
import { GlassCard } from '../ui/GlassCard';
import { AmbientGlow } from '../ui/AmbientGlow';
import { OrganicBlob } from '../ui/OrganicBlob';
import speakupLogo from '../../assets/01_speakup-logo-primary.png';

export const OfflineEvents: React.FC = () => {

  return (
    <section 
      id="pricing" 
      aria-label="Pricing, Meetups and Safety"
      className="relative scroll-mt-24 sm:scroll-mt-28 pt-10 pb-10 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14 bg-gradient-to-b from-white via-[#FBF9FE] to-white overflow-hidden"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      <AmbientGlow
        variant="lavender"
        className="top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[600px]"
      />

      {/* Starting Organic Blob: sits top-left safely within section bounds */}
      <OrganicBlob
        variant="accent"
        silhouette="asymmetric-cloud"
        className="top-10 -left-20 w-[560px] h-[460px] pointer-events-none"
      />

      {/* Ending Mint Blob: sits bottom-right safely within section bounds */}
      <OrganicBlob
        variant="mint"
        silhouette="diagonal-flow"
        className="bottom-10 -right-20 w-[540px] h-[440px] pointer-events-none"
      />

      <Container size="wide" className="relative z-10 max-w-5xl">
        {/* ══ Part 1: Meetup and Talks ══ */}
        <div className="mb-12 sm:mb-16">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold text-[#6D28D9] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#6EC000] flex-shrink-0" />
              <span>In-Person Gathering & Masterclasses</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B0B0B] leading-tight">
              Online daily.{' '}
              <span className="font-serif italic font-normal text-[#6D28D9]">
                In person once.
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
              In the first month, we meet face to face. Your cohort of 15 and your Speech-Language Pathologists for a focused half-day gathering. Plus 2 to 3 exclusive expert masterclasses throughout the 8 weeks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard
              variant="violet"
              hoverEffect
              className="p-6 sm:p-7 rounded-3xl flex items-start gap-4 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#6D28D9] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B0B0B] group-hover:text-[#6D28D9] transition-colors">
                  Half-Day Offline Meetup
                </h3>
                <p className="text-xs font-mono text-[#6D28D9] mt-0.5 mb-2 font-semibold">
                  First Month · Date & Venue TBD
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Meet your therapists and peers in person. Low-pressure conversational games, shared meals, and building lifelong bonds.
                </p>
              </div>
            </GlassCard>

            <GlassCard
              variant="lime"
              hoverEffect
              className="p-6 sm:p-7 rounded-3xl flex items-start gap-4 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#6EC000] text-black flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B0B0B] group-hover:text-[#3F7300] transition-colors">
                  2 to 3 Expert Talks
                </h3>
                <p className="text-xs font-mono text-[#3F7300] mt-0.5 mb-2 font-semibold">
                  Specialist Guest Series
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Interactive sessions with leading clinicians and specialists on vocal projection, stuttering neurology, and speaking confidence.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* ══ Part 2: Simple Pricing ══ */}
        <div className="mb-20 sm:mb-24">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold text-[#6D28D9] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#6EC000] flex-shrink-0" />
              <span>Transparent Pricing</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0B0B0B] leading-tight">
              Simple pricing.{' '}
              <span className="font-serif italic font-normal text-[#6D28D9]">
                Zero hidden fees.
              </span>
            </h2>

            <p className="mt-2 text-base text-slate-600 leading-relaxed font-normal">
              Full 8 weeks of clinical guidance, companion app access, daily group meets, and the in-person event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-8">
            {/* Tier 1: Community Member */}
            <GlassCard
              variant="violet"
              hoverEffect
              className="p-7 sm:p-9 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6D28D9] text-white font-mono text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs">
                  Community Partner
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B0B0B]">
                  Mindi Thudangam Community Member
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 mb-6 font-normal">
                  Special subsidized enrollment for members of Mindi Thudangam.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-[#6D28D9] tracking-tight">
                    ₹339
                  </span>
                  <span className="text-sm text-slate-500 font-mono">/ Full 8 Weeks</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#6D28D9]/15">
                <Button
                  href="#register"
                  variant="secondary"
                  size="md"
                  className="w-full text-center"
                >
                  Apply as Community Member
                </Button>
              </div>
            </GlassCard>

            {/* Tier 2: Everyone else */}
            <GlassCard
              variant="elevated"
              hoverEffect
              className="p-7 sm:p-9 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F9E4] text-[#3F7300] border border-[#6EC000]/30 font-mono text-xs font-bold uppercase tracking-wider mb-5">
                  <Sparkles className="w-3 h-3" />
                  General Admission
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B0B0B]">
                  Everyone Else
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 mb-6 font-normal">
                  All-inclusive 8-week enrollment for Cohort 01.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-[#0B0B0B] tracking-tight">
                    ₹449
                  </span>
                  <span className="text-sm text-slate-500 font-mono">/ Full 8 Weeks</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <Button
                  href="#register"
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                >
                  Apply Now
                </Button>
              </div>
            </GlassCard>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              REFERRAL TICKET VOUCHER (INSPIRED BY STABLE MONEY PHYSICAL TICKET)
             ═══════════════════════════════════════════════════════════════════════ */}
          <div id="referral-voucher" className="relative scroll-mt-28 sm:scroll-mt-36 p-3.5 sm:p-5 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] shadow-[0_24px_60px_rgba(109,40,217,0.28)] overflow-hidden group">
            
            {/* Playful Floating Confetti Dots & Ribbons (Stable Money aesthetic) */}
            <div aria-hidden="true" className="absolute top-4 left-8 w-2.5 h-2.5 rounded-sm bg-[#6EC000] rotate-45 opacity-80 pointer-events-none" />
            <div aria-hidden="true" className="absolute top-12 left-20 w-1.5 h-3 rounded-full bg-white -rotate-12 opacity-75 pointer-events-none" />
            <div aria-hidden="true" className="absolute bottom-6 left-16 w-3 h-1.5 rounded-sm bg-[#C4B5FD] rotate-12 opacity-60 pointer-events-none" />
            <div aria-hidden="true" className="absolute top-5 right-36 w-2 h-2 rounded-full bg-[#6EC000] opacity-80 pointer-events-none" />
            <div aria-hidden="true" className="absolute bottom-8 right-20 w-2 h-3 rounded-sm bg-white rotate-45 opacity-70 pointer-events-none" />
            <div aria-hidden="true" className="absolute top-16 right-12 w-2.5 h-2.5 rounded-sm bg-[#6EC000] -rotate-45 opacity-75 pointer-events-none" />
            <div aria-hidden="true" className="absolute bottom-4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#6EC000] opacity-70 pointer-events-none" />

            {/* THE PHYSICAL WHITE TICKET WITH PUNCH-HOLE NOTCHES */}
            <div className="relative rounded-[28px] sm:rounded-[36px] bg-white border border-slate-100 shadow-[0_12px_36px_rgba(0,0,0,0.10)] p-6 sm:p-8 lg:p-9 overflow-hidden">
              
              {/* Left Ticket Punch Hole (Inward Semi-Circular Scoop) */}
              <div 
                aria-hidden="true" 
                className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#6D28D9] border-r-2 border-slate-200/60 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.18)] z-20 pointer-events-none" 
              />

              {/* Right Ticket Punch Hole (Inward Semi-Circular Scoop) */}
              <div 
                aria-hidden="true" 
                className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#6D28D9] border-l-2 border-slate-200/60 shadow-[inset_3px_0_6px_rgba(0,0,0,0.18)] z-20 pointer-events-none" 
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
                
                {/* ── LEFT TICKET BODY (7 cols on lg) ─────────────────────────────── */}
                <div className="lg:col-span-7 space-y-4 pr-0 lg:pr-6">
                  
                  {/* Brand Kicker / Header */}
                  <div className="flex items-center gap-3">
                    <img src={speakupLogo} alt="SPEAKUP" className="h-6 sm:h-7 w-auto object-contain" />
                    <span className="h-4 w-[1px] bg-slate-200" aria-hidden="true" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                      Peer Referral Voucher
                    </span>
                  </div>

                  {/* Main Ticket Headline (Stark black + Royal Purple matching reference) */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-display font-extrabold text-[#111111] uppercase tracking-tight leading-[1.12]">
                      Loved Ones You Refer
                    </h3>
                    <span className="text-2xl sm:text-3xl lg:text-[34px] font-display font-extrabold text-[#6D28D9] uppercase tracking-tight leading-[1.12] block">
                      You Both Get ₹199 Off
                    </span>
                  </div>

                  {/* Voucher Separator Hairline */}
                  <div className="border-t border-slate-200/90 pt-3" />

                  {/* Subtext below separator */}
                  <p className="text-sm sm:text-[14.5px] text-[#536178] leading-relaxed font-normal">
                    Connect another person who stammers to SPEAKUP. When they enroll, your cohort fee drops from ₹449 to just <strong className="text-[#111111] font-extrabold underline decoration-[#6EC000] underline-offset-4">₹250</strong> — and they save ₹199 on their first cohort booking.
                  </p>

                  {/* Dual Savings Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7DE] text-[#2E5900] font-bold border border-[#D3F0B3]">
                      <Check className="w-3.5 h-3.5 text-[#3F7300] stroke-[2.5]" />
                      You Save ₹199
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-[#6D28D9] font-bold border border-violet-100">
                      <Check className="w-3.5 h-3.5 text-[#6D28D9] stroke-[2.5]" />
                      Friend Saves ₹199
                    </span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">
                      • Double-Sided Community Benefit
                    </span>
                  </div>

                </div>

                {/* ── RIGHT TICKET STUB (5 cols on lg - strictly centered alignment) ── */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center gap-4 lg:pl-8 lg:border-l lg:border-dashed lg:border-slate-200/90">
                  
                  {/* Ultra-Polished 3D Isometric Gift Box with CSS Physics Micro-Animations (Lottie-Grade Motion) */}
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
                    <svg viewBox="0 0 240 240" className="w-full h-full overflow-visible transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <style>{`
                        @keyframes voucherTokenFloat {
                          0%, 100% { transform: translateY(0px); }
                          50% { transform: translateY(-7px); }
                        }
                        @keyframes voucherLidHover {
                          0%, 100% { transform: translate(42px, -8px) rotate(16deg); }
                          50% { transform: translate(40px, -13px) rotate(19deg); }
                        }
                        @keyframes voucherRibbonSway {
                          0%, 100% { transform: rotate(0deg); }
                          50% { transform: rotate(2.5deg) scaleY(0.98); }
                        }
                        @keyframes voucherConfetti1 {
                          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 0.85; }
                          50% { transform: translateY(-8px) scale(1.2) rotate(18deg); opacity: 1; }
                        }
                        @keyframes voucherConfetti2 {
                          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 0.75; }
                          50% { transform: translateY(-10px) scale(1.25) rotate(-22deg); opacity: 1; }
                        }

                        .ticket-anim-token {
                          animation: voucherTokenFloat 3.2s ease-in-out infinite;
                          transform-origin: 115px 84px;
                          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
                        }
                        .group:hover .ticket-anim-token {
                          animation-play-state: paused;
                          transform: translateY(-15px) scale(1.05);
                        }

                        .ticket-anim-lid {
                          animation: voucherLidHover 3.8s ease-in-out infinite;
                          transform-origin: 145px 52px;
                          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
                        }
                        .group:hover .ticket-anim-lid {
                          animation-play-state: paused;
                          transform: translate(45px, -18px) rotate(23deg) scale(1.03);
                        }

                        .ticket-anim-ribbon {
                          animation: voucherRibbonSway 3s ease-in-out infinite;
                          transform-origin: 115px 185px;
                          transition: transform 0.4s ease-out;
                        }
                        .group:hover .ticket-anim-ribbon {
                          transform: rotate(4deg) scale(1.02);
                        }

                        .ticket-anim-confetti-1 {
                          animation: voucherConfetti1 2.6s ease-in-out infinite;
                          transform-origin: center;
                        }
                        .ticket-anim-confetti-2 {
                          animation: voucherConfetti2 3.4s ease-in-out infinite 0.5s;
                          transform-origin: center;
                        }

                        @media (prefers-reduced-motion: reduce) {
                          .ticket-anim-token,
                          .ticket-anim-lid,
                          .ticket-anim-ribbon,
                          .ticket-anim-confetti-1,
                          .ticket-anim-confetti-2 {
                            animation: none !important;
                          }
                        }
                      `}</style>

                      <defs>
                        {/* Gradients for realistic 3D lighting */}
                        <linearGradient id="ticketBoxFront" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#84E900" />
                          <stop offset="100%" stopColor="#65B300" />
                        </linearGradient>
                        <linearGradient id="ticketBoxSide" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#559900" />
                          <stop offset="100%" stopColor="#386300" />
                        </linearGradient>
                        <linearGradient id="ticketBoxInside" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#192F00" />
                          <stop offset="100%" stopColor="#2D5400" />
                        </linearGradient>
                        <linearGradient id="ticketLidTop" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8FF300" />
                          <stop offset="100%" stopColor="#6DC400" />
                        </linearGradient>
                        <linearGradient id="ticketLidRim" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#559900" />
                          <stop offset="100%" stopColor="#386300" />
                        </linearGradient>
                        <linearGradient id="ticketRibbonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9333EA" />
                          <stop offset="100%" stopColor="#6D28D9" />
                        </linearGradient>
                        <linearGradient id="ticketRibbonDark" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6D28D9" />
                          <stop offset="100%" stopColor="#4C1D95" />
                        </linearGradient>
                        <linearGradient id="ticketTokenGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="100%" stopColor="#F8FAFC" />
                        </linearGradient>
                        <filter id="ticketBadgeShadow" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#4C1D95" floodOpacity="0.22" />
                        </filter>
                        <filter id="ticketBoxShadow" x="-30%" y="-30%" width="160%" height="160%">
                          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.14" />
                        </filter>
                      </defs>

                      {/* LAYER 1: Celebratory Confetti in Background (Animated) */}
                      <g className="ticket-anim-confetti-1">
                        <circle cx="32" cy="48" r="3.2" fill="#6EC000" opacity="0.9" />
                        <polygon points="196,36 203,41 198,49 191,44" fill="#8B5CF6" opacity="0.8" />
                        <circle cx="74" cy="24" r="2.8" fill="#A78BFA" opacity="0.8" />
                        <rect x="204" y="152" width="5" height="5" rx="1" fill="#6EC000" transform="rotate(40 204 152)" opacity="0.8" />
                      </g>

                      <g className="ticket-anim-confetti-2">
                        <polygon points="24,96 32,94 30,102 22,104" fill="#7C3AED" opacity="0.75" />
                        <circle cx="212" cy="85" r="3.5" fill="#6EC000" opacity="0.9" />
                        <polygon points="175,22 181,27 176,32 170,27" fill="#6EC000" opacity="0.85" />
                        <rect x="36" y="148" width="5.5" height="5.5" rx="1" fill="#8B5CF6" transform="rotate(25 36 148)" opacity="0.75" />
                      </g>

                      {/* LAYER 2: OPEN LID FLOATING TILTED IN THE BACKGROUND (Animated) */}
                      <g className="ticket-anim-lid">
                        {/* Lid Top Plane */}
                        <polygon points="90,44 156,18 208,40 142,66" fill="url(#ticketLidTop)" stroke="#6BC000" strokeWidth="1.2" />
                        {/* Lid Front Rim */}
                        <polygon points="90,44 142,66 142,74 90,52" fill="url(#ticketLidRim)" />
                        {/* Lid Right Rim */}
                        <polygon points="142,66 208,40 208,48 142,74" fill="#386300" />

                        {/* Lid Cross Ribbon (Left-Right) */}
                        <polygon points="114,34 122,31 176,52 168,55" fill="url(#ticketRibbonPurple)" />
                        {/* Lid Cross Ribbon (Top-Down) */}
                        <polygon points="151,20 158,18 146,64 139,66" fill="url(#ticketRibbonDark)" />

                        {/* 3D Ribbon Bow on Top of Lid */}
                        <path d="M149 20 C 132 4, 120 16, 146 23 Z" fill="#A855F7" stroke="#7C3AED" strokeWidth="1.2" />
                        <path d="M152 20 C 169 4, 181 16, 155 23 Z" fill="#9333EA" stroke="#6D28D9" strokeWidth="1.2" />
                        <circle cx="150.5" cy="21" r="3.6" fill="#581C87" />
                      </g>

                      {/* LAYER 3: INSIDE HOLLOW VOID OF THE BOX */}
                      <polygon points="52,126 115,96 178,126 115,156" fill="url(#ticketBoxInside)" />
                      <polyline points="52,126 115,96 178,126" stroke="#162A00" strokeWidth="2.5" />

                      {/* LAYER 4: POPPING MEDALLION / TOKEN (Animated Levitation + Spring Bounce) */}
                      <g className="ticket-anim-token" filter="url(#ticketBadgeShadow)">
                        <circle cx="115" cy="84" r="47" fill="url(#ticketTokenGloss)" stroke="#6D28D9" strokeWidth="3.2" />
                        <circle cx="115" cy="84" r="41.5" fill="none" stroke="#DDD6FE" strokeWidth="1.6" strokeDasharray="3.5 3" />
                        
                        <text x="115" y="58" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="9.5" fontWeight="900" fill="#0F172A" letterSpacing="1.2">SPEAKUP</text>
                        <text x="115" y="84" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18.5" fontWeight="900" fill="#6D28D9" letterSpacing="-0.5">₹199 OFF</text>
                        
                        <rect x="81" y="94" width="68" height="16" rx="8" fill="#F3E8FF" />
                        <text x="115" y="105.5" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="800" fill="#7C3AED" letterSpacing="1.2">VOUCHER</text>
                      </g>

                      {/* LAYER 5: 3D ISOMETRIC BOX BODY */}
                      <g filter="url(#ticketBoxShadow)">
                        <polygon points="52,126 115,156 115,212 52,182" fill="url(#ticketBoxFront)" />
                        <polygon points="115,156 178,126 178,182 115,212" fill="url(#ticketBoxSide)" />
                        
                        <line x1="115" y1="156" x2="115" y2="212" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.8" />
                        <line x1="52" y1="126" x2="115" y2="156" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.4" />

                        {/* Vertical Purple Ribbon on Left Face */}
                        <polygon points="78,138 88,143 88,199 78,194" fill="url(#ticketRibbonPurple)" />
                        {/* Vertical Dark Purple Ribbon on Right Face */}
                        <polygon points="142,143 152,138 152,194 142,199" fill="url(#ticketRibbonDark)" />

                        {/* Horizontal Purple Ribbon Wrapped Around Left Face */}
                        <polygon points="52,151 115,181 115,189 52,159" fill="url(#ticketRibbonPurple)" />
                        {/* Horizontal Dark Purple Ribbon Wrapped Around Right Face */}
                        <polygon points="115,181 178,151 178,159 115,189" fill="url(#ticketRibbonDark)" />
                      </g>

                      {/* LAYER 6: DRAPING SILK RIBBON WITH CURLED TAIL (Animated Sway) */}
                      <g className="ticket-anim-ribbon">
                        <path d="M115 185 C 134 194, 156 214, 172 205 C 185 197, 178 182, 198 188" 
                              stroke="url(#ticketRibbonPurple)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                        <path d="M116 185 C 134 194, 156 214, 172 205" 
                              stroke="#C084FC" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.65" />
                        <polygon points="198,188 207,185 203,190 206,195 197,192" fill="#6D28D9" />
                      </g>
                    </svg>
                  </div>

                  {/* Claim Action Button & Micro-Copy (Strictly Centered on the Same Axis as 3D Box) */}
                  <div className="w-full max-w-[260px] sm:max-w-[270px] flex flex-col items-center justify-center gap-2 text-center mx-auto">
                    <a
                      href="#register"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 rounded-2xl bg-[#6EC000] hover:bg-[#62AD00] text-black font-extrabold text-sm sm:text-[15px] border border-black/15 shadow-[0_4px_16px_rgba(110,192,0,0.35)] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer text-center"
                    >
                      <span>Claim Referral Discount</span>
                      <ArrowRight className="w-4 h-4 text-black flex-shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                    <span className="font-mono text-[11px] text-slate-400 text-center block w-full">
                      Apply voucher code in WhatsApp
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ══ Part 3: Safety and Privacy ══ */}
        <GlassCard
          variant="default"
          className="p-8 sm:p-10 rounded-3xl shadow-sm"
        >
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 mb-3 font-mono text-xs font-bold text-[#6D28D9] tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4 text-[#6EC000]" />
              <span>Safety & Ethical Standards</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0B0B0B] tracking-tight">
              Your voice. Your safety.
            </h2>
          </div>

          <div className="space-y-3.5 mb-8">
            {SITE_CONTENT.safetyAndPrivacy.points.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6D28D9] flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-mono">
              India DPDP Act 2023 compliant data protection standards.
            </p>
            <a
              href="#privacy"
              className="text-xs font-bold text-[#6D28D9] hover:underline font-mono uppercase tracking-wider"
            >
              Read Full Privacy and Consent Policy →
            </a>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
};
