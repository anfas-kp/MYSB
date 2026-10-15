import React from 'react';
import { Mail, MessageCircle, Instagram, Heart } from 'lucide-react';
import { Container } from '../ui/Container';
import { SITE_CONTENT } from '../../content/content';
import { trackEvent } from '../../lib/analytics';

export interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="relative bg-teal-950 text-cream-200 pt-12 sm:pt-14 pb-20 sm:pb-12 border-t border-teal-900 overflow-hidden">
      {/* Subtle Waveform Top Accent Line */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mint-400/40 to-transparent" 
      />

      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 sm:pb-10 border-b border-teal-850">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-mint-400 text-teal-950 flex items-center justify-center font-bold">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                </svg>
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                MYSB
              </span>
            </div>

            <p className="mt-4 text-sm text-cream-300 leading-relaxed max-w-sm">
              <strong className="text-white block font-medium">Make Your Speech Better</strong>
              An 8-week structured speech practice and peer confidence program for young people aged 15 to 30 who stammer.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE_CONTENT.brand.whatsappInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'footer' })}
                className="w-9 h-9 rounded-full bg-teal-900 hover:bg-teal-800 text-cream-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={SITE_CONTENT.footer.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-teal-900 hover:bg-teal-800 text-cream-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${SITE_CONTENT.footer.contact.email}`}
                className="w-9 h-9 rounded-full bg-teal-900 hover:bg-teal-800 text-cream-200 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Program Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-mint-400 font-bold mb-4">
              Program Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONTENT.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#register" className="text-coral-400 font-semibold hover:underline">
                  Join Cohort 1
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Resources (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-mint-400 font-bold mb-4">
              Resources & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-cream-300 hover:text-white transition-colors text-left"
                >
                  Privacy Policy & Confidentiality
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-cream-300 hover:text-white transition-colors text-left"
                >
                  Terms of Participation & Safety
                </button>
              </li>
              <li>
                <a
                  href="/assets/MYSB_Program_Brochure_2026.pdf"
                  download
                  className="text-cream-300 hover:text-white transition-colors"
                >
                  Program Brochure (PDF)
                </a>
              </li>
              <li>
                <a
                  href="/assets/MYSB_Community_Poster_2026.pdf"
                  download
                  className="text-cream-300 hover:text-white transition-colors"
                >
                  Community Poster (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Medical Boundary Box */}
        <div className="mt-8 p-4 rounded-2xl bg-teal-900/60 border border-teal-800/80 text-xs text-cream-300/90 leading-relaxed">
          <p>
            <strong className="text-cream-100">Medical & Clinical Disclaimer:</strong> {SITE_CONTENT.brand.disclaimer}
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cream-400">
          <p>{SITE_CONTENT.footer.copyright}</p>
          <p className="flex items-center gap-1.5">
            <span>Built with care for the stammering community</span>
            <Heart className="w-3.5 h-3.5 text-coral-500 fill-current" />
          </p>
        </div>
      </Container>
    </footer>
  );
};
