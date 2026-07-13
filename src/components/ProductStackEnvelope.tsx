import type { FC } from "react";
import { useRef } from "react";
import { tokens } from "../tokens";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ProductStackItem {
  name: string;
  icon: string;
  color: string;
}

const ProductStackEnvelope: FC = () => {
  const { ref: containerRef, isVisible } = useScrollReveal();
  const svgRef = useRef<SVGSVGElement>(null);

  const stack: ProductStackItem[] = [
    {
      name: "Figma",
      icon: "◆",
      color: "#A259FF",
    },
    {
      name: "Claude",
      icon: "◈",
      color: "#FFA500",
    },
    {
      name: "Miro",
      icon: "●",
      color: "#FFD700",
    },
    {
      name: "GitHub",
      icon: "◆",
      color: "#000000",
    },
  ];


  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        padding: "60px 0",
      }}
    >
      <style>{`
        @keyframes envelopeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes logoReveal {
          from {
            opacity: 0;
            transform: translate(0, 0) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(var(--tx), var(--ty)) scale(1);
          }
        }

        .envelope-container {
          animation: ${isVisible ? "envelopeFloat 3s ease-in-out infinite" : "none"};
        }

        .logo-item {
          animation: ${isVisible ? "logoReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none"};
        }

        @media (prefers-reduced-motion: reduce) {
          .envelope-container,
          .logo-item {
            animation: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontFamily: tokens.font.sans,
            fontSize: "28px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
          }}
        >
          Tools I Design With
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: tokens.font.sans,
            fontSize: "14px",
            color: tokens.color.muted,
            opacity: 0.7,
          }}
        >
          A glimpse into my design stack
        </p>
      </div>

      {/* Envelope with SVG */}
      <div className="envelope-container" style={{ position: "relative", width: 300, height: 300 }}>
        {/* Envelope SVG */}
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          style={{
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.08))",
          }}
        >
          {/* Envelope body */}
          <rect x="10" y="30" width="80" height="50" fill="white" stroke={tokens.color.ink} strokeWidth="1.5" rx="2" />

          {/* Envelope flap */}
          <path
            d="M 10 30 L 50 55 L 90 30"
            fill="none"
            stroke={tokens.color.ink}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Left flap side */}
          <path
            d="M 10 30 L 50 55"
            fill="none"
            stroke={tokens.color.ink}
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Right flap side */}
          <path
            d="M 90 30 L 50 55"
            fill="none"
            stroke={tokens.color.ink}
            strokeWidth="1.5"
            opacity="0.5"
          />
        </svg>

        {/* Logo items positioned around envelope */}
        {stack.map((item, index) => {
          const distance = isVisible ? 120 : 20;
          const angle = [45, 135, 225, 315][index];
          const rad = (angle * Math.PI) / 180;
          const tx = distance * Math.cos(rad);
          const ty = distance * Math.sin(rad);

          return (
            <div
              key={item.name}
              className="logo-item"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 60,
                height: 60,
                marginLeft: -30,
                marginTop: -30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                border: `2px solid ${item.color}`,
                borderRadius: "12px",
                fontSize: "32px",
                fontWeight: "bold",
                color: item.color,
                transition: "all 0.3s ease",
                cursor: "pointer",
                // @ts-ignore
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
              } as React.CSSProperties}
              title={item.name}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "scale(1.15)";
                el.style.boxShadow = `0 8px 24px ${item.color}40`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "scale(1)";
                el.style.boxShadow = "none";
              }}
            >
              {item.icon}
            </div>
          );
        })}
      </div>

      {/* Stack labels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          marginTop: 20,
        }}
      >
        {stack.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: `${item.color}08`,
              border: `1px solid ${item.color}20`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      {!isVisible && (
        <div
          style={{
            fontSize: "12px",
            color: tokens.color.muted,
            opacity: 0.6,
            marginTop: 8,
          }}
        >
          ↓ Scroll to reveal
        </div>
      )}
    </div>
  );
};

export default ProductStackEnvelope;
