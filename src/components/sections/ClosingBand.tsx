import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SITE_CONTENT } from '../../content/content';
import { trackEvent } from '../../lib/analytics';
import { PaperWaveTransition } from '../ui/PaperWaveTransition';

export const ClosingBand: React.FC = () => {
  return (
    <section id="closing-cta" className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 bg-gradient-to-br from-[#4C1D95] via-[#3B0764] to-[#2E1065] text-white overflow-hidden">
      {/* Top Transition: Smooth Grand Layered Waves into Deep Violet */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none select-none z-10 -mt-1 opacity-95">
        <PaperWaveTransition position="top" variant="faq-to-footer" />
      </div>

      {/* Atmospheric ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-[#6D28D9]/40 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full bg-[#6EC000]/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.18),transparent_70%)]" />
      </div>

      <Container size="wide" className="relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Section Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-violet-200 uppercase tracking-widest backdrop-blur-md mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#6EC000] animate-pulse" />
            <span>Cohort 01 Enrollment · Strictly 15 Seats</span>
          </motion.div>

          {/* Heading with deliberate line break */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-[1.12] text-white max-w-4xl mx-auto"
          >
            Your voice is <br className="hidden sm:inline" />already there.
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 sm:mt-6 text-xl sm:text-2xl md:text-3xl text-violet-200 font-serif italic max-w-xl mx-auto leading-relaxed"
          >
            {SITE_CONTENT.closingCta.subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 w-full"
          >
            <Button
              href="#register"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5 text-black" />}
              trackingName="closing_band_apply"
              className="w-full sm:w-auto text-base px-10 shadow-lg shadow-black/25"
            >
              {SITE_CONTENT.closingCta.buttonText}
            </Button>

            <a
              href={SITE_CONTENT.brand.whatsappInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { placement: 'closing_band' })}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm font-bold transition-all backdrop-blur-md w-full sm:w-auto text-center shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#6EC000]" />
              <span>Questions?</span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
