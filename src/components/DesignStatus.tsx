import type { FC } from "react";
import { useEffect, useRef } from "react";
import { tokens } from "../tokens";

interface DesignStatusProps {
  isBadgeHovered?: boolean;
  isFlipped?: boolean;
  activeCaseStudy?: string | null;
}

const DesignStatus: FC<DesignStatusProps> = ({ isBadgeHovered, isFlipped, activeCaseStudy }) => {
  const enabledRef = useRef({ motion: true });

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabledRef.current.motion = !reduceMotionQuery.matches;
    reduceMotionQuery.addEventListener("change", () => {
      enabledRef.current.motion = !reduceMotionQuery.matches;
    });
    return () => reduceMotionQuery.removeEventListener("change", () => {});
  }, []);

  let statusText = "Designing with intention";

  if (isFlipped) {
    statusText = "How I think";
  } else if (isBadgeHovered) {
    statusText = "About the designer";
  } else if (activeCaseStudy) {
    statusText = activeCaseStudy;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 100,
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
