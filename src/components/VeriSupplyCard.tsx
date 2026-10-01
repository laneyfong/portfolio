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
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (!isActive || window.innerWidth <= 768) {
      setIsDark(false);
      return;
    }

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const threshold = rect.width * 0.65;

    setIsDark(relativeX < threshold);
  };

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
      onMouseEnter={(e) => {
        setHovered(true);
        handleMouseMove(e);
      }}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        borderRadius: window.innerWidth > 768 ? 20 : 12,
        cursor: hovered ? "none" : "pointer",
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
          background: "linear-gradient(135deg, #f0f0f0 0%, #fafafa 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          flexShrink: 0,
          width: isActive && window.innerWidth > 768 ? "70%" : "100%",
          minHeight: isActive && window.innerWidth > 768 ? "600px" : "auto",
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

      {/* Custom cursor tooltip */}
      {hovered && (
        <div
          style={{
            position: "fixed",
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(10px)",
              border: isDark ? "1.5px solid rgba(255, 255, 255, 0.4)" : "1.5px solid rgba(0, 0, 0, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "4px",
              padding: "12px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "11px",
                fontWeight: tokens.weight.medium,
                color: isDark ? "white" : "#1A1A1A",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              View case study
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{ transform: "rotate(-45deg)" }}
            >
              <path
                d="M1 11L11 1M11 1H5M11 1V7"
                stroke={isDark ? "white" : "#1A1A1A"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default VeriSupplyCard;
