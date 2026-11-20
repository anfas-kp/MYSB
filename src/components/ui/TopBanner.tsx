import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRight, X } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';
import { cn } from '../../lib/utils';

export interface TopBannerProps {
  onDismiss?: () => void;
  isScrolled?: boolean;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onDismiss, isScrolled = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('speakup-referral-banner-dismissed');
      if (dismissed === 'true') {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }
    } catch {
      // ignore
    }
  }, [onDismiss]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    try {
      sessionStorage.setItem('speakup-referral-banner-dismissed', 'true');
    } catch {
      // ignore
    }
    if (onDismiss) onDismiss();
    trackEvent('cta_click', { button_name: 'banner_dismiss_referral_voucher_top' });
  };

  const handleScrollToVoucher = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent('cta_click', { button_name: 'top_banner_referral_claim' });
    const target = document.getElementById('referral-voucher') || document.getElementById('pricing');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="region"
        aria-label="Special Referral Announcement"
        initial={{ y: -48, opacity: 0 }}
        animate={{ 
          y: isScrolled ? -60 : 0, 
          opacity: isScrolled ? 0 : 1,
          pointerEvents: isScrolled ? 'none' : 'auto'
        }}
        exit={{ y: -48, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 overflow-hidden",
          "bg-gradient-to-r from-[#120224] via-[#2A084E] to-[#120224]",
          "border-b border-[#7C3AED]/40 shadow-[0_4px_24px_rgba(42,8,78,0.5)]",
          "h-10 sm:h-11 text-white select-none transition-all duration-300"
        )}
      >
        {/* Top High-Intensity Neon Lime Specular Beam */}
        <div 
          aria-hidden="true" 
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#6EC000] to-transparent pointer-events-none opacity-90" 
        />

        {/* Ambient Radial Lime Glow in the Center */}
        <div 
          aria-hidden="true" 
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[600px] h-[55px] bg-[#6EC000]/20 blur-xl pointer-events-none" 
        />

        {/* Moving Luxury Shimmer Light Streak */}
        <motion.div
          aria-hidden="true"
          initial={{ x: '-100%' }}
          animate={{ x: '250%' }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', repeatDelay: 2.5 }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent skew-x-12 pointer-events-none"
        />

        <div className="max-w-[1380px] mx-auto h-full px-3 sm:px-6 flex items-center justify-between gap-2">
          
          {/* Main Referral Offer Content (Interactive Capsule Link) */}
          <a
            href="#referral-voucher"
            onClick={handleScrollToVoucher}
            className="flex-1 flex items-center justify-center gap-2 sm:gap-3.5 py-1 cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6EC000] rounded-full"
          >
            {/* Left Pill Badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-wider backdrop-blur-md shadow-xs flex-shrink-0 group-hover:border-[#6EC000]/50 transition-all">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EC000] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6EC000]" />
              </span>
              <Gift className="w-3 h-3 text-[#6EC000]" />
              <span className="hidden sm:inline uppercase">PEER REFERRAL</span>
              <span className="sm:hidden uppercase font-extrabold text-[#6EC000]">VOUCHER</span>
            </span>

            {/* Offer Copy with High-Contrast Neon Highlight */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-[13px] font-medium text-slate-100 flex-shrink-0">
              {/* Desktop Copy */}
              <span className="hidden md:inline">
                Bring someone who stammers — you both get{' '}
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#6EC000] text-[#0A0A0A] font-black text-xs shadow-[0_0_14px_rgba(110,192,0,0.6)] tracking-tight mx-0.5">
                  ₹199 OFF
                </span>{' '}
                your cohort fee.
              </span>
              
              {/* Mobile / Tablet Copy */}
              <span className="md:hidden">
                Bring a friend & you both get{' '}
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#6EC000] text-[#0A0A0A] font-black text-[11px] shadow-[0_0_10px_rgba(110,192,0,0.6)]">
                  ₹199 OFF
                </span>
              </span>

              {/* Action Callout Button (Tactile Glass Pill that glows on hover) */}
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white text-[#111111] font-bold text-[10.5px] sm:text-xs shadow-[0_2px_8px_rgba(0,0,0,0.25)] group-hover:bg-[#6EC000] group-hover:text-black group-hover:shadow-[0_0_16px_rgba(110,192,0,0.65)] group-hover:scale-105 active:scale-95 transition-all duration-200 ml-1 flex-shrink-0">
                <span className="hidden sm:inline">Claim Voucher</span>
                <span className="sm:hidden">Claim</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss referral announcement"
            className="p-1 -mr-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6EC000]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
