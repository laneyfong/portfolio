import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import idbridgeScreenRecording from "../assets/idbridge-screen-recording.mp4";

interface IDbridgeCardProps {
  caption: string;
  captionItalic: string;
  roleOutcome: string;
  context: string;
  to: string;
  isActive?: boolean;
}

const IDbridgeCard: FC<IDbridgeCardProps> = ({
  caption,
  captionItalic,
  roleOutcome,
  context,
  to,
  isActive = true,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const captionParts = caption.split(captionItalic);

  // Control video playback based on active state
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          // Autoplay may fail due to browser policies
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(to)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(to);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: window.innerWidth > 768 ? 20 : 12,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: isActive && window.innerWidth > 768 ? "row" : "column",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        gap: isActive && window.innerWidth > 768 ? 32 : 0,
        alignItems: isActive && window.innerWidth > 768 ? "flex-start" : "stretch",
        minHeight: isActive && window.innerWidth > 768 ? "600px" : "auto",
        height: isActive && window.innerWidth > 768 ? "600px" : "auto",
        marginTop: isActive ? "clamp(40px, 4vw, 80px)" : 0,
        marginBottom: isActive ? "clamp(40px, 4vw, 80px)" : 0,
        outline: "none",
      }}
    >
      {/* Video Section */}
      <div
        style={{
          position: "relative",
          aspectRatio: isActive ? "16 / 10" : "16 / 10",
          overflow: "hidden",
          borderRadius: window.innerWidth > 768 ? 20 : 0,
          flexShrink: 0,
          width: isActive && window.innerWidth > 768 ? "70%" : "100%",
          minHeight: isActive && window.innerWidth > 768 ? "600px" : "auto",
        }}
      >
        <video
          ref={videoRef}
          src={idbridgeScreenRecording}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          autoPlay
          playsInline
          loop
          muted
        />

        {/* Top Text Overlay - Always visible */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            padding: "16px",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "11px",
              color: "white",
              letterSpacing: "0.5px",
              lineHeight: tokens.leading.none,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            {context}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 32 32"
            style={{
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
              flexShrink: 0,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
            <g>
              <path
                d="M 16 8 L 24 16 L 16 24 M 24 16 L 8 16"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Text Section - Right Side (Active Only) */}
      {isActive && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: window.innerWidth > 768 ? "0 0 0 0" : "16px 0 0 0",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        {/* Role Outcome */}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: "12px",
            color: tokens.color.muted,
            letterSpacing: tokens.tracking.tight,
            lineHeight: tokens.leading.none,
          }}
        >
          {roleOutcome}
        </span>

        {/* Caption */}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: "16px",
            color: tokens.color.ink,
            lineHeight: tokens.leading.snug,
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {captionParts[0]}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 500 }}>
            {captionItalic}
          </em>
          {captionParts[1]}
        </span>
      </div>
      )}
    </div>
  );
};

export default IDbridgeCard;
