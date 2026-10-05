import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { tokens } from "../tokens";

interface DesignStatusProps {
  isBadgeHovered?: boolean;
  isFlipped?: boolean;
  activeCaseStudy?: string | null;
}

const DesignStatus: FC<DesignStatusProps> = ({ isBadgeHovered, isFlipped, activeCaseStudy }) => {
  const enabledRef = useRef({ motion: true });
  const [bottomOffset, setBottomOffset] = useState(32);
  const [isInHero, setIsInHero] = useState(true);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabledRef.current.motion = !reduceMotionQuery.matches;
    reduceMotionQuery.addEventListener("change", () => {
      enabledRef.current.motion = !reduceMotionQuery.matches;
    });
    return () => reduceMotionQuery.removeEventListener("change", () => {});
  }, []);

  // Detect scroll position and work section visibility
  useEffect(() => {
    const handleScroll = () => {
      const workSection = document.getElementById("work");
      const footer = document.querySelector("footer");
      const status = statusRef.current;

      if (!status) return;

      // Check if work section is visible on screen
      if (workSection) {
        const workRect = workSection.getBoundingClientRect();
        // If work section is below viewport top, we're in hero
        setIsInHero(workRect.top > window.innerHeight * 0.5);
      }

      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If footer is within 200px of viewport bottom, move status bar up
      if (footerRect.top < windowHeight - 100) {
        const distanceToFooter = windowHeight - footerRect.top;
        setBottomOffset(Math.max(32, 32 + distanceToFooter));
      } else {
        setBottomOffset(32);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let statusText = "Designing with intention";

  // If in hero section, always show default text
  if (!isInHero) {
    if (isFlipped) {
      statusText = "How I think";
    } else if (isBadgeHovered) {
      statusText = "About the designer";
    } else if (activeCaseStudy) {
      statusText = activeCaseStudy;
    }
  }

  return (
    <div
      ref={statusRef}
      style={{
        position: "fixed",
        bottom: `${bottomOffset}px`,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 100,
        transition: "bottom 0.3s ease",
      }}
    >
      <div
        style={{
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.sm,
          fontWeight: tokens.weight.regular,
          color: tokens.color.muted,
          letterSpacing: tokens.tracking.tight,
          opacity: enabledRef.current.motion ? 1 : 1,
          transition: enabledRef.current.motion ? "opacity 0.4s ease, color 0.4s ease" : "none",
          whiteSpace: "nowrap",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          padding: "8px 16px",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        {statusText}
      </div>
    </div>
  );
};

export default DesignStatus;
