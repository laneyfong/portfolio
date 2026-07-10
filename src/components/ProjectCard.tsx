import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

interface ProjectMetric {
  value: string;
  label: string;
}

interface ProjectCardProps {
  logo: string;
  logoAlt: string;
  logoHeight?: number;
  screenshot: string;
  caption: string;
  captionItalic: string;
  layout?: "portrait" | "landscape";
  height?: number;
  metrics?: ProjectMetric[];
  to?: string;
  roleOutcome?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  logo,
  logoAlt,
  logoHeight = 24,
  screenshot,
  caption,
  captionItalic,
  layout = "portrait",
  height,
  metrics,
  to,
  roleOutcome,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isPortrait = layout === "portrait";
  const cardHeight = height ?? (isPortrait ? 550 : 500);
  const imageHeight = isPortrait ? 280 : 240;

  const captionParts = caption.split(captionItalic);

  return (
    <>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .project-card {
            transition: background-color 0s, border-color 0s, color 0s !important;
          }
        }
      `}</style>
      <div
        className="project-card"
        role={to ? "link" : undefined}
        tabIndex={to ? 0 : undefined}
        onClick={to ? () => navigate(to) : undefined}
        onKeyDown={
          to
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(to);
                }
              }
            : undefined
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: cardHeight,
        borderRadius: tokens.radius.sm,
        cursor: to ? "pointer" : "default",
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: hovered && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "translateY(-2px) scale(1.005)" : "translateY(0) scale(1)",
        backgroundColor: hovered ? "#1a1a1a" : tokens.color.offWhite,
        border: `1px solid ${hovered ? "#2a2a2a" : tokens.color.cardBorder}`,
        overflow: "hidden",
        position: "relative",
        color: hovered ? "#ffffff" : tokens.color.body,
      }}
    >
      {/* Logo - Top Left Corner */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        <img
          src={logo}
          alt={logoAlt}
          style={{
            height: logoHeight,
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Arrow CTA - Top Right Corner */}
      {to && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            style={{
              transition: "all 0.22s ease",
            }}
          >
            {/* Outlined circle - fills on hover */}
            <circle
              cx="16"
              cy="16"
              r="14"
              fill={hovered ? "#ffffff" : "none"}
              stroke={hovered ? "#ffffff" : tokens.color.body}
              strokeWidth="1.5"
              style={{
                transition: "fill 0.5s ease, stroke 0.5s ease",
              }}
            />
            {/* Arrow pointing right, rotates on hover */}
            <g
              style={{
                transform: `rotate(${hovered ? -45 : 0}deg)`,
                transformOrigin: "16px 16px",
                transition: "transform 0.5s ease",
              }}
            >
              <path
                d="M 16 8 L 24 16 L 16 24 M 24 16 L 8 16"
                stroke={hovered ? "#1a1a1a" : tokens.color.body}
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
      )}

      {/* Image Section - Centered */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: imageHeight,
            backgroundImage: `url(${screenshot})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "transform 0.22s ease",
            transform: hovered ? "scale(1.02)" : "scale(1)",
          }}
        />
      </div>

      {/* Text Content - Bottom */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "16px 16px 20px 16px",
          borderTop: `1px solid ${hovered ? "#2a2a2a" : tokens.color.cardBorder}`,
          transition: "border-color 0.5s ease",
        }}
      >
        {roleOutcome && (
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "12px",
              color: hovered ? "rgba(255, 255, 255, 0.7)" : tokens.color.muted,
              letterSpacing: tokens.tracking.tight,
              textTransform: "uppercase",
              lineHeight: tokens.leading.none,
              transition: "color 0.5s ease",
            }}
          >
            {roleOutcome}
          </span>
        )}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            fontSize: "18px",
            color: hovered ? "#ffffff" : tokens.color.body,
            lineHeight: tokens.leading.snug,
            maxWidth: "100%",
            transition: "color 0.32s ease",
          }}
        >
          {captionParts[0]}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>
            {captionItalic}
          </em>
          {captionParts[1]}
        </span>

        {metrics && metrics.length > 0 && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontWeight: tokens.weight.medium,
                    fontSize: "14px",
                    letterSpacing: tokens.tracking.tight,
                    color: hovered ? "#ffffff" : tokens.color.ink,
                    lineHeight: tokens.leading.none,
                    transition: "color 0.5s ease",
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontFamily: tokens.font.sans,
                    fontWeight: tokens.weight.regular,
                    fontSize: "12px",
                    color: hovered ? "rgba(255, 255, 255, 0.7)" : tokens.color.body,
                    lineHeight: tokens.leading.none,
                    whiteSpace: "nowrap",
                    opacity: 0.7,
                    transition: "color 0.5s ease",
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ProjectCard;
