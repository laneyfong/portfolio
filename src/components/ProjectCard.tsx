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
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isPortrait = layout === "portrait";
  const cardHeight = height ?? (isPortrait ? 550 : 500);
  const imageHeight = isPortrait ? 280 : 240;

  const captionParts = caption.split(captionItalic);

  return (
    <div
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
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? tokens.shadow.subtle : "none",
        backgroundColor: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        overflow: "hidden",
        position: "relative",
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
          borderTop: `1px solid ${tokens.color.cardBorder}`,
        }}
      >
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            fontSize: "14px",
            color: tokens.color.body,
            lineHeight: tokens.leading.snug,
            maxWidth: "100%",
          }}
        >
          {captionParts[0]}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>
            {captionItalic}
          </em>
          {captionParts[1]}
        </span>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
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
                      color: tokens.color.ink,
                      lineHeight: tokens.leading.none,
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
                      color: tokens.color.body,
                      lineHeight: tokens.leading.none,
                      whiteSpace: "nowrap",
                      opacity: 0.7,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {to && (
            <div
              style={{
                opacity: hovered ? 1 : 0.4,
                transition: "opacity 0.22s ease, transform 0.22s ease",
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 8.271 8.974" fill={tokens.color.body}>
                <path
                  d="M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z"
                  fillRule="nonzero"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
