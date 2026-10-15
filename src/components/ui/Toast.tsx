import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  type = 'success',
  title,
  message,
}) => {
  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Dismiss if dragged down by > 30px or fast flick downward (velocity > 200)
    if (info.offset.y > 30 || info.velocity.y > 200) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', damping: 26, stiffness: 380, mass: 0.7 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 80 }}
          dragElastic={{ top: 0.05, bottom: 0.3 }}
          onDragEnd={handleDragEnd}
          className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] rounded-2xl bg-teal-950/95 text-cream-100 p-4 shadow-elevated-card border border-teal-850 border-t-white/25 flex items-start gap-3 backdrop-blur-xl cursor-grab active:cursor-grabbing select-none"
          role="alert"
        >
          <div className="flex-shrink-0 mt-0.5">
            {type === 'success' && <CheckCircle2 className="w-5 h-5 text-mint-400" />}
            {type === 'error' && <AlertCircle className="w-5 h-5 text-coral-400" />}
            {type === 'info' && <Info className="w-5 h-5 text-teal-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white tracking-tight">{title}</h4>
            {message && <p className="mt-0.5 text-xs text-cream-300 leading-relaxed">{message}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 text-cream-400 hover:text-white p-1 rounded-full hover:bg-white/10 active:scale-[0.9] transition-all"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

