import type { FC } from "react";
import { useEffect, useRef } from "react";
import { tokens } from "../tokens";

interface DesignStatusProps {
  hoveredFragmentId?: string | null;
  isBadgeHovered?: boolean;
  isFlipped?: boolean;
}

const DesignStatus: FC<DesignStatusProps> = ({ hoveredFragmentId, isBadgeHovered, isFlipped }) => {
  const enabledRef = useRef({ motion: true });

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabledRef.current.motion = !reduceMotionQuery.matches;
    reduceMotionQuery.addEventListener("change", () => {
      enabledRef.current.motion = !reduceMotionQuery.matches;
    });
    return () => reduceMotionQuery.removeEventListener("change", () => {});
  }, []);

  let statusText = "● DESIGNING WITH INTENTION";

  if (isFlipped) {
    statusText = "● SYSTEMS";
  } else if (isBadgeHovered) {
    statusText = "● ABOUT THE DESIGNER";
  } else if (hoveredFragmentId) {
    const fragmentLabels: Record<string, string> = {
      myshake: "● CRISIS RESPONSE DESIGN",
      nvidia: "● AI USABILITY TESTING",
      verisupply: "● SUPPLY CHAIN SYSTEMS",
    };
    statusText = fragmentLabels[hoveredFragmentId] || statusText;
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
          fontSize: "12px",
          fontWeight: tokens.weight.regular,
          color: tokens.color.muted,
          letterSpacing: "0.5px",
          opacity: enabledRef.current.motion ? 1 : 1,
          transition: enabledRef.current.motion ? "opacity 0.4s ease, color 0.4s ease" : "none",
          whiteSpace: "nowrap",
        }}
      >
        {statusText}
      </div>
    </div>
  );
};

export default DesignStatus;
