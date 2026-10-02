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
        .project-card-mobile {
          border-radius: ${isDesktop ? 20 : 12}px;
          cursor: ${to ? "pointer" : "default"};
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          transition: height 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      gap 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      margin-top 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      margin-bottom 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .project-card--inactive {
          gap: 0;
          height: auto;
          margin-top: 0;
          margin-bottom: 0;
          box-shadow: none;
          transform: translateY(0) scale(1);
        }

        .project-card--active {
          gap: 32px;
          height: 600px;
          margin-top: 12px;
          margin-bottom: clamp(40px, 4vw, 80px);
          box-shadow: none;
          transform: translateY(0) scale(1);
          align-items: flex-start;
        }

        .project-card--active:hover {
          transform: translateY(-4px) scale(1.01);
        }

        .project-card--inactive:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .project-card-text-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
          flex: 1;
          justify-content: flex-start;
          white-space: nowrap;
          overflow: hidden;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card-text-section--inactive {
          transform: translateX(20px);
          opacity: 0;
          pointer-events: none;
        }

        .project-card-text-section--active {
          transform: translateX(0);
          opacity: 1;
          pointer-events: auto;
        }

        .project-card-image-mobile {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 0px;
          flex-shrink: 0;
          background: ${noImageGradient ? "#F5F5F7" : "linear-gradient(to top, #D0D0D3 0%, #F5F5F7 100%)"};
          border-radius: ${isDesktop ? 20 : 0}px;
          transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      height 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      aspect-ratio 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: filter, width, height;
        }

        .project-card-image-mobile--inactive {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10;
          filter: grayscale(100%);
        }

        .project-card-image-mobile--active {
          width: 70%;
          height: 100%;
          aspect-ratio: auto;
          filter: grayscale(0%);
        }

        .project-card-image-mobile:hover {
          filter: grayscale(0%);
        }

        .project-card-text-section {
          transition: flex 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      width 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card-text-section--inactive {
          flex: 0;
          width: 0;
          opacity: 0;
          overflow: hidden;
        }

        .project-card-text-section--active {
          flex: 1;
          width: auto;
          opacity: 1;
          overflow: visible;
        }

        @media (max-width: 768px) {
          .project-card-mobile {
            border-radius: 0 !important;
            flex-direction: column !important;
          }
          .project-card-image-mobile {
            border-radius: 8px !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 10 !important;
          }
          .project-card-image-mobile--active {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 10 !important;
            filter: grayscale(100%) !important;
          }
          .project-card-text-section {
            flex: 1 !important;
            width: auto !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    <div
      className={`project-card-mobile ${isActive && isDesktop ? "project-card--active" : "project-card--inactive"}`}
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
    >
      {/* Image Section */}
      <div
        className={`project-card-image-mobile ${isActive && isDesktop ? "project-card-image-mobile--active" : "project-card-image-mobile--inactive"}`}
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

      {/* Text Section - Right Side */}
      <div
        className={`project-card-text-section ${isActive && isDesktop ? "project-card-text-section--active" : "project-card-text-section--inactive"}`}
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
    </div>
    </>
  );
};

export default ProjectCard;
