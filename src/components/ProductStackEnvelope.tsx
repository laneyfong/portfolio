import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ToolCard {
  name: string;
  symbol: string;
  description: string;
  color: string;
}

const ProductStackEnvelope: FC = () => {
  const { ref: containerRef, isVisible } = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tools: ToolCard[] = [
    {
      name: "Figma",
      symbol: "◆",
      description: "Design Systems & Prototyping",
      color: "#A259FF",
    },
    {
      name: "Claude",
      symbol: "◈",
      description: "AI Collaboration & Rapid Ideation",
      color: "#FF9500",
    },
    {
      name: "Miro",
      symbol: "●",
      description: "Research & Journey Mapping",
      color: "#FFD700",
    },
    {
      name: "GitHub",
      symbol: "◆",
      description: "Version Control & Development",
      color: "#111111",
    },
  ];

  // Calculate stagger offset and fan angle for each card
  const getCardStyle = (index: number) => {
    const baseOffsetY = isVisible ? -240 : 0; // How far up they travel
    const staggerDelay = index * 0.12; // 120ms stagger
    const fanAngle = (index - 1.5) * 8; // Slight fan effect (-12, -4, 4, 12 degrees)
    const horizontalShift = (index - 1.5) * 16; // Slight horizontal spread
    const stackOffset = index * 12; // Initial stacked offset

    return {
      transform: isVisible
        ? `translateY(${baseOffsetY}px) translateX(${horizontalShift}px) rotateZ(${fanAngle * 0.3}deg)`
        : `translateY(0) translateX(${stackOffset}px)`,
      transitionDelay: isVisible ? `${staggerDelay}s` : "0s",
      zIndex: tools.length - index,
    };
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 64,
        padding: "80px 0",
      }}
    >
      <style>{`
        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(0) translateX(var(--sx, 0));
          }
          to {
            opacity: 1;
            transform: translateY(var(--ty, 0)) translateX(var(--tx, 0)) rotateZ(var(--r, 0deg));
          }
        }

        .tool-card {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          ${isVisible ? "animation: cardReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;" : ""}
        }

        .envelope-container {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .tool-card,
          .envelope-container {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", maxWidth: 600 }}>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontFamily: tokens.font.sans,
            fontSize: "32px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
            letterSpacing: "-0.5px",
          }}
        >
          My Product Stack
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: tokens.font.sans,
            fontSize: "16px",
            color: tokens.color.body,
            lineHeight: "1.6",
            opacity: 0.7,
          }}
        >
          The essential tools that power my design process. Scroll to discover what's inside.
        </p>
      </div>

      {/* Premium Envelope Container */}
      <div
        className="envelope-container"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 500,
          height: 320,
          backgroundColor: "white",
          borderRadius: 16,
          border: "1px solid rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          background: "linear-gradient(135deg, #fafafa 0%, #ffffff 100%)",
        }}
      >
        {/* Envelope subtle texture/detail */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.01) 2px, rgba(0,0,0,.01) 4px)",
            pointerEvents: "none",
          }}
        />

        {/* Tool Cards Stack */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0 32px 32px",
            perspective: "1000px",
          }}
        >
          {tools.map((tool, index) => {
            const cardStyle = getCardStyle(index);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={tool.name}
                className="tool-card"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: 280,
                  padding: 24,
                  borderRadius: 12,
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  boxShadow: isHovered
                    ? "0 12px 32px rgba(0, 0, 0, 0.12)"
                    : "0 4px 12px rgba(0, 0, 0, 0.06)",
                  transform: cardStyle.transform as string,
                  transitionDelay: cardStyle.transitionDelay as string,
                  zIndex: cardStyle.zIndex,
                  cursor: "pointer",
                  backgroundColor: isHovered ? "rgba(245, 245, 245, 0.5)" : "white",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Tool Symbol/Logo Area */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `${tool.color}12`,
                    borderRadius: 8,
                    fontSize: 24,
                    fontWeight: "bold",
                    color: tool.color,
                    marginBottom: 16,
                    transition: "all 0.3s ease",
                  }}
                >
                  {tool.symbol}
                </div>

                {/* Tool Name */}
                <h3
                  style={{
                    margin: "0 0 6px 0",
                    fontFamily: tokens.font.sans,
                    fontSize: "16px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.ink,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {tool.name}
                </h3>

                {/* Tool Description */}
                <p
                  style={{
                    margin: 0,
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    color: tokens.color.body,
                    opacity: 0.65,
                    lineHeight: "1.5",
                  }}
                >
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Card Peek Indicator (before scroll) */}
        {!isVisible && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "20%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
              pointerEvents: "none",
              opacity: 0.6,
            }}
          />
        )}
      </div>

      {/* Scroll Hint */}
      {!isVisible && (
        <div
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: tokens.color.muted,
            opacity: 0.5,
            transition: "opacity 0.6s ease",
          }}
        >
          ↓ Keep scrolling to reveal
        </div>
      )}
    </div>
  );
};

export default ProductStackEnvelope;
