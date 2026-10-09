import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BorderBeam } from "border-beam";
import { tokens } from "../tokens";
import idbridgeScreenRecording from "../assets/idbridge-screen-recording.mp4";

interface IDbridgeCardProps {
  caption: string;
  captionItalic: string;
  roleOutcome?: string;
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
  isActive = false,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = window.innerWidth > 768;

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

  return (
    <>
      <style>{`
        .idbridge-card {
          cursor: pointer;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 8px;
          outline: none;
          padding: 14px 0 12px 0;
          height: fit-content;
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .idbridge-card:hover {
          opacity: 1;
        }

        .idbridge-video {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          width: 100%;
          aspect-ratio: 4 / 3;
          flex-shrink: 0;
          background-color: #1a1a1a;
          filter: brightness(1) grayscale(100%);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: filter, box-shadow;
        }

        .idbridge-video.hovered {
          filter: brightness(0.6) grayscale(0%);
          box-shadow: 0 0 40px rgba(64, 96, 200, 0.4), 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .idbridge-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Manrope';
          font-size: 16px;
          font-weight: 500;
          color: white;
          z-index: 10;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.05em;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .idbridge-video.hovered .idbridge-label {
          opacity: 1;
        }

        .idbridge-arrow {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .idbridge-video.hovered .idbridge-arrow {
          opacity: 0.8;
          transform: translateY(-4px);
        }

        .idbridge-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: flex-start;
        }

        @media (max-width: 768px) {
          .idbridge-video {
            border-radius: 8px !important;
          }
        }
      `}</style>

      <div
        className="idbridge-card"
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
        {hovered ? (
          <BorderBeam>
            <div className={`idbridge-video ${hovered ? "hovered" : ""}`}>
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
                  className="idbridge-arrow"
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
                    flexShrink: 0,
                  }}
                >
                  <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="1.5" />
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

              <div className="idbridge-label">
                View Case Study
              </div>
            </div>
          </BorderBeam>
        ) : (
          <div className={`idbridge-video ${hovered ? "hovered" : ""}`}>
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
                className="idbridge-arrow"
                style={{
                  filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
                  flexShrink: 0,
                }}
              >
                <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="1.5" />
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

            <div className="idbridge-label">
              View Case Study
            </div>
          </div>
        )}

        <div className="idbridge-text" style={{ opacity: isActive ? 1 : 0.7 }}>
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
            {captionParts[0]}
            <span style={{ fontFamily: tokens.font.sans, fontWeight: 500, color: "#111111" }}>
              {captionItalic}
            </span>
            {captionParts[1]}
          </span>
        </div>
      </div>
    </>
  );
};

export default IDbridgeCard;
