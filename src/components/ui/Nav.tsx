import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { TopBanner } from './TopBanner';
import { SITE_CONTENT } from '../../content/content';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import speakupLogo from '../../assets/01_speakup-logo-primary.png';

export interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState<string>('');
  const [isScrolled, setIsScrolled]         = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const sections = ['problem', 'features', 'daily-rhythm', 'pricing', 'faq'];
      const pos = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= pos) {
          setActiveSection(`#${sections[i]}`);
          return;
        }
      }
      if (window.scrollY < 200) setActiveSection('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLink = (href: string, label: string) => {
    setMobileMenuOpen(false);
    trackEvent('cta_click', { placement: 'nav', link_target: href, link_label: label });
  };

  return (
    <>
      {/* 00. Top Referral Announcement Banner */}
      <TopBanner
        isScrolled={isScrolled}
        onDismiss={() => setBannerDismissed(true)}
      />

      {/* Reading progress bar */}
      {!prefersReduced && (
        <motion.div
          style={{ scaleX }}
          className={cn(
            "fixed left-0 right-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-[#6EC000] via-[#6D28D9] to-[#5B21B6] pointer-events-none transition-all duration-300",
            !isScrolled && !bannerDismissed ? "top-10 sm:top-11" : "top-0"
          )}
          aria-hidden="true"
        />
      )}

      {/* ── 1. FLOATING GLASS CAPSULE NAVBAR (SCROLL-MORPHING HUD) ──────── */}
      <header className={cn(
        'fixed left-0 right-0 top-0 z-40 pointer-events-none px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-out',
        isScrolled 
          ? 'pt-2.5 sm:pt-3' 
          : !bannerDismissed 
            ? 'pt-14 sm:pt-16' 
            : 'pt-4 sm:pt-6'
      )}>
        <div
          className={cn(
            'mx-auto flex w-full items-center justify-between pointer-events-auto transition-all duration-300 ease-out',
            'rounded-full bg-white/96 backdrop-blur-[24px]',
            isScrolled
              ? 'max-w-[1240px] px-4 sm:px-6 py-2 sm:py-2.5 min-h-[58px] border border-slate-200/90 shadow-[0_12px_32px_rgba(109,40,217,0.06),0_2px_8px_rgba(0,0,0,0.04)]'
              : 'max-w-[1380px] px-5 sm:px-7 lg:px-8 py-3 sm:py-3.5 min-h-[74px] border border-white/85 shadow-[0_16px_40px_rgba(109,40,217,0.08),0_2px_10px_rgba(0,0,0,0.03)]'
          )}
        >
          {/* LEFT: Logo + Thin Vertical Separator */}
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="#"
              onClick={() => handleLink('#', 'Logo')}
              className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded-lg"
              aria-label="SPEAKUP Home"
            >
              <img 
                src={speakupLogo} 
                alt="SPEAKUP" 
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  isScrolled ? "h-6 sm:h-6.5 lg:h-7" : "h-7 sm:h-8 lg:h-8.5"
                )} 
              />
            </a>

            {/* Thin vertical separator line */}
            <div className={cn(
              "hidden lg:block w-[1px] bg-slate-200/90 transition-all duration-300",
              isScrolled ? "h-5" : "h-6"
            )} aria-hidden="true" />
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {SITE_CONTENT.nav.links.map(link => {
              const active = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLink(link.href, link.label)}
                  className={cn(
                    'relative rounded-full font-medium transition-all duration-200',
                    isScrolled ? 'px-3 py-1 text-[13px]' : 'px-3.5 py-1.5 text-[13.5px]',
                    active
                      ? 'text-[#6D28D9] font-semibold'
                      : 'text-[#536178] hover:text-[#111111]'
                  )}
                >
                  {active && !prefersReduced && (
                    <motion.div
                      layoutId="navCapsulePill"
                      className="absolute inset-0 rounded-full bg-[#F5F0FF]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT: Cohort 01 Pill + Apply Now CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cohort 01 · 15 Seats Only pill (collapses on scroll for clean reading mode) */}
            <a
              href="#register"
              className={cn(
                "items-center gap-2 rounded-full border border-[#6D28D9]/20 bg-[#F5F0FF] px-3.5 py-1.5 text-[11px] font-mono font-bold text-[#6D28D9] transition-all duration-300 hover:bg-[#EDE9FE] active:scale-[0.97]",
                isScrolled ? "hidden" : "hidden xl:inline-flex"
              )}
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6EC000] opacity-80" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#6EC000]" />
              </span>
              Cohort 01 · 15 Seats Only
            </a>

            {/* Lime-green Apply Now pill button */}
            <Button
              href="#register"
              variant="primary"
              size="sm"
              trackingName="nav_apply"
              icon={<ArrowRight className={cn("transition-transform text-black", isScrolled ? "w-3 h-3" : "w-3.5 h-3.5")} />}
              className={cn(
                "hidden sm:inline-flex rounded-full font-bold shadow-[0_4px_16px_rgba(110,192,0,0.36)] hover:shadow-[0_6px_20px_rgba(110,192,0,0.45)] transition-all duration-300",
                isScrolled ? "px-4 py-2 text-[12.5px]" : "px-5 py-2.5 text-[13.5px]"
              )}
            >
              Apply now
            </Button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={cn(
                "lg:hidden rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#111111] shadow-2xs transition-all hover:bg-slate-50 active:scale-[0.94]",
                isScrolled ? "h-9 w-9" : "h-10 w-10"
              )}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-white/98 px-6 pb-10 pt-28 backdrop-blur-2xl min-h-[100dvh]"
          >
            <div className="space-y-1">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#536178]">Navigation</span>
                <span className="font-mono text-xs font-bold text-[#6D28D9]">Cohort 01 · 15 Seats</span>
              </div>
              {SITE_CONTENT.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.22 }}
                  onClick={() => handleLink(link.href, link.label)}
                  className="flex items-center justify-between border-b border-slate-50 py-3.5 text-2xl font-semibold text-[#111111] hover:text-[#6D28D9] transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-300" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
              <Button
                href="#register"
                variant="primary"
                size="lg"
                className="w-full rounded-full text-center"
                onClick={() => setMobileMenuOpen(false)}
                trackingName="mobile_apply"
              >
                Apply for Cohort 01 →
              </Button>
              <a
                href={SITE_CONTENT.brand.whatsappInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'mobile_drawer' })}
                className="flex items-center justify-center gap-2 w-full rounded-full border border-[#6D28D9]/25 py-3.5 text-sm font-semibold text-[#6D28D9] hover:bg-[#F5F0FF] transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                Join Community WhatsApp
              </a>
              <p className="pt-1 text-center font-mono text-[11px] text-[#536178]">
                {SITE_CONTENT.brand.fullName} · 8-week speech practice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
