import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "../tokens";

interface SerialWordReaderProps {
  text: string;
  title?: string;
}

type Speed = "stop" | "slow" | "normal";

const SerialWordReader: FC<SerialWordReaderProps> = ({
  text = "Click to start reading. Use the speed controls to adjust. Cognitive friendly reading experience.",
  title = "Serial Word Reader",
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>("normal");
  const [hoveredButton, setHoveredButton] = useState<Speed | null>(null);
  const animationIdRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const currentWord = words[currentWordIndex] || "";

  const speedMs = {
    normal: 300,
    slow: 600,
    stop: Infinity,
  };

  useEffect(() => {
    if (!isPlaying || speed === "stop") {
      if (animationIdRef.current) clearTimeout(animationIdRef.current);
      return;
    }

    animationIdRef.current = setTimeout(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= words.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, speedMs[speed]);

    return () => {
      if (animationIdRef.current) clearTimeout(animationIdRef.current);
    };
  }, [isPlaying, speed, words.length]);

  const handleSpeedChange = (newSpeed: Speed) => {
    setSpeed(newSpeed);
    if (newSpeed === "stop") {
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (speed === "stop") {
      setSpeed("normal");
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentWordIndex(0);
    setIsPlaying(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " ") {
      e.preventDefault();
      handlePlayPause();
    } else if (e.key === "ArrowRight") {
      setCurrentWordIndex((prev) => Math.min(prev + 1, words.length - 1));
    } else if (e.key === "ArrowLeft") {
      setCurrentWordIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "r" || e.key === "R") {
      handleReset();
    }
  };

  const progressPercent = words.length > 0 ? (currentWordIndex / (words.length - 1)) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 24,
        borderRadius: tokens.radius.sm,
        backgroundColor: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        minHeight: "300px",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .word-display {
          animation: fadeIn 0.2s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .word-display {
            animation: none;
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
        }}
      >
        <div
          className="word-display"
          role="status"
          aria-live="polite"
          aria-label={`Currently reading word ${currentWordIndex + 1} of ${words.length}: ${currentWord}`}
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
        }}
      >
        Word {currentWordIndex + 1} of {words.length}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        role="group"
        aria-label="Speed controls and playback"
      >
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePlayPause();
          }}
          aria-label={isPlaying ? "Pause reading" : "Start reading"}
          aria-pressed={isPlaying}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #111",
            backgroundColor: tokens.color.ink,
            color: "white",
            fontFamily: tokens.font.sans,
            fontSize: "14px",
            fontWeight: tokens.weight.medium,
            cursor: "pointer",
            transition: "all 0.2s ease",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px rgba(17, 17, 17, 0.1)";
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleReset();
          }}
          aria-label="Reset to beginning (R)"
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: `1px solid ${tokens.color.cardBorder}`,
            backgroundColor: tokens.color.white,
            color: tokens.color.ink,
            fontFamily: tokens.font.sans,
            fontSize: "14px",
            fontWeight: tokens.weight.medium,
            cursor: "pointer",
            transition: "all 0.2s ease",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f5f5f5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = tokens.color.white;
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 3px rgba(17, 17, 17, 0.1)";
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          ↻ Reset
        </button>
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
          speed="normal"
          label="Regular Speed"
          color="#22c55e"
          isActive={speed === "normal"}
          isHovered={hoveredButton === "normal"}
          onHover={(h) => setHoveredButton(h ? "normal" : null)}
          onClick={() => handleSpeedChange("normal")}
          shortcut="1"
        />
        <SpeedButton
          speed="slow"
          label="Slow Speed"
          color="#eab308"
          isActive={speed === "slow"}
          isHovered={hoveredButton === "slow"}
          onHover={(h) => setHoveredButton(h ? "slow" : null)}
          onClick={() => handleSpeedChange("slow")}
          shortcut="2"
        />
        <SpeedButton
          speed="stop"
          label="Pause"
          color="#ef4444"
          isActive={speed === "stop"}
          isHovered={hoveredButton === "stop"}
          onHover={(h) => setHoveredButton(h ? "stop" : null)}
          onClick={() => handleSpeedChange("stop")}
          shortcut="3"
        />
      </div>

      {/* Keyboard Hints */}
      <div
        style={{
          fontSize: "11px",
          color: tokens.color.muted,
          textAlign: "center",
          opacity: 0.6,
          lineHeight: "1.4",
        }}
      >
        Keyboard: <kbd>Space</kbd> to play/pause • <kbd>←</kbd> <kbd>→</kbd> to move words • <kbd>R</kbd> to reset
      </div>
    </div>
  );
};

interface SpeedButtonProps {
  speed: Speed;
  label: string;
  color: string;
  isActive: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
  shortcut: string;
}

const SpeedButton: FC<SpeedButtonProps> = ({
  speed,
  label,
  color,
  isActive,
  isHovered,
  onHover,
  onClick,
  shortcut,
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
    aria-label={`${label} (${shortcut})`}
    aria-pressed={isActive}
    style={{
      padding: "10px 16px",
      borderRadius: "8px",
      border: `2px solid ${color}`,
      backgroundColor: isActive ? color : "white",
      color: isActive ? "white" : color,
      fontFamily: tokens.font.sans,
      fontSize: "13px",
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
