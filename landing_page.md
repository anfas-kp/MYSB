# MYSB Landing Page: Product Requirements Document

|  |  |
| --- | --- |
| **Product** | MYSB program landing page |
| **Version** | 1.0 (draft) |
| **Date** | 30 September 2026 |
| **Technical owner** | Anfas KP |
| **Operations coordination** | Anfas KP with the MYSB operations team |
| **Status** | Ready for review |

Items marked **\[Assumption\]** were not stated in the brief and need confirmation. Section 15 lists them all.

---

## 1. Overview

MYSB is an 8-week, mostly online speech practice program for young people aged 15 to 30 who stammer. Each cohort has up to 10 participants. Participants practise daily, meet a Speech Language Pathologist (SLP) weekly, and support each other in a small group.

The landing page is the main public face of the program. It explains what MYSB is, shows how the 8 weeks work, builds trust, and moves visitors to register interest and join the WhatsApp group.

## 2. Goals and success metrics

### Goals

1. Explain the program clearly in under 2 minutes of reading.
2. Make visitors feel safe, welcome and unjudged.
3. Convert interested visitors (participants and parents or guardians) into registrations.
4. Reduce repeated questions by answering FAQs on the page.
5. Give the operations team clean, organised registration data.

### Success metrics

| Metric | Target **\[Assumption\]** |
| --- | --- |
| Registration form completion rate (of visitors who start it) | 60% or higher |
| Visitor-to-registration conversion | 5% or higher |
| Mobile page load (LCP) | Under 2.5 seconds on 4G |
| WhatsApp group join clicks after registration | 80% or higher |
| Cohort seats filled | 10 of 10 before the start date |
| Lighthouse scores (performance, accessibility, SEO) | 90 or higher |

### Non-goals (v1)

- No payment integration (confirmed in the brief).
- No participant login or dashboard. Practice happens in the existing app.
- No blog or CMS.
- No medical claims or guaranteed outcomes.

## 3. Target audience

| Persona | Description | Needs |
| --- | --- | --- |
| **Participant (15 to 30)** | Young person who stammers and wants structured practice and a supportive peer group | Reassurance, clear daily commitment, low-pressure sign-up |
| **Parent or guardian** | Signs up or supports a participant, especially those aged 15 to 17 | Trust, SLP credentials, safety, privacy, schedule clarity |
| **Referrer** | Teacher, counsellor or friend sharing the link | A page that is easy to forward and understand quickly |

Most traffic is expected from mobile, arriving via Instagram, WhatsApp shares and word of mouth, so the page is **mobile-first**.

## 4. Program facts the page must communicate

| Item | Detail |
| --- | --- |
| Duration | 8 weeks |
| Cohort size | Up to 10 participants |
| Age range | 15 to 30 |
| Delivery | Mostly online, via Google Meet and the MYSB app |
| Offline events | One at the start and one after the 8 weeks **\[Assumption: dates and venue TBD\]** |
| Daily practice | 20-minute practice session |
| Daily audio | At least 3 minutes of recorded audio in the app. After the image prompt, participants may talk on any topic where they tend to stammer more |
| Daily Voice | Daily Google Meet to discuss progress and concerns and to talk with each other |
| Weekly topic session | 5-minute topic presentation by each team on Google Meet |
| Practice call | 5-minute practice call with quick questions |
| Weekly SLP check-in | 5 to 10 minutes per participant. The SLP reviews app performance and gives feedback, exercises and improvement tips |
| SLP prompts | The SLP can add new prompts or images for individual participants |
| Rest day | Sunday |
| Time commitment | About 20 to 30 minutes a day plus the weekly SLP call **\[Assumption: confirm total\]** |

## 5. Scope

### In scope (v1)

- Single-page responsive landing page with the sections in Section 7
- Registration form with backend storage and notifications
- WhatsApp group join button and link
- Embedded video (program intro) and downloadable brochure and poster
- FAQ, contact section and privacy policy page
- Basic analytics and SEO
- Hosting, SSL and custom domain

### Out of scope (v1)

- Payments, invoicing and refunds
- User accounts
- Multi-language versions **\[Assumption: English first; Malayalam version is a possible v1.1\]**
- Live chat

## 6. User flows

### Primary flow: Register

1. Visitor lands on the page from Instagram, WhatsApp or search.
2. Reads the hero and scrolls, or taps **Join the program**.
3. Fills the registration form.
4. Sees a confirmation screen with a **Join WhatsApp group** button.
5. Receives a confirmation email or message.
6. The operations team reviews the entry and confirms the seat **\[Assumption\]**.

### Secondary flows

- **Learn more:** Visitor watches the video and downloads the brochure.
- **Parent flow:** Visitor reads the SLP and safety sections, then contacts the team.
- **Full cohort:** When seats are full, the form switches to **Join the waitlist**.

## 7. Page structure and content requirements

### 7.1 Navigation (sticky)

- Logo (left), anchor links (About, How it works, Team, FAQ), and a **Join** button (right)
- On mobile: a compact menu plus a sticky bottom bar with **Join** and **WhatsApp**

### 7.2 Hero

- Headline, for example: *"Find your voice, one day at a time."* **\[Assumption: final copy TBD\]**
- Subheading: 8-week guided speech practice program for ages 15 to 30
- Badges: *Ages 15 to 30 · Up to 10 seats · Mostly online*
- Primary CTA: **Join the program**. Secondary CTA: **Watch how it works**
- Animated sound-wave background (subtle, respects reduced motion)

### 7.3 About MYSB

- 2 to 3 short paragraphs on the purpose and approach
- Supportive, non-clinical tone. No promises of a "cure"

### 7.4 How it works: 8-week journey

- Visual timeline: Kickoff (offline), Weeks 1 to 8, Closing event (offline)
- Each phase gets a one-line description **\[Assumption: week-wise themes to be provided by the SLP\]**

### 7.5 A day in MYSB

A simple daily strip:

1. 20-minute practice (Google Meet and app)
2. 3-minute audio in the app
3. Daily Voice meet
4. Sunday: rest day

### 7.6 What you get

Cards for:

- Daily guided practice
- Weekly one-to-one with the SLP
- App-based feedback and exercises
- Personalised prompts and images
- Weekly topic presentations
- Peer community and Daily Voice
- Offline events

### 7.7 Meet the team

- SLP profile (name, photo, credentials, short bio)
- Program coordinators. Names from the brief: Harshidha, Nisha, Ayesha. Add photos and roles **\[Assumption: confirm who is shown publicly\]**
- Technical and operations lead: Anfas KP

### 7.8 Offline events

- Kickoff and closing event details: date, city, venue and what to expect **\[Assumption: TBD\]**

### 7.9 Video

- Embedded program intro video with captions
- Thumbnail, not autoplay

### 7.10 Who this is for

- Short list covering age range, comfort with online sessions, and a commitment of a few minutes daily
- Note for parents and guardians of participants under 18

### 7.11 FAQ (accordion)

Suggested questions:

- Who can join?
- How much time does it take each day?
- What if I miss a day?
- What happens in the Daily Voice meet?
- Is my information kept private?
- Is this a replacement for therapy? **\[Assumption: needs SLP-approved wording\]**
- What do I need to join? (phone or laptop, internet, Google Meet, the app)
- What are the offline events?
- How do I join the WhatsApp group?

### 7.12 Registration section

See Section 8.

### 7.13 Contact and footer

- WhatsApp, email and Instagram links
- Privacy policy, terms and a short disclaimer
- Downloads: brochure and poster (PDF)

## 8. Registration form requirements

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Full name | Text | Yes |  |
| Age | Number (15 to 30) | Yes | Validate the range |
| Phone / WhatsApp number | Phone | Yes | Country code selector |
| Email | Email | Yes |  |
| City / country | Text | Yes |  |
| Parent or guardian name and number | Text | If under 18 | Shown conditionally |
| Preferred language | Select | No | **\[Assumption\]** |
| Anything you'd like us to know | Long text | No | Optional. Keep the wording gentle |
| Consent checkbox (data use and privacy policy) | Checkbox | Yes |  |
| Guardian consent checkbox | Checkbox | If under 18 | Shown conditionally |

**Behaviour**

- Inline validation with friendly error messages
- Spam protection (honeypot or CAPTCHA)
- On success: confirmation screen, the WhatsApp join button and an email or message confirmation
- The form stays short so that it can be completed in under 2 minutes
- Do not collect health details on the form. Keep it to the minimum needed

## 9. Functional requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-1 | The page is a single responsive page with smooth-scroll anchors | Must |
| FR-2 | The registration form validates input client-side and server-side | Must |
| FR-3 | Submissions are stored securely and visible to the operations team in a dashboard or spreadsheet **\[Assumption: Google Sheets or an admin table\]** | Must |
| FR-4 | New registrations trigger an email notification to the operations team | Must |
| FR-5 | The visitor receives an automated confirmation email or message | Should |
| FR-6 | WhatsApp group join button on the confirmation screen and the sticky bar | Must |
| FR-7 | A seat counter ("X of 10 seats left") can be updated by an admin | Should |
| FR-8 | Waitlist mode when seats are full | Should |
| FR-9 | Embedded video with captions | Must |
| FR-10 | Downloadable brochure and poster PDFs | Should |
| FR-11 | FAQ accordion | Must |
| FR-12 | Cookie or analytics consent banner where required | Should |
| FR-13 | Open Graph and Twitter share cards so links preview well on WhatsApp and Instagram | Must |
| FR-14 | Privacy policy and terms pages | Must |
| FR-15 | Admin can update the seat count, dates, WhatsApp link and video without code changes **\[Assumption\]** | Could |

## 10. Non-functional requirements

- **Performance:** LCP under 2.5 seconds on a mid-range phone over 4G. Compress images (WebP or AVIF) and lazy-load below the fold.
- **Accessibility:** WCAG 2.1 AA. High contrast, keyboard navigation, visible focus states, alt text, captions on video, `prefers-reduced-motion` respected, minimum 16px body text, and tap targets of at least 44px.
- **Responsive:** Mobile first, tested from 360px up to large desktop.
- **Browser support:** Latest two versions of Chrome, Safari, Firefox and Edge, plus Android and iOS browsers.
- **Security:** HTTPS everywhere, server-side validation, rate limiting on the form, and no secrets exposed in the client.
- **Privacy:** Data minimisation, clear consent, a stated retention period, and no sharing of participant data. Participant photos and testimonials require written consent.
- **Reliability:** Target 99.9% uptime through a reputable host and CDN.
- **SEO:** Semantic HTML, meta title and description, a sitemap and structured data.

## 11. Design requirements

Full direction is in the earlier style discussion. Summary:

- **Feel:** Warm, calm and confident. Not clinical, not loud.
- **Direction:** Calm Wellness with a touch of Youth Community.
- **Colour:** Warm cream base, one bright accent (deep teal, indigo or coral), and a soft secondary tone.
- **Typography:** Rounded or geometric sans for headings (Poppins, DM Sans or Plus Jakarta Sans), and Inter or Nunito for body text.
- **Motif:** Sound-wave shapes in the hero and as section dividers.
- **Components:** Rounded cards, pill buttons and gentle shadows.
- **Imagery:** Illustrations or consented real photos. No stereotypical therapy stock photos.
- **Motion:** Subtle only, with no flashing or autoplay audio.
- **Tone of voice:** Encouraging and respectful. Avoid pity language and diagnostic terms. Avoid guaranteed outcomes.

## 12. Analytics and tracking

Events to track:

- Page view and scroll depth
- Click on **Join the program** (by placement)
- Form started, form step or field errors, and form submitted
- WhatsApp join click
- Video play and completion
- Brochure download
- FAQ opens
- Traffic source (UTM parameters for Instagram, WhatsApp and others)

Tools **\[Assumption\]**: Google Analytics 4 or Plausible, with an optional Microsoft Clarity for heatmaps.

## 13. Technical approach and ownership

**Ownership:** Anfas KP owns all technical aspects, including build, hosting, domain, form backend, analytics and maintenance. He coordinates with operations on content, dates and registrations.

**Suggested stack \[Assumption\]**

- Front end: Next.js or plain HTML, CSS and JS with Tailwind
- Form backend: serverless function writing to Google Sheets or Airtable, or a small database
- Email: Resend, Brevo or Gmail SMTP
- Hosting: Vercel or Netlify, with a custom domain and SSL
- Assets: Optimised images, self-hosted or Google Fonts, and video hosted on YouTube (unlisted) or Vimeo

**Operations handoff**

- Registrations are reviewed by the operations team, with Anfas KP as the point of contact for the SLP
- Tasks can be delegated to Harshidha, Nisha, Ayesha or others on the team

## 14. Related deliverables (outside this PRD)

These support the landing page and share its branding:

- Brochure
- Program video, including a human-featured version, and a simple poster
- WhatsApp group setup (name, description, rules and welcome message)

## 15. Open questions and assumptions

1. Final program name, tagline and branding assets (logo, colours)
2. Cohort start date, and dates and venues for both offline events
3. SLP name, credentials and approved bio, and wording that the SLP approves for medical and outcome claims
4. Whether the coordinators are shown publicly, and whether to include photos
5. Registration approval flow: is seat confirmation manual, and is there any selection criterion?
6. Waitlist and multiple-cohort plans
7. Total daily time commitment, and what happens when a participant misses days
8. Data retention period and who can access registration data
9. Language options (English only or Malayalam as well)
10. Video content and who appears in it, and consent for any participant photos or testimonials
11. Domain name and hosting budget
12. Whether parents need a separate section or contact route

## 16. Milestones **\[Assumption: adjust to the launch date\]**

| Phase | Duration | Output |
| --- | --- | --- |
| Content and copy finalised | Week 1 | Approved copy, team bios, dates, FAQ |
| Design | Week 1 to 2 | Mobile and desktop mockups, and design approval |
| Build | Week 2 to 3 | Working page, form, notifications and analytics |
| Testing | Week 3 | Cross-device, accessibility, performance and form tests |
| Launch | End of Week 3 | Live site, WhatsApp group active, and announcement on Instagram |
| Post-launch review | 2 weeks after | Conversion review and content tweaks |

## 17. Acceptance criteria

- All sections in Section 7 are live with approved content.
- A test registration reaches the operations team and sends the visitor a confirmation.
- The WhatsApp link works from the confirmation screen and the sticky bar.
- The page meets the performance and accessibility targets in Section 10.
- The under-18 flow correctly requires guardian details and consent.
- Share previews display correctly on WhatsApp and Instagram.
- The privacy policy is published and linked in the footer and the form.
- Analytics events fire as listed in Section 12.

## 18. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Visitors feel judged or anxious about signing up | Warm copy, a short form, and no health questions |
| Low registrations | Share on Instagram and WhatsApp, use short referral messages, and add a seat counter |
| Sensitive data handling | Collect minimum data, restrict access, and publish a clear privacy policy |
| Over-promising results | SLP-approved wording and a clear disclaimer |
| Content delays | Build with placeholders, and set content deadlines in Week 1 |
| Spam submissions | Honeypot or CAPTCHA and rate limiting |