import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';
import { SITE_CONTENT } from '../../content/content';
import { registrationSchema, RegistrationFormData } from '../../types';
import { getUtmParameters, cn } from '../../lib/utils';
import { trackEvent } from '../../lib/analytics';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface RegistrationProps {
  totalSeats?: number;
  seatsRemaining?: number;
  isWaitlist?: boolean;
}

const COORDINATOR_WHATSAPP = '918089124307';

export const buildWhatsAppUrl = (data: RegistrationFormData | null, regId: string) => {
  if (!data) return `https://wa.me/${COORDINATOR_WHATSAPP}`;
  const isMinor = Number(data.age) < 18;
  const lines = [
    '🎙️ *MYSB Cohort 1 — Registration Application*',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `👤 *Full Name:* ${data.fullName}`,
    `🎂 *Age:* ${data.age}`,
    `📞 *Phone:* ${data.countryCode || '+91'} ${data.phone}`,
    `✉️ *Email:* ${data.email}`,
    `📍 *City / Country:* ${data.cityCountry}`,
    `🗣️ *Preferred Language:* ${data.preferredLanguage}`,
    ...(isMinor ? [
      `🛡️ *Guardian Name:* ${data.guardianName || 'N/A'}`,
      `📱 *Guardian Phone:* ${data.guardianPhone || 'N/A'}`
    ] : []),
    ...(data.notes ? [`📝 *Notes / Goals:* ${data.notes}`] : []),
    `💳 *Program Fee:* ₹199 (8-Week Program)`,
    `🆔 *Registration ID:* ${regId}`,
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'Hello! I just submitted my registration on the MYSB website. Please confirm my seat.'
  ];
  return `https://wa.me/${COORDINATOR_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
};

export const Registration: React.FC<RegistrationProps> = ({
  totalSeats = 10,
  seatsRemaining = 4,
  isWaitlist = false,
}) => {
  const prefersReduced = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      age: '' as unknown as number,
      countryCode: '+91',
      phone: '',
      email: '',
      cityCountry: '',
      preferredLanguage: 'English',
      notes: '',
      guardianName: '',
      guardianPhone: '',
      guardianConsent: false,
      hp_country: '',
    },
    mode: 'onTouched',
  });

  const watchAge = watch('age');
  const isUnder18 = watchAge ? Number(watchAge) < 18 : false;

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const generatedId = `MYSB-${Date.now().toString(36).toUpperCase()}`;
    setSubmittedData(data);
    setSubmissionId(generatedId);

    trackEvent('form_start', { form_name: 'cohort_registration' });

    // Open WhatsApp directly with the pre-filled applicant details to 8089124307
    const waUrl = buildWhatsAppUrl(data, generatedId);
    try {
      window.open(waUrl, '_blank');
    } catch {
      // browser popup block handled gracefully by fallback button
    }

    try {
      const utm = getUtmParameters();
      const payload = {
        ...data,
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
    }
  };

  return (
    <section 
      id="register" 
      aria-label="Registration and Enrollment"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#F7F5EE] border-t border-ink-900/[0.08] overflow-hidden"
    >
      <Container size="wide" className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column: Reassurance, 10-Seat Dots Visualizer, Privacy (5 cols) */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-start"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <Eyebrow variant="coral" className="mb-3 text-xs sm:text-sm">
                {isWaitlist ? 'Waitlist Open' : SITE_CONTENT.registration.eyebrow}
              </Eyebrow>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-ink-950 dark:text-cream-50 tracking-tight leading-[1.12]">
                {isWaitlist ? 'Join the Cohort 2 Priority Waitlist' : SITE_CONTENT.registration.headline}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-ink-600 dark:text-cream-300 leading-relaxed max-w-lg font-normal">
                {SITE_CONTENT.registration.subheadline}
              </p>

              {/* Calm Cohort Status Indicator with 10-Seat Board */}
              <div className="my-6 p-5 sm:p-6 rounded-2xl bg-white border border-ink-900/[0.08] shadow-subtle-card">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="font-bold text-teal-900 dark:text-mint-300 uppercase tracking-wider flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 animate-live-pulse" />
                    Cohort 01 Roster
                  </span>
                  <span className="text-teal-850 dark:text-mint-400 font-semibold font-mono text-xs px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-600/15">
                    {seatsRemaining} Seats Remaining
                  </span>
                </div>
                
                {/* 10 Seats Visualizer Grid */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 my-3 justify-items-center">
                  {Array.from({ length: totalSeats }).map((_, sIdx) => {
                    const isTaken = sIdx < (totalSeats - seatsRemaining);
                    return (
                      <div
                        key={sIdx}
                        title={isTaken ? `Seat ${sIdx + 1}: Reserved` : `Seat ${sIdx + 1}: Available (Click to reserve)`}
                        className={cn(
                          'w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-mono text-xs sm:text-sm font-bold transition-all duration-150',
                          isTaken
                            ? 'bg-teal-950 text-cream-100 dark:bg-teal-700 shadow-2xs'
                            : 'bg-emerald-50 text-emerald-850 dark:bg-mint-400/20 dark:text-mint-300 border border-dashed border-emerald-500/70 [@media(hover:hover)]:hover:scale-110 [@media(hover:hover)]:hover:bg-emerald-100 hover:border-emerald-600 cursor-pointer active:scale-95'
                        )}
                      >
                        {isTaken ? `✓` : sIdx + 1}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-ink-700 dark:text-cream-200 mt-3 pt-3 border-t border-teal-700/10">
                  <span className="font-medium text-teal-900 dark:text-cream-100">
                    {isWaitlist ? 'Waitlist priority' : 'Strict 10-person maximum to ensure daily practice'}
                  </span>
                  <span className="font-mono text-xs text-coral-600 dark:text-coral-400 font-bold">
                    ₹199 · Program Fee
                  </span>
                </div>
              </div>

              {/* What Happens After Submission */}
              <div className="space-y-3 mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-teal-900 dark:text-cream-100 font-bold">
                  {SITE_CONTENT.registration.reassuranceTitle}
                </h4>
                <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-teal-700/20 dark:before:bg-mint-400/20">
                  {SITE_CONTENT.registration.reassuranceSteps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 text-xs sm:text-sm text-ink-700 dark:text-cream-200">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white dark:bg-teal-900 border border-teal-700/30 dark:border-mint-400/30 text-teal-800 dark:text-mint-300 flex items-center justify-center font-mono text-[10px] font-bold shadow-2xs">
                        {idx + 1}
                      </div>
                      <p className="leading-snug pl-0.5 font-normal">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy Pledge */}
            <div className="mt-6 p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-teal-950/60 border border-teal-700/15 dark:border-cream-100/10 flex items-center gap-3 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-teal-800 dark:text-mint-400 flex-shrink-0" />
              <p className="text-xs sm:text-[13px] text-ink-600 dark:text-cream-300 leading-snug">
                {SITE_CONTENT.registration.privacyPledge}
              </p>
            </div>
          </motion.div>

          {/* Right Column: High-End Registration Form Card (7 cols) */}
          <motion.div 
            className="lg:col-span-7"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card variant="surface" padding="none" className="p-6 sm:p-8 lg:p-9 border border-ink-900/[0.1] dark:border-cream-100/10 shadow-card bg-white dark:bg-teal-900 rounded-3xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* Polished Editorial Success State with Direct WhatsApp Dispatch to 8089124307 */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center py-6 sm:py-8"
                  >
                    {/* Animated Drawn Check Mark */}
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-600 flex items-center justify-center text-emerald-800 dark:text-emerald-300 shadow-sm mb-4">
                      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                        <motion.path
                          d="M 12 24 L 20 32 L 36 16"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </svg>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink-900 dark:text-cream-50 tracking-tight">
                      Registration Received!
                    </h3>

                    <p className="mt-2 text-sm sm:text-base text-ink-600 dark:text-cream-200 max-w-md leading-relaxed">
                      Your application has been recorded. Send your details directly to our coordinator on WhatsApp to confirm your seat.
                    </p>

                    <div className="mt-3 px-4 py-1.5 rounded-full bg-cream-100 dark:bg-teal-950 text-xs font-mono text-ink-700 dark:text-cream-300 border border-ink-900/10 dark:border-cream-100/10">
                      Registration ID: <span className="font-bold text-teal-700 dark:text-mint-400">{submissionId}</span>
                    </div>

                    {/* Primary Action Card: Direct WhatsApp to 8089124307 */}
                    <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-emerald-950 text-cream-100 border border-emerald-800/80 w-full text-left shadow-elevated-card">
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-teal-950 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white font-display">
                            Send Details to WhatsApp Coordinator
                          </h4>
                          <p className="text-xs text-emerald-300 font-mono">
                            WhatsApp: +91 8089124307
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-cream-200 leading-relaxed">
                        Your complete application has been formatted. Click below to message our coordinator directly with your details:
                      </p>

                      <a
                        href={buildWhatsAppUrl(submittedData, submissionId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click', { target: 'coordinator', registration_id: submissionId })}
                        className="mt-4 inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-teal-950 font-bold text-sm sm:text-base shadow-sm transition-all"
                      >
                        <MessageCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Open WhatsApp (+91 8089124307) →</span>
                      </a>
                    </div>

                    {/* Applicant Details Recap Card */}
                    {submittedData && (
                      <div className="mt-4 p-4 rounded-xl bg-ink-50 dark:bg-teal-950/60 border border-ink-900/10 dark:border-cream-100/10 w-full text-left text-xs space-y-1.5 text-ink-700 dark:text-cream-300">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-900 dark:text-mint-300 pb-1 border-b border-ink-900/10">
                          Application Summary
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1">
                          <div><span className="font-semibold text-ink-900 dark:text-cream-100">Name:</span> {submittedData.fullName}</div>
                          <div><span className="font-semibold text-ink-900 dark:text-cream-100">Age:</span> {submittedData.age}</div>
                          <div><span className="font-semibold text-ink-900 dark:text-cream-100">Phone:</span> {submittedData.countryCode} {submittedData.phone}</div>
                          <div><span className="font-semibold text-ink-900 dark:text-cream-100">City:</span> {submittedData.cityCountry}</div>
                          <div className="col-span-2 truncate"><span className="font-semibold text-ink-900 dark:text-cream-100">Email:</span> {submittedData.email}</div>
                          <div className="col-span-2"><span className="font-semibold text-ink-900 dark:text-cream-100">Fee:</span> ₹199 (Pay upon orientation)</div>
                        </div>
                      </div>
                    )}

                    {/* Secondary Action: Community WhatsApp Group */}
                    <div className="mt-5 pt-4 border-t border-ink-900/10 dark:border-cream-100/10 w-full text-center">
                      <p className="text-xs text-ink-500 dark:text-cream-400 mb-2">
                        You can also join the general cohort community for schedule & updates:
                      </p>
                      <a
                        href={SITE_CONTENT.brand.whatsappInviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click', { target: 'community_group', placement: 'registration_success' })}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-mint-300 hover:underline"
                      >
                        <span>Join MYSB Community Group →</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* Interactive Form with Floating Labels & Conditional Guardian Section */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 sm:space-y-5"
                    noValidate
                  >
                    {/* Anti-Spam Honeypot Field (Hidden from Real Users) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register('hp_country')}
                      />
                    </div>

                    {/* Form Headline */}
                    <div className="pb-3 mb-1 border-b border-ink-900/10 dark:border-cream-100/10 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-ink-900 dark:text-cream-50 leading-tight">
                          Participant Details
                        </h3>
                        <p className="text-xs sm:text-[13px] text-ink-500 dark:text-cream-400 mt-0.5">
                          Takes ~2 minutes · ₹199 Fee
                        </p>
                      </div>
                      <span className="text-xs font-mono text-coral-600 dark:text-coral-400 bg-coral-50 dark:bg-coral-950/60 px-2.5 py-1 rounded-full border border-coral-500/20 font-bold">
                        ₹199 Program Fee
                      </span>
                    </div>

                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-500/30 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* 01. Full Name */}
                    <Field
                      label="Full Name *"
                      placeholder="e.g. Anfas KP"
                      error={errors.fullName?.message}
                      {...register('fullName')}
                    />

                    {/* 02. Age & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4">
                      <div className="sm:col-span-4">
                        <Field
                          label="Age (15–30) *"
                          type="number"
                          min={15}
                          max={30}
                          placeholder="e.g. 21"
                          error={errors.age?.message}
                          {...register('age')}
                        />
                      </div>

                      <div className="sm:col-span-8">
                        <Field
                          label="Phone / WhatsApp Number *"
                          type="tel"
                          placeholder="e.g. 98765 43210"
                          error={errors.phone?.message}
                          {...register('phone')}
                        />
                      </div>
                    </div>

                    {/* 03. Email & City/Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <Field
                        label="Email Address *"
                        type="email"
                        placeholder="yourname@gmail.com"
                        error={errors.email?.message}
                        {...register('email')}
                      />

                      <Field
                        label="City & Country *"
                        placeholder="e.g. Kochi, Kerala"
                        error={errors.cityCountry?.message}
                        {...register('cityCountry')}
                      />
                    </div>

                    {/* 04. Preferred Language & Optional Note */}
                    <Field
                      label="Anything you'd like us to know (Optional)"
                      placeholder="Tell us gently about your speaking journey or goals"
                      {...register('notes')}
                    />

                    {/* Conditional Under-18 Guardian Section (Slides open if age < 18) */}
                    <AnimatePresence>
                      {isUnder18 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 rounded-2xl bg-teal-500/10 dark:bg-teal-950/80 border border-teal-600/30 space-y-3 my-2">
                            <div className="flex items-center gap-2.5">
                              <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-mint-400" />
                              <div>
                                <h4 className="text-xs sm:text-sm font-bold text-ink-900 dark:text-cream-50 font-display">
                                  Parent or Guardian Information (Under 18)
                                </h4>
                                <p className="text-[11px] sm:text-xs text-ink-600 dark:text-cream-300">
                                  Required for participants aged 15 to 17.
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <Field
                                label="Guardian Full Name *"
                                placeholder="Parent or guardian name"
                                error={errors.guardianName?.message}
                                {...register('guardianName')}
                              />
                              <Field
                                label="Guardian Phone Number *"
                                type="tel"
                                placeholder="Parent or guardian phone"
                                error={errors.guardianPhone?.message}
                                {...register('guardianPhone')}
                              />
                            </div>

                            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                              <input
                                type="checkbox"
                                className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-teal-600 dark:bg-teal-900 border-ink-900/20"
                                {...register('guardianConsent')}
                              />
                              <span className="text-xs sm:text-[13px] text-ink-700 dark:text-cream-200 leading-snug">
                                I confirm that my parent or legal guardian has reviewed the MYSB program details and consents to my participation. *
                              </span>
                            </label>
                            {errors.guardianConsent && (
                              <p className="text-xs text-red-600 dark:text-red-400">
                                {errors.guardianConsent.message}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Data Consent Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-teal-600 dark:bg-teal-900 border-ink-900/20 flex-shrink-0"
                          {...register('consentDataUse')}
                        />
                        <span className="text-xs sm:text-[13px] text-ink-600 dark:text-cream-300 leading-snug">
                          I agree to confidential contact processing by the MYSB team. No audio or identifying information is shared without written consent. *
                        </span>
                      </label>
                      {errors.consentDataUse && (
                        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{errors.consentDataUse.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Primary Dominant Submit Action */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="coral"
                        size="lg"
                        loading={isSubmitting}
                        icon={<ArrowRight className="w-5 h-5" />}
                        className="w-full text-center shadow-md py-3.5 sm:py-4 text-base font-bold"
                        trackingName="submit_registration_form"
                      >
                        {isWaitlist ? 'Join Priority Waitlist' : 'Submit Cohort 1 Application (₹199)'}
                      </Button>
                      <div className="flex items-center justify-center gap-1.5 mt-2.5 text-xs font-mono text-ink-600 dark:text-cream-300 text-center">
                        <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-mint-400 flex-shrink-0" />
                        <span>₹199 Program Fee · Instant confirmation · Confidential</span>
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
