UI Design PRDv1.0 draft30 Sep 2026

# MYSB Landing Page: Visual Design System

A calm, confident and premium look for an 8-week speech practice program for ages 15 to 30. This document defines the visual language, components, layouts, motion and handoff rules for the landing page. It pairs with the functional PRD.

01 · Vision

## Warm, calm, confident

MYSB should feel like a modern wellness and community brand, not a clinic. The design earns trust from nervous first-time visitors and looks credible to parents.

### Safe

Soft shapes, generous space, no harsh contrast blocks, and no pressure language.

### Premium

Restrained palette, editorial type scale, precise spacing, and refined depth.

### Alive

Sound-wave motif and gentle motion that say "voice" without shouting.

### Design principles

- **One idea per screen.** One heading, one supporting line, one action.
- **Space is the luxury.** Section padding of 96px or more on desktop.
- **One accent at a time.** Teal leads, coral only for the single most important action.
- **Motion supports, never distracts.** Slow, soft, and off when the user prefers reduced motion.
- **Respect the audience.** Real, consented people. No stock therapy visuals.

02 · Colour

## Palette

Light theme is the default. A full dark theme is defined so the page follows the visitor's device setting.

**Cream**#FBF6EEPage background

**Ink**#1F2A37Text and headings

**Deep Teal**#0F766EPrimary actions, links

**Coral**#FF7A5CHighlight, key CTA, offline events

**Sage**#CFE3D6Section tint, timeline

**Lavender**#E6E0F8Badges, secondary cards

### Signature gradient

Use 160° from Sage to Lavender to Sand for the hero and closing CTA backgrounds. Never place text below 4.5:1 contrast.

### Dark theme

Background #14181D, surface #1D232A, ink #F2EEE6, teal shifts to #3CC4B7, coral to #FF8F75. Tints become deep green and deep violet.

03 · Typography

## Type system

Plus Jakarta Sans for headlines gives a friendly, modern voice. Inter keeps body text easy to read. Both load from Google Fonts with system fallbacks.

# Find your voice

Display · Jakarta 800 · 64/68 desktop, 40/44 mobile · -2% tracking

## Eight weeks together

H2 · Jakarta 800 · 44/50, 30/36 mobile

### A day in MYSB

H3 · Jakarta 700 · 24/32

Practice for twenty minutes, record three, and talk it through with people who get it.Body large · Inter 400 · 18/30

Every participant meets the SLP once a week for feedback and tips.Body · Inter 400 · 16/26 (minimum size)

Ages 15 to 30Eyebrow · Inter 600 · 13/16 · +12% tracking, uppercase

04 · Signature motif

## The sound wave

Flowing two-line waveforms represent voice growing steadier over eight weeks. They appear in the hero, as section dividers and inside the closing CTA.

**Hero wave.** Two strokes (teal, coral), 3px, slow horizontal drift of 24px over 9 seconds.

**Voice bars.** Rounded bars for the daily audio module. Heights animate gently when the section enters view.

05 · Layout

## Grid, spacing and shape

### Grid

12 columns, 1200px max width, 24px gutters. Tablet: 8 columns. Mobile: 4 columns with 20px margins.

### Spacing

8px base scale: 8, 16, 24, 32, 48, 64, 96, 128. Section padding is 96px desktop and 64px mobile.

### Shape and depth

Cards 24px radius, inputs 14px, buttons fully rounded. Shadow: 0 12px 40px at 8% ink. No hard borders on cards.

06 · Hero

## Hero layout

The hero sets the emotional tone within three seconds. Copy on the left, a consented photo or illustration on the right at desktop, and stacked on mobile.

**MYSB**About · How it works · Team · FAQ Join

Ages 15 to 30 · Up to 10 seats

#### Find your voice, one day at a time.

An 8-week guided speech practice program with daily sessions, a weekly SLP check-in and a supportive group.

[Join the program](#) [Watch how it works](#)

Right side on desktop: a portrait with a soft sage blob mask, a floating "Daily Voice" chip and a small seat counter card that overlap the image edge.

07 · Components

## Core components

### Buttons

[Join the program](#)

[Watch how it works](#)

[Join WhatsApp group](#)

Height 52px, padding 0 28px, min tap target 44px. Hover lifts 2px. Focus shows a 3px teal ring with a 2px offset.

### Form field

Full name

Anfas

Label above, 14px radius, 1.5px border. Focus adds a teal ring. Errors use a warm red with text and an icon, never colour alone.

### Chips and badges

Ages 15 to 30 Mostly online Offline event

Pill shape, 13px semibold. Use sparingly, at most three per view.

### Timeline strip

KickoffW1W2W3W4W5W6W7W8Finale

Sage blocks for weeks, coral for offline events. On mobile it becomes a vertical timeline with a wave-shaped line.

08 · Sections

## Section-by-section visual spec

| Section | Layout | Visual treatment |
| --- | --- | --- |
| Hero | Two columns, copy left and image right | Signature gradient, wave at the base, floating chips |
| About | Centred narrow column | Large pull-quote in Jakarta, cream background |
| How it works | Full-width horizontal timeline | Sage tint band, coral offline markers, scroll-reveal |
| A day in MYSB | Four-step horizontal cards | Icons in rounded squares, voice bars on the audio card |
| What you get | 3 by 2 card grid | Lavender and sage alternating card tints, line icons |
| Meet the team | Card row with portraits | Circular photos with blob masks and a warm shadow |
| Offline events | Two large feature cards | Coral accent edge, date badge, venue photo |
| Video | Centred 16:9 player | Rounded 28px frame, custom play button with wave ring |
| FAQ | Single-column accordion | Hairline dividers, plus/minus icon, smooth height animation |
| Register | Two columns: form card and reassurance panel | White card on gradient, seat counter, privacy note |
| Footer | Three columns | Ink background, wave divider, WhatsApp and social icons |

09 · Imagery

## Photography, illustration and icons

### Photos

- Real participants and team with written consent
- Natural light, warm tones, candid smiles
- Blob or 28px-radius masks

### Illustration

- Simple flat shapes in the palette
- Used where no photos are available
- Voices shown as waves and speech bubbles

### Icons

- Rounded line icons, 2px stroke
- 24px grid, single colour
- No medical symbols

10 · Motion

## Motion and interaction

| Element | Behaviour | Timing |
| --- | --- | --- |
| Hero wave | Slow horizontal drift | 9s ease-in-out, alternate |
| Scroll reveal | Fade and rise 16px | 500ms, ease-out, staggered 80ms |
| Buttons | Lift 2px and deepen shadow | 180ms |
| Voice bars | Heights ease in when visible | 700ms, once |
| Accordion | Height and icon rotate | 250ms |
| Form success | Check draws in, WhatsApp button pulses once | 600ms |

All motion is disabled or reduced under `prefers-reduced-motion`. There is no autoplay video or audio and nothing flashes.

11 · Responsive

## Breakpoints

### Mobile · 360 to 767

- Single column, 20px margins
- Sticky bottom bar: Join and WhatsApp
- Vertical timeline, swipeable cards

### Tablet · 768 to 1199

- 8-column grid, two-up cards
- Hero stacks with a larger image

### Desktop · 1200+

- 12-column grid, 1200px max
- Overlapping hero elements
- Sticky top navigation

12 · Accessibility

## Accessibility and tone

- WCAG 2.1 AA contrast, with body text at 16px or larger and tap targets at 44px or larger.
- Visible focus rings, full keyboard navigation and a skip-to-content link.
- Alt text for all images, captions on video, and no information carried by colour alone.
- Copy avoids pity and diagnosis language and promises no outcomes. Wording is reviewed by the SLP.

13 · Handoff

## Deliverables and open items

### Design deliverables

- Design tokens (colour, type, spacing, radius, shadow)
- Desktop and mobile mockups for every section
- Component library with states
- Icon and wave assets (SVG)
- Clickable prototype for the registration flow

### To confirm

- Final logo and brand colours, if they differ from this palette
- Photos and consent for participants and team
- Final headline and section copy
- Whether Malayalam typography is needed
- Alternate accent choice (indigo instead of coral)

MYSB Landing Page · UI Design PRD v1.0 · Technical owner: Anfas KP