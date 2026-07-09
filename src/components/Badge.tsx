import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface BadgeProps {
  name?: string;
  role?: string;
  specialization?: string;
  location?: string;
  description?: string;
  photo?: string;
  onCTAClick?: () => void;
}

const Badge: FC<BadgeProps> = ({
  name = "Laney Fong",
  role = "Product Designer",
  location = "San Francisco Bay Area",
  description = "B.A. Cognitive Science @ UC Berkeley | M.S. HCI @ UCSC",
  photo,
  onCTAClick,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Dot pattern for badge accent
  const DotPattern = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }} aria-hidden>
      {/* Outer ring dots */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 28 * Math.cos(rad);
        const y = 50 + 28 * Math.sin(rad);
        return <circle key={`outer-${angle}`} cx={x} cy={y} r="2.5" fill="#000" />;
      })}

      {/* Middle ring dots */}
      {[30, 90, 150, 210, 270, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 18 * Math.cos(rad);
        const y = 50 + 18 * Math.sin(rad);
        return <circle key={`mid-${angle}`} cx={x} cy={y} r="1.8" fill="#000" />;
      })}

      {/* Center dot */}
      <circle cx="50" cy="50" r="5" fill="#000" />
    </svg>
  );

  return (
    <div
      className="badge-container"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "clamp(235px, 24vw, 360px)",
        aspectRatio: "2.125 / 3.370",
        perspective: "1200px",
        fontFamily: tokens.font.sans,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        className="badge-flip-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: isFlipped
            ? "rotateY(180deg)"
            : isHovered
            ? "rotateY(10deg)"
            : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="badge-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            backgroundColor: tokens.color.white,
            borderRadius: "24px",
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "16px 16px 24px 16px",
            boxSizing: "border-box",
            overflow: "visible",
          }}
        >
          {/* Badge hole - see-through circular cutout at top */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid rgba(0, 0, 0, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 5,
            }}
          />
      <style>{`
        @media (max-width: 640px) {
          .badge-container {
            width: clamp(215px, 80vw, 320px) !important;
          }
          .badge-front, .badge-back {
            padding: 14px 14px 20px 14px !important;
          }
        }
      `}</style>

          {/* FRONT: Blue accent area with image and dot pattern */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#8DC8E4",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              marginBottom: "16px",
            }}
          >
            {/* Photo/Image */}
            {photo && (
              <img
                src={photo}
                alt={name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                }}
              />
            )}

            {/* Dot pattern overlay when no photo */}
            {!photo && <DotPattern />}
          </div>

          {/* Bottom info section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h2
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "18px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.ink,
                lineHeight: 1.2,
              }}
            >
              {name}
            </h2>

            <p
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "12px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.body,
                lineHeight: 1.3,
                opacity: 0.7,
              }}
            >
              {role}
            </p>

            <p
              style={{
                margin: "4px 0 0 0",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "11px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.body,
                lineHeight: 1.3,
                opacity: 0.65,
                fontStyle: "italic",
              }}
            >
              Research-backed design. Obsessive about accessibility.
            </p>

            <p
              style={{
                margin: "6px 0 0 0",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "10px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.muted,
                lineHeight: 1.2,
                opacity: 0.5,
                textAlign: "center",
              }}
            >
              ↻ Flip to explore
            </p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="badge-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: tokens.color.white,
            borderRadius: "20px",
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "16px 20px",
            boxSizing: "border-box",
            transform: "rotateY(180deg)",
            overflowY: "auto",
          }}
        >
          {/* BACK: Location, Background, Design Philosophy */}
          <div
            className="badge-back-section"
            style={{
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: `1px solid rgba(0, 0, 0, 0.06)`,
            }}
          >
            <div
              className="badge-back-label"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "10px",
                color: tokens.color.muted,
                lineHeight: 1.2,
                opacity: 0.65,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Location
            </div>
            <div
              className="badge-back-value"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "13px",
                color: tokens.color.body,
                lineHeight: 1.4,
              }}
            >
              {location}
            </div>
          </div>

          <div
            className="badge-back-section"
            style={{
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: `1px solid rgba(0, 0, 0, 0.06)`,
            }}
          >
            <div
              className="badge-back-label"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "10px",
                color: tokens.color.muted,
                lineHeight: 1.2,
                opacity: 0.65,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Background
            </div>
            <div
              className="badge-back-value"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "13px",
                color: tokens.color.body,
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          </div>

          <div
            className="badge-back-section"
            style={{
              marginBottom: 0,
            }}
          >
            <div
              className="badge-back-label"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "10px",
                color: tokens.color.muted,
                lineHeight: 1.2,
                opacity: 0.65,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Approach
            </div>
            <div
              className="badge-back-value"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "13px",
                color: tokens.color.body,
                lineHeight: 1.4,
              }}
            >
              Research-backed decisions, obsessive attention to accessibility, ruthless focus on reducing friction.
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCTAClick?.();
            }}
            style={{
              marginTop: "auto",
              paddingTop: 12,
              width: "100%",
              boxSizing: "border-box",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: "12px",
                border: `1px solid ${tokens.color.cardBorder}`,
                padding: "11px 18px",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "13px",
                color: tokens.color.ink,
                lineHeight: 1.2,
                opacity: 0.85,
                transition: "opacity 0.2s ease, background-color 0.2s ease",
                backgroundColor: "transparent",
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = "0.7";
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(0, 0, 0, 0.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = "0.85";
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
              }}
            >
              See work
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "0.75px solid currentColor",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="6" height="7" viewBox="0 0 8.271 8.974" fill="currentColor">
                  <path
                    d="M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z"
                    fillRule="nonzero"
                  />
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Badge;
