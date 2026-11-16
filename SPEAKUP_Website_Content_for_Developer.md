# SPEAKUP Website: Content and Build Brief

**For:** Developer (coordinate with Anfas KP, Tech Lead)
**Owner:** Shaheen, Founder of Zlaqa AI Labs
**Program:** SPEAKUP, Cohort 01, starts Mon 23 Nov 2026
**Goal of the site:** get 13 to 15 people aged 15 to 30 who stammer to **apply, talk to us, and pay** before Fri 20 Nov.
**Status:** Working draft. Date: 14 Nov 2026.

> Timeline is tight. Build **Version 1 as a single landing page + apply form + privacy page.** Ship by **Mon 16 Nov**. Everything else comes later.

---

## 1. Brand

### Logo
- File: `assets/speakup-logo.png` (the SPEAKUP wordmark with the green arrow in the U, and the line "find your voice own your words").
- Black wordmark, green arrow, on white.
- **Ask for an SVG or transparent PNG.** The current file is a flat PNG on white. Use it as is on white backgrounds only until a vector is ready.
- Give it clear space equal to the height of the letter "U" on all sides.
- **Do not** recolor the wordmark, stretch it, add shadows, or place it on busy images.
- Minimum width: 120px on screen.
- On dark or violet backgrounds, a white version is needed. Request it from design.

### Colour theme

**Primary: Green and White. Secondary: Violet (purple).**
White leads. Green is the action colour. Violet supports.

| Role | Name | HEX | Use |
|---|---|---|---|
| **Primary** | **Zlaqa Green** | `#6EC000` | Arrow accent, buttons, highlights, progress, icons |
| **Primary** | **White** | `#FFFFFF` | Main backgrounds (most of the page) |
| **Secondary** | **Violet** | `#6D28D9` | Headings accents, links, section bands, badges, hover states |
| Neutral | Ink Black | `#0B0B0B` | Body text and the wordmark |
| Support | Violet Soft | `#F5F3FF` | Alternate section backgrounds, cards |
| Support | Violet Light | `#EDE9FE` | Tags, dividers, subtle fills |
| Support | Deep Violet | `#5B21B6` | Hover/pressed on violet |
| Support | Green Dark | `#3F7300` | Green text or hover when text must be green |
| Support | Green Soft | `#F1F9E4` | Success states, light green fills |

*Green `#6EC000` is the Zlaqa brand kit primary green. The violet values are proposed by us. Confirm with Shaheen before launch. Note: the green arrow in the current logo file measures slightly different (about `#74BC10`). Ask design to match it to `#6EC000` in the vector version.*

### Colour rules
- **White is the base.** 70 percent or more of any screen is white or very light.
- **Green is for action.** Primary buttons, the key number, the arrow motif.
- **Violet is for support.** Section headings accents, links, badges, footer band, card borders.
- **No blue anywhere.** (Zlaqa brand rule.)
- **Never put white text on green.** Contrast is only 2.28:1 and fails accessibility. Use **Ink Black text on green** (8.6:1).
- **Never put green text on white** for body copy. If green text is needed, use Green Dark `#3F7300` (5.7:1).
- White on Violet `#6D28D9` is good (7.1:1). Use it for banners and the footer.
- Body text: Ink Black on white (19.7:1).

### Button styles
- **Primary:** background `#6EC000`, text `#0B0B0B`, bold, 12px radius. Hover: `#62AD00`.
- **Secondary:** background `#6D28D9`, text `#FFFFFF`. Hover: `#5B21B6`.
- **Ghost:** transparent, violet border and text.
- Focus ring on every interactive element: 3px `#6D28D9` outline with 2px offset.

### Typography
- **Headings:** Nasi (Zlaqa brand font) if the licence covers web use. If not, use a wide, bold geometric sans as a fallback. Ask Shaheen.
- **Body:** a clean, readable sans-serif (Inter or similar). 17 to 18px minimum. Line height 1.6.
- Short lines, short paragraphs. Big headings. Lots of white space.

### Voice (for any text you write)
- Human first. Bold. Short and punchy.
- Talk to the reader: "you".
- No clinical jargon. No corporate tone.
- **Never promise a cure.** Never say "fix your stammer".
- **No em-dashes.**

---

## 2. Accessibility and audience rules (important)

Our audience stammers. Design for them first.

- **No timed forms.** No countdowns that cut off typing.
- **No required phone call to apply.** Offer WhatsApp or call, their choice.
- **No auto-playing audio or video.** Video must have captions.
- No pop-ups on load. No chat widgets that interrupt.
- Contrast: WCAG AA at minimum (see colour rules).
- Keyboard navigable. Visible focus. Alt text on all images.
- Works on low-end phones and slow data. **Mobile first.** Page under 2 MB, loads under 3 seconds on 4G.
- Language: **English now.** Add **Malayalam** next (structure the site so a second language can be added).

---

## 3. Site map (Version 1)

| Page | Purpose |
|---|---|
| **Home** (single scrolling page) | Explain, build trust, drive to Apply |
| **Apply** | Application form |
| **Thank You** | Confirmation and next steps |
| **Privacy and Consent** | Data, recording, under-18 consent |

Later (Version 2): Refer a Friend page, Team page, Stories page, Malayalam version.

**Sticky header:** logo left, "Apply" button (green) right.
**Home sections in order:** Hero, Problem, Who it's for, What you get, A day in SPEAKUP, 8-week journey, Team, Offline meetup and talks, Price and referral, Safety and privacy, FAQ, Final call to action, Footer.

---

## 4. HOME PAGE CONTENT

### Hero
**Headline:** `SPEAKUP`
**Subhead:** Find your voice. Own your words.
**Line:** An 8-week speech program for young people who stammer. Ages 15 to 30.
**Button (green):** `Apply now`
**Button (ghost):** `How it works`
**Small text under buttons:** Cohort 01 starts 23 November 2026. Only 15 seats.

*Visual: large logo on white, with a soft violet shape behind and a green arrow motif rising. Optional: a real photo of the community with consent. No stock photos of people holding microphones.*

---

### Problem
**Heading:** You are not the problem. Silence is.

You know the answer.
You know the words.
Then the moment comes, and your voice goes quiet.

So you skip the introduction.
You swap the word.
You let someone else order for you.

**SPEAKUP is built to end that.**
Not by pretending you don't stammer. By giving you tools, practice, experts and people, so you can speak on your own terms.

You will not do it alone.

---

### Who it's for
**Heading:** Built for you if

- You are **15 to 30**
- You **stammer**, or speaking with fluency and confidence is hard
- You can give **20 minutes a day**
- You want to be around people who get it

**Badge (violet):** Small cohort. 10 to 15 people. Everyone is heard.

---

### What you get
**Heading:** Everything you need. Nothing you don't.

| Card | Text |
|---|---|
| Weekly SLP session | Live with a Speech-Language Pathologist. Real guidance. Real feedback. |
| 10 minutes daily in the app | AI voice practice and guided exercises in the Zlaqa app. |
| 10 minutes daily group meet | Your cohort, together. No judgement. |
| 2 to 3 expert talks | Experts on speech, voice and confidence. |
| 1 in-person meetup | Meet your therapists and your cohort face to face. |
| Progress you can see | Baseline, mid-point and final assessment. Written feedback. |
| A community that stays | Your cohort doesn't vanish after week 8. |

---

### A day in SPEAKUP
**Heading:** 20 minutes. That's all we ask.

1. **10 min** Zlaqa app. Breathe. Practice. Speak.
2. **10 min** Group meet. Say something. Hear someone else say something.

Monday to Saturday. **Sunday is rest.**

*Visual: simple two-step graphic. Step 1 green, step 2 violet.*

---

### The 8-week journey
**Heading:** Eight weeks. One steady climb.

| Week | Theme | What changes |
|---|---|---|
| Orientation | Meet the team and cohort | Baseline assessment |
| 1 | Know Your Stammer | You map your triggers |
| 2 | Breathe Before You Speak | A breathing habit that sticks |
| 3 | Slow is Strong | You find your pace |
| 4 | Words That Get Stuck | You face feared words |
| 5 | Real Conversations | Tools in real life |
| 6 | Hard Situations | Grounded under pressure |
| 7 | Your Voice, Your Story | You prepare your 2-minute talk |
| 8 | Speak Without Fear | You give your talk. Certificate. |

*Visual: a vertical stepped timeline, each step marked by a green dot, with the green arrow pointing up on the last step.*
*Note: weekly content is led by the SLP and may be adjusted.*

---

### Team
**Heading:** Real experts. Real people.

- **Speech-Language Pathologists** `[Name, qualification, photo. To be added once confirmed]`
- **Anfaz N**, Program Lead, ZLAQA
- **Anfas KP**, Tech Lead, ZLAQA
- **Shaheen**, Founder of Zlaqa AI Labs. `[Short personal line, to be supplied by Shaheen]`

*Do not publish any SLP name or photo until they have confirmed in writing.*

---

### Meetup and talks
**Heading:** Online daily. In person once.

In the first month, we meet face to face. Your cohort and your therapists. A half day.
Plus 2 to 3 expert talks during the 8 weeks.

**Date and venue:** `[To be announced after cohort is confirmed]`

---

### Price and referral
**Heading:** Simple pricing.

| | Full 8 weeks |
|---|---|
| **Mindi Thudangam community member** | **₹339** |
| **Everyone else** | **₹449** |

**Referral box (violet background, white text):**
**Bring someone who stammers. You both get ₹199 off.**
Connect another person who stammers to SPEAKUP. When they join, you both save.

*Confirm the referral mechanic with Shaheen before launch. Currently assumed as "₹199 off for each of the two people".*

---

### Safety and privacy
**Heading:** Your voice. Your safety.

- Sessions are recorded **only for program quality and SLP review**, and only with your consent.
- Recordings are in a **private, restricted** space. Never shared publicly without your written permission.
- Under 18? A **parent or guardian must consent** before you join.
- SPEAKUP is a guided practice program. **We do not promise a cure.** We promise structure, support and steady progress.
- Not a replacement for individual clinical therapy if you need it.

Button: `Read privacy and consent`

---

### FAQ
**Do I need to be good with apps?**
No. If you can use WhatsApp, you can use this. We help you at Orientation.

**What if I miss a day?**
It happens. We check in. We never shame you.

**Do I have to speak in the group?**
You will speak. Slowly, safely, in your own time. Nobody is pushed past what they can handle.

**Is it online?**
Yes. Daily practice and weekly sessions are online. The in-person meetup is optional but encouraged.

**Is this therapy?**
It's a structured program led by Speech-Language Pathologists. It does not replace individual clinical therapy.

**How do I pay?**
After a short chat with our team, you get a payment link. `[Payment method to be confirmed]`

**I'm under 18. Can I join?**
Yes, from age 15, with parent or guardian consent.

---

### Final call to action (violet band, white text)
**Heading:** Your voice is already there.
**Sub:** Let's help the world hear it.
**Button (green):** `Apply now`
**Small text:** Apply by 19 November. Orientation 21 November. Program starts 23 November.

---

### Footer (violet background `#6D28D9`, white text)
- Logo (white version)
- **SPEAKUP. find your voice own your words**
- A ZLAQA AI Labs program
- WhatsApp: `[Number]` | Email: `[Email]`
- Links: Privacy and Consent | Instagram `[link]`
- © 2026 ZLAQA AI Labs

---

## 5. APPLY PAGE

**Heading:** Let's get you in.
**Sub:** Takes 3 minutes. No timer. Take your time.

### Fields
1. Full name (required)
2. Age (required, number, **15 to 30 only**; show friendly message outside range)
3. City and state (required)
4. WhatsApp number (required)
5. Email (optional)
6. Are you a **Mindi Thudangam community member?** (Yes / No / Not sure)
7. How would you describe your speech? (short text, optional)
8. Have you had speech therapy before? (Yes / No / Prefer not to say)
9. Can you give **20 minutes a day, Mon to Sat**, at around 8:30 pm IST? (Yes / Maybe / No)
10. Device you will use (Android / iPhone / Laptop)
11. Do you have a stable internet connection? (Yes / Sometimes)
12. **Referred by someone?** Their name and number (optional)
13. How did you hear about SPEAKUP? (dropdown)
14. **If under 18:** parent or guardian name, number, and consent tick (**required** when age is below 18)
15. Consent tick: I agree to sessions being recorded for program quality and SLP review. (required)
16. Consent tick: I have read the Privacy and Consent page. (required)
17. Preferred contact: WhatsApp message, WhatsApp call, or phone call

**Submit button (green):** `Send my application`

### Behaviour
- Save every submission to the master Google Sheet (tab: Applications) and notify Anfaz by email and WhatsApp.
- Auto-reply on screen and by WhatsApp or email within 1 minute.
- Show clear, kind error messages. Never wipe the form on error.
- Cap the cohort at 15 paid seats. After that, show "Join the waitlist".
- Under 18: send the parent a separate consent link.

---

## 6. THANK YOU PAGE

**Heading:** You're in the first step. 🎉
**Body:**
We got your application.
Anfaz from our team will reach you on WhatsApp within 24 hours for a short chat. No pressure. Just a conversation.

**What happens next**
1. A short chat with our team
2. Confirm your seat and pay
3. Orientation Day, Saturday 21 November
4. Day 1, Monday 23 November

**Button:** `Join the SPEAKUP WhatsApp updates` `[link]`

*(Remove the emoji if it clashes with the brand. White-first, minimal.)*

---

## 7. PRIVACY AND CONSENT PAGE (draft, needs legal review)

Cover in plain language:
- What we collect (name, age, contact, application answers, session recordings, assessment scores, app practice data)
- Why (to run the program, give SLP feedback, measure progress)
- **Recording:** which sessions are recorded, who can see them (Anfaz, Anfas KP, the SLPs), how long we keep them, how to ask for deletion
- **Under 18:** parent or guardian consent is required
- We never share recordings or personal details publicly without separate written permission
- Withdraw consent any time by messaging `[contact]`
- Grievance contact `[name, email]`

> **Legal check required before launch.** India's DPDP Act 2023 sets rules on children's data and consent. Do not publish final wording without a lawyer's review.

---

## 8. Technical brief

| Item | Spec |
|---|---|
| Build | Fast static site or lightweight framework. Mobile first. |
| Hosting | Fast, India-friendly. Decide with Anfas KP. |
| Domain | `[to be decided]` e.g. a page under the Zlaqa domain |
| Form backend | Write to Google Sheets, email notification to Anfaz, WhatsApp alert if possible |
| Payment | Payment link per applicant after the enquiry call, tracked in the Payments tab. `[Gateway TBC]` |
| Analytics | Privacy-friendly analytics. No ad retargeting. |
| Events to track | `apply_click`, `form_start`, `form_submit`, `under18_flag`, `referral_used`, `faq_open` |
| SEO | Title: `SPEAKUP, an 8-week speech program for young people who stammer`. Meta description under 155 characters. Open Graph image with the logo on white. |
| Performance | Under 2 MB, LCP under 2.5 s on 4G |
| Accessibility | WCAG 2.1 AA |
| Data | Store minimum data. Restrict access. Encrypt in transit. |
| Backups | Daily backup of form data |

---

## 9. Assets needed

| Asset | From | Status |
|---|---|---|
| Logo SVG + transparent PNG + white version | Design | Request |
| Nasi font web licence | Shaheen | Check |
| Photos of community (with written consent) | Minhaj / Shaheen | Request |
| SLP names, photos, bios | Anfaz | Waiting on SLP confirmation |
| Short Shaheen story and quote | Shaheen | Request |
| Meetup venue and date | Anfaz | TBC |
| Payment method | Shaheen | TBC |
| WhatsApp number and email | Anfaz | TBC |
| Privacy page legal wording | Lawyer | Needed |

---

## 10. Launch checklist

- [ ] Mon 16 Nov: Home, Apply, Thank You, Privacy page live (even if basic)
- [ ] Form writes to Google Sheet and alerts Anfaz
- [ ] Under-18 flow tested
- [ ] Mobile tested on at least 3 real low-end phones
- [ ] Contrast and keyboard check passed
- [ ] Prices, dates, referral text checked by Shaheen
- [ ] No SLP name or photo shown without written consent
- [ ] Share link on WhatsApp, Instagram, Mindi Thudangam channels
- [ ] **Applications close Thu 19 Nov.** Turn form to "Join waitlist" after 15 paid seats.

---

**Short, bold, human. If a line sounds like a hospital brochure, rewrite it.**
