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
  noImageRadius = false,
  noImageGradient = false,
  isActive = false,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const captionParts = caption.split(captionItalic);
  const isDesktop = window.innerWidth > 768;

  return (
    <>
      <style>{`
        .project-card {
          cursor: ${to ? "pointer" : "default"};
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 16px;
          outline: none;
          padding: 14px 0;
          height: fit-content;
          opacity: ${isActive ? 1 : 0.7};
          transform: translateY(${isActive ? 0 : 20}px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover {
          opacity: 1;
        }

        .project-image {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          width: 100%;
          aspect-ratio: 16 / 10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 0px;
          flex-shrink: 0;
          background: ${noImageGradient ? "#F5F5F7" : "linear-gradient(to top, #D0D0D3 0%, #F5F5F7 100%)"};
          transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: ${isActive || hovered ? "grayscale(0%)" : "grayscale(100%)"};
        }

        .project-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: flex-start;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .project-image {
            border-radius: 8px !important;
            width: 100% !important;
            aspect-ratio: 16 / 10 !important;
          }
        }
      `}</style>

      <div
        className="project-card"
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
                  if (isActive) {
                    navigate(to);
                  }
                }
              }
            : undefined
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="project-image">
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
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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
                transition: "opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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

        {isActive && (
        <div className="project-text">
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
