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
  const isDesktop = window.innerWidth > 768;

  return (
    <>
      <style>{`
        .verisupply-card-mobile {
          border-radius: ${isDesktop ? 20 : 12}px;
          cursor: pointer;
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

        .verisupply-card--inactive {
          gap: 0;
          height: auto;
          margin-top: 0;
          margin-bottom: 0;
          box-shadow: none;
          transform: translateY(0) scale(1);
        }

        .verisupply-card--active {
          gap: 32px;
          height: 600px;
          margin-top: 12px;
          margin-bottom: clamp(40px, 4vw, 80px);
          box-shadow: none;
          transform: translateY(0) scale(1);
          align-items: flex-start;
        }

        .verisupply-card--active:hover {
          transform: translateY(-4px) scale(1.01);
        }

        .verisupply-card--inactive:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .verisupply-image-mobile {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background-color: #1a1a1a;
          transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      height 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      aspect-ratio 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: filter, width, height;
        }

        .verisupply-image-mobile--inactive {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10;
          filter: grayscale(100%);
        }

        .verisupply-image-mobile--active {
          width: 70%;
          height: 100%;
          aspect-ratio: auto;
          filter: grayscale(0%);
        }

        .verisupply-image-mobile:hover {
          filter: grayscale(0%);
        }

        .verisupply-text-section {
          transition: flex 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      width 1.2s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .verisupply-text-section--inactive {
          flex: 0;
          width: 0;
          opacity: 0;
          overflow: hidden;
        }

        .verisupply-text-section--active {
          flex: 1;
          width: auto;
          opacity: 1;
          overflow: visible;
        }

        @media (max-width: 768px) {
          .verisupply-card-mobile {
            border-radius: 0 !important;
            flex-direction: column !important;
          }
          .verisupply-image-mobile {
            border-radius: 8px !important;
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 10 !important;
            filter: grayscale(100%) !important;
          }
          .verisupply-text-section {
            flex: 1 !important;
            width: auto !important;
            opacity: 1 !important;
          }
        }
      `}</style>
      <div
        className={`verisupply-card-mobile ${isActive && isDesktop ? "verisupply-card--active" : "verisupply-card--inactive"}`}
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
    >
      {/* Image Section */}
      <div
        className={`verisupply-image-mobile ${isActive && isDesktop ? "verisupply-image-mobile--active" : "verisupply-image-mobile--inactive"}`}
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

      {/* Text Section - Right Side */}
      <div
        className={`verisupply-text-section ${isActive && isDesktop ? "verisupply-text-section--active" : "verisupply-text-section--inactive"}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: isDesktop ? "0 0 0 0" : "16px 0 0 0",
          pointerEvents: isActive ? "auto" : "none",
          justifyContent: "flex-start",
          minWidth: 0,
        }}
      >
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
          Supply chain transparency
        </span>

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
          Reimagined supplier intake from 1-2 weeks to 1-2 hours. Reduced supplier data entry errors by{" "}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 500 }}>
            86%
          </em>
          .
        </span>
      </div>
    </div>
    </>
  );
};

export default VeriSupplyCard;
