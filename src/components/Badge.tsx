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
  tagline = "curating intentional human-centered experiences, specialized in accessibility.",
  location = "San Francisco Bay Area",
  description = "Currently mastering HCI @ UCSC, Previously @ MyShake",
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
        width: "clamp(260px, 82vw, 380px)",
        backgroundColor: tokens.color.white,
        borderRadius: tokens.radius.xl,
        boxShadow: "0px 8px 32px 0px rgba(0, 0, 0, 0.12), inset 0px 0.5px 1px 0px rgba(255, 255, 255, 0.5)",
        padding: "24px clamp(16px, 7vw, 36px) 40px",
        fontFamily: tokens.font.sans,
        position: "relative",
        boxSizing: "border-box",
        background: `linear-gradient(135deg, ${tokens.color.white} 0%, rgba(255, 255, 255, 0.98) 100%)`,
        backdropFilter: "blur(0.5px)",
      }}
    >
      <style>{`
        .badge-container::before {
          content: '';
          position: absolute;
          inset: 0;
          borderRadius: ${tokens.radius.xl};
          opacity: 0.015;
          backgroundImage: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" /></filter><rect width="100%" height="100%" fill="%23000" filter="url(%23noise)"/></svg>');
          pointerEvents: none;
          mixBlendMode: overlay;
        }

        @media (max-width: 640px) {
          .badge-role { font-size: 24px !important; }
          .badge-name { font-size: 24px !important; }
          .badge-tagline { font-size: 15px !important; }
          .badge-label { font-size: 12px !important; }
          .badge-value { font-size: 13px !important; }
          .badge-container {
            padding: 20px 24px 32px !important;
            width: min(320px, 88vw) !important;
          }
          .badge-photo {
            width: min(140px, 100%) !important;
            margin: 0 auto !important;
          }
          .badge-rows {
            margin-top: 14px !important;
            gap: 4px !important;
          }
          .badge-role-wrapper { margin-top: 28px !important; }
          .badge-tagline-wrapper { margin-bottom: 14px !important; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: tokens.color.white,
          boxShadow: tokens.shadow.insetCircle,
        }}
      />

      <p
        className="badge-role badge-role-wrapper"
        style={{
          margin: "46px 0 8px",
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.medium,
          fontSize: tokens.text["2xl"],
          letterSpacing: tokens.tracking.tight,
          color: tokens.color.ink,
          lineHeight: tokens.leading.none,
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
          fontSize: tokens.text.sm,
          color: tokens.color.body,
          lineHeight: tokens.leading.normal,
          letterSpacing: tokens.tracking.tight,
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
          width: "min(180px, 100%)",
          aspectRatio: "213 / 252",
          margin: "0 auto",
          backgroundImage: photo ? `url(${photo})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: photo ? "transparent" : tokens.color.offWhite,
          boxShadow: tokens.shadow.imageFrame,
        }}
      />

      <div className="badge-rows" style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 6 }}>
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
                width: 78,
                flexShrink: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: tokens.text.base,
                color: tokens.color.body,
                lineHeight: tokens.leading.none,
                paddingTop: row.large ? 8 : 0,
              }}
            >
              {row.label}
            </span>
            <span
              className={row.large ? "badge-name" : "badge-value"}
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: row.large ? tokens.weight.medium : tokens.weight.light,
                fontSize: row.large ? tokens.text["2xl"] : tokens.text.base,
                letterSpacing: tokens.tracking.tight,
                color: row.large ? tokens.color.muted : tokens.color.body,
                lineHeight: row.large ? tokens.leading.none : tokens.leading.normal,
                whiteSpace: "pre-line",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
        <button
          onClick={onCTAClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 20px",
            borderRadius: tokens.radius.full,
            border: `0.5px solid ${tokens.color.navActive}`,
            backgroundColor: "transparent",
            cursor: "pointer",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.light,
            fontSize: tokens.text.md,
            color: tokens.color.ink,
            lineHeight: 1,
            opacity: hovered ? 0.6 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          Explore
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
        </button>
      </div>
    </div>
  );
};

export default Badge;
