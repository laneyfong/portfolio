import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import nvidiaPrototype from "../assets/nvidia-prototype.mp4";

interface NvidiaCardProps {
  isActive?: boolean;
}

const NvidiaCard: FC<NvidiaCardProps> = ({ isActive = false }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = window.innerWidth > 768;

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
    <>
      <style>{`
        .nvidia-card-mobile {
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

        .nvidia-card--inactive {
          gap: 0;
          height: auto;
          margin-top: 0;
          margin-bottom: 0;
          box-shadow: none;
          transform: translateY(0) scale(1);
        }

        .nvidia-card--active {
          gap: 32px;
          height: 600px;
          margin-top: 12px;
          margin-bottom: clamp(40px, 4vw, 80px);
          box-shadow: none;
          transform: translateY(0) scale(1);
          align-items: flex-start;
        }

        .nvidia-card--active:hover {
          transform: translateY(-4px) scale(1.01);
        }

        .nvidia-card--inactive:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .nvidia-text-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
          flex: 1;
          justify-content: flex-start;
          white-space: nowrap;
          overflow: hidden;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.7s, opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.7s;
        }

        .nvidia-text-section--inactive {
          transform: translateX(20px);
          opacity: 0;
          pointer-events: none;
        }

        .nvidia-text-section--active {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
        }

        .nvidia-video-mobile {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          flex-shrink: 0;
          background-color: #1a1a1a;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      height 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      aspect-ratio 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: filter, width, height;
        }

        .nvidia-video-mobile--inactive {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10;
          filter: grayscale(100%);
        }

        .nvidia-video-mobile--active {
          width: 70%;
          height: 100%;
          aspect-ratio: auto;
          filter: grayscale(0%);
        }

        .nvidia-video-mobile:hover {
          filter: grayscale(0%);
        }


        @media (max-width: 768px) {
          .nvidia-card-mobile {
            border-radius: 0 !important;
            flex-direction: column !important;
          }
          .nvidia-video-mobile {
            border-radius: 8px !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 10 !important;
            filter: grayscale(100%) !important;
          }
          .nvidia-text-section {
            flex: 1 !important;
            width: auto !important;
            opacity: 1 !important;
          }
        }
      `}</style>
      <div
        className={`nvidia-card-mobile ${isActive && isDesktop ? "nvidia-card--active" : "nvidia-card--inactive"}`}
        role="link"
        tabIndex={0}
        onClick={(e) => {
          if (isActive) {
            e.stopPropagation();
            navigate("/nvidia-ai-ux-agent");
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (isActive) {
              navigate("/nvidia-ai-ux-agent");
            }
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Video Section */}
        <div
          className={`nvidia-video-mobile ${isActive && isDesktop ? "nvidia-video-mobile--active" : "nvidia-video-mobile--inactive"}`}
        >
          <video
            ref={videoRef}
            src={nvidiaPrototype}
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

          {/* Top Text Overlay */}
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
              Capstone Project
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

          {/* WIP Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 12px",
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.color.offWhite,
              border: `1px solid ${tokens.color.cardBorder}`,
              flexShrink: 0,
              zIndex: 5,
              opacity: isActive ? 0 : 1,
              transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "12px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.muted,
                letterSpacing: "0.5px",
              }}
            >
              WIP
            </span>
          </div>
        </div>

        {/* Text Section - Right Side */}
        <div
          className={`nvidia-text-section ${isActive && isDesktop ? "nvidia-text-section--active" : "nvidia-text-section--inactive"}`}
        >
          {/* Context */}
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
            Capstone Project
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
            AI-powered usability testing that catches friction points at scale.
          </span>

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
            Product Designer
          </span>

          {/* WIP Badge on Active */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px 12px",
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.color.offWhite,
              border: `1px solid ${tokens.color.cardBorder}`,
              flexShrink: 0,
              marginTop: 8,
              width: "fit-content",
            }}
          >
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "12px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.muted,
                letterSpacing: "0.5px",
              }}
            >
              WIP
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NvidiaCard;
