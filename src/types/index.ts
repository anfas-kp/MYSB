import { z } from 'zod';

export const registrationSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name (minimum 2 characters)'),
  age: z.coerce
    .number({ invalid_type_error: 'Please enter a valid age' })
    .min(15, 'Program is designed for ages 15 to 30')
    .max(30, 'Program is designed for ages 15 to 30'),
  countryCode: z.string().default('+91'),
  phone: z.string().min(7, 'Please enter a valid phone or WhatsApp number'),
  email: z.string().email('Please enter a valid email address'),
  cityCountry: z.string().min(2, 'Please enter your city and country'),
  preferredLanguage: z.string().default('English'),
  notes: z.string().optional(),
  
  // Under-18 conditional fields
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianConsent: z.boolean().optional(),
  
  // Consent
  consentDataUse: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to our data and privacy policy to join' }),
  }),
  
  // Honeypot for anti-spam
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
  message: 'Parent or guardian consent must be checked for participants under 18',
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
