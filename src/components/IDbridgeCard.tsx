import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

interface IDbridgeCardProps {
  defaultImage: string;
  documentsImage: string;
  historyImage: string;
  mapImage: string;
  caption: string;
  captionItalic: string;
  roleOutcome: string;
  context: string;
  to: string;
}

const IDbridgeCard: FC<IDbridgeCardProps> = ({
  defaultImage,
  documentsImage,
  historyImage,
  mapImage,
  caption,
  captionItalic,
  roleOutcome,
  context,
  to,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const captionParts = caption.split(captionItalic);

  return (
    <>
      <style>{`
        @keyframes slideOutLeftIdbridge {
          from {
            opacity: 0;
            visibility: visible;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeftIdbridge {
          from {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            visibility: hidden;
            transform: translateX(16px);
          }
        }

        @keyframes slideOutRightIdbridge {
          from {
            opacity: 0;
            visibility: visible;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
        }

        @keyframes slideInRightIdbridge {
          from {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            visibility: hidden;
            transform: translateX(-16px);
          }
        }

        @keyframes softRetractLeft {
          from {
            opacity: 1;
            visibility: visible;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            visibility: hidden;
            transform: translateX(4px) scale(0.98);
          }
        }

        @keyframes softRetractRight {
          from {
            opacity: 1;
            visibility: visible;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            visibility: hidden;
            transform: translateX(-4px) scale(0.98);
          }
        }

        .idbridge-card-container {
          position: relative;
          height: 650px;
          display: flex;
          flex-direction: column;
        }

        .idbridge-image-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 0px;
          margin: 24px 16px 0px 16px;
          overflow: hidden;
          position: relative;
          border-radius: 4px;
          background: linear-gradient(180deg, #D8D8DB 0%, #C8C8CB 100%);
          gap: ${hovered ? "8px" : "1px"};
          transition: gap 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .idbridge-center-image {
          width: ${hovered ? "22%" : "40%"};
          height: 100%;
          object-fit: contain;
          border-radius: 4px;
          transition: width ${hovered ? "0.5s" : "1.2s"} cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.22s ease;
        }

        .idbridge-screen {
          width: 22%;
          height: 100%;
          display: ${hovered ? "flex" : "none"};
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
        }

        .idbridge-doc-screen {
          animation: ${hovered ? "slideOutRightIdbridge 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "softRetractRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"};
        }

        .idbridge-history-screen {
          animation: ${hovered ? "slideOutRightIdbridge 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s forwards" : "softRetractRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s forwards"};
        }

        .idbridge-map-screen {
          animation: ${hovered ? "slideOutRightIdbridge 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards" : "softRetractRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards"};
        }

        @media (prefers-reduced-motion: reduce) {
          .idbridge-doc-screen,
          .idbridge-history-screen,
          .idbridge-map-screen {
            animation: none !important;
            opacity: ${hovered ? 1 : 0};
            visibility: ${hovered ? "visible" : "hidden"};
            transition: opacity 0.2s ease, visibility 0.2s ease;
          }
        }
      `}</style>

      <div
        className="idbridge-card-container"
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
          backgroundColor: tokens.color.offWhite,
          color: tokens.color.body,
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
          boxShadow: hovered ? "0 12px 32px rgba(0, 0, 0, 0.08)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "16px 16px 0px 16px",
            flex: "0 0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
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
                color: tokens.color.muted,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                lineHeight: tokens.leading.none,
              }}
            >
              {context}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              style={{
                transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke={tokens.color.body}
                strokeWidth="1.5"
                style={{
                  transition: "stroke 0.5s ease",
                }}
              />
              <g>
                <path
                  d="M 16 8 L 24 16 L 16 24 M 24 16 L 8 16"
                  stroke={tokens.color.body}
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: "stroke 0.5s ease",
                  }}
                />
              </g>
            </svg>
          </div>
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: "16px",
              color: tokens.color.body,
              lineHeight: tokens.leading.snug,
              transition: "color 0.32s ease",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {captionParts[0]}
            <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>
              {captionItalic}
            </em>
            {captionParts[1]}
          </span>
        </div>

        {/* Image Section */}
        <div className="idbridge-image-section">
          {/* Default Screen - Always Visible */}
          <img src={defaultImage} alt="IDbridge home screen" className="idbridge-center-image" />

          {/* Documents Screen */}
          <div className="idbridge-screen idbridge-doc-screen">
            <img src={documentsImage} alt="IDbridge documents" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "14px" }} />
          </div>

          {/* History Screen */}
          <div className="idbridge-screen idbridge-history-screen">
            <img src={historyImage} alt="IDbridge history" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "14px" }} />
          </div>

          {/* Map Screen */}
          <div className="idbridge-screen idbridge-map-screen">
            <img src={mapImage} alt="IDbridge map" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "14px" }} />
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "16px 16px 20px 16px",
            flex: "0 0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "12px",
              color: tokens.color.muted,
              letterSpacing: tokens.tracking.tight,
              textTransform: "uppercase",
              lineHeight: tokens.leading.none,
              transition: "color 0.5s ease",
            }}
          >
            {roleOutcome}
          </span>
        </div>
      </div>
    </>
  );
};

export default IDbridgeCard;
