import type { FC } from "react";

const GlobalStyles: FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&family=Playfair+Display:ital,wght@1,400&family=Caveat:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }

    :root {
      --bg-primary: #FFFFFF;
      --bg-secondary: #FAFAFB;
      --text-primary: #1A1A1A;
      --text-secondary: #626262;
      --text-muted: #8D8D8D;
      --text-dark: #111111;
      --text-grey-light: #8B8B8B;
      --text-grey-medium: #8D8D8D;
      --text-grey-dark: #7A7A7A;
      --text-grey-lighter: #6A6A6A;
      --border-color: rgba(26, 26, 26, 0.08);
      --card-bg: #F0F0F0;
      --stroke: #F1F0EE;
      --surface-light: #FAFAFB;
      --gradient-soft: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
    }

    html {
      background: var(--bg-primary);
      color: var(--text-primary);
      transition: background 0.3s ease, color 0.3s ease;
    }

    body {
      letter-spacing: -0.02em;
      line-height: 1.5;
      background: var(--bg-primary);
      color: var(--text-primary);
      transition: background 0.3s ease, color 0.3s ease;
    }

    @media (prefers-reduced-motion: no-preference) {
      html { scroll-behavior: smooth; }
    }

    a, button { font-family: inherit; }

    /* Focus visible for keyboard navigation */
    a:focus-visible, button:focus-visible, [role="button"]:focus-visible, [role="link"]:focus-visible {
      outline: 3px solid #3B82F6;
      outline-offset: 2px;
    }

    /* Disable default focus-visible on elements with explicit role="button" that manage their own focus */
    div[role="button"]:focus {
      outline: none;
    }

    /* Improve readability with increased line height */
    p { line-height: 1.6; }

    /* Touch targets minimum 44x44px */
    @media (max-width: 900px) {
      button, a, [role="button"], [role="link"] { min-height: 44px; }
    }

    /* Responsive font sizing */
    @media (max-width: 640px) {
      body { font-size: 16px; }
    }

    /* Ensure skip links are accessible */
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #3B82F6;
      color: white;
      padding: 8px;
      z-index: 100;
    }
    .skip-link:focus {
      top: 0;
    }
  `}</style>
);

export default GlobalStyles;
