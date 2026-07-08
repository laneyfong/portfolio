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
  specialization = "Accessible design at scale",
  location = "San Francisco Bay Area",
  description = "B.A. Cognitive Science @ UC Berkeley | M.S. HCI @ UCSC",
  photo,
  onCTAClick,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="badge-container"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        width: "clamp(260px, 28vw, 400px)",
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
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
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
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: tokens.color.white,
            borderRadius: "20px",
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "20px 24px",
            boxSizing: "border-box",
          }}
        >
      <style>{`
        @media (max-width: 640px) {
          .badge-container {
            width: clamp(240px, 85vw, 360px) !important;
          }
          .badge-front, .badge-back {
            padding: 16px 20px !important;
          }
          .badge-photo {
            width: clamp(130px, 60%, 220px) !important;
            margin: 10px auto 16px !important;
          }
          .badge-front-role { font-size: 16px !important; }
          .badge-front-name { font-size: 17px !important; }
          .badge-front-spec { font-size: 11px !important; }
          .badge-back-section { margin-bottom: 20px !important; }
          .badge-back-label { font-size: 9px !important; }
          .badge-back-value { font-size: 12px !important; }
        }
      `}</style>

          {/* FRONT: Photo + Title + Name + Specialization */}
          <div
            className="badge-photo"
            style={{
              width: "clamp(150px, 65%, 250px)",
              aspectRatio: "213 / 252",
              margin: "12px auto 20px",
              backgroundImage: photo ? `url(${photo})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: photo ? "transparent" : tokens.color.offWhite,
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
              borderRadius: "14px",
              flexShrink: 0,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <p
              className="badge-front-role"
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "18px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.ink,
                lineHeight: 1.3,
                textAlign: "center",
              }}
            >
              {role}
            </p>

            <p
              className="badge-front-name"
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "20px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.ink,
                lineHeight: 1.3,
                textAlign: "center",
              }}
            >
              {name}
            </p>
          </div>

          <p
            className="badge-front-spec"
            style={{
              margin: "0 auto 16px",
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.light,
              fontSize: "12px",
              color: tokens.color.body,
              lineHeight: 1.4,
              opacity: 0.7,
              textAlign: "center",
              maxWidth: "90%",
            }}
          >
            {specialization}
          </p>

          <div style={{ marginTop: "auto", textAlign: "center", fontSize: "12px", color: tokens.color.muted, opacity: 0.6 }}>
            Click to explore →
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
            padding: "20px 24px",
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
