import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

interface ProjectMetric {
  value: string;
  label: string;
}

interface ProjectCardProps {
  screenshot: string;
  caption: string;
  captionItalic: string;
  layout?: "portrait" | "landscape";
  height?: number;
  metrics?: ProjectMetric[];
  to?: string;
  roleOutcome?: string;
  darkHoverMode?: boolean;
  wipLabel?: string;
  invertOnHover?: boolean;
  hoverScreenshot?: string;
  context?: string;
  hoverDetails?: string[];
}

const ProjectCard: FC<ProjectCardProps> = ({
  screenshot,
  caption,
  captionItalic,
  layout = "portrait",
  height,
  metrics,
  to,
  roleOutcome,
  darkHoverMode = false,
  wipLabel,
  invertOnHover = false,
  hoverScreenshot,
  context,
  hoverDetails,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isPortrait = layout === "portrait";
  const cardHeight = height ?? (isPortrait ? 550 : 500);

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
          height: cardHeight,
          borderRadius: 20,
          cursor: to ? "pointer" : "default",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: hovered && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
          backgroundColor: darkHoverMode && hovered ? "#111111" : tokens.color.offWhite,
          boxShadow: hovered ? "0 12px 32px rgba(0, 0, 0, 0.08)" : "0 2px 8px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          position: "relative",
          color: hovered ? "#ffffff" : tokens.color.body,
        }}
      >
        {/* Top Section: Description + View Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "16px 16px 0px 16px",
            flex: "0 0 auto",
          }}
        >
          {/* Context Label */}
          {context && (
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "11px",
                color: darkHoverMode && hovered ? "rgba(255, 255, 255, 0.6)" : tokens.color.muted,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                lineHeight: tokens.leading.none,
                transition: "color 0.32s ease",
              }}
            >
              {context}
            </span>
          )}
          {/* Description */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "16px",
                color: darkHoverMode && hovered ? "#ffffff" : tokens.color.body,
                lineHeight: tokens.leading.snug,
                flex: 1,
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

            {/* WIP Badge */}
          {wipLabel && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 12px",
                borderRadius: tokens.radius.full,
                backgroundColor: darkHoverMode && hovered ? "rgba(255, 255, 255, 0.2)" : tokens.color.offWhite,
                border: `1px solid ${darkHoverMode && hovered ? "rgba(255, 255, 255, 0.3)" : tokens.color.cardBorder}`,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "12px",
                  fontWeight: tokens.weight.medium,
                  color: darkHoverMode && hovered ? "#ffffff" : tokens.color.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  transition: "color 0.32s ease",
                }}
              >
                {wipLabel}
              </span>
            </div>
          )}

          {/* View Details Button */}
          {to && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                flexShrink: 0,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                style={{
                  transition: "all 0.22s ease",
                }}
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill={darkHoverMode && hovered ? "#ffffff" : "none"}
                  stroke={darkHoverMode && hovered ? "#ffffff" : tokens.color.body}
                  strokeWidth="1.5"
                  style={{
                    transition: "fill 0.5s ease, stroke 0.5s ease",
                  }}
                />
                <g
                  style={{
                    transform: darkHoverMode && hovered ? "rotate(-45deg)" : "rotate(0deg)",
                    transformOrigin: "16px 16px",
                    transition: "transform 0.5s ease",
                  }}
                >
                  <path
                    d="M 16 8 L 24 16 L 16 24 M 24 16 L 8 16"
                    stroke={darkHoverMode && hovered ? "#2a2a2a" : tokens.color.body}
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
          </div>
        </div>

        {/* Image Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 0px",
            margin: "24px 16px 0px 16px",
            overflow: "hidden",
            minHeight: 0,
            borderRadius: 14,
            background: "#E8E8E8",
            position: "relative",
          }}
        >
          <img
            src={hovered && hoverScreenshot ? hoverScreenshot : screenshot}
            alt="Project screenshot"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "14px",
              transition: "transform 0.22s ease, filter 0.22s ease, opacity 0.22s ease",
              transform: hovered ? "scale(1.02)" : "scale(1)",
              filter: invertOnHover && hovered ? "invert(1)" : "invert(0)",
              display: "block",
              opacity: hovered && hoverDetails ? 0.3 : 1,
            }}
          />
          {hoverDetails && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: hovered ? 1 : 0,
                visibility: hovered ? "visible" : "hidden",
                transition: "opacity 0.22s ease, visibility 0.22s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {hoverDetails.map((detail) => (
                  <div
                    key={detail}
                    style={{
                      fontFamily: tokens.font.sans,
                      fontSize: "14px",
                      fontWeight: tokens.weight.medium,
                      color: tokens.color.ink,
                      textAlign: "center",
                      maxWidth: "80%",
                    }}
                  >
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section: Category + Metrics */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "16px 16px 20px 16px",
            flexShrink: 0,
          }}
        >
          {/* Category Label */}
          {roleOutcome && (
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "12px",
                color: darkHoverMode && hovered ? "rgba(255, 255, 255, 0.7)" : tokens.color.muted,
                letterSpacing: tokens.tracking.tight,
                textTransform: "uppercase",
                lineHeight: tokens.leading.none,
                transition: "color 0.5s ease",
              }}
            >
              {roleOutcome}
            </span>
          )}

          {/* Metrics */}
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
                      color: darkHoverMode && hovered ? "#ffffff" : tokens.color.ink,
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
                      color: darkHoverMode && hovered ? "rgba(255, 255, 255, 0.7)" : tokens.color.body,
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
