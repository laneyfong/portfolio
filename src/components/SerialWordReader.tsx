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
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const currentWord = words[wordIndex] || "";

  const speedSettings: Record<Speed, number> = {
    fast: 200,
    normal: 400,
    slow: 800,
    pause: 0,
  };

  useEffect(() => {
    if (!isPlaying || speed === "pause") {
      return;
    }

    const timer = setTimeout(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, speedSettings[speed]);

    return () => clearTimeout(timer);
  }, [isPlaying, speed, words.length]);

  const handleSpeedChange = (newSpeed: Speed) => {
    setSpeed(newSpeed);
    if (newSpeed === "pause") {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const progressPercent = words.length > 0 ? (wordIndex / words.length) * 100 : 0;

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
          Word-by-word reading for reduced cognitive load
        </p>
      </div>

      {/* Word Display */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
          padding: "20px",
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
          role="status"
          aria-live="polite"
          aria-label={`Word ${wordIndex + 1} of ${words.length}: ${currentWord}`}
          style={{
            fontSize: "32px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
            textAlign: "center",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "90%",
            wordBreak: "break-word",
            margin: 0,
            padding: 0,
          }}
        >
          {currentWord}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#e0e0e0",
          borderRadius: "2px",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: tokens.color.ink,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Word Count */}
      <div
        style={{
          fontSize: "12px",
          color: tokens.color.muted,
          textAlign: "center",
          margin: 0,
          padding: 0,
        }}
      >
        Word {wordIndex + 1} of {words.length}
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
          margin: 0,
          padding: 0,
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
      margin: 0,
    }}
  >
    {label}
  </button>
);

export default SerialWordReader;
