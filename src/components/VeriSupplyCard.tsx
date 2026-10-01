import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import verisupplyHero from "../assets/verisupply-hero.png";

interface VeriSupplyCardProps {
  isActive?: boolean;
}

const VeriSupplyCard: FC<VeriSupplyCardProps> = ({ isActive = true }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        .verisupply-img { transition: opacity 1.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
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
        borderRadius: window.innerWidth > 768 ? 20 : 12,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: isActive && window.innerWidth > 768 ? "row" : "column",
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        gap: isActive && window.innerWidth > 768 ? 32 : 0,
        alignItems: isActive && window.innerWidth > 768 ? "flex-start" : "stretch",
        minHeight: isActive && window.innerWidth > 768 ? "600px" : "auto",
        height: isActive && window.innerWidth > 768 ? "600px" : "auto",
        marginTop: isActive ? "clamp(40px, 4vw, 80px)" : 0,
        marginBottom: isActive ? "clamp(40px, 4vw, 80px)" : 0,
        outline: "none",
      }}
    >
      {/* Image Section */}
      <div
        style={{
          position: "relative",
          aspectRatio: isActive ? "16 / 10" : "16 / 10",
          overflow: "hidden",
          borderRadius: window.innerWidth > 768 ? 20 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          width: isActive && window.innerWidth > 768 ? "70%" : "100%",
          minHeight: isActive && window.innerWidth > 768 ? "600px" : "auto",
        }}
      >
        <img
          className="verisupply-img"
          src={verisupplyHero}
          alt="VeriSupply dashboard"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: isActive ? 1 : 0.9,
          }}
        />
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
        {/* Context */}
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
            lineHeight: tokens.leading.none,
          }}
        >
          Product Design × AI/ML × Supply Chain
        </span>
      </div>
      )}
    </div>
    </>
  );
};

export default VeriSupplyCard;
