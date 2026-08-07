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
    <>
      <style>{`
        @keyframes slideOutLeft {
          from {
            opacity: 0;
            visibility: visible;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            visibility: hidden;
            transform: translateX(12px);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 0;
            visibility: visible;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            visibility: hidden;
            transform: translateX(-12px);
          }
        }

        .myshake-card-container {
          position: relative;
          height: 650px;
          display: flex;
          flex-direction: column;
        }

        .myshake-image-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 0px;
          margin: 24px 16px 0px 16px;
          overflow: hidden;
          position: relative;
          border-radius: 8px;
          background: linear-gradient(to top, #D0D0D3 0%, #F5F5F7 100%);
          gap: 0px;
        }

        .myshake-center-image {
          width: 40%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
          transition: transform 0.22s ease;
        }


        @media (prefers-reduced-motion: reduce) {
          .myshake-left-screen,
          .myshake-right-screen {
            animation: none !important;
            opacity: ${hovered ? 1 : 0};
            transition: opacity 0.2s ease;
          }
        }
      `}</style>

      <div
        className="myshake-card-container"
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
          aspectRatio: "16 / 10",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
          boxShadow: hovered ? "0 12px 32px rgba(0, 0, 0, 0.08)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Video - Full Card */}
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

        {/* Text Overlay - On top of video */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          {/* Top: Context and Arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
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

          {/* Bottom: Caption and Role Outcome with gradient background */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0) 100%)",
              padding: "24px 8px 8px 8px",
              borderRadius: "8px",
            }}
          >
            {/* Caption */}
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "14px",
                color: "white",
                lineHeight: tokens.leading.snug,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              {captionParts[0]}
              <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>
                {captionItalic}
              </em>
              {captionParts[1]}
            </span>

            {/* Role Outcome */}
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.8)",
                letterSpacing: tokens.tracking.tight,
                textTransform: "uppercase",
                lineHeight: tokens.leading.none,
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              {roleOutcome}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyShakeCard;
