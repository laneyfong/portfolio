import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BorderBeam } from "border-beam";
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
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <>
      <style>{`
        .nvidia-card {
          cursor: pointer;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 8px;
          outline: none;
          padding: 14px 0 12px 0;
          height: fit-content;
          opacity: ${isActive ? 1 : 0.7};
          transform: translateY(${isActive ? 0 : 20}px);
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nvidia-card:hover {
          opacity: 1;
        }

        .nvidia-video {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          width: 100%;
          aspect-ratio: 4 / 3;
          flex-shrink: 0;
          background-color: #1a1a1a;
          transition: filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          filter: ${hovered ? "grayscale(100%)" : "grayscale(0%)"};
          box-shadow: ${hovered ? "0 0 24px rgba(64, 96, 200, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.05)"};
        }

        .nvidia-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: flex-start;
        }

        @media (max-width: 768px) {
          .nvidia-video {
            border-radius: 8px !important;
            width: 100% !important;
            aspect-ratio: 4 / 3 !important;
          }
        }
      `}</style>

      <div
        className="nvidia-card"
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
        {hovered ? (
          <div style={{ position: "relative", overflow: "visible" }}>
            <BorderBeam>
            <div className="nvidia-video">
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
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
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

          <div
            style={{
              position: "absolute",
              top: "-36px",
              right: "0px",
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
              transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
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
          </BorderBeam>
          </div>
        ) : (
          <div className="nvidia-video">
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
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
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
        )}

        <div className="nvidia-text" style={{ opacity: isActive ? 1 : 0.7, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, width: "100%" }}>
              <span
                style={{
                  fontFamily: tokens.font.sans,
                  fontWeight: tokens.weight.medium,
                  fontSize: "14px",
                  color: "#BEBEBE",
                  lineHeight: 1.4,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  flex: 1,
                }}
              >
                Automated friction detection at
                <span style={{ fontFamily: tokens.font.sans, fontWeight: 500, color: "#111111" }}>
                  {" "}scale
                </span>
              </span>

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
        </div>
      </div>
    </>
  );
};

export default NvidiaCard;
