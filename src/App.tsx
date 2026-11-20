import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Nav } from './components/ui/Nav';
import { StickyBar } from './components/ui/StickyBar';
import { VideoModal } from './components/ui/VideoModal';
import { Toast } from './components/ui/Toast';
import { Preloader } from './components/sections/Preloader';
import { Hero } from './components/sections/Hero';
import { Statement } from './components/sections/Statement';
import { DayInMYSB } from './components/sections/DayInMYSB';
import { WhatYouGet } from './components/sections/WhatYouGet';
import { Numbers } from './components/sections/Numbers';
import { OfflineEvents } from './components/sections/OfflineEvents';
import { FAQ } from './components/sections/FAQ';
import { ClosingBand } from './components/sections/ClosingBand';
import { Registration } from './components/sections/Registration';
import { Footer } from './components/sections/Footer';
import { LegalModal } from './components/sections/LegalModal';
import { useSeatCount } from './hooks/useSeatCount';
import { useReducedMotion } from './hooks/useReducedMotion';

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [toastInfo, setToastInfo] = useState<{
    isOpen: boolean;
    title: string;
    message?: string;
    type?: 'success' | 'error' | 'info';
  }>({ isOpen: false, title: '' });

  const { totalSeats, seatsRemaining, isWaitlist } = useSeatCount();
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  // Ensure light mode is clean and clear any legacy theme preference
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('speakup-theme');
      localStorage.removeItem('mysb-theme');
    } catch {
      // ignore
    }
  }, []);

  // Lenis Smooth Scrolling Engine
  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  // Handle /apply route & deep-link: keeps clean "/apply" in the address bar (no "#") and scrolls to registration
  useEffect(() => {
    const pathname = window.location.pathname.replace(/\/+$/, '');
    const isApplyPath = pathname === '/apply';
    const hasRegisterHash = window.location.hash === '#register';

    if (isApplyPath || hasRegisterHash) {
      // Keep clean URL without '#' symbol (e.g. speak.zlaqa.com/apply)
      if (hasRegisterHash) {
        window.history.replaceState(null, '', '/apply');
      }

      if (preloaderDone) {
        const timer = setTimeout(() => {
          const registerEl = document.getElementById('register');
          if (registerEl) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(registerEl, { offset: -24, duration: 1.2 });
            } else {
              registerEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 120);

        return () => clearTimeout(timer);
      }
    }
  }, [preloaderDone]);

  // Clean in-page anchor clicks from "#register" to clean "/apply" without "#"
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#register') {
        window.history.replaceState(null, '', '/apply');
        const registerEl = document.getElementById('register');
        if (registerEl) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(registerEl, { offset: -24, duration: 1.2 });
          } else {
            registerEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-ink-900 selection:bg-[#F1F9E4] selection:text-[#3F7300]">
      {/* 01. Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* 02. Global Navigation Header */}
      <Nav />

      {/* 04. Main Content Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onWatchVideoClick={() => setIsVideoOpen(true)}
        />

        {/* Problem Section */}
        <Statement />

        {/* What You Get */}
        <WhatYouGet />

        {/* A Day in SPEAKUP */}
        <DayInMYSB />

        {/* Numbers & Key Stats */}
        <Numbers />

        {/* Offline Milestone Events, Pricing & Safety */}
        <OfflineEvents />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Application Form */}
        <Registration
          totalSeats={totalSeats}
          seatsRemaining={seatsRemaining}
          isWaitlist={isWaitlist}
        />

        {/* Final Call to Action Banner */}
        <ClosingBand />
      </main>

      {/* 05. Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
      />

      {/* 06. Mobile Sticky Bar */}
      <StickyBar />

      {/* 07. Video Player Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* 08. Legal Privacy & Terms Slide-over */}
      <LegalModal
        isOpen={Boolean(legalModal)}
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />

      {/* 09. Floating Toast Notifications */}
      <Toast
        isOpen={toastInfo.isOpen}
        title={toastInfo.title}
        message={toastInfo.message}
        type={toastInfo.type}
        onClose={() => setToastInfo((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}

export default App;
