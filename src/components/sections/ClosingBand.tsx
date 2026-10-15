import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Mic, Users, Star } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { SITE_CONTENT } from '../../content/content';
import { trackEvent } from '../../lib/analytics';

const floatingPills = [
  { icon: <Mic className="w-3.5 h-3.5" />, text: 'Daily 20-min practice', delay: 0 },
  { icon: <Users className="w-3.5 h-3.5" />, text: '9 peers who get it', delay: 0.1 },
  { icon: <Star className="w-3.5 h-3.5" />, text: '₹199 Program Fee', delay: 0.2 },
];

export const ClosingBand: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-teal-950 text-cream-100 overflow-hidden">

      {/* Animated ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-teal-600/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-coral-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-mint-400/10 blur-3xl"
        />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Floating feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2.5 mb-6 sm:mb-8"
          >
            {floatingPills.map((pill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: pill.delay + 0.2, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-cream-200 text-xs font-semibold backdrop-blur-md"
              >
                <span className="text-mint-400">{pill.icon}</span>
                {pill.text}
              </motion.span>
            ))}
          </motion.div>

          {/* Big emotional headline */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight text-white max-w-3xl"
          >
            Your voice has a{' '}
            <span className="font-serif italic font-normal text-mint-400">
              place here.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-cream-300 leading-relaxed max-w-xl"
          >
            8 weeks. 10 people. Guided clinical support with zero judgment.{' '}
            <span className="text-cream-100 font-semibold">Your cohort is waiting.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full"
          >
            <Button
              href="#register"
              variant="coral"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              trackingName="closing_band_join"
              className="w-full sm:w-auto shadow-glow-coral text-base px-10"
            >
              Join the Program
            </Button>

            <a
              href={SITE_CONTENT.brand.whatsappInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { placement: 'closing_band' })}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/18 text-cream-100 border border-white/15 text-sm font-semibold transition-all backdrop-blur-md w-full sm:w-auto text-center hover:border-mint-400/40"
            >
              <MessageCircle className="w-4.5 h-4.5 text-mint-400" />
              <span>Have a question? Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Small reassurance line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-8 text-xs font-mono text-cream-400 tracking-widest uppercase"
          >
            ₹199 · Confidential · 8-Week Cohort
          </motion.p>

        </div>
      </Container>
    </section>
  );
};
