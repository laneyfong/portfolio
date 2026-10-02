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
  noBackground?: boolean;
  noImageRadius?: boolean;
  noImageGradient?: boolean;
  isActive?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
  screenshot,
  caption,
  captionItalic,
  layout: _layout = "portrait",
  height: _height,
  metrics,
  to,
  roleOutcome,
  darkHoverMode: _darkHoverMode = false,
  wipLabel,
  invertOnHover = false,
  hoverScreenshot,
  context,
  hoverDetails,
  noBackground = false,
  noImageRadius = false,
  noImageGradient = false,
  isActive = false,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const captionParts = caption.split(captionItalic);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .project-card-mobile {
            border-radius: 0 !important;
          }
          .project-card-image-mobile {
            border-radius: 8px !important;
          }
        }
      `}</style>
    <div
      className="project-card-mobile"
      role={to ? "link" : undefined}
      tabIndex={to ? 0 : undefined}
      onClick={(e) => {
        if (isActive && to) {
          e.stopPropagation();
          navigate(to);
        }
      }}
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
        borderRadius: window.innerWidth > 768 ? 20 : 12,
        cursor: to ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: isActive && window.innerWidth > 768 ? "row" : "column",
        transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease, outline 0.3s ease",
        transform: isActive && hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered && !isActive ? "0 12px 32px rgba(0, 0, 0, 0.15)" : "none",
        gap: isActive && window.innerWidth > 768 ? 32 : 0,
        alignItems: isActive && window.innerWidth > 768 ? "flex-start" : "stretch",
        height: isActive && window.innerWidth > 768 ? "600px" : "auto",
        marginTop: isActive ? "12px" : 0,
        marginBottom: isActive ? "clamp(40px, 4vw, 80px)" : 0,
        outline: "none",
      }}
    >
      {/* Image Section */}
      <div
        className="project-card-image-mobile"
        style={{
          position: "relative",
          aspectRatio: isActive && window.innerWidth > 768 ? undefined : "16 / 10",
          overflow: "hidden",
          borderRadius: window.innerWidth > 768 ? 20 : 0,
          backgroundColor: noBackground ? "transparent" : (noImageGradient ? "#F5F5F7" : "linear-gradient(to top, #D0D0D3 0%, #F5F5F7 100%)"),
          background: noImageGradient ? "#F5F5F7" : "linear-gradient(to top, #D0D0D3 0%, #F5F5F7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 0px",
          flexShrink: 0,
          width: isActive && window.innerWidth > 768 ? "70%" : "100%",
          height: isActive && window.innerWidth > 768 ? "100%" : "auto",
          willChange: "opacity",
          filter: isActive || hovered ? "grayscale(0%)" : "grayscale(100%)",
          transition: "filter 0.4s ease",
        }}
      >
        <img
          src={hovered && hoverScreenshot ? hoverScreenshot : screenshot}
          alt="Project screenshot"
          decoding="async"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: noImageRadius ? "0px" : "8px",
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

      {/* Text Section - Right Side (Active Only) */}
      {isActive && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: window.innerWidth > 768 ? "0 0 0 0" : "16px 0 0 0",
          pointerEvents: "none",
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        {/* Context + WIP Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          {context && (
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "12px",
                color: tokens.color.muted,
                letterSpacing: tokens.tracking.tight,
                lineHeight: tokens.leading.none,
              }}
            >
              {context}
            </span>
          )}
          {wipLabel && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px 12px",
                borderRadius: tokens.radius.full,
                backgroundColor: tokens.color.offWhite,
                border: `1px solid ${tokens.color.cardBorder}`,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "12px",
                  fontWeight: tokens.weight.medium,
                  color: tokens.color.muted,
                  letterSpacing: "0.5px",
                }}
              >
                {wipLabel}
              </span>
            </div>
          )}
        </div>

        {/* Caption */}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: "16px",
            color: tokens.color.ink,
            lineHeight: tokens.leading.snug,
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {captionParts[0]}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 500 }}>
            {captionItalic}
          </em>
          {captionParts[1]}
        </span>

        {/* Role Outcome */}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: "12px",
            color: tokens.color.muted,
            letterSpacing: tokens.tracking.tight,
            lineHeight: tokens.leading.none,
          }}
        >
          {roleOutcome}
        </span>

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
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
      </div>
      )}
    </div>
    </>
  );
};

export default ProjectCard;
