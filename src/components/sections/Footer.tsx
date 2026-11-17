import React from 'react';
import { Mail, MessageCircle, Instagram } from 'lucide-react';
import { Container } from '../ui/Container';
import { SITE_CONTENT } from '../../content/content';
import { trackEvent } from '../../lib/analytics';
import footerLogo from '../../assets/speakup-logo-footer-white.png';

export interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="relative bg-gradient-to-b from-[#2E1065] via-[#1E0A45] to-[#12042B] text-white pt-16 sm:pt-20 pb-28 sm:pb-16 border-t border-violet-900/80 overflow-hidden">
      {/* Specular Top Rim Highlight */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#6EC000]/50 to-transparent" 
      />

      {/* Atmospheric Ambient Glows */}
      <div 
        aria-hidden="true"
        className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(109,40,217,0.15),transparent_70%)] pointer-events-none"
      />
      <div 
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(110,192,0,0.08),transparent_70%)] pointer-events-none"
      />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a
              href="#"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6EC000] rounded-lg"
              aria-label="SPEAKUP Home"
            >
              <img
                src={footerLogo}
                alt="SPEAKUP — find your voice own your words"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>

            <p className="mt-4 text-sm text-violet-200/90 leading-relaxed max-w-sm font-normal">
              <strong className="text-white block font-medium">A ZLAQA AI Labs program</strong>
              An 8-week speech program for young people aged 15 to 30 who stammer.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE_CONTENT.brand.whatsappInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { placement: 'footer' })}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#6EC000] hover:text-black text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-2xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={SITE_CONTENT.footer.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#6EC000] hover:text-black text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-2xs"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${SITE_CONTENT.footer.contact.email}`}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#6EC000] hover:text-black text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-md shadow-2xs"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Program Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#6EC000] font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONTENT.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-violet-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#register" className="text-[#6EC000] font-bold hover:underline">
                  Apply for Cohort 01 →
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#6EC000] font-bold mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-violet-200 hover:text-white transition-colors text-left"
                >
                  Privacy Policy & Confidentiality
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-violet-200 hover:text-white transition-colors text-left"
                >
                  Terms of Participation & Safety
                </button>
              </li>
              <li className="pt-2 text-xs text-violet-200 leading-normal">
                WhatsApp Coordinator: {SITE_CONTENT.brand.coordinatorPhone}
              </li>
              <li className="text-xs text-violet-200 leading-normal">
                Email: {SITE_CONTENT.brand.contactEmail}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-violet-200/90 leading-relaxed shadow-sm">
          <p>
            <strong className="text-white">Program & Medical Disclaimer:</strong> {SITE_CONTENT.brand.disclaimer}
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center text-center text-xs font-mono text-violet-300">
          <p>{SITE_CONTENT.footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
};
