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
  waveformSmoothness: number; // 0 (fragmented) to 1 (pure smooth)
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

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  cohort: string;
  quote: string;
  voiceNoteDuration?: string;
  highlight: string;
  consentConfirmed: boolean;
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

export interface OfflineEventData {
  id: string;
  type: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  description: string;
  whatToExpect: string[];
  isHighlighted: boolean;
}

export interface StatementLine {
  id: string;
  text: string;
  accentPhrase: string;
}

export interface StatementData {
  eyebrow: string;
  lead: string;
  lines: StatementLine[];
  footnote: string;
}

export const SITE_CONTENT = {
  brand: {
    name: 'MYSB',
    fullName: 'Make Your Speech Better',
    tagline: 'Steadier every week.',
    heroHeadline: 'Find your voice, one day at a time.',
    heroSubheadline: 'An 8-week, mostly online guided speech practice program for young people aged 15 to 30 who stammer. Up to 10 seats per cohort.',
    quickPills: [
      '10 seats only',
      '8 weeks',
      'Ages 15–30',
      'Full Zlaqa App Access',
      '₹199 Program Fee'
    ],
    disclaimer: 'MYSB is a peer practice and speech confidence initiative, not a medical or clinical therapy clinic. We do not promise a "cure" or guaranteed outcomes.',
    brochurePdfUrl: '/assets/MYSB_Program_Brochure_2026.pdf',
    posterPdfUrl: '/assets/MYSB_Community_Poster_2026.pdf',
    whatsappInviteUrl: 'https://chat.whatsapp.com/[WHATSAPP_LINK]',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/[VIDEO_URL]?rel=0',
  },

  nav: {
    links: [
      { label: 'About', href: '#about' },
      { label: 'A Day in MYSB', href: '#daily-rhythm' },
      { label: 'What You Get', href: '#features' },
      { label: 'Events', href: '#events' },
      { label: 'FAQ', href: '#faq' },
    ],
    primaryCta: 'Join the Program',
  },

  hero: {
    badge: 'Cohort 1 Now Open · Slots Filling Fast',
    headline: 'Find your voice, one day at a time.',
    subtext: 'Daily 20-minute guided practice with full access to the Zlaqa app, weekly 1-on-1 Speech Language Pathologist reviews, and a tight-knit circle of 10 people who understand exactly what it feels like to stammer.',
    primaryCta: 'Join the Program',
    secondaryCta: 'Watch How It Works',
    socialProof: '₹199 Program Fee · 10 Seats Maximum · Confidential',
  },

  statement: {
    eyebrow: 'Our Philosophy',
    lead: 'Stammering is not something you have to hide or fight alone.',
    lines: [
      {
        id: 'line-1',
        text: 'MYSB is an 8-week space built on patience, warmth, and kindness,',
        accentPhrase: 'patience, warmth, and kindness',
      },
      {
        id: 'line-2',
        text: 'grounded in daily repetition and gentle clinical guidance.',
        accentPhrase: 'gentle clinical guidance',
      },
      {
        id: 'line-3',
        text: 'A tight-knit circle of young people who truly understand stammering,',
        accentPhrase: 'who truly understand stammering',
      },
      {
        id: 'line-4',
        text: 'practicing daily audio recordings together in the Zlaqa app,',
        accentPhrase: 'Zlaqa app',
      },
      {
        id: 'line-5',
        text: 'gathering each day on Google Meet with zero pressure to be fluent,',
        accentPhrase: 'zero pressure to be fluent',
      },
      {
        id: 'line-6',
        text: 'and building steady, unapologetic confidence in their everyday voice.',
        accentPhrase: 'steady, unapologetic confidence',
      },
    ],
    footnote: 'Steadier every week. Never rushed, never judged.'
  },

  journey: {
    eyebrow: '8-Week Curriculum',
    headline: 'The journey from hesitant to steady.',
    subheadline: 'A structured progression designed around muscle memory, desensitization, and real-life speaking confidence.',
    stops: [
      {
        id: 'stop-1',
        stepNumber: '01',
        badge: 'Weeks 1–2',
        title: 'Voice Habit & Safe Foundations',
        duration: 'Weeks 1–2 · Online',
        description: 'Establish the daily 20-minute rhythm. Start recording daily 3-minute audios in the Zlaqa app using visual image prompts. Attend the first "Daily Voice" Google Meet circle and have your initial 1-on-1 SLP assessment.',
        keyTakeaway: 'Removing initial speaking anxiety by normalizing your natural voice in the app.',
        mediaPlaceholderCaption: '[Replace: Participant recording speech audio on the Zlaqa app with warm morning light]',
        waveformSmoothness: 0.25,
      },
      {
        id: 'stop-2',
        stepNumber: '02',
        badge: 'Weeks 3–4',
        title: 'Desensitization & Topic Exploration',
        duration: 'Weeks 3–4 · Online',
        description: 'Transition from basic image prompts to talking about topics where you tend to stammer more. Deliver your first 5-minute team presentation in a safe, encouraging group environment.',
        keyTakeaway: 'Embracing speech blocks with gentle pausing techniques and reduced internal struggle.',
        mediaPlaceholderCaption: '[Replace: Small Google Meet screenshot showing supportive peer reactions]',
        waveformSmoothness: 0.50,
      },
      {
        id: 'stop-3',
        stepNumber: '03',
        badge: 'Weeks 5–6',
        title: 'Real-World Pressure Simulation',
        duration: 'Weeks 5–6 · Online',
        description: 'Engage in weekly 5-minute quick-question practice calls simulating unpredictable conversational turns. The SLP adds personalized audio prompts tailored to your specific triggers.',
        keyTakeaway: 'Handling unexpected pauses and conversational transitions with calm breath control.',
        mediaPlaceholderCaption: '[Replace: 1-on-1 SLP video consultation giving visual feedback on speech pacing]',
        waveformSmoothness: 0.75,
      },
      {
        id: 'stop-4',
        stepNumber: '04',
        badge: 'Weeks 7–8',
        title: 'Public Expression & Self-Advocacy',
        duration: 'Weeks 7–8 · Online',
        description: 'Present longer topics, lead a Daily Voice session, and practice speech disclosure strategies in everyday social or workplace settings with your cohort standing beside you.',
        keyTakeaway: 'Steadiness is not the absence of stammering—it is speaking your truth without fear.',
        mediaPlaceholderCaption: '[Replace: Participant presenting confidently over a video call with peers cheering]',
        waveformSmoothness: 0.95,
      }
    ] as JourneyStop[],
  },

  dailyRhythm: {
    eyebrow: 'A Day in MYSB',
    headline: 'Small daily commitments. Lasting speech transformation.',
    subheadline: 'Designed to fit seamlessly into school, college, or work routines without overwhelm.',
    steps: [
      {
        id: 'rhythm-1',
        timeEstimate: '20 Mins',
        title: 'Daily Practice Session',
        tagline: 'Morning or Evening · App & Meet',
        description: 'Guided gentle vocalization, diaphragmatic pacing, and warm-up exercises on the MYSB app or short Google Meet room.',
        iconName: 'Sparkles',
        highlightDetails: ['Vocal cord relaxation', 'Gentle onset practice', 'Pacing drills']
      },
      {
        id: 'rhythm-2',
        timeEstimate: '≥ 3 Mins',
        title: 'Daily Audio Recording (Zlaqa App)',
        tagline: 'Image Prompt · Speech Evaluation & Solutions',
        description: 'Open the Zlaqa app, explore the day’s visual prompt, and record at least 3 minutes of continuous speech. Evaluate your speech flow, understand your speech blocks, and unlock targeted solutions.',
        iconName: 'Mic',
        highlightDetails: ['Full access to Zlaqa app included', 'Speech pattern self-evaluation & block analysis', 'Targeted solutions reviewed with your SLP']
      },
      {
        id: 'rhythm-3',
        timeEstimate: 'Daily Group',
        title: '"Daily Voice" Meet',
        tagline: 'Google Meet · All 10 Peers',
        description: 'Our daily safe circle to talk through how the day felt, discuss speaking blocks, celebrate wins, and bond with peers who get it.',
        iconName: 'Users',
        highlightDetails: ['Zero pressure to be fluent', 'Active listening', 'Shared empathy']
      },
      {
        id: 'rhythm-4',
        timeEstimate: '5–10 Mins',
        title: 'Weekly 1-on-1 SLP Check-In',
        tagline: 'Individual · Speech Pathologist',
        description: 'Your assigned Speech Language Pathologist reviews your audio files, analyzes speech rhythm, and prescribes custom exercises and prompts.',
        iconName: 'UserCheck',
        highlightDetails: ['Individualized feedback', 'Custom image prompts', 'Targeted technique tuning']
      },
      {
        id: 'rhythm-5',
        timeEstimate: 'Full Day',
        title: 'Sunday Rest Day',
        tagline: 'Rest & Recharge · Every Week',
        description: 'No recordings, no meetings. Rest your voice, spend time with loved ones, and let neural motor pathways integrate naturally.',
        iconName: 'Coffee',
        isRest: true,
        highlightDetails: ['Zero required tasks', 'Mental relaxation', 'Ready for Monday fresh']
      }
    ] as DayStep[],
  },

  featuresBento: {
    eyebrow: 'What You Get',
    headline: 'Everything you need to build steady speech.',
    subheadline: 'A complete ecosystem of clinical guidance, daily accountability, and compassionate community.',
    items: [
      {
        id: 'bento-1',
        span: 'col-span-12 md:col-span-6 lg:col-span-8',
        badge: 'Clinical Partnership',
        title: 'Weekly 1-on-1 SLP Feedback & Custom Prompts',
        description: 'Your Speech Language Pathologist reviews your weekly recordings, adds tailored image prompts for your specific triggers, and provides direct actionable coaching.',
        visualType: 'slp-tag',
        extraMeta: '5–10 min private review every week'
      },
      {
        id: 'bento-2',
        span: 'col-span-12 md:col-span-6 lg:col-span-4',
        badge: 'Peer Support',
        title: 'The "Daily Voice" Safe Circle',
        description: 'A daily Google Meet room where stammering is completely normalized. Speak at your own speed with 9 peers who truly understand.',
        visualType: 'waveform',
        extraMeta: 'Daily Google Meet'
      },
      {
        id: 'bento-3',
        span: 'col-span-12 lg:col-span-4',
        badge: 'Zlaqa App Included',
        title: 'Zlaqa App Access & Speech Evaluation',
        description: 'Every participant receives access to the Zlaqa app included with the program. Record daily audios, evaluate speaking blocks, and discover personalized solutions.',
        visualType: 'voice-bars',
        extraMeta: 'Full Zlaqa App Access Included'
      },
      {
        id: 'bento-4',
        span: 'col-span-12 md:col-span-6 lg:col-span-4',
        badge: 'Real-World Drills',
        title: 'Weekly 5-Min Presentations & Quick Calls',
        description: 'Practice 5-minute team presentations and spontaneous 5-minute rapid question calls to simulate unpredictable real-life conversations.',
        visualType: 'presentation',
        extraMeta: 'Builds spontaneous resilience'
      },
      {
        id: 'bento-5',
        span: 'col-span-12 md:col-span-6 lg:col-span-4',
        badge: 'In-Person Community',
        title: 'Offline Cohort Gathering (In Planning)',
        description: 'We are planning a special in-person cohort gathering. Secret date and venue will be decided collaboratively with confirmed participants.',
        visualType: 'offline-chip',
        extraMeta: 'Gathering in planning'
      }
    ] as BentoItem[],
  },

  numbers: [
    { value: 10, suffix: '', label: 'Seats per Cohort', detail: 'Intimate size to ensure deep attention and genuine peer bonds' },
    { value: 8, suffix: ' Wks', label: 'Program Length', detail: 'Structured progression from foundational habits to public speech' },
    { value: 20, suffix: ' Min', label: 'Daily Practice', detail: 'Manageable daily micro-routine that fits any schedule' },
    { value: 3, suffix: ' Min+', label: 'Recorded Audio Daily', detail: 'Focused speech practice on image and challenge topics' },
    { value: 1, suffix: 'x / Wk', label: '1-on-1 SLP Review', detail: 'Personalized clinical feedback and tailored prompts' },
  ],

  team: {
    eyebrow: 'Leadership & Clinical Guidance',
    headline: 'Guided by speech professionals, driven by community.',
    subheadline: 'Our team bridges certified clinical speech science with dedicated operations and empathetic coordination.',
    members: [
      {
        id: 'team-slp',
        name: '[SLP NAME]',
        role: 'Consultant Speech Language Pathologist',
        isLeadSLP: true,
        credentials: 'M.Sc. SLP, Licensed Clinical Specialist',
        bio: 'Specializing in fluency disorders, cognitive-communication resilience, and holistic stammering therapies. Passionate about empowering young voices through compassionate, structured daily practice.',
        quote: '"Speech steadiness is not about perfection—it is about finding the freedom to speak without holding back."',
        imagePlaceholderCaption: '[Replace: Professional warm headshot of the Speech Language Pathologist]'
      },
      {
        id: 'team-tech',
        name: 'Anfas KP',
        role: 'Technical & Operations Lead',
        bio: 'Leads program infrastructure, technology coordination, and cohort operations to make the daily MYSB experience seamless, safe, and intuitive for every participant.',
        imagePlaceholderCaption: '[Replace: Portrait of Anfas KP with natural studio lighting]'
      },
      {
        id: 'team-coord-1',
        name: 'Harshidha',
        role: 'Program Coordinator',
        bio: 'Facilitates the Daily Voice Google Meet sessions, community onboarding, and peer encouragement across the 8 weeks.',
        imagePlaceholderCaption: '[Replace: Warm portrait of Harshidha]'
      },
      {
        id: 'team-coord-2',
        name: 'Nisha',
        role: 'Cohort Coordinator',
        bio: 'Coordinates scheduling, 1-on-1 SLP time slots, and supports participants with gentle daily practice reminders.',
        imagePlaceholderCaption: '[Replace: Warm portrait of Nisha]'
      },
      {
        id: 'team-coord-3',
        name: 'Ayesha',
        role: 'Community Experience Lead',
        bio: 'Organizes the in-person kickoff and closing events, ensuring every member feels welcomed, heard, and supported.',
        imagePlaceholderCaption: '[Replace: Warm portrait of Ayesha]'
      }
    ] as TeamMember[],
  },

  offlineEvents: {
    eyebrow: 'In-Person Gathering',
    headline: 'Connect in real life: An offline gathering with your 10 members.',
    subheadline: 'While daily practice takes place online, we bring our 10-person circle together for an in-person gathering—stepping away from screens into a relaxed, supportive real-world space.',
    gathering: {
      badge: 'Cohort Gathering',
      status: 'Planned with Members',
      title: 'The 10-Member Offline Gathering',
      dateTeaser: 'Planned collaboratively with your 10 cohort members',
      venueTeaser: 'Comfortable, private space chosen together with the cohort',
      format: 'Intimate in-person meetup with your 10 peers & Speech Pathologist',
      description: 'An opportunity to step out from behind the screen and meet your fellow cohort members and Speech Language Pathologist in person. Share stories, practice low-pressure real-world conversations, enjoy food, and celebrate your voice progress together.',
      whatToExpect: [
        'Face-to-face circle with your 10 cohort members & Speech Pathologist',
        'Gentle, low-pressure conversational practice and real-world confidence exercises',
        'Direct personalized technique tips and voice encouragement from the SLP',
        'Shared meal and casual conversation in a safe, warm environment',
        'Date, timing, and venue planned collaboratively with confirmed cohort members'
      ],
      footnoteLeft: 'Included for all enrolled cohort participants',
      footnoteRight: 'Planned collaboratively after cohort onboarding'
    } as OfflineGatheringData,
  },

  testimonials: {
    eyebrow: 'Participant Experiences',
    headline: 'Stories from voices finding their steadiness.',
    subheadline: 'All stories and reflections are shared with explicit written consent from our participants and parents.',
    disclaimer: 'Reflections represent individual personal journeys. MYSB does not promise clinical cures.',
    items: [
      {
        id: 'voice-1',
        name: '[Participant A]',
        age: 21,
        location: 'Calicut',
        cohort: 'Pilot Cohort',
        quote: 'Before MYSB, I would stay silent in college discussions rather than risk a heavy block. Recording audio daily for 3 minutes and knowing my 9 peers were doing the same broke the fear cycle completely.',
        highlight: 'Spoke up in class for the first time in 3 years',
        voiceNoteDuration: '0:42',
        consentConfirmed: true
      },
      {
        id: 'voice-2',
        name: '[Participant B]',
        age: 17,
        location: 'Kochi',
        cohort: 'Pilot Cohort',
        quote: 'My parents signed me up because I was terrified of job interviews. Having 5-minute quick question calls every week with the SLP gave me concrete tools to handle unexpected pauses with calm breathing.',
        highlight: 'Cleared first college viva interview with confidence',
        voiceNoteDuration: '0:35',
        consentConfirmed: true
      },
      {
        id: 'voice-3',
        name: '[Participant C]',
        age: 26,
        location: 'Trivandrum',
        cohort: 'Pilot Cohort',
        quote: 'The "Daily Voice" Google Meet is unlike anything else. You never feel judged. Everyone stammers, everyone pauses, and everyone listens with pure patience.',
        highlight: 'Steadier speech at workplace meetings',
        voiceNoteDuration: '0:50',
        consentConfirmed: true
      }
    ] as Testimonial[],
  },

  faq: {
    eyebrow: 'Frequently Asked Questions',
    headline: 'Clear answers for participants and parents.',
    subheadline: 'Everything you need to know about the 8-week commitment, privacy, and clinical boundaries.',
    categories: ['Program & Schedule', 'Clinical & Medical', 'Participation & Privacy'] as const,
    items: [
      {
        id: 'faq-1',
        category: 'Program & Schedule',
        question: 'Who is eligible to join MYSB?',
        answer: 'MYSB is tailored specifically for young people aged 15 to 30 who stammer or struggle with speech fluency anxiety. Each cohort is strictly capped at 10 participants to maintain intimate, high-quality peer interaction and individual SLP attention.'
      },
      {
        id: 'faq-2',
        category: 'Program & Schedule',
        question: 'How much time do I need to commit each day?',
        answer: 'Expect approximately 20 to 30 minutes per day. This includes your 20-minute guided practice / Daily Voice Google Meet, plus at least 3 minutes recording your audio journal in the app. Once a week, you have a 5–10 minute 1-on-1 call with the Speech Language Pathologist. Sunday is a complete rest day.'
      },
      {
        id: 'faq-3',
        category: 'Program & Schedule',
        question: 'What happens if I miss a daily session or audio recording?',
        answer: 'Life happens! You can catch up on your daily audio recording later in the day. If you miss a Daily Voice meet, your cohort coordinator will check in gently to ensure you have what you need. We prioritize consistent habit over rigid perfection.'
      },
      {
        id: 'faq-4',
        category: 'Clinical & Medical',
        question: 'Is MYSB a replacement for formal speech therapy?',
        isSLPApprovedWording: true,
        answer: 'MYSB is a structured speech practice, habit-building, and peer-support program guided by a Speech Language Pathologist. It provides evidence-informed fluency drills and desensitization exercises, but is not a medical diagnosis or hospital clinical intervention. Participants undergoing individual clinical therapy may use MYSB as supplementary practice in consultation with their clinician.'
      },
      {
        id: 'faq-5',
        category: 'Clinical & Medical',
        question: 'Do you promise or guarantee a "cure" for stammering?',
        answer: 'No. Stammering is a complex neurodevelopmental variation. We do not make false promises or promote miracle cures. Our goal is to reduce speaking anxiety, cultivate vocal steadiness, build conversational resilience, and help you speak freely and unapologetically.'
      },
      {
        id: 'faq-6',
        category: 'Participation & Privacy',
        question: 'Is my audio and registration data kept strictly confidential?',
        answer: 'Yes, 100%. Your daily audio recordings are stored securely and accessible only to you and your assigned Speech Language Pathologist for clinical feedback. We never sell, share, or publish participant audio, photos, or details without explicit written consent.'
      },
      {
        id: 'faq-7',
        category: 'Participation & Privacy',
        question: 'What is the program fee to join MYSB?',
        answer: 'The program fee is ₹199 for the full 8-week cohort. This nominal fee covers your guided daily practice, weekly 1-on-1 Speech Language Pathologist check-ins, companion app access, and the collaborative offline gathering.'
      },
      {
        id: 'faq-8',
        category: 'Participation & Privacy',
        question: 'I am under 18. What extra details are required?',
        answer: 'Participants aged 15 to 17 are warmly welcome. As part of our child safety and parental trust standards, we require the name, contact number, and explicit digital consent of a parent or legal guardian during registration.'
      },
      {
        id: 'faq-9',
        category: 'Program & Schedule',
        question: 'What is the Zlaqa app and is it included?',
        answer: 'Yes! Every enrolled MYSB participant receives full access to the Zlaqa app included with their ₹199 cohort registration. You will use Zlaqa for your Daily Audio Recording sessions to evaluate your speech, identify blocks and problem areas, and unlock personalized solutions alongside your SLP guidance.'
      },
      {
        id: 'faq-10',
        category: 'Program & Schedule',
        question: 'What devices and tools do I need to participate?',
        answer: 'You only need a smartphone (Android or iOS) with the Zlaqa app installed, a working microphone and camera, a stable internet connection, Google Meet, and access to WhatsApp for cohort announcements.'
      },
      {
        id: 'faq-11',
        category: 'Program & Schedule',
        question: 'What if the 10 cohort seats are already full?',
        answer: 'If the current cohort is at full capacity (10/10), you will automatically be invited to join our Priority Waitlist for Cohort 2. You will also receive an invitation to join our public WhatsApp community for upcoming workshops and resources.'
      }
    ] as FAQItem[],
  },

  registration: {
    eyebrow: 'Secure Your Seat',
    headline: 'Join Cohort 1 · 10 Seats Maximum',
    subheadline: 'Strict 10-seat cohort for young people who stammer. Fill the 2-minute form below to join.',
    reassuranceTitle: 'What happens after you submit:',
    reassuranceSteps: [
      'Our team reviews your application within 24–48 hours.',
      'You receive an invitation to join the official Cohort 1 WhatsApp group.',
      'Our team schedules a brief welcome orientation call before the cohort begins.',
    ],
    privacyPledge: 'We respect your privacy. No spam, no health details requested, no public disclosure without consent.',
  },

  footer: {
    tagline: 'Make Your Speech Better · Steadier every week.',
    disclaimer: 'MYSB (Make Your Speech Better) is an educational speech practice initiative for ages 15–30 who stammer. Not a replacement for individualized medical diagnoses.',
    copyright: `© ${new Date().getFullYear()} MYSB Program. All rights reserved.`,
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Use', href: '#terms' },
      { label: 'Brochure (PDF)', href: '/assets/MYSB_Program_Brochure_2026.pdf' },
      { label: 'Community Poster (PDF)', href: '/assets/MYSB_Community_Poster_2026.pdf' },
    ],
    contact: {
      email: 'hello@mysbprogram.org',
      whatsapp: 'https://chat.whatsapp.com/[WHATSAPP_LINK]',
      instagram: 'https://instagram.com/mysbprogram',
    }
  }
};
