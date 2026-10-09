import type { FC, ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import "../myshake-card.css";
import myshakeScreenRecording from "../assets/myshake-screen-recording.mp4";

interface MyShakeCardProps {
  caption: string;
  captionItalic: string;
  roleOutcome?: string;
  context: string;
  to: string;
  isActive?: boolean;
  boldMetrics?: string[];
}

const boldifyMetrics = (text: string, metrics: string[] = []): ReactNode => {
  if (metrics.length === 0) return text;

  let result: ReactNode[] = [text];

  metrics.forEach((metric, index) => {
    result = result.flatMap((part) => {
      if (typeof part !== "string") return part;

      const idx = part.indexOf(metric);
      if (idx === -1) return part;

      return [
        part.slice(0, idx),
        <span key={`metric-${index}-${idx}`} style={{ fontWeight: tokens.weight.medium }}>{metric}</span>,
        part.slice(idx + metric.length),
      ];
    });
  });

  return result.filter((part) => part !== "");
};

const MyShakeCard: FC<MyShakeCardProps> = ({
  caption,
  captionItalic,
  roleOutcome,
  context,
  to,
  isActive = false,
  boldMetrics = [],
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const captionParts = caption.split(captionItalic);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const isDesktop = window.innerWidth > 768;

  return (
    <>
      <div
        className="myshake-card"
        style={{
          opacity: isActive ? 1 : 0.7,
          transform: `translateY(${isActive ? 0 : 20}px)`,
        }}
        role="link"
        tabIndex={0}
        onClick={(e) => {
          if (isActive) {
            e.stopPropagation();
            navigate(to);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (isActive) {
              navigate(to);
            }
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`myshake-video ${hovered ? "hovered" : ""}`}
          style={{
            borderRadius: isDesktop ? "20px" : "0px",
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
            preload="metadata"
          />

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
              className="myshake-arrow"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
                flexShrink: 0,
              }}
            >
              <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="1.5"></circle>
              <g>
                <path
                  d="M 16 8 L 24 16 L 16 24 M 24 16 L 8 16"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>

          <div className="myshake-label">
            View Case Study
          </div>
        </div>

        <div className="myshake-text" style={{ opacity: isActive ? 1 : 0.7 }}>
          {roleOutcome && (
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "12px",
                color: tokens.color.muted,
                letterSpacing: tokens.tracking.tight,
                lineHeight: tokens.leading.none,
                textTransform: "uppercase",
              }}
            >
              {roleOutcome}
            </span>
          )}

          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "14px",
              color: "#BEBEBE",
              lineHeight: 1.4,
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {boldifyMetrics(captionParts[0], boldMetrics)}
            <span style={{ fontFamily: tokens.font.sans, fontWeight: 500, color: "#111111" }}>
              {boldifyMetrics(captionItalic, boldMetrics)}
            </span>
            {boldifyMetrics(captionParts[1], boldMetrics)}
          </span>
        </div>
      </div>
    </>
  );
};

export default MyShakeCard;
