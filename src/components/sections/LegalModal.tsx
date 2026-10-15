import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText } from 'lucide-react';

export interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-teal-950/80 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 12 }}
          transition={{ type: 'spring', damping: 28, stiffness: 360, mass: 0.8 }}
          className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-white dark:bg-teal-900 border border-ink-900/10 dark:border-cream-100/15 border-t-white/80 dark:border-t-white/20 rounded-3xl overflow-hidden shadow-elevated-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-ink-900/10 dark:border-cream-100/10 bg-cream-50 dark:bg-teal-950">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 dark:bg-mint-400 text-white dark:text-teal-950 flex items-center justify-center shadow-2xs">
                {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-ink-900 dark:text-cream-50">
                  {type === 'privacy' ? 'Privacy Policy & Confidentiality' : 'Terms of Participation & Safety'}
                </h3>
                <p className="text-xs font-mono text-ink-500 dark:text-cream-400">
                  MYSB Program · Make Your Speech Better
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-ink-900/5 dark:bg-cream-100/10 hover:bg-ink-900/10 text-ink-700 dark:text-cream-200 flex items-center justify-center active:scale-[0.9] transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto text-sm sm:text-base text-ink-700 dark:text-cream-200 space-y-4 leading-relaxed">
            {type === 'privacy' ? (
              <>
                <p className="font-semibold text-teal-800 dark:text-mint-300">
                  Effective Date: 30 September 2026 · MYSB Program Team
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  1. Information We Collect
                </h4>
                <p>
                  MYSB collects only the essential contact information required for cohort onboarding and coordination: Full Name, Age, Phone / WhatsApp Number, Email Address, City/Country, and for participants under 18, Parent or Guardian details and consent.
                </p>
                <p>
                  <strong>No Health Records:</strong> We do not collect medical histories, diagnostic codes, or insurance information.
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  2. Audio Recording Confidentiality
                </h4>
                <p>
                  Daily 3-minute speech practice recordings uploaded to the MYSB app are encrypted and strictly accessible only to the participant and the assigned Speech Language Pathologist for clinical review. Audio is never published, commercialized, or shared with third parties.
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  3. Participant Consent & Media Rights
                </h4>
                <p>
                  Any participant quote, photo, or testimonial featured on the website or promotional brochures is published strictly following explicit written digital consent from the participant (and guardian if under 18).
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  4. Data Retention & Deletion
                </h4>
                <p>
                  You may request complete deletion of your registration details or audio logs at any time by emailing{' '}
                  <span className="font-mono text-teal-700 dark:text-mint-400">hello@mysbprogram.org</span>.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-teal-800 dark:text-mint-300">
                  Participation Guidelines & Community Trust
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  1. Nature of the Program
                </h4>
                <p>
                  MYSB (Make Your Speech Better) is an 8-week peer practice and habit-building program guided by certified Speech Language Pathologists. It does not replace individual psychiatric, surgical, or clinical hospital diagnoses.
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  2. Zero Tolerance for Judgment
                </h4>
                <p>
                  The "Daily Voice" Google Meet and WhatsApp community are strictly safe, supportive spaces. Any harassment, mocking, or violation of peer privacy results in immediate removal from the cohort.
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  3. Program Fee Policy
                </h4>
                <p>
                  MYSB has a nominal registration fee of ₹199 covering the complete 8-week cohort experience, clinical guidance, and companion app access. No additional deposits or hidden charges will ever be requested.
                </p>

                <h4 className="text-lg font-bold text-ink-900 dark:text-cream-50 pt-2 font-display">
                  4. Under-18 Participation
                </h4>
                <p>
                  Participants aged 15 to 17 require confirmed parent or guardian acknowledgment before attending the in-person kickoff or Daily Voice sessions.
                </p>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-ink-900/10 dark:border-cream-100/10 bg-cream-50 dark:bg-teal-950 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-colors"
            >
              I Understand & Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
