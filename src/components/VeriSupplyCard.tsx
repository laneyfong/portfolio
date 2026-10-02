import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import verisupplyHero from "../assets/verisupply-hero.png";

interface VeriSupplyCardProps {
  isActive?: boolean;
}

const VeriSupplyCard: FC<VeriSupplyCardProps> = ({ isActive = false }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .verisupply-card-mobile {
            border-radius: 0 !important;
          }
          .verisupply-image-mobile {
            border-radius: 8px !important;
          }
        }
      `}</style>
      <div
        className="verisupply-card-mobile"
        role="link"
        tabIndex={0}
      onClick={(e) => {
        if (isActive) {
          e.stopPropagation();
          navigate("/verisupply");
        }
      }}
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
        className="verisupply-image-mobile"
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
          backgroundColor: "#1a1a1a",
          willChange: "opacity",
        }}
      >
        <img
          src={verisupplyHero}
          alt="VeriSupply dashboard"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Top Text Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            padding: "16px",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "11px",
              color: "white",
              letterSpacing: "0.5px",
              lineHeight: tokens.leading.none,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            B2B SaaS
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 32 32"
            style={{
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
              flexShrink: 0,
              transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
            <g>
              <path
                d="M 16 8 L 24 16 L 16 24 M 24 16 L 8 16"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
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
