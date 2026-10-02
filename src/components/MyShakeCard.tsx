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


  const isDesktop = window.innerWidth > 768;

  return (
    <>
      <style>{`
        .myshake-card-mobile {
          border-radius: ${isDesktop ? 20 : 12}px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          transition: height 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      gap 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      margin-top 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      margin-bottom 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .myshake-card--inactive {
          gap: 0;
          height: auto;
          margin-top: 0;
          margin-bottom: 0;
          box-shadow: none;
          transform: translateY(0) scale(1);
        }

        .myshake-card--active {
          gap: 32px;
          height: 600px;
          margin-top: 12px;
          margin-bottom: clamp(40px, 4vw, 80px);
          box-shadow: none;
          transform: translateY(0) scale(1);
          align-items: flex-start;
        }

        .myshake-card--active:hover {
          transform: translateY(-4px) scale(1.01);
        }

        .myshake-card--inactive:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .myshake-video-mobile {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          flex-shrink: 0;
          background-color: #1a1a1a;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      height 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      aspect-ratio 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: filter, width, height;
        }

        .myshake-video-mobile--inactive {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10;
          filter: grayscale(100%);
        }

        .myshake-video-mobile--active {
          width: 70%;
          height: 100%;
          aspect-ratio: auto;
          filter: grayscale(0%);
        }

        .myshake-video-mobile:hover {
          filter: grayscale(0%);
        }


        @media (max-width: 768px) {
          .myshake-card-mobile {
            border-radius: 0 !important;
            flex-direction: column !important;
          }
          .myshake-video-mobile {
            border-radius: 8px !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 10 !important;
            filter: grayscale(100%) !important;
          }
          .myshake-text-section {
            flex: 1 !important;
            width: auto !important;
            opacity: 1 !important;
          }
        }
      `}</style>
      <div
        className={`myshake-card-mobile ${isActive && isDesktop ? "myshake-card--active" : "myshake-card--inactive"}`}
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
          navigate(to);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video Section */}
      <div
        className={`myshake-video-mobile ${isActive && isDesktop ? "myshake-video-mobile--active" : "myshake-video-mobile--inactive"}`}
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
          padding: isDesktop ? "0 0 0 0" : "16px 0 0 0",
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
          {boldifyMetrics(captionParts[0], boldMetrics)}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 500 }}>
            {boldifyMetrics(captionItalic, boldMetrics)}
          </em>
          {boldifyMetrics(captionParts[1], boldMetrics)}
        </span>
      </div>
      )}
      </div>
    </>
  );
};

export default MyShakeCard;
