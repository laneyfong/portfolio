import type { FC } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import myshakeScreenRecording from "../assets/myshake-screen-recording.mp4";

interface MyShakeCardProps {
  caption: string;
  captionItalic: string;
  roleOutcome: string;
  context: string;
  to: string;
}

const MyShakeCard: FC<MyShakeCardProps> = ({
  caption,
  captionItalic,
  roleOutcome,
  context,
  to,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const captionParts = caption.split(captionItalic);

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
        borderRadius: 20,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
      }}
    >
      {/* Video Section */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        <video
          ref={videoRef}
          src={myshakeScreenRecording}
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
              textTransform: "uppercase",
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

      {/* Text Section Below Video - No Background */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "18px 0",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
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
            textTransform: "uppercase",
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
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {captionParts[0]}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 500 }}>
            {captionItalic}
          </em>
          {captionParts[1]}
        </span>
      </div>
    </div>
  );
};

export default MyShakeCard;
