import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 400); // Call onComplete after exit animation
    }, 750); // Under 1 second duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-teal-950 text-cream-100 select-none"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated SVG Waveform Draw */}
            <svg
              className="w-48 sm:w-64 h-20"
              viewBox="0 0 240 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 10 40 Q 30 10, 50 40 T 90 40 T 130 40 T 170 40 T 210 40 T 230 40"
                stroke="#7FE0CF"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.path
                d="M 20 40 Q 40 60, 70 40 T 110 40 T 150 40 T 190 40 T 220 40"
                stroke="#FF7A5C"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mt-3 flex items-center gap-2 font-mono text-xs tracking-widest text-mint-400 uppercase"
            >
              <span>MYSB</span>
              <span className="w-1 h-1 rounded-full bg-coral-500" />
              <span>Make Your Speech Better</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
