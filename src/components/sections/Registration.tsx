import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { AmbientGlow } from '../ui/AmbientGlow';
import { OrganicBlob } from '../ui/OrganicBlob';
import { registrationSchema, RegistrationFormData } from '../../types';
import { getUtmParameters } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';

export interface RegistrationProps {
  totalSeats?: number;
  seatsRemaining?: number;
  isWaitlist?: boolean;
}

const COORDINATOR_WHATSAPP = '918089124307';

export const buildWhatsAppUrl = (data: RegistrationFormData | null, regId: string) => {
  if (!data) return `https://wa.me/${COORDINATOR_WHATSAPP}`;
  const isMinor = Number(data.age) < 18;
  const sections: string[] = [
    `*SPEAKUP COHORT 01 — ENROLLMENT APPLICATION*`,
    `Ref ID: *${regId}*`,
    `----------------------------------------`,
    `Hello Anfaz & SPEAKUP Team,`,
    ``,
    `I have applied for SPEAKUP Cohort 01 (Starts Mon 23 Nov 2026). Here are my details:`,
    ``,
    `*APPLICANT PROFILE*`,
    `• *Full Name:* ${data.fullName.trim()}`,
    `• *Age:* ${data.age}`,
    `• *WhatsApp:* ${data.countryCode || '+91'} ${data.phone.trim()}`,
    `• *City & State:* ${data.cityState?.trim() || data.cityCountry?.trim() || 'N/A'}`,
    `• *Email:* ${data.email?.trim() || 'Not provided'}`,
    ...(isMinor ? [
      ``,
      `*GUARDIAN DETAILS (UNDER 18)*`,
      `• *Guardian Name:* ${data.guardianName || 'N/A'}`,
      `• *Guardian Contact:* ${data.guardianPhone || 'N/A'}`
    ] : []),
    `----------------------------------------`,
    `*CONSENTS CONFIRMED:*`,
    `✓ Session recordings for program quality and SLP review`,
    `✓ Privacy and Consent terms accepted`,
    `----------------------------------------`,
    `Please confirm my application and schedule the short welcome chat.`,
    ``,
    `Thank you!`
  ];
  return `https://wa.me/${COORDINATOR_WHATSAPP}?text=${encodeURIComponent(sections.join('\n'))}`;
};

export const Registration: React.FC<RegistrationProps> = ({
  seatsRemaining = 4,
  isWaitlist = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setSubmitError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      age: '' as unknown as number,
      countryCode: '+91',
      phone: '',
      email: '',
      cityState: '',
      cityCountry: '',
      guardianName: '',
      guardianPhone: '',
      guardianConsent: false,
      consentRecording: true,
      consentPrivacy: true,
      hp_country: '',
    },
    mode: 'onTouched',
  });

  // LocalStorage Auto-Drafting to prevent lost progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem('speakup_app_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach((key) => {
          setValue(key as any, parsed[key]);
        });
      }
    } catch {
      // ignore
    }
  }, [setValue]);

  const watchAll = watch();
  useEffect(() => {
    try {
      localStorage.setItem('speakup_app_draft', JSON.stringify(watchAll));
    } catch {
      // ignore
    }
  }, [watchAll]);

  const watchAge = watch('age');
  const isUnder18 = watchAge ? Number(watchAge) < 18 : false;

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const generatedId = `SPEAKUP-${Date.now().toString(36).toUpperCase()}`;
    setSubmittedData(data);
    setSubmissionId(generatedId);

    trackEvent('form_start', { form_name: 'speakup_registration' });

    // Open WhatsApp directly with pre-filled details to Anfaz
    const waUrl = buildWhatsAppUrl(data, generatedId);
    try {
      window.open(waUrl, '_blank');
    } catch {
      // popup block fallback handled
    }

    try {
      const utm = getUtmParameters();
      const payload = {
        ...data,
        cityCountry: data.cityState || data.cityCountry,
        consentDataUse: true,
        isWaitlist,
        utm,
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setIsSubmitted(true);
        if (result.registrationId) setSubmissionId(result.registrationId);
        trackEvent('form_submit_success', {
          registration_id: result.registrationId || generatedId,
          is_under_18: isUnder18,
          is_waitlist: isWaitlist,
        });
      } else {
        setIsSubmitted(true);
        trackEvent('form_submit_success', { is_fallback: true, registration_id: generatedId });
      }
    } catch {
      setIsSubmitted(true);
      trackEvent('form_submit_success', { is_fallback: true });
    } finally {
      setIsSubmitting(false);
      try {
        localStorage.removeItem('speakup_app_draft');
      } catch {
        // ignore
      }
    }
  };

  return (
    <section 
      id="register" 
      aria-label="SPEAKUP Application"
      className="relative scroll-mt-36 sm:scroll-mt-44 pt-20 sm:pt-28 pb-28 sm:pb-36 bg-gradient-to-b from-[#FAF8FF] via-white to-[#F5EFFF] overflow-hidden"
    >
      {/* ── CONTINUOUS STORYTELLING BACKDROP ─────────────────────────────────── */}
      <AmbientGlow
        variant="lavender"
        className="top-1/4 left-1/2 -translate-x-1/2 w-[950px] h-[600px]"
      />

      {/* Starting Organic Blob: sits top-left safely within section bounds */}
      <OrganicBlob
        variant="accent"
        silhouette="soft-orb"
        className="top-10 -left-20 w-[560px] h-[480px] pointer-events-none"
      />

      {/* Ending Organic Blob: sits bottom-right safely within section bounds */}
      <OrganicBlob
        variant="primary"
        silhouette="diagonal-flow"
        className="bottom-10 -right-20 w-[540px] h-[460px] pointer-events-none"
      />

      <Container size="wide" className="relative z-10 max-w-4xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#EDE9FE] mb-4 text-xs font-mono font-bold text-[#6D28D9] uppercase tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9]" />
            <span>Enrollment Application</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-[#0B0B0B] leading-tight">
            Let’s get you in.
          </h2>

          <p className="mt-3 text-base text-slate-600 max-w-lg font-normal">
            Takes 1 minute. No pressure. Take your time.
          </p>

          {/* Seat counter indicator */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1F9E4] text-[#3F7300] border border-[#6EC000]/30 text-xs font-mono font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Only 15 seats total · {seatsRemaining} remaining</span>
          </div>
        </div>

        {/* Elevated Form Container */}
        <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
          {/* Top Specular Rim Lighting */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" 
          />
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* ══ THANK YOU CARD (Matching Section 6) ══ */
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-left py-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F1F9E4] text-[#3F7300] flex items-center justify-center font-bold mb-6">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0B0B0B] mb-2 tracking-tight">
                  You’re in the first step.
                </h3>

                <p className="text-sm font-mono text-slate-500 mb-6">
                  Application Reference: <strong className="text-[#6D28D9]">{submissionId}</strong>
                </p>

                <p className="text-base text-slate-700 leading-relaxed mb-6">
                  We got your application. Anfaz from our team will reach you on WhatsApp within 24 hours for a short chat. No pressure. Just a conversation.
                </p>

                <div className="p-6 rounded-2xl bg-[#F5F3FF] border border-[#EDE9FE] mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#6D28D9] font-bold mb-4">
                    What happens next:
                  </h4>
                  <ol className="space-y-3 text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">1</span>
                      <span><strong>A short chat with our team</strong> on WhatsApp to confirm your availability.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">2</span>
                      <span><strong>Confirm your seat and pay</strong> via secure payment link.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">3</span>
                      <span><strong>Orientation Day:</strong> Saturday 21 November 2026.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">4</span>
                      <span><strong>Day 1:</strong> Monday 23 November 2026.</span>
                    </li>
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <a
                    href={buildWhatsAppUrl(submittedData, submissionId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#6EC000] hover:bg-[#62AD00] text-black font-bold text-sm border border-black/15 shadow-sm text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Join the SPEAKUP WhatsApp updates</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              /* ══ STREAMLINED SINGLE-STEP REGISTRATION FORM ══ */
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* ── APPLICANT BASIC INFORMATION ────────────────────────────── */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      {...register('fullName')}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 text-sm"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                        Age (15 to 30) *
                      </label>
                      <input
                        type="number"
                        {...register('age', { valueAsNumber: true })}
                        placeholder="e.g. 21"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 text-sm"
                      />
                      {errors.age && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.age.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 text-sm"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                        City and State *
                      </label>
                      <input
                        {...register('cityState')}
                        placeholder="e.g. Calicut, Kerala"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 text-sm"
                      />
                      {errors.cityState && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.cityState.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/20 text-sm"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Honeypot field (hidden) */}
                  <input
                    type="text"
                    {...register('hp_country')}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Conditional Under-18 Box */}
                  {isUnder18 && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F3FF] border border-[#6D28D9]/30 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#6D28D9] font-mono uppercase">
                        <AlertCircle className="w-4 h-4" />
                        <span>Under 18 Guardian Details (Required by Law)</span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Because you are under 18, Indian DPDP rules require parent or guardian consent before participating.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            {...register('guardianName')}
                            placeholder="Parent / Guardian Full Name *"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                          />
                          {errors.guardianName && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.guardianName.message}</p>
                          )}
                        </div>
                        <div>
                          <input
                            type="tel"
                            {...register('guardianPhone')}
                            placeholder="Parent WhatsApp Number *"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                          />
                          {errors.guardianPhone && (
                            <p className="mt-1 text-xs text-red-600 font-medium">{errors.guardianPhone.message}</p>
                          )}
                        </div>
                      </div>
                      <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          {...register('guardianConsent')}
                          className="mt-0.5 rounded text-[#6D28D9] focus:ring-[#6D28D9]"
                        />
                        <span>My parent or guardian knows and agrees to me joining SPEAKUP.</span>
                      </label>
                      {errors.guardianConsent && (
                        <p className="text-xs text-red-600 font-medium">{errors.guardianConsent.message}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* ── REQUIRED CONSENTS ───────────────────────────────────────── */}
                <div className="pt-4 border-t border-slate-200/80 space-y-3.5">
                  <label className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register('consentRecording')}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#6D28D9] focus:ring-[#6D28D9] flex-shrink-0 cursor-pointer"
                    />
                    <span>
                      <strong className="text-slate-900 font-semibold">Required:</strong> I agree to sessions being recorded strictly for program quality and SLP review. (Recordings remain private and are never shared publicly).
                    </span>
                  </label>
                  {errors.consentRecording && (
                    <p className="text-xs text-red-600 font-medium pl-7">{errors.consentRecording.message}</p>
                  )}

                  <label className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register('consentPrivacy')}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#6D28D9] focus:ring-[#6D28D9] flex-shrink-0 cursor-pointer"
                    />
                    <span>
                      <strong className="text-slate-900 font-semibold">Required:</strong> I have read and agree to the Privacy and Consent terms.
                    </span>
                  </label>
                  {errors.consentPrivacy && (
                    <p className="text-xs text-red-600 font-medium pl-7">{errors.consentPrivacy.message}</p>
                  )}
                </div>

                {/* ── SUBMIT BUTTON & TRUST FOOTER ────────────────────────────── */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    icon={<ArrowRight className="w-4 h-4 text-black" />}
                    className="w-full sm:w-auto px-9 py-3.5 text-sm font-bold shadow-md shadow-[#6EC000]/25 rounded-xl"
                  >
                    Send my application
                  </Button>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6EC000]" />
                    <span>Direct WhatsApp confirmation with Anfaz</span>
                  </div>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};
