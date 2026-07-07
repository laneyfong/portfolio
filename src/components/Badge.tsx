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
        borderRadius: "8px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.04)",
        padding: "40px 36px",
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
            padding: 32px 24px !important;
            width: clamp(260px, 85vw, 380px) !important;
          }
          .badge-photo {
            width: min(160px, 100%) !important;
            margin: 0 auto 20px !important;
          }
          .badge-rows {
            gap: 10px !important;
            margin-bottom: 20px !important;
          }
          .badge-role-wrapper { margin-top: 36px !important; margin-bottom: 10px !important; }
          .badge-tagline-wrapper { margin-bottom: 20px !important; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: 32,
          left: "50%",
          transform: "translateX(-50%)",
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: tokens.color.white,
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
        }}
      />

      <p
        className="badge-role badge-role-wrapper"
        style={{
          margin: "48px 0 12px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: tokens.text.xl,
          letterSpacing: tokens.tracking.tight,
          color: tokens.color.muted,
          lineHeight: tokens.leading.snug,
        }}
      >
        {role}
      </p>

      <p
        className="badge-tagline badge-tagline-wrapper"
        style={{
          margin: "0 0 28px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.light,
          fontSize: tokens.text.sm,
          color: tokens.color.body,
          lineHeight: 1.6,
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

      <div
        className="badge-photo"
        style={{
          width: "min(200px, 100%)",
          aspectRatio: "213 / 252",
          margin: "0 auto",
          marginBottom: 28,
          backgroundImage: photo ? `url(${photo})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: photo ? "transparent" : tokens.color.offWhite,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: "4px",
        }}
      />

      <div className="badge-rows" style={{ marginTop: 0, display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "clamp(16px, 7vw, 40px)",
              minHeight: row.large ? 34 : 20,
            }}
          >
            <span
              className="badge-label"
              style={{
                width: 70,
                flexShrink: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "11px",
                color: tokens.color.muted,
                lineHeight: tokens.leading.none,
                opacity: 0.7,
                paddingTop: row.large ? 4 : 0,
              }}
            >
              {row.label}
            </span>
            <span
              className={row.large ? "badge-name" : "badge-value"}
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: row.large ? tokens.weight.medium : tokens.weight.light,
                fontSize: row.large ? tokens.text.lg : tokens.text.sm,
                letterSpacing: tokens.tracking.tight,
                color: row.large ? tokens.color.muted : tokens.color.body,
                lineHeight: row.large ? 1.2 : 1.5,
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
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 20,
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
            gap: 10,
            borderRadius: tokens.radius.full,
            border: `0.5px solid ${tokens.color.navActive}`,
            padding: "12px 20px",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.light,
            fontSize: tokens.text.md,
            color: tokens.color.ink,
            lineHeight: 1,
            opacity: hovered ? 0.6 : 1,
            transition: "opacity 0.15s ease",
            pointerEvents: "auto",
          }}
        >
          See my work
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "0.5px solid #000",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              pointerEvents: "none",
              transform: hovered ? "translateY(2px)" : "translateY(0)",
              transition: "transform 0.15s ease",
            }}
          >
            <svg width="8" height="9" viewBox="0 0 8.271 8.974" fill="currentColor">
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
