import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

interface VeriSupplyCardProps {
  isActive?: boolean;
}

const VeriSupplyCard: FC<VeriSupplyCardProps> = ({ isActive = true }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate("/verisupply")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate("/verisupply");
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 20,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
      }}
    >
      {/* Image Section with gradient background */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          overflow: "hidden",
          borderRadius: 20,
          background: "linear-gradient(135deg, #f0f0f0 0%, #fafafa 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 0px",
        }}
      >
        {/* Lock Icon */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            style={{
              opacity: 0.6,
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
            }}
          >
            <g stroke={tokens.color.ink} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 22 L 10 36 Q 10 38 12 38 L 36 38 Q 38 38 38 36 L 38 22" />
              <rect x="14" y="18" width="20" height="10" rx="2" />
              <path d="M 24 26 L 24 30" />
              <circle cx="24" cy="33" r="1" fill={tokens.color.ink} />
            </g>
          </svg>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.sm,
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
                margin: 0,
                opacity: 0.7,
              }}
            >
              Confidential
            </p>
            <p
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.sm,
                color: tokens.color.muted,
                margin: "4px 0 0",
              }}
            >
              Password required
            </p>
          </div>
        </div>
      </div>

      {/* Text Section Below Image */}
      <div
        style={{
          display: isActive ? "flex" : "none",
          flexDirection: "column",
          gap: 12,
          padding: "18px 0",
          pointerEvents: "none",
        }}
      >
        {/* Context */}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: "12px",
            color: tokens.color.muted,
            letterSpacing: tokens.tracking.tight,
            textTransform: "uppercase",
            lineHeight: tokens.leading.none,
          }}
        >
          B2B SaaS
        </span>

        {/* Caption */}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: "16px",
            color: tokens.color.ink,
            lineHeight: tokens.leading.snug,
          }}
        >
          Turn supply-chain complexity into <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 500 }}>confident decisions</em>.
        </span>

        {/* Role Outcome */}
        <span
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: "12px",
            color: tokens.color.muted,
            letterSpacing: tokens.tracking.tight,
            textTransform: "uppercase",
            lineHeight: tokens.leading.none,
          }}
        >
          Product Design × AI/ML × Supply Chain
        </span>
      </div>
    </div>
  );
};

export default VeriSupplyCard;
