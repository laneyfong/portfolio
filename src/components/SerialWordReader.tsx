import type { FC } from "react";
import { useState, useRef } from "react";
import { tokens } from "../tokens";

interface SerialWordReaderProps {
  text: string;
  title?: string;
}

type Speed = "pause" | "slow" | "normal" | "fast";

const SerialWordReader: FC<SerialWordReaderProps> = ({
  text = "Words flow across your screen like captions. Adjust the speed with the buttons below. Green for faster, yellow for normal, red to pause. Your reading pace, your control.",
  title = "Cognitive-Friendly Reading",
}) => {
  const [speed, setSpeed] = useState<Speed>("normal");
  const [hoveredButton, setHoveredButton] = useState<Speed | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const speedSettings: Record<Speed, number> = {
    fast: 40,
    normal: 60,
    slow: 100,
    pause: 0,
  };

  const getDuration = () => {
    const baseDuration = (text.length / speedSettings[speed]) * 1000;
    return Math.max(baseDuration, 2000);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 24,
        borderRadius: tokens.radius.sm,
        backgroundColor: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        minHeight: "350px",
        width: "100%",
        boxSizing: "border-box",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes reveal-text {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        .caption-text {
          animation: reveal-text linear forwards;
        }

        .caption-text.paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .caption-text {
            animation: none !important;
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>

      {/* Header */}
      <div>
        <h2
          style={{
            margin: "0 0 8px 0",
            fontFamily: tokens.font.sans,
            fontSize: "18px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            fontFamily: tokens.font.sans,
            color: tokens.color.muted,
            opacity: 0.6,
          }}
        >
          Captions flow at your reading pace
        </p>
      </div>

      {/* Caption Display */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
          padding: "24px",
          backgroundColor: tokens.color.white,
          borderRadius: "12px",
          border: `1px solid ${tokens.color.cardBorder}`,
          width: "100%",
          boxSizing: "border-box",
          margin: 0,
          overflow: "hidden",
        }}
      >
        <div
          className={`caption-text ${speed === "pause" ? "paused" : ""}`}
          style={{
            fontSize: "18px",
            fontWeight: tokens.weight.regular,
            color: tokens.color.body,
            textAlign: "center",
            lineHeight: 1.6,
            margin: 0,
            padding: 0,
            width: "100%",
            animationDuration: `${getDuration()}ms`,
            animationPlayState: speed === "pause" ? "paused" : "running",
          }}
          role="status"
          aria-live="polite"
          aria-label="Reading text flowing at selected speed"
        >
          {text}
        </div>
      </div>

      {/* Speed Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          margin: 0,
          padding: 0,
        }}
        role="group"
        aria-label="Reading speed"
      >
        <SpeedButton
          label="Fast"
          color="#22c55e"
          isActive={speed === "fast"}
          isHovered={hoveredButton === "fast"}
          onHover={(h) => setHoveredButton(h ? "fast" : null)}
          onClick={() => setSpeed("fast")}
        />
        <SpeedButton
          label="Normal"
          color="#eab308"
          isActive={speed === "normal"}
          isHovered={hoveredButton === "normal"}
          onHover={(h) => setHoveredButton(h ? "normal" : null)}
          onClick={() => setSpeed("normal")}
        />
        <SpeedButton
          label="Slow"
          color="#3b82f6"
          isActive={speed === "slow"}
          isHovered={hoveredButton === "slow"}
          onHover={(h) => setHoveredButton(h ? "slow" : null)}
          onClick={() => setSpeed("slow")}
        />
        <SpeedButton
          label="Pause"
          color="#ef4444"
          isActive={speed === "pause"}
          isHovered={hoveredButton === "pause"}
          onHover={(h) => setHoveredButton(h ? "pause" : null)}
          onClick={() => setSpeed("pause")}
        />
      </div>

      {/* Info */}
      <div
        style={{
          fontSize: "12px",
          color: tokens.color.muted,
          textAlign: "center",
          opacity: 0.6,
          margin: 0,
          padding: 0,
        }}
      >
        {speed === "pause" ? "Paused" : `Reading at ${speed} speed...`}
      </div>
    </div>
  );
};

interface SpeedButtonProps {
  label: string;
  color: string;
  isActive: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}

const SpeedButton: FC<SpeedButtonProps> = ({
  label,
  color,
  isActive,
  isHovered,
  onHover,
  onClick,
}) => (
  <button
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    onFocus={() => onHover(true)}
    onBlur={() => onHover(false)}
    aria-label={label}
    aria-pressed={isActive}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      border: `2px solid ${color}`,
      backgroundColor: isActive ? color : "white",
      color: isActive ? "white" : color,
      fontFamily: tokens.font.sans,
      fontSize: "14px",
      fontWeight: tokens.weight.medium,
      cursor: "pointer",
      transition: "all 0.2s ease",
      outline: "none",
      opacity: isHovered || isActive ? 1 : 0.8,
      transform: isHovered || isActive ? "scale(1.05)" : "scale(1)",
      boxShadow: isActive ? `0 0 0 3px ${color}40` : "none",
      margin: 0,
    }}
  >
    {label}
  </button>
);

export default SerialWordReader;
