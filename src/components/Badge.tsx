import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface BadgeRow {
  label: string;
  value: string;
  large?: boolean;
}

interface BadgeProps {
  name?: string;
  role?: string;
  tagline?: string;
  location?: string;
  description?: string;
  photo?: string;
  onCTAClick?: () => void;
}

const Badge: FC<BadgeProps> = ({
  name = "Laney Fong",
  role = "Product Designer",
  tagline = "Designing accessible, research-driven products that increase user engagement and reduce friction.",
  location = "San Francisco Bay Area",
  description = "B.A. Cognitive Science @ UC Berkeley | M.S. HCI @ UCSC",
  photo,
  onCTAClick,
}) => {
  const [hovered, setHovered] = useState(false);

  const rows: BadgeRow[] = [
    { label: "Name", value: name, large: true },
    { label: "Location", value: location },
    { label: "Description", value: description },
  ];

  const taglineParts = tagline.split(/(human-centered)/i);

  return (
    <div
      className="badge-container"
      style={{
        width: "clamp(280px, 82vw, 420px)",
        backgroundColor: tokens.color.white,
        borderRadius: "20px",
        boxShadow: "0 10px 28px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        padding: "36px 32px",
        fontFamily: tokens.font.sans,
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .badge-role { font-size: 18px !important; }
          .badge-name { font-size: 18px !important; }
          .badge-tagline { font-size: 12px !important; }
          .badge-label { font-size: 10px !important; }
          .badge-value { font-size: 12px !important; }
          .badge-container {
            padding: 28px 24px !important;
            width: clamp(260px, 85vw, 380px) !important;
          }
          .badge-photo {
            width: min(160px, 100%) !important;
            margin: 0 auto 18px !important;
          }
          .badge-rows {
            gap: 10px !important;
            margin-bottom: 18px !important;
          }
          .badge-role-wrapper { margin-top: 0 !important; margin-bottom: 8px !important; }
          .badge-tagline-wrapper { margin-bottom: 18px !important; }
        }
      `}</style>

      <div
        className="badge-photo"
        style={{
          width: "min(200px, 100%)",
          aspectRatio: "213 / 252",
          margin: "12px auto 24px",
          backgroundImage: photo ? `url(${photo})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: photo ? "transparent" : tokens.color.offWhite,
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          borderRadius: "14px",
        }}
      />

      <p
        className="badge-role badge-role-wrapper"
        style={{
          margin: "0 0 8px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: "19px",
          letterSpacing: tokens.tracking.tight,
          color: tokens.color.ink,
          lineHeight: 1.3,
        }}
      >
        {role}
      </p>

      <p
        className="badge-tagline badge-tagline-wrapper"
        style={{
          margin: "0 0 24px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.light,
          fontSize: "13px",
          color: tokens.color.body,
          lineHeight: 1.5,
          opacity: 0.8,
        }}
      >
        {taglineParts.map((part, i) =>
          /human-centered/i.test(part) ? (
            <em key={i} style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>
              {part}
            </em>
          ) : (
            part
          )
        )}
      </p>

      <div className="badge-rows" style={{ marginTop: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
              minHeight: "auto",
            }}
          >
            <span
              className="badge-label"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "10px",
                color: tokens.color.muted,
                lineHeight: 1.2,
                opacity: 0.65,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {row.label}
            </span>
            <span
              className={row.large ? "badge-name" : "badge-value"}
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: row.large ? tokens.weight.medium : tokens.weight.light,
                fontSize: row.large ? "18px" : "13px",
                letterSpacing: tokens.tracking.tight,
                color: row.large ? tokens.color.ink : tokens.color.body,
                lineHeight: row.large ? 1.3 : 1.4,
                whiteSpace: "pre-line",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onCTAClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          paddingTop: 0,
          paddingBottom: 0,
          width: "100%",
          boxSizing: "border-box",
          background: "none",
          border: "none",
          cursor: "pointer",
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
            opacity: hovered ? 0.7 : 0.85,
            transition: "opacity 0.2s ease, border-color 0.2s ease",
            pointerEvents: "auto",
            backgroundColor: hovered ? "rgba(0, 0, 0, 0.02)" : "transparent",
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
              pointerEvents: "none",
              transform: hovered ? "translateY(1px)" : "translateY(0)",
              transition: "transform 0.15s ease",
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
  );
};

export default Badge;
