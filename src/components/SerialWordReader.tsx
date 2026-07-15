import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<Speed>("normal");
  const [hoveredButton, setHoveredButton] = useState<Speed | null>(null);
  const [displayText, setDisplayText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const speedSettings: Record<Speed, number> = {
    fast: 2.0,
    normal: 1.0,
    slow: 0.5,
    pause: 0,
  };

  useEffect(() => {
    if (!isPlaying || speed === "pause") {
      setDisplayText("");
    }
  }, [isPlaying, speed]);

  const handleSpeedChange = (newSpeed: Speed) => {
    setSpeed(newSpeed);
    if (newSpeed === "pause") {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
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
      }}
    >
      <style>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 0px));
          }
        }

        .scroll-container {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .scroll-text {
          display: inline-block;
          animation: scroll-text linear infinite;
          flex-shrink: 0;
          margin: 0;
          padding: 0;
        }

        .scroll-text.paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-text {
            animation: none !important;
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
          Captions scroll at your pace. Adjust speed or pause anytime.
        </p>
      </div>

      {/* Scrolling Text Display */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 140,
          padding: "32px 20px",
          backgroundColor: tokens.color.white,
          borderRadius: "12px",
          border: `1px solid ${tokens.color.cardBorder}`,
          position: "relative",
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
          margin: 0,
        }}
      >
        {speed === "pause" || !isPlaying ? (
          <div
            style={{
              fontSize: "18px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              textAlign: "center",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {displayText || "Press play to start reading..."}
          </div>
        ) : (
          <div
            className="scroll-container"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              position: "relative",
              margin: 0,
              padding: 0,
            }}
          >
            <div
              className="scroll-text"
              style={{
                fontSize: "18px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                animationDuration: `${(text.length * 0.08) / speedSettings[speed]}s`,
                whiteSpace: "nowrap",
                display: "inline-block",
                margin: 0,
                padding: 0,
              }}
            >
              {text}
            </div>
          </div>
        )}
      </div>

      {/* Speed Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
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
          onClick={() => handleSpeedChange("fast")}
        />
        <SpeedButton
          label="Normal"
          color="#eab308"
          isActive={speed === "normal"}
          isHovered={hoveredButton === "normal"}
          onHover={(h) => setHoveredButton(h ? "normal" : null)}
          onClick={() => handleSpeedChange("normal")}
        />
        <SpeedButton
          label="Slow"
          color="#3b82f6"
          isActive={speed === "slow"}
          isHovered={hoveredButton === "slow"}
          onHover={(h) => setHoveredButton(h ? "slow" : null)}
          onClick={() => handleSpeedChange("slow")}
        />
        <SpeedButton
          label="Pause"
          color="#ef4444"
          isActive={speed === "pause"}
          isHovered={hoveredButton === "pause"}
          onHover={(h) => setHoveredButton(h ? "pause" : null)}
          onClick={() => handleSpeedChange("pause")}
        />
      </div>

      {/* Info */}
      <div
        style={{
          fontSize: "12px",
          color: tokens.color.muted,
          textAlign: "center",
          opacity: 0.6,
        }}
      >
        {isPlaying && speed !== "pause" ? "Reading in progress..." : "Paused"}
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
    }}
  >
    {label}
  </button>
);

export default SerialWordReader;
