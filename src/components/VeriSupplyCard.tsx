import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import verisupplyThumbnail from "../assets/verisupply-thumbnail.png";

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
      {/* Image Section */}
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
          padding: 32,
        }}
      >
        <img
          src={verisupplyThumbnail}
          alt="VeriSupply dashboard"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
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
