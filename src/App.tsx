import { useState, useEffect } from 'react';
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
import { Registration } from './components/sections/Registration';
import { Footer } from './components/sections/Footer';
import { LegalModal } from './components/sections/LegalModal';
import { useSeatCount } from './hooks/useSeatCount';
import { useReducedMotion } from './hooks/useReducedMotion';

export function App() {
  const [, setPreloaderDone] = useState(false);
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

  // Ensure light mode is clean and clear any legacy theme preference
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    try {
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [prefersReduced]);


  return (
    <div className="relative min-h-screen bg-cream-100 text-ink-900 selection:bg-mint-400 selection:text-teal-950">
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

        {/* Statement Section */}
        <Statement />

        {/* A Day in MYSB */}
        <DayInMYSB />

        {/* What You Get (Bento Grid) */}
        <WhatYouGet />

        {/* Numbers & Key Stats */}
        <Numbers />

        {/* Offline Milestone Events */}
        <OfflineEvents />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Registration Section */}
        <Registration
          totalSeats={totalSeats}
          seatsRemaining={seatsRemaining}
          isWaitlist={isWaitlist}
        />
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
