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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] bg-[#F7F5EE]/95 border-t border-ink-900/[0.1] shadow-md transition-all duration-300">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href="#register"
          onClick={() => {
            trackEvent('cta_click', { button_name: 'sticky_bar_join' });
            if (onJoinClick) onJoinClick();
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-white font-semibold text-sm shadow-sm active:scale-[0.97] transition-[transform,background-color] duration-150 ease-out text-center"
        >
          <span>Join Cohort 1 — ₹199</span>
          <span className="text-xs bg-black/15 px-2 py-0.5 rounded-full font-mono">
            Applications Open
          </span>
        </a>

        <a
          href={SITE_CONTENT.brand.whatsappInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { placement: 'sticky_bar' })}
          className="flex items-center justify-center p-3 rounded-full bg-teal-800 hover:bg-teal-900 active:bg-teal-950 text-white shadow-sm active:scale-[0.94] transition-[transform,background-color] duration-150 ease-out"
          aria-label="Join MYSB WhatsApp Group"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

