import type { FC } from "react";
import { useEffect, useRef } from "react";
import { tokens } from "../tokens";

interface DesignStatusProps {
  isBadgeHovered?: boolean;
  isFlipped?: boolean;
}

const DesignStatus: FC<DesignStatusProps> = ({ isBadgeHovered, isFlipped }) => {
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
        }}
      >
        {statusText}
      </div>
    </div>
  );
};

export default DesignStatus;
