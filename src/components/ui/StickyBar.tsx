import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from '../../content/content';
import { trackEvent } from '../../lib/analytics';

export interface StickyBarProps {
  onJoinClick?: () => void;
}

export const StickyBar: React.FC<StickyBarProps> = ({
  onJoinClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg transition-all duration-300">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href="#register"
          onClick={() => {
            trackEvent('cta_click', { button_name: 'sticky_bar_apply' });
            if (onJoinClick) onJoinClick();
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6EC000] hover:bg-[#62AD00] active:bg-[#549600] text-[#0B0B0B] font-bold text-sm border border-black/15 shadow-[0_4px_14px_0_rgba(110,192,0,0.35)] active:scale-[0.97] transition-all text-center"
        >
          <span>Apply Now · Cohort 01</span>
          <span className="text-[11px] bg-black/10 text-black px-2 py-0.5 rounded-full font-mono font-medium">
            15 Seats
          </span>
        </a>

        <a
          href={SITE_CONTENT.brand.whatsappInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { placement: 'sticky_bar' })}
          className="flex items-center justify-center p-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] active:bg-[#4C1D95] text-white shadow-sm active:scale-[0.94] transition-all"
          aria-label="Contact SPEAKUP via WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

