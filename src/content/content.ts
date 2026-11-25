export interface JourneyStop {
  id: string;
  stepNumber: string;
  badge: string;
  isOffline?: boolean;
  title: string;
  duration: string;
  description: string;
  keyTakeaway: string;
  mediaPlaceholderCaption: string;
  waveformSmoothness: number;
}

export interface DayStep {
  id: string;
  timeEstimate: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  isRest?: boolean;
  highlightDetails?: string[];
}

export interface BentoItem {
  id: string;
  span: 'col-span-12 md:col-span-6 lg:col-span-8' | 'col-span-12 md:col-span-6 lg:col-span-4' | 'col-span-12 lg:col-span-4' | 'col-span-12 lg:col-span-6';
  badge: string;
  title: string;
  description: string;
  visualType: 'waveform' | 'voice-bars' | 'slp-tag' | 'presentation' | 'offline-chip' | 'free-seal';
  extraMeta?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isLeadSLP?: boolean;
  credentials?: string;
  bio: string;
  quote?: string;
  imagePlaceholderCaption: string;
}

export interface FAQItem {
  id: string;
  category: 'Program & Schedule' | 'Clinical & Medical' | 'Participation & Privacy';
  question: string;
  answer: string;
  isSLPApprovedWording?: boolean;
}

export interface OfflineGatheringData {
  badge: string;
  status: string;
  title: string;
  dateTeaser: string;
  venueTeaser: string;
  format: string;
  description: string;
  whatToExpect: string[];
  footnoteLeft: string;
  footnoteRight: string;
}

export interface StatementLine {
  id: string;
  text: string;
  accentPhrase: string;
}

export const SITE_CONTENT = {
  brand: {
    name: 'SPEAKUP',
    fullName: 'SPEAKUP by ZLAQA AI Labs',
    tagline: 'find your voice · own your words',
    heroHeadline: 'Find your voice. Own your words.',
    heroSubheadline: 'An 8-week speech program for young people who stammer. Ages 15 to 30.',
    cohortKicker: 'Cohort 01 starts 23 November 2026. Only 15 seats.',
    quickPills: [
      '15 seats only',
      '8 weeks',
      'Ages 15–30',
      'Live SLP Guidance',
      'Zlaqa AI Voice App',
      '1 In-Person Meetup'
    ],
    disclaimer: 'SPEAKUP is a guided practice program led by Speech-Language Pathologists. We do not promise a cure. We promise structure, support and steady progress. Not a replacement for individual clinical therapy.',
    whatsappInviteUrl: 'https://wa.me/918089124307',
    videoEmbedUrl: '',
    coordinatorPhone: '+91 80891 24307',
    contactEmail: 'contact@zlaqa.com',
  },

  nav: {
    links: [
      { label: 'Problem', href: '#problem' },
      { label: 'What You Get', href: '#features' },
      { label: 'A Day in SPEAKUP', href: '#daily-rhythm' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    primaryCta: 'Apply now',
  },

  hero: {
    badge: 'Cohort 01 starts 23 November 2026 · Only 15 seats',
    headline: 'SPEAKUP',
    subheadline: 'Find your voice. Own your words.',
    subtext: 'An 8-week speech program for young people who stammer. Ages 15 to 30. Daily practice in the Zlaqa app, weekly live sessions with Speech-Language Pathologists, and a safe community that gets it.',
    primaryCta: 'Apply now',
    secondaryCta: 'How it works',
    socialProof: 'Cohort 01 Fee: ₹449 for the full 8-week program · 15 Seats Only',
  },

  statement: {
    eyebrow: 'The Reality',
    lead: 'You are not the problem. Silence is.',
    lines: [
      {
        id: 'line-1',
        text: 'You know the answer. You know the words.',
        accentPhrase: 'You know the words',
      },
      {
        id: 'line-2',
        text: 'Then the moment comes, and your voice goes quiet.',
        accentPhrase: 'your voice goes quiet',
      },
      {
        id: 'line-3',
        text: 'So you skip the introduction. You swap the word.',
        accentPhrase: 'You swap the word',
      },
      {
        id: 'line-4',
        text: 'You let someone else order for you.',
        accentPhrase: 'someone else order for you',
      },
      {
        id: 'line-5',
        text: 'SPEAKUP is built to end that. Not by pretending you don’t stammer,',
        accentPhrase: 'SPEAKUP is built to end that',
      },
      {
        id: 'line-6',
        text: 'but by giving you tools, practice, experts and people, so you can speak on your own terms.',
        accentPhrase: 'speak on your own terms',
      },
    ],
    footnote: 'You will not do it alone.'
  },

  whoItsFor: {
    eyebrow: 'Who It Is For',
    headline: 'Built for you if:',
    badge: 'Small cohort. 10 to 15 people. Everyone is heard.',
    criteria: [
      { text: 'You are 15 to 30 years old' },
      { text: 'You stammer, or speaking with fluency and confidence is hard' },
      { text: 'You can give 20 minutes a day' },
      { text: 'You want to be around people who get it' },
    ],
  },

  featuresBento: {
    eyebrow: 'What You Get',
    headline: 'Everything you need. Nothing you don’t.',
    subheadline: 'A comprehensive, structured 8-week system designed for steady progress without overwhelm.',
    items: [
      {
        id: 'bento-1',
        span: 'col-span-12 md:col-span-6 lg:col-span-8',
        badge: 'Clinical Excellence',
        title: 'Weekly Live SLP Sessions',
        description: 'Live interactive sessions with certified Speech-Language Pathologists. Real guidance, personalized techniques, and constructive feedback.',
        visualType: 'slp-tag',
        extraMeta: '1-on-1 & cohort clinical coaching'
      },
      {
        id: 'bento-2',
        span: 'col-span-12 md:col-span-6 lg:col-span-4',
        badge: 'Zlaqa AI App',
        title: '10 Mins Daily in App',
        description: 'Guided AI voice practice and targeted speech exercises in the Zlaqa app to build muscle memory.',
        visualType: 'voice-bars',
        extraMeta: 'Included with program'
      },
      {
        id: 'bento-3',
        span: 'col-span-12 lg:col-span-4',
        badge: 'Safe Peer Space',
        title: '10 Mins Daily Group Meet',
        description: 'Your cohort, together. A low-pressure space to speak freely, practice with peers, with zero judgement.',
        visualType: 'waveform',
        extraMeta: 'Mon to Sat on Google Meet'
      },
      {
        id: 'bento-4',
        span: 'col-span-12 md:col-span-6 lg:col-span-4',
        badge: 'Guest Series',
        title: '2 to 3 Expert Talks',
        description: 'Exclusive sessions with leading experts on speech mechanics, voice projection, psychology, and confidence.',
        visualType: 'presentation',
        extraMeta: 'Interactive guest masterclasses'
      },
      {
        id: 'bento-5',
        span: 'col-span-12 md:col-span-6 lg:col-span-4',
        badge: 'In-Person Meetup',
        title: '1 In-Person Meetup',
        description: 'A half-day offline gathering in the first month. Meet your therapists and your cohort face to face.',
        visualType: 'offline-chip',
        extraMeta: 'Optional but highly encouraged'
      },
      {
        id: 'bento-6',
        span: 'col-span-12 md:col-span-6 lg:col-span-6',
        badge: 'Measurable Outcomes',
        title: 'Progress You Can See',
        description: 'Baseline assessment on Day 1, mid-point review at Week 4, and final evaluation at Week 8 with written diagnostic feedback.',
        visualType: 'slp-tag',
        extraMeta: 'Baseline, mid-point & final report'
      },
      {
        id: 'bento-7',
        span: 'col-span-12 md:col-span-6 lg:col-span-6',
        badge: 'Lifelong Network',
        title: 'A Community That Stays',
        description: 'Your cohort doesn’t vanish after week 8. Stay connected with your peers, alumni network, and ongoing community channels.',
        visualType: 'waveform',
        extraMeta: 'Permanent alumni network'
      }
    ] as BentoItem[],
  },

  dailyRhythm: {
    eyebrow: 'A Day in SPEAKUP',
    headline: '20 minutes. That’s all we ask.',
    subheadline: 'Monday to Saturday. Sunday is rest and voice recovery.',
    steps: [
      {
        id: 'step-1',
        timeEstimate: '10 Min',
        title: 'Zlaqa App Practice',
        tagline: 'Breathe. Practice. Speak.',
        description: 'Open the Zlaqa app. Follow guided diaphragmatic breathing, speech rhythm exercises, and recorded voice drills.',
        iconName: 'Sparkles',
        highlightDetails: ['Diaphragmatic pacing', 'Gentle vocal onset', 'Self-evaluation']
      },
      {
        id: 'step-2',
        timeEstimate: '10 Min',
        title: 'Daily Group Meet',
        tagline: 'Say something. Hear someone else say something.',
        description: 'Jump on Google Meet with your cohort of 15. Share thoughts, practice feared words, and build conversational comfort in a zero-shame zone.',
        iconName: 'Users',
        highlightDetails: ['Zero pressure to be fluent', 'Listen & speak at your pace', 'Safe cohort bond']
      },
      {
        id: 'step-rest',
        timeEstimate: 'Full Day',
        title: 'Sunday Rest Day',
        tagline: 'Rest & Recharge · Every Week',
        description: 'No recordings, no meetings. Rest your voice, spend time doing what you love, and let motor habits integrate naturally.',
        iconName: 'Coffee',
        isRest: true,
        highlightDetails: ['Zero required tasks', 'Voice rest', 'Fresh start every Monday']
      }
    ] as DayStep[],
  },

  journey: {
    eyebrow: 'Curriculum Roadmap',
    headline: 'Eight weeks. One steady climb.',
    subheadline: 'Led step-by-step by Speech-Language Pathologists from baseline assessment to public speech confidence.',
    stops: [
      {
        id: 'stop-0',
        stepNumber: '00',
        badge: 'Orientation',
        title: 'Meet Team & Baseline Assessment',
        duration: 'Sat 21 Nov · Online',
        description: 'Meet your therapists and fellow cohort members. Conduct your baseline speech assessment and calibrate your goals.',
        keyTakeaway: 'Understanding your baseline speech patterns without judgement.',
        mediaPlaceholderCaption: '[Orientation video call preview]',
        waveformSmoothness: 0.15,
      },
      {
        id: 'stop-1',
        stepNumber: '01',
        badge: 'Week 1',
        title: 'Know Your Stammer',
        duration: 'Week 1 · Online',
        description: 'Map out your specific stammering triggers, feared situations, and physical speech blocks with clinical tools.',
        keyTakeaway: 'Mapping triggers removes unexpected panic.',
        mediaPlaceholderCaption: '[Trigger mapping exercise]',
        waveformSmoothness: 0.25,
      },
      {
        id: 'stop-2',
        stepNumber: '02',
        badge: 'Week 2',
        title: 'Breathe Before You Speak',
        duration: 'Week 2 · Online',
        description: 'Learn and integrate diaphragmatic breathing and gentle vocal onsets into a daily reflex habit that sticks.',
        keyTakeaway: 'Breath pacing anchors your vocal cords.',
        mediaPlaceholderCaption: '[Guided breath drill]',
        waveformSmoothness: 0.38,
      },
      {
        id: 'stop-3',
        stepNumber: '03',
        badge: 'Week 3',
        title: 'Slow is Strong',
        duration: 'Week 3 · Online',
        description: 'Shift away from rushed speech. Master intentional pausing, rhythmic pacing, and reclaiming your speaking time.',
        keyTakeaway: 'Taking your time is a sign of confidence, not hesitation.',
        mediaPlaceholderCaption: '[Speech pacing session]',
        waveformSmoothness: 0.50,
      },
      {
        id: 'stop-4',
        stepNumber: '04',
        badge: 'Week 4',
        title: 'Words That Get Stuck',
        duration: 'Week 4 · Online',
        description: 'Systematically face feared consonant and vowel combinations. Desensitize speech blocks with pull-out and easy-stutter techniques.',
        keyTakeaway: 'Facing feared words directly disarms their power.',
        mediaPlaceholderCaption: '[Pull-out technique coaching]',
        waveformSmoothness: 0.62,
      },
      {
        id: 'stop-5',
        stepNumber: '05',
        badge: 'Week 5',
        title: 'Real Conversations',
        duration: 'Week 5 · Online',
        description: 'Put your tools into real-life settings: ordering food, answering phone calls, introducing yourself to strangers.',
        keyTakeaway: 'Bridging practice room tools into everyday social life.',
        mediaPlaceholderCaption: '[Real-world phone call drill]',
        waveformSmoothness: 0.75,
      },
      {
        id: 'stop-6',
        stepNumber: '06',
        badge: 'Week 6',
        title: 'Hard Situations',
        duration: 'Week 6 · Online',
        description: 'Stay grounded under pressure during job interviews, college presentations, viva exams, and meeting debates.',
        keyTakeaway: 'Composure when speaking stakes are high.',
        mediaPlaceholderCaption: '[Viva and interview simulation]',
        waveformSmoothness: 0.85,
      },
      {
        id: 'stop-7',
        stepNumber: '07',
        badge: 'Week 7',
        title: 'Your Voice, Your Story',
        duration: 'Week 7 · Online',
        description: 'Prepare your personal 2-minute capstone talk with feedback from your Speech-Language Pathologist.',
        keyTakeaway: 'Framing your speech story authentically.',
        mediaPlaceholderCaption: '[Drafting capstone presentation]',
        waveformSmoothness: 0.92,
      },
      {
        id: 'stop-8',
        stepNumber: '08',
        badge: 'Week 8',
        title: 'Speak Without Fear',
        duration: 'Week 8 · Online',
        description: 'Deliver your 2-minute talk in front of your cohort and mentors. Receive your program certificate of completion.',
        keyTakeaway: 'Steadiness is speaking your truth unapologetically.',
        mediaPlaceholderCaption: '[Cohort graduation & certificate]',
        waveformSmoothness: 1.0,
      },
    ] as JourneyStop[],
  },

  numbers: [
    { value: 15, suffix: ' Seats', label: 'Cohort 01 Capacity', detail: 'Strictly limited so every participant receives close attention' },
    { value: 8, suffix: ' Weeks', label: 'Program Length', detail: 'A steady climb from baseline assessment to public talk' },
    { value: 20, suffix: ' Min', label: 'Daily Practice', detail: '10 min app practice + 10 min daily group meet' },
    { value: 1, suffix: ' In-Person', label: 'Half-Day Meetup', detail: 'Face-to-face gathering with therapists and cohort' },
    { value: 100, suffix: '%', label: 'Safe & Confidential', detail: 'Zero recordings shared without separate written consent' },
  ],

  team: {
    eyebrow: 'Our Team',
    headline: 'Real experts. Real people.',
    subheadline: 'Guided by certified Speech-Language Pathologists and supported by the Zlaqa AI Labs team.',
    members: [
      {
        id: 'team-slp',
        name: 'Clinical Team',
        role: 'Speech-Language Pathologists',
        isLeadSLP: true,
        credentials: 'Certified SLP Specialists',
        bio: 'Licensed speech clinicians leading weekly live sessions, individual assessments, diagnostic reviews, and evidence-informed speech drills.',
        quote: '"Speech steadiness is not about eliminating stammering—it is about speaking freely on your own terms."',
        imagePlaceholderCaption: 'Speech-Language Pathologists'
      },
      {
        id: 'team-anfaz',
        name: 'Anfaz N',
        role: 'Program Lead, ZLAQA',
        bio: 'Leads program design, participant onboarding, daily group coordination, and cohort experience across the 8 weeks.',
        imagePlaceholderCaption: 'Anfaz N, Program Lead'
      },
      {
        id: 'team-anfas',
        name: 'Anfas KP',
        role: 'Tech Lead, ZLAQA',
        bio: 'Builds and oversees the platform infrastructure, app integrations, and technical systems that keep sessions running smoothly.',
        imagePlaceholderCaption: 'Anfas KP, Tech Lead'
      },
      {
        id: 'team-shaheen',
        name: 'Shaheen',
        role: 'Founder, Zlaqa AI Labs',
        bio: 'Founder of Zlaqa AI Labs. Dedicated to building human-centric speech technology and supportive communities for people who stammer.',
        imagePlaceholderCaption: 'Shaheen, Founder'
      }
    ] as TeamMember[],
  },

  meetupAndTalks: {
    eyebrow: 'In-Person Gathering',
    headline: 'Online daily. In person once.',
    subheadline: 'In the first month, we meet face to face. Your cohort and your therapists together for a half day.',
    dateVenue: 'Date and venue will be announced after the 15-person cohort is confirmed.',
    expertTalks: 'Plus 2 to 3 exclusive expert masterclasses on voice, speech psychology, and confidence throughout the 8 weeks.'
  },

  pricing: {
    eyebrow: 'Transparent Pricing',
    headline: 'Simple pricing. Maximum value.',
    subheadline: 'Full 8-week program including weekly SLP sessions, app access, and the in-person meetup.',
    tiers: [
      {
        name: 'Cohort 01 Admission',
        price: '₹449',
        period: 'Full 8 weeks',
        description: 'All-inclusive enrollment covering live SLP coaching, app drills, and cohort community.',
        isPopular: true,
      }
    ],
  },

  safetyAndPrivacy: {
    eyebrow: 'Safety & Trust',
    headline: 'Your voice. Your safety.',
    subheadline: 'We treat your privacy with the highest respect and medical ethics.',
    points: [
      'Sessions are recorded only for program quality and SLP review, and only with your explicit consent.',
      'All recordings are stored in a private, restricted vault. Never shared publicly without separate written permission.',
      'Under 18? A parent or guardian must provide consent before you join (DPDP Act compliant).',
      'SPEAKUP is a guided practice program. We do not promise a cure. We promise structure, support and steady progress.',
      'Not a replacement for individual clinical therapy if you require individualized medical diagnosis.'
    ]
  },

  faq: {
    eyebrow: 'Frequently Asked Questions',
    headline: 'Clear, honest answers.',
    subheadline: 'Everything you need to know before applying for Cohort 01.',
    categories: ['Program & Schedule', 'Clinical & Medical', 'Participation & Privacy'] as const,
    items: [
      {
        id: 'faq-1',
        category: 'Program & Schedule',
        question: 'Do I need to be good with apps?',
        answer: 'No. If you can use WhatsApp, you can use this. We help you set up everything during Orientation Day.'
      },
      {
        id: 'faq-2',
        category: 'Program & Schedule',
        question: 'What if I miss a day?',
        answer: 'It happens! We check in gently. We never shame or judge you. You can catch up on practice exercises at your own pace.'
      },
      {
        id: 'faq-3',
        category: 'Participation & Privacy',
        question: 'Do I have to speak in the group?',
        answer: 'You will speak—slowly, safely, and in your own time. Nobody is pushed past what they can handle.'
      },
      {
        id: 'faq-4',
        category: 'Program & Schedule',
        question: 'Is it online?',
        answer: 'Yes. Daily practice and weekly sessions are online. The in-person meetup is optional but highly encouraged.'
      },
      {
        id: 'faq-5',
        category: 'Clinical & Medical',
        question: 'Is this therapy?',
        answer: 'It is a structured practice program led by Speech-Language Pathologists. It does not replace individual clinical therapy.'
      },
      {
        id: 'faq-6',
        category: 'Program & Schedule',
        question: 'How do I pay?',
        answer: 'After a short WhatsApp chat with our team to confirm your readiness, you will receive a secure payment link.'
      },
      {
        id: 'faq-7',
        category: 'Participation & Privacy',
        question: 'I am under 18. Can I join?',
        answer: 'Yes! Anyone from age 15 to 30 can join. If you are aged 15 to 17, parent or guardian consent is required.'
      }
    ] as FAQItem[],
  },

  closingCta: {
    heading: 'Your voice is already there.',
    subheading: 'Let’s help the world hear it.',
    buttonText: 'Apply now',
    dates: 'Apply by 19 November · Orientation 21 November · Program starts 23 November',
  },

  footer: {
    tagline: 'SPEAKUP. find your voice own your words',
    attribution: 'A ZLAQA AI Labs program',
    disclaimer: 'SPEAKUP is a guided speech practice program by ZLAQA AI Labs. We do not promise a cure.',
    copyright: `© 2026 ZLAQA AI Labs. All rights reserved.`,
    links: [
      { label: 'Privacy & Consent', href: '#privacy' },
      { label: 'Terms of Use', href: '#terms' },
    ],
    contact: {
      whatsapp: 'https://wa.me/918089124307',
      email: 'contact@zlaqa.com',
      instagram: 'https://instagram.com/zlaqa.ai',
    }
  }
};
