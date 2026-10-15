import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SITE_CONTENT } from '../../content/content';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-teal-950/80 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360, mass: 0.8 }}
            className="relative w-full max-w-4xl bg-teal-900 border border-teal-700/60 border-t-white/20 rounded-3xl overflow-hidden shadow-elevated-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-teal-800">
              <div>
                <h3 className="text-lg font-bold text-cream-50 font-display">
                  Inside MYSB · Program Orientation
                </h3>
                <p className="text-xs text-mint-300 font-mono">
                  8-Week Guided Speech Practice
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 text-cream-200 hover:text-white flex items-center justify-center active:scale-[0.9] transition-all"
                aria-label="Close video modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={SITE_CONTENT.brand.videoEmbedUrl}
                title="MYSB Program Introduction"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Caption & Context Footer */}
            <div className="p-4 sm:p-6 bg-teal-950/80 border-t border-teal-800 text-xs text-cream-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p>Captioned for accessibility. Video shows real cohort participants with written consent.</p>
              <span className="font-mono text-mint-400">Duration: 2 mins</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

