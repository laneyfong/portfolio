// Design tokens extracted from the Figma source (Portfolio.fig).
export const tokens = {
  color: {
    white: "#FFFFFF",
    offWhite: "#FAFAFB",
    ink: "#111111",
    accent: "#8DC8E4",
    body: "#373737",
    stroke: "#F1F0EE",
    dark: "#28292B",
    // Solid gray, not alpha-blended black — rgba(0,0,0,0.24) on white only hit ~1.8:1
    // contrast, failing WCAG AA (needs 4.5:1 for text). #636363 clears 4.5:1 even
    // against the translucent nav-pill background (~#EAEAEA), the lightest surface
    // this color sits on, while still reading as "de-emphasized" next to body/ink.
    muted: "#636363",
    navBg: "rgba(40, 41, 43, 0.10)",
    navActive: "rgba(40, 41, 43, 0.80)",
    cardBorder: "rgba(40, 41, 43, 0.05)",
  },
  font: {
    sans: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    serifItalic: "'Playfair Display', Georgia, 'Times New Roman', serif",
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
  },
  text: {
    display: "100px",
    "2xl": "30px",
    xl: "28px",
    lg: "24px",
    md: "18px",
    base: "16px",
    sm: "14px",
  },
  tracking: {
    // Matches the sitewide -2% letter-spacing baseline (see GlobalStyles) — kept as its
    // own token, not removed, since call sites reference tracking.tight by name.
    tight: "-0.02em",
    normal: "0em",
  },
  leading: {
    none: 1,
    snug: 1.15,
    normal: 1.5,
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "14px",
    lg: "24px",
    xl: "30px",
    full: "9999px",
  },
  shadow: {
    card: "0px 4px 24px 0px rgba(0, 0, 0, 0.18)",
    badge: "0px 4px 30px 0px rgba(46, 47, 49, 0.14)",
    subtle: "0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    insetCircle: "inset 0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
    imageFrame: "inset 0 0 0 4px #F1F0EE, 0px 4px 20px 0px rgba(0, 0, 0, 0.10)",
    // Brand-blue outline glow for hovered work cards — sits right at the border, doesn't wash the whole card.
    cardGlowHover: "0 0 0 1.5px #8DC8E4, 0 0 14px 0px rgba(141, 200, 228, 0.55)",
    // Same hue as `card`, just larger/darker — used where hover should read as "lifted", not "glowing".
    cardHoverLarge: "0px 16px 44px 0px rgba(0, 0, 0, 0.24)",
  },
  layout: {
    // Fixed nav pill: top offset (24) + its own rendered height (~46) + a little breathing room.
    navClearance: 88,
  },
};
