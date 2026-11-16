import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

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
    // Dismiss if dragged down by > 30px or fast flick downward
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
          className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] rounded-2xl bg-[#0B0B0B]/95 text-white p-4 shadow-2xl border border-slate-800 flex items-start gap-3 backdrop-blur-xl cursor-grab active:cursor-grabbing select-none"
          role="alert"
        >
          <div className="flex-shrink-0 mt-0.5">
            {type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#6EC000]" />}
            {type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
            {type === 'info' && <Info className="w-5 h-5 text-violet-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white tracking-tight">{title}</h4>
            {message && <p className="mt-0.5 text-xs text-slate-300 leading-relaxed">{message}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 active:scale-[0.9] transition-all"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
