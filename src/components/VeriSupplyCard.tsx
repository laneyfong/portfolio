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
        .verisupply-card {
          cursor: pointer;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          gap: 8px;
          outline: none;
          padding: 14px 0 12px 0;
          height: fit-content;
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .verisupply-card:hover {
          opacity: 1;
        }

        .verisupply-image {
          position: relative;
          overflow: hidden;
          border-radius: ${isDesktop ? 20 : 0}px;
          width: 100%;
          aspect-ratio: 4 / 3;
          flex-shrink: 0;
          background-color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: filter, box-shadow;
        }

        .verisupply-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          pointer-events: none;
          transition: background 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
          border-radius: ${isDesktop ? 20 : 0}px;
        }

        .verisupply-image.hovered {
          box-shadow: 0 0 40px rgba(64, 96, 200, 0.4), 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .verisupply-image.hovered::before {
          background: rgba(0, 0, 0, 0.4);
        }

        .verisupply-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Manrope';
          font-size: 16px;
          font-weight: 500;
          color: white;
          z-index: 10;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.05em;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .verisupply-image.hovered .verisupply-label {
          opacity: 1;
        }

        .verisupply-arrow {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .verisupply-image.hovered .verisupply-arrow {
          opacity: 0.8;
          transform: translateY(-4px);
        }

        .verisupply-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: flex-start;
        }

        @media (max-width: 768px) {
          .verisupply-image {
            border-radius: 8px !important;
          }
        }
      `}</style>

      <div
        className="verisupply-card"
        style={{
          opacity: isActive ? 1 : 0.7,
          transform: `translateY(${isActive ? 0 : 20}px)`,
        }}
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
            if (isActive) {
              navigate("/verisupply");
            }
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`verisupply-image ${hovered ? "hovered" : ""}`}>
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
                  className="verisupply-arrow"
                  style={{
                    filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4))",
                    flexShrink: 0,
                  }}
                >
                  <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="1.5" />
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

              <div className="verisupply-label">
                View Case Study
              </div>
            </div>

        <div className="verisupply-text" style={{ opacity: isActive ? 1 : 0.7 }}>
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "14px",
              color: "#BEBEBE",
              lineHeight: 1.4,
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            Reduced intake time from 1-2 weeks to{" "}
            <span style={{ fontFamily: tokens.font.sans, fontWeight: 500, color: "#111111" }}>
              1-2 hours
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default VeriSupplyCard;
