import type { FC } from "react";

const GlobalStyles: FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&family=Playfair+Display:ital,wght@1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    @media (prefers-reduced-motion: no-preference) {
      html { scroll-behavior: smooth; }
    }
    a, button { font-family: inherit; }
  `}</style>
);

export default GlobalStyles;
