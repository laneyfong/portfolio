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
  const cardHeight = height ?? (isPortrait ? 717 : 506);

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
        position: "relative",
        width: "100%",
        height: cardHeight,
        borderRadius: tokens.radius.sm,
        cursor: to ? "pointer" : "default",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        // box-shadow lives on this outer, overflow-visible box so the glow ring isn't clipped
        // by the inner content's overflow:hidden (needed for the rounded screenshot corners).
        boxShadow: hovered ? `${tokens.shadow.cardGlowHover}, ${tokens.shadow.subtle}` : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: tokens.color.offWhite,
          borderRadius: tokens.radius.sm,
          border: `1px solid ${tokens.color.cardBorder}`,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <img
          src={logo}
          alt={logoAlt}
          style={{
            position: "absolute",
            top: 27,
            left: 23,
            height: logoHeight,
            width: "auto",
            objectFit: "contain",
          }}
        />

        <div
          style={{
            position: "absolute",
            ...(isPortrait
              ? {
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: 84,
                  width: "min(233px, calc(100% - 48px))",
                  height: 518,
                  borderRadius: 30,
                }
              : {
                  right: 27,
                  top: 27,
                  width: "58%",
                  height: "calc(100% - 54px)",
                  borderRadius: 16,
                }),
            backgroundImage: `url(${screenshot})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            boxShadow: tokens.shadow.card,
            transition: "transform 0.22s ease",
            ...(hovered ? { transform: isPortrait ? "translateX(-50%) translateY(-4px)" : "translateY(-4px)" } : {}),
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: isPortrait ? 36 : 80,
            left: 23,
            width: 267,
            maxWidth: "calc(100% - 46px)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: tokens.text.md,
              color: tokens.color.body,
              lineHeight: tokens.leading.snug,
            }}
          >
            {captionParts[0]}
            <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>
              {captionItalic}
            </em>
            {captionParts[1]}
          </span>

          {metrics && metrics.length > 0 && (
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div
                    style={{
                      fontFamily: tokens.font.sans,
                      fontWeight: tokens.weight.medium,
                      fontSize: tokens.text.lg,
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
                      fontSize: tokens.text.sm,
                      color: tokens.color.body,
                      lineHeight: tokens.leading.none,
                      whiteSpace: "nowrap",
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
    </div>
  );
};

export default ProjectCard;
