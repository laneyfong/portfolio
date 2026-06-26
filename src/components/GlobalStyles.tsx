import type { FC } from "react";

const GlobalStyles: FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&family=Playfair+Display:ital,wght@1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    body { letter-spacing: -0.02em; line-height: 1.5; }
    @media (prefers-reduced-motion: no-preference) {
      html { scroll-behavior: smooth; }
    }
    a, button { font-family: inherit; }
    /* Focus visible for keyboard navigation */
    a:focus-visible, button:focus-visible { outline: 2px solid #8DC8E4; outline-offset: 2px; }
    /* Improve readability with increased line height */
    p { line-height: 1.6; }
    /* Touch targets minimum 44x44px */
    @media (max-width: 900px) {
      button, a { min-height: 44px; }
    }
    /* Responsive font sizing */
    @media (max-width: 640px) {
      body { font-size: 16px; }
    }
  `}</style>
);

export default GlobalStyles;
