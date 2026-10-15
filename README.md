# MYSB — Make Your Speech Better
### Premium 8-Week Guided Speech Practice Program for Ages 15 to 30

A high-end, Awwwards/FWA-calibre React application for **MYSB (Make Your Speech Better)**. Designed with an editorial, human-first aesthetic combining clinical rigor (Speech Language Pathologist partnership) with warm community wellness.

---

## 🌟 Art Direction & Signature Waveform Concept

- **Concept**: *"Steadier every week."* The entire page tells one unified story—a voice moving from hesitant and fragmented to steady, harmonic, and confident.
- **Signature Visual**: An interactive Canvas 2D Waveform engine. It starts fragmented upon hero entry, smoothly resolves into a serene sinusoidal rhythm over 3 seconds, tracks mouse/touch magnetic pull, and progressively increases smoothness at each stop of the 8-week curriculum timeline.
- **Palette**:
  - `Deep Teal` (`#0A2A2B`): Editorial grounding and dark surfaces.
  - `Teal` (`#0F766E`): Primary brand anchor and links.
  - `Mint` (`#7FE0CF`): Steady voice highlight and active indicators.
  - `Coral` (`#FF7A5C`): **Strict single accent** used exclusively for primary actions (*Join Cohort 1*) and the 2 in-person offline events (*Kickoff* & *Closing Celebration*).
  - `Cream` (`#F7F3EA`): Warm, human, non-clinical light surface.
  - `Ink` (`#12262A`): High-contrast, optical typography.
- **Typography**:
  - Display: **Bricolage Grotesque** (tight `-0.03em` tracking, bold display presence) + **Fraunces** (refined editorial italic pull-quotes).
  - Body: **Inter** (clean, accessible, high legibility across mobile & desktop).

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom token hierarchy & CSS variables
- **Motion & Scrolling**: Framer Motion (layout reveals, spring physics) + Lenis (buttery smooth scrolling with automatic `prefers-reduced-motion` bypass)
- **Form Handling**: React Hook Form + Zod (schema validation, floating labels, under-18 guardian conditional slide, anti-spam honeypot)
- **Serverless API**: Node.js endpoints for Vercel / Netlify (`/api/register`, `/api/seat-count`)
- **Icons**: Curated SVG vectors (2px stroke, no emojis)

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root (see `.env.example`):

```env
# Cohort Capacity & Seat Count
TOTAL_SEATS=10
SEATS_REMAINING=4
FORCE_WAITLIST_MODE=false

# Community & Operations
WHATSAPP_GROUP_INVITE_URL=https://chat.whatsapp.com/YOUR_GROUP_CODE
OPERATIONS_EMAIL=hello@mysbprogram.org
TECHNICAL_OWNER=Anfas KP

# Google Sheets Storage (via Apps Script Webhook / SheetDB)
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Airtable Integration (Optional)
AIRTABLE_API_KEY=pat_your_token
AIRTABLE_BASE_ID=appYourBaseId
AIRTABLE_TABLE_NAME=Registrations

# Email Dispatch via Resend API
RESEND_API_KEY=re_your_api_key

# Video Embed URL
VIDEO_EMBED_URL=https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID
```

---

## 📝 How to Edit Content & Placeholders

All landing page copy, FAQs, timeline curriculum, team bios, and placeholders are centralized in **one single typed file**:
📁 `src/content/content.ts`

To update dates, venue names, or SLP credentials:
1. Open `src/content/content.ts`.
2. Locate the relevant section (e.g. `team`, `offlineEvents`, `faq`).
3. Replace placeholders such as `[SLP NAME]`, `[DATE]`, `[VENUE]`, `[CITY]`.

---

## 📸 How to Swap Real Photos & Videos

Use the `<MediaFrame>` component in `src/components/ui/MediaFrame.tsx`.

1. Place your optimized WebP/AVIF images or MP4 videos into `public/assets/` or `src/assets/`.
2. Pass the `src` and `type` prop to `<MediaFrame>`:
```tsx
<MediaFrame
  type="image"
  src="/assets/cohort1-photo.webp"
  alt="MYSB Cohort 1 participants in group discussion"
  aspectRatio="portrait"
/>
```
If `src` is omitted, `<MediaFrame>` automatically renders an art-directed, cinematic placeholder with soft gradient, film grain, and editorial captions.

---

## 🚢 Deployment Guide

### Deploying to Vercel
1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. The included `vercel.json` automatically configures the Vite build output (`dist`) and serverless functions in `/api`.
4. Add your `.env` variables under Project Settings → Environment Variables.

### Deploying to Netlify
1. Connect your repository in [Netlify](https://netlify.com).
2. The included `netlify.toml` handles `npm run build`, `dist` publishing, and `/api` function routing.

---

## 📋 Asset Supply Checklist for Launch

- [ ] **Official Brand Logo** (Vector SVG)
- [ ] **Hero Video & Photography** (Candid, warm, natural lighting with written consent)
- [ ] **Lead SLP Profile** (Full Name, Credentials, Approved Bio, Clinical Quote, Headshot)
- [ ] **Offline Event Dates & Venues** (Kickoff date & location, Finale date & location)
- [ ] **Participant Stories / Testimonials** (Quotes, audio snippets, verified consent records)
- [ ] **Official WhatsApp Group Invite Link**
- [ ] **Custom Domain & DNS Setup** (`mysbprogram.org`)
