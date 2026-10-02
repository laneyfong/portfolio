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
    <>
      <style>{`
        @media (max-width: 768px) {
          .nvidia-card-mobile {
            border-radius: 0 !important;
          }
          .nvidia-video-mobile {
            border-radius: 8px !important;
          }
        }
      `}</style>
      <div
        className="nvidia-card-mobile"
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
        style={{
          borderRadius: window.innerWidth > 768 ? 20 : 12,
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: isActive && window.innerWidth > 768 ? "row" : "column",
          transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease",
          transform: isActive && hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
          boxShadow: hovered && !isActive ? "0 12px 32px rgba(0, 0, 0, 0.15)" : "none",
          gap: isActive && window.innerWidth > 768 ? 32 : 0,
          alignItems: isActive && window.innerWidth > 768 ? "flex-start" : "stretch",
          minHeight: isActive && window.innerWidth > 768 ? "600px" : "auto",
          height: isActive && window.innerWidth > 768 ? "600px" : "auto",
          marginTop: isActive ? "12px" : 0,
          marginBottom: isActive ? "clamp(40px, 4vw, 80px)" : 0,
          outline: "none",
        }}
      >
        {/* Video Section */}
        <div
          className="nvidia-video-mobile"
          style={{
            position: "relative",
            aspectRatio: isActive ? "16 / 10" : "16 / 10",
            overflow: "hidden",
            borderRadius: window.innerWidth > 768 ? 20 : 0,
            flexShrink: 0,
            width: isActive && window.innerWidth > 768 ? "70%" : "100%",
            minHeight: isActive && window.innerWidth > 768 ? "600px" : "auto",
            backgroundColor: "#1a1a1a",
            willChange: "opacity",
            filter: isActive || hovered ? "grayscale(0%)" : "grayscale(100%)",
            transition: "filter 0.4s ease",
          }}
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
          {!isActive && (
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
          )}
        </div>

        {/* Text Section - Right Side (Active Only) */}
        {isActive && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: window.innerWidth > 768 ? "0 0 0 0" : "16px 0 0 0",
              pointerEvents: "none",
              flex: 1,
              justifyContent: "flex-start",
            }}
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
              AI-powered usability testing that catches friction points at scale
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
        )}
      </div>
    </>
  );
};

export default NvidiaCard;
