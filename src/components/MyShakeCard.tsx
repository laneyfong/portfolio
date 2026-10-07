import type { FC, ReactNode } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import myshakeScreenRecording from "../assets/myshake-screen-recording.mp4";

interface MyShakeCardProps {
  caption: string;
  captionItalic: string;
  roleOutcome: string;
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
      <style>{`
        .myshake-card {
          cursor: pointer;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 16px;
          outline: none;
          padding: 14px 0;
          height: fit-content;
          opacity: ${isActive ? 1 : 0.7};
          transform: translateY(${isActive ? 0 : 20}px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .myshake-card:hover {
          opacity: 1;
        }

        .myshake-video {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          width: 100%;
          aspect-ratio: 16 / 10;
          flex-shrink: 0;
          background-color: #1a1a1a;
          transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: ${isActive || hovered ? "grayscale(0%)" : "grayscale(100%)"};
        }

        .myshake-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: flex-start;
        }

        @media (max-width: 768px) {
          .myshake-video {
            border-radius: 8px !important;
            width: 100% !important;
            aspect-ratio: 16 / 10 !important;
          }
        }
      `}</style>

      <div
        className="myshake-card"
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
        <div className="myshake-video">
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
              style={{
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
                flexShrink: 0,
                transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
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
        </div>

        <div className="myshake-text" style={{ opacity: isActive ? 1 : 0.7 }}>
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

          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "14px",
              color: tokens.color.ink,
              lineHeight: 1.4,
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {boldifyMetrics(captionParts[0], boldMetrics)}
            <em style={{ fontFamily: tokens.font.sans, fontWeight: 500 }}>
              {boldifyMetrics(captionItalic, boldMetrics)}
            </em>
            {boldifyMetrics(captionParts[1], boldMetrics)}
          </span>

        </div>
      </div>
    </>
  );
};

export default MyShakeCard;
