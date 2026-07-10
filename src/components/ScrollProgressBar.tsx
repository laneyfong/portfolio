import type { FC } from "react";
import { useEffect, useState } from "react";
import { tokens } from "../tokens";

const ScrollProgressBar: FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "2px",
        height: "100vh",
        background: tokens.color.cardBorder,
        zIndex: 5,
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${scrollProgress}%`,
          background: tokens.color.body,
          transition: "height 0.1s ease-out",
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
