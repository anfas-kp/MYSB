import { z } from 'zod';

export const registrationSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name (minimum 2 characters)'),
  age: z.coerce
    .number({ invalid_type_error: 'Please enter a valid age' })
    .min(15, 'SPEAKUP is designed for ages 15 to 30')
    .max(30, 'SPEAKUP is designed for ages 15 to 30'),
  countryCode: z.string().default('+91'),
  phone: z.string().min(7, 'Please enter a valid WhatsApp number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  cityState: z.string().min(2, 'Please enter your city and state'),
  cityCountry: z.string().optional(), // backward compatibility
  
  // Under-18 conditional fields
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianConsent: z.boolean().optional(),
  
  // Mandatory Consents (Requested by user)
  consentRecording: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to sessions being recorded strictly for program quality and SLP review' }),
  }),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm you have read and agree to the Privacy and Consent terms' }),
  }),

  // Optional legacy fields for backward compatibility
  isMindiMember: z.enum(['yes', 'no', 'not-sure']).default('no').optional(),
  speechDescription: z.string().optional(),
  hadTherapyBefore: z.enum(['yes', 'no', 'prefer-not-to-say']).default('no').optional(),
  timeCommitment: z.enum(['yes', 'maybe', 'no']).default('yes').optional(),
  device: z.enum(['android', 'iphone', 'laptop', 'other']).default('android').optional(),
  stableInternet: z.enum(['yes', 'sometimes']).default('yes').optional(),
  referrerInfo: z.string().optional(),
  howHeard: z.string().optional(),
  preferredContact: z.enum(['whatsapp-msg', 'whatsapp-call', 'phone-call']).default('whatsapp-msg').optional(),
  consentDataUse: z.boolean().optional(),

  // Anti-spam honeypot
  hp_country: z.string().optional(),
}).refine((data) => {
  if (data.age < 18) {
    return !!data.guardianName && data.guardianName.trim().length >= 2;
  }
  return true;
}, {
  message: 'Parent or guardian name is required for participants under 18',
  path: ['guardianName'],
}).refine((data) => {
  if (data.age < 18) {
    return !!data.guardianPhone && data.guardianPhone.trim().length >= 7;
  }
  return true;
}, {
  message: 'Parent or guardian phone number is required for participants under 18',
  path: ['guardianPhone'],
}).refine((data) => {
  if (data.age < 18) {
    return data.guardianConsent === true;
  }
  return true;
}, {
  message: 'Parent or guardian consent is required for participants under 18',
  path: ['guardianConsent'],
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export interface SeatStatusResponse {
  cohort: number;
  totalSeats: number;
  seatsRemaining: number;
  isWaitlist: boolean;
}

export type ThemeMode = 'light' | 'dark' | 'system';
