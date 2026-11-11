# Hassan Mehdi & The Bride — Premium Wedding Website

A luxurious, modern, fully responsive multi-page wedding website.
Groom: **Hassan Mehdi**. Bride: **The Bride — name to be announced** (no bride's name is used anywhere on the site, by instruction).
Hashtag: **#HassanMehdiWedding**

Live repo (to be uploaded here): https://github.com/haidermujtaba456-sys/wedding-website

## Wedding details (placeholders)

- **Baraat (main wedding):** Saturday, 19 December 2026, 7:00 PM PKT
- **Venue:** Royal Palm Golf & Country Club, Lahore, Pakistan
- **Week:** Mayun Tue 15 Dec 2026, 4 PM (Bride's Residence, Lahore) · Mehndi Wed 16 Dec, 6 PM · Dholki Thu 17 Dec, 7 PM · Nikah Fri 18 Dec, 4 PM (Jamia Mosque / Royal Palm) · Baraat Sat 19 Dec, 7 PM · Walima Sun 20 Dec, 7 PM
- **Groom:** Hassan Mehdi — Son of Mr & Mrs Mehdi
- **Bride:** The Bride — name to be announced. No bride's parents' names are listed.
- **Contact (placeholder):** hello@hassanmehdiwedding.com · +92 300 1234567 · Lahore, Pakistan

> **Placeholder note:** All names (except the groom, Hassan Mehdi), dates, venue details, photographs and contact details are placeholders until Mujtaba sends the real ones. In particular, the bride's name, her parents' names and her family contact details are intentionally left as "The Bride / To Be Announced" — do not invent a female name. Replace the placeholders in the HTML files (search for "The Bride", "To Be Announced", "hello@hassanmehdiwedding.com", "+92 300 1234567") when the real details arrive. Photos are Unsplash stock wedding images, not real photos of the couple.

## Pages (7)

| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Full-screen hero, live countdown, welcome, couple intro, story preview, 6 event highlights, featured photos, memories, invitation preview, testimonials, RSVP CTA, contact strip |
| Our Story | `story.html` | Hero, groom & bride intro, How We Met, First Date, Special Moments, Proposal, vertical timeline 2019–2026, quotes, journey, announcement + countdown |
| Events | `events.html` | Schedule table, one detailed section per event (Mayun, Mehndi, Dholki, Nikah, Baraat, Walima) with date/time/venue/dress code, dress-code guide, Google Maps embed |
| Gallery | `gallery.html` | Filter buttons (All / Couple / Engagement / Family / Mehndi / Nikah / Baraat / Walima), masonry grid with 20 photos, working lightbox (prev/next, Esc, arrow keys) |
| Invitation | `invitation.html` | Premium gold-bordered invitation card, parents line (groom only, generic), date/time/venue, personal message, Download / Print / Share / Copy-link |
| RSVP | `rsvp.html` | Full form — name, email, phone, guests 1–6, event checkboxes, attending Yes/No, meal preference, special requests, validation, success summary |
| Contact | `contact.html` | Family contacts, email/phone, venue address, Google Maps embed, contact form, social links, FAQ accordion (6 questions) |

Shared assets: `assets/css/style.css` (single stylesheet) and `assets/js/main.js` (single script — nav, countdown, reveal, gallery filter/lightbox, FAQ, forms, invitation actions, back-to-top).

## Design

- Palette: cream white `#FFF8F0`, champagne gold `#C9A227` / `#D4AF37`, blush pink `#F7D6D0`, soft beige `#EDE3D3`, charcoal text `#3A2E2A`
- Fonts: Playfair Display (headings) + Jost (body), via Google Fonts, with serif/sans fallbacks
- Responsive: mobile-first, Flexbox/Grid, breakpoints at 1024 / 768 / 480 px, sticky nav with working hamburger menu on mobile, no horizontal scroll
- Images: Unsplash CDN only (`images.unsplash.com`), lazy-loaded except heroes, alt text on every image

## How to run locally

No build step and no server is required:

```bash
# Option 1 — just open it
open index.html        # or double-click index.html in your file manager

# Option 2 — local server (recommended, so Maps and fonts load exactly as live)
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## How to enable GitHub Pages

1. Upload all files in this folder to the repo `haidermujtaba456-sys/wedding-website` (keep the same folder structure — `index.html` at the root).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Branch**, choose `main` and folder `/ (root)`, then **Save**.
4. After a minute or two the site is live at: `https://haidermujtaba456-sys.github.io/wedding-website/`

## RSVP & contact storage — important

**There is no real backend in this static site.** This is deliberate for GitHub Pages hosting.

- RSVP submissions are validated in the browser and saved to the visitor's own browser `localStorage` under the key `wedding-rsvp`. A returning visitor sees a "Your saved RSVP" note. Contact messages are saved the same way under `wedding-contact`.
- This is **client-side demo storage only** — replies are stored on each guest's own device, not sent to the couple and not visible to anyone else.
- For real storage, connect one of these (not included): **Formspree** (point the forms at a Formspree endpoint), **Google Sheets / Google Forms**, or a small backend/API with a database. Do not claim a real backend exists until one is connected.

## Uploading to GitHub (from a terminal, after the files are in the repo folder)

```bash
git add .
git commit -m "Add premium 7-page wedding website"
git push origin main
```

Do not put passwords or tokens in this repo. The site needs internet for Google Fonts, Unsplash images and the Google Maps embed; without internet those fall back gracefully (fonts fall back to serif/sans, Maps shows a placeholder).
