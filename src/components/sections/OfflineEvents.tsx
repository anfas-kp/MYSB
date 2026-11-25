import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Video, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SITE_CONTENT } from '../../content/content';
import { GlassCard } from '../ui/GlassCard';
import { AmbientGlow } from '../ui/AmbientGlow';
import { OrganicBlob } from '../ui/OrganicBlob';

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

          <div className="max-w-xl mx-auto">
            <GlassCard
              variant="elevated"
              hoverEffect
              className="p-8 sm:p-10 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F1F9E4] text-[#3F7300] border border-[#6EC000]/30 font-mono text-xs font-bold uppercase tracking-wider mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cohort 01 Admission
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0B0B]">
                  All-Inclusive Enrollment
                </h3>
                <p className="text-sm text-slate-600 mt-2 mb-6 font-normal">
                  Full 8-week program covering weekly live SLP coaching, daily voice practice, companion app drills, and peer community.
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl sm:text-6xl font-black text-[#0B0B0B] tracking-tight">
                    ₹449
                  </span>
                  <span className="text-sm text-slate-500 font-mono">/ Full 8 Weeks</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <Button
                  href="#register"
                  variant="primary"
                  size="lg"
                  className="w-full text-center"
                >
                  Apply Now
                </Button>
              </div>
            </GlassCard>
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
