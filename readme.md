# Laney Fong — Design System

**Laney Fong** is a Product Designer based in the San Francisco Bay Area, currently pursuing an M.S. in Human-Computer Interaction at UC Santa Cruz. Her portfolio curates intentional, human-centered design work across mobile UX, AI/UX research tools, and enterprise interfaces. Previous experience at MyShake (UC Berkeley Seismology Lab).

## Sources

- **Figma file:** `Portfolio.fig` — Attached Figma file. Key frames explored: `MacBook Pro 14" - 6` (portfolio homepage) and `Badge` (identity card component).
- **Logo assets:** `uploads/NameLogoFull.svg`, `uploads/LaneyNewLogo.svg`
- **Google Fonts CDN:** Manrope + Playfair Display (see Font Note)

> ⚠️ **Font Note:** No local font files were provided. This system imports Manrope and Playfair Display from Google Fonts CDN (`tokens/fonts.css`). For production, replace with self-hosted `@font-face` rules pointing to local `.woff2` files.

---

## CONTENT FUNDAMENTALS

**Voice:** Quiet, intentional, precise. Every word earns its place. No filler, no jargon, no marketing language.

**Tone:** Warm but professional. Editorial without coldness. Personal without casualness.

**Casing:** Sentence case throughout. No ALL CAPS, no Title Case headlines. Copy often starts lowercase: *"curating intentional human-centered experiences."* — note the lowercase c.

**Punctuation:** Periods close complete thoughts and taglines. Sparse otherwise. No exclamation marks.

**Person:** First-person implied, never stated. The work speaks through captions: *"A solution to decision fatigue..."* — never *"I designed a solution..."*

**Emoji:** Never.

**Writing samples:**
- *"curating intentional human-centered experiences."* — hero tagline
- *"designed with passion and matcha by"* — footer credit line
- *"Increasing user engagement through restructuring IA."* — project caption
- *"A solution to decision fatigue and itinerary planning."* — project caption (italic)
- *"Designing an AI UX Agent for internal usability testing."* — project caption

**Italic usage:** Sparse, editorial. When italics appear (project captions, tagline emphasis), they use **Playfair Display Italic** — a deliberate serif choice that adds editorial weight and personality. Never use italic for decoration; use it for genuine meaning.

---

## VISUAL FOUNDATIONS

### Colors

5-color brand palette. Minimal, airy, high-contrast.

| Token | Value | Usage |
|---|---|---|
| `--color-white` | `#FFFFFF` | Page background, badge card, photo frames |
| `--color-off-white` | `#F7F9F9` | Project card surfaces |
| `--color-ink` | `#111111` | Primary dark text |
| `--color-accent` | `#8DC8E4` | Brand mark, logo color |
| `--color-black` | `#000000` | Footer background |
| `--color-body` | `#373737` | Body text, captions |
| `--color-muted` | `rgba(0,0,0,0.24)` | Name/role display (ghosted, intentionally low contrast) |
| `--color-nav-bg` | `rgba(40,41,43,0.10)` | Frosted nav pill background |
| `--color-stroke` | `#F1F0EE` | Profile photo frame border (warm cream) |

### Typography

**Manrope** — primary typeface. Geometric humanist sans-serif. Three weights: Light (300), Regular (400), Medium (500). Used for all UI text — headings, body, navigation, labels, captions.

**Playfair Display Italic** — editorial accent only. Exclusively for serif italic emphasis within running text (e.g. *"human-centered"* in the tagline, italic project captions). Never used standalone or for headings.

Type scale is deliberately tight. Heading text uses `letter-spacing: -0.04em` for density. Body text at `line-height: 1` — no loose leading.

### Spacing

4px base grid. Common values: 4, 8, 10, 14, 16, 24, 28, 36, 48, 70px.

### Backgrounds

White page. `#F7F9F9` for card surfaces. **No gradients, no textures, no patterns.** Photography is curated and placed within cards with shadow — it is never decorative wallpaper.

### Cards & Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `8px` | Project grid tile outer radius |
| `--radius-md` | `14px` | Nested cards, image frames |
| `--radius-lg` | `24px` | Phone screenshot frames |
| `--radius-xl` | `30px` | Badge card, CTA pill |
| `--radius-full` | `9999px` | Nav pill, button pills |

No borders on cards — only shadow or background-color differentiation.

### Shadows

Soft, diffuse. No hard edges, no colored shadows.

| Token | Usage |
|---|---|
| `--shadow-badge` | Badge card elevation |
| `--shadow-card` | Screenshots sitting on card surfaces |
| `--shadow-subtle` | Profile photo |
| `--shadow-inset-circle` | Decorative circle at top of Badge |
| `--shadow-image-frame` | Profile photo frame (warm cream inset + drop shadow) |

### Navigation

Floating pill, centered in header. Background: `rgba(40,41,43,0.10)` + `backdrop-filter: blur(4px)`. Active item: `1px solid white` ring border. No underlines. No bold weight change on active. Items: Work · About · Lab · Resume.

### Buttons / CTAs

Single button style: thin outline pill (`0.5px solid rgba(40,41,43,0.8)`), 14px Manrope Light, with an inline circular arrow SVG. No filled buttons observed.

### Animation

No animations in the Figma. Inferred style: subtle, `0.15s ease` CSS transitions on hover/active states. No bounces, scale pops, or decorative motion.

### Hover States

Not explicitly defined. Inferred: low-key opacity reduction (`opacity: 0.75`). No color change, no scale.

### Footer

Full-bleed black (`#000000`). White Manrope Light copy at 16px. Large calligraphic wordmark in white. Deliberately stark contrast to the airy white content above.

### Photography & Imagery

Editorial in feel. Phone screenshots in rounded frames (30px radius) with `--shadow-card`. Desktop UI screenshots at 16px radius. Profile photo: warm cream frame (`#F1F0EE`, 4px inset) + soft drop shadow. Images are chosen, not decorated.

---

## ICONOGRAPHY

No icon system, icon font, or icon set is used.

**Brand mark:** Custom calligraphic vector (stylized 方/Fāng character) in `#8DC8E4`. Used as the nav logo mark at top-left. File: `assets/logo-mark.svg`

**Full name wordmark:** `assets/logo-name-full.svg` (uploaded)

**Alternate mark:** `assets/logo-laney-new.svg` (uploaded)

**Single UI icon:** Downward arrow ↓ in a circle, used only in "View work" CTA button. Rendered inline as `<svg>` — no sprite or icon font needed.

**Emoji:** Never used.

---

## Files

| Path | Description |
|---|---|
| `styles.css` | Root CSS entry — `@import` this in all consumers |
| `tokens/fonts.css` | Google Fonts CDN import (Manrope + Playfair Display) |
| `tokens/colors.css` | Color tokens — brand palette + semantic aliases |
| `tokens/typography.css` | Font family, size, weight, spacing, leading tokens |
| `tokens/spacing.css` | Space scale, border radii, shadow tokens |
| `assets/logo-mark.svg` | Brand mark (calligraphic 方 vector, accent blue) |
| `assets/logo-name-full.svg` | Full name wordmark |
| `assets/logo-laney-new.svg` | Alternate logo mark |
| `assets/img-laney-photo.jpg` | Profile photo |
| `assets/img-myshake-app.png` | MyShake app screenshot |
| `assets/img-myshake-logo.png` | MyShake brand logo |
| `assets/img-ai-ux-agent.png` | AI UX Agent (Nvidia) screenshot |
| `assets/img-travel-app.png` | Travel itinerary app screenshots |
| `assets/img-nvidia-logo.png` | Nvidia logo |
| `components/core/Badge.jsx` | Personal identity card component |
| `components/core/NavPill.jsx` | Floating frosted-glass nav pill |
| `components/core/ProjectCard.jsx` | Work item card (portrait + landscape) |
| `ui_kits/portfolio/index.html` | Portfolio homepage UI kit |
| `guidelines/` | Foundation specimen cards (Design System tab) |
| `SKILL.md` | Skill descriptor for Claude Code |
