import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { Container } from './Container';
import { SITE_CONTENT } from '../../content/content';
import { cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const prefersReduced = useReducedMotion();

  // Precision Reading Progress Bar across the top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple, high-performance scroll spy for active navigation item
      const sections = ['about', 'daily-rhythm', 'features', 'events', 'faq'];
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(`#${sections[i]}`);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string, label: string) => {
    setMobileMenuOpen(false);
    trackEvent('cta_click', { placement: 'nav', link_target: href, link_label: label });
  };

  return (
    <>
      {/* Precision Scroll Progress Line across the top of the viewport */}
      {!prefersReduced && (
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-teal-800 via-teal-600 to-coral-500 origin-left z-[60] pointer-events-none shadow-[0_1px_6px_rgba(15,118,110,0.3)]"
          aria-hidden="true"
        />
      )}

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'py-2.5 bg-cream-100/85 dark:bg-teal-950/85 backdrop-blur-xl border-b border-ink-900/[0.07] dark:border-cream-100/10 shadow-subtle'
            : 'py-4 sm:py-5 bg-transparent'
        )}
      >
        <Container size="wide">
          <nav className="flex items-center justify-between gap-4" aria-label="Main Navigation">
            {/* Brand Logo */}
            <a
              href="#"
              onClick={() => handleLinkClick('#', 'Logo Home')}
              className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl"
              aria-label="MYSB Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-teal-900 dark:bg-mint-400 text-cream-100 dark:text-teal-950 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm border border-teal-800/40">
                <svg
                  className="w-5 h-5 transition-transform group-hover:rotate-6 text-mint-400 dark:text-teal-950"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tighter text-ink-900 dark:text-cream-50 leading-none">
                    MYSB
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink-500 dark:text-cream-400 leading-none mt-0.5">
                  Speech Practice
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with Live Active Pill Indicator */}
            <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-ink-900/[0.1] shadow-sm">
              {SITE_CONTENT.nav.links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href, link.label)}
                    className={cn(
                      'relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150 active:scale-[0.97]',
                      isActive
                        ? 'text-cream-50 dark:text-teal-950'
                        : 'text-ink-700 dark:text-cream-200 hover:text-teal-900 dark:hover:text-mint-300'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full bg-teal-900 dark:bg-mint-400 shadow-2xs -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Actions: Live Cohort Badge, Join CTA & Mobile Menu */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Cohort Seat Pill */}
              <a
                href="#register"
                className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-600/15 text-[11px] font-mono font-bold text-teal-900 hover:bg-teal-500/15 transition-colors active:scale-[0.97]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 animate-live-pulse" />
                <span>Cohort 01 · Applications Open</span>
              </a>

              <Button
                href="#register"
                variant="coral"
                size="sm"
                trackingName="nav_join_cta"
                className="hidden sm:inline-flex shadow-sm"
              >
                {SITE_CONTENT.nav.primaryCta}
              </Button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden w-10 h-10 rounded-full border border-ink-900/10 dark:border-cream-100/15 bg-white/70 dark:bg-teal-900/70 backdrop-blur-md flex items-center justify-center text-ink-900 dark:text-cream-50 hover:bg-white active:scale-[0.94] transition-all"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Premium Editorial Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden fixed inset-0 z-40 bg-cream-100/98 dark:bg-teal-950/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] px-6 sm:px-8 overflow-y-auto min-h-[100dvh] max-h-[100dvh]"
          >
            <div className="flex flex-col space-y-4">
              <div className="pb-3 border-b border-ink-900/10 dark:border-cream-100/10 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-ink-500 dark:text-cream-400">
                  Navigation
                </span>
                <span className="text-xs font-mono text-teal-700 dark:text-mint-400">
                  Cohort 1 · 10 Seats
                </span>
              </div>

              {SITE_CONTENT.nav.links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => handleLinkClick(link.href, link.label)}
                  className="flex items-center justify-between py-3 text-xl sm:text-2xl font-display font-semibold tracking-tight text-ink-900 dark:text-cream-50 hover:text-teal-700 dark:hover:text-mint-400 border-b border-ink-900/5 dark:border-cream-100/5 transition-colors active:scale-[0.98]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-ink-400 dark:text-cream-400" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-ink-900/10 dark:border-cream-100/10 space-y-3">
              <Button
                href="#register"
                variant="coral"
                size="lg"
                className="w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
                trackingName="mobile_drawer_join"
              >
                Join the Program →
              </Button>

              <a
                href={SITE_CONTENT.brand.whatsappInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'mobile_drawer' })}
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full border border-teal-600/30 text-teal-800 dark:text-mint-300 font-semibold text-sm hover:bg-teal-50 dark:hover:bg-teal-900/30 active:scale-[0.98] transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Community WhatsApp</span>
              </a>

              <p className="text-xs text-center text-ink-500 dark:text-cream-400 pt-2 font-mono">
                {SITE_CONTENT.brand.fullName} · 8-week speech practice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
