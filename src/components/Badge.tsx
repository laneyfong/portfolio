import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "../tokens";
import BadgeGradient from "./BadgeGradient";

interface BadgeProps {
  name?: string;
  role?: string;
  onCTAClick?: () => void;
  onHoverChange?: (isHovered: boolean) => void;
}

const Badge: FC<BadgeProps> = ({
  name = "Laney Fong",
  role = "Product Designer",
  onCTAClick,
  onHoverChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rearCardVisible, setRearCardVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || prefersReducedMotion) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setRearCardVisible(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRearCardVisible(false);
    setMousePos({ x: 0, y: 0 });
    onHoverChange?.(false);
  };

  const hoverTilt = isHovered && !prefersReducedMotion ? {
    tilt: Math.min(Math.max(mousePos.x / 120, -1.5), 1.5),
    tiltY: Math.min(Math.max(mousePos.y / 120, -0.8), 0.8),
  } : { tilt: 0, tiltY: 0 };

  return (
    <>
      <style>{`
        @keyframes gentleSwing {
          0%, 100% {
            transform: translateY(0px) rotateZ(-0.3deg);
          }
          50% {
            transform: translateY(-1.5px) rotateZ(0.3deg);
          }
        }

        .badge-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1200px;
        }

        .lanyard {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 50px;
          background: linear-gradient(90deg, #E84E8A 0%, #E84E8A 100%);
          clip-path: polygon(20% 0%, 80% 0%, 90% 100%, 10% 100%);
          box-shadow: inset -0.5px 0 1px rgba(0, 0, 0, 0.15), inset 0.5px 0 1px rgba(255, 255, 255, 0.2);
          z-index: 20;
        }

        .lanyard-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 7px;
          color: white;
          font-weight: 600;
          letter-spacing: 0.8px;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          text-transform: uppercase;
          z-index: 21;
          pointer-events: none;
          font-family: ${tokens.font.sans};
          white-space: nowrap;
        }

        .metal-ring {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 20px;
          border: 1.5px solid #A8A8A8;
          border-radius: 50%;
          background: linear-gradient(180deg, #E0E0E0 0%, #C0C0C0 50%, #A0A0A0 100%);
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.5),
            inset 0 -0.5px 1px rgba(0, 0, 0, 0.3),
            0 1.5px 3px rgba(0, 0, 0, 0.2);
          z-index: 25;
        }

        .metal-clip {
          position: absolute;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: 38px;
          height: 24px;
          background: linear-gradient(180deg, #D0D0D0 0%, #A8A8A8 50%, #888888 100%);
          border-radius: 2px 2px 6px 6px;
          box-shadow:
            0 1.5px 4px rgba(0, 0, 0, 0.25),
            inset 0 0.5px 1.5px rgba(255, 255, 255, 0.3),
            inset 0 -0.5px 1px rgba(0, 0, 0, 0.15);
          z-index: 26;
        }

        .clip-grip {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 2.5px;
          background: repeating-linear-gradient(
            90deg,
            #707070 0px,
            #707070 1.5px,
            #989898 1.5px,
            #989898 3px
          );
          border-radius: 1px;
          opacity: 0.8;
        }

        .badge-layers-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: ${prefersReducedMotion ? 'none' : 'gentleSwing 4s ease-in-out infinite'};
        }

        .rear-card {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(250, 247, 242, 0.85) 0%, rgba(217, 119, 87, 0.85) 100%);
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow:
            0 6px 20px rgba(0, 0, 0, 0.12),
            inset 0 1px 15px rgba(255, 255, 255, 0.2);
          transform: ${rearCardVisible ? 'translate(14px, 85px) rotateZ(-3.5deg)' : 'translate(14px, 12px) rotateZ(-3.5deg)'};
          backdrop-filter: blur(1.5px);
          padding: 36px 28px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: space-between;
          opacity: ${rearCardVisible ? 1 : 0.3};
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out;
          z-index: 5;
        }

        .rear-card-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .rear-card-label {
          font-family: ${tokens.font.sans};
          font-size: 10px;
          font-weight: ${tokens.weight.medium};
          color: rgba(0, 0, 0, 0.45);
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .rear-card-text {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          font-weight: ${tokens.weight.light};
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.4;
        }

        .front-card {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #FAF7F2 0%, #D97757 100%);
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.3);
          padding: 28px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 30;
          transform-style: preserve-3d;
          cursor: pointer;
          overflow: hidden;
        }

        .front-card-clip-area {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 16px;
          background: linear-gradient(180deg, #ECECEC 0%, #E0E0E0 100%);
          border-radius: 50% 50% 0 0;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: none;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.6);
          z-index: 28;
        }

        .front-card-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 4px;
        }

        .front-card-name {
          font-family: ${tokens.font.sans};
          font-size: 28px;
          font-weight: ${tokens.weight.medium};
          color: ${tokens.color.ink};
          line-height: 1.05;
          letter-spacing: -0.2px;
          margin: 0;
        }

        .front-card-role {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          font-weight: ${tokens.weight.regular};
          color: #666666;
          line-height: 1.3;
          letter-spacing: ${tokens.tracking.tight};
          margin: 0;
        }

        .front-card-detail {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #E84E8A 0%, #D63B78 100%);
          border-radius: 3px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 2px;
          padding: 3px;
          box-sizing: border-box;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .detail-square {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 1px;
        }

        .badge-hanging-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.25s ease-out;
        }

        @media (max-width: 768px) {
          .badge-container {
            scale: 0.8;
            transform-origin: top center;
          }

          .front-card-name {
            font-size: 20px;
          }

          .front-card-role {
            font-size: 11px;
          }

          .lanyard {
            height: 40px;
            top: -40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .badge-layers-wrapper {
            animation: none !important;
          }

          .rear-card {
            opacity: 0.3 !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="badge-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onCTAClick}
        role="button"
        tabIndex={0}
        aria-label="Portfolio badge"
        style={{
          width: "clamp(220px, 24vw, 300px)",
          aspectRatio: "0.68",
          position: "relative",
        }}
      >
        {/* Animated shader gradient background */}
        <BadgeGradient />

        {/* Lanyard */}
        <div className="lanyard">
          <div className="lanyard-text">Portfolio</div>
        </div>

        {/* Metal ring */}
        <div className="metal-ring" />

        {/* Metal clip */}
        <div className="metal-clip">
          <div className="clip-grip" />
        </div>

        {/* Main wrapper with tilt */}
        <div
          className="badge-hanging-wrapper"
          style={{
            transform: !prefersReducedMotion && isHovered
              ? `perspective(1200px) rotateX(${hoverTilt.tiltY * 0.6}deg) rotateY(${hoverTilt.tilt * 0.6}deg)`
              : 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
          }}
        >
          {/* Layers */}
          <div className="badge-layers-wrapper">
            {/* Rear translucent card */}
            <div className="rear-card">
              <div className="rear-card-section">
                <div className="rear-card-label">About</div>
                <div className="rear-card-text">
                  Designing accessible-first products that simplify complex systems.
                </div>
              </div>

              <div className="rear-card-section">
                <div className="rear-card-label">Focus</div>
                <div className="rear-card-text">
                  Accessibility · AI × UX · Design Systems
                </div>
              </div>

              <button
                onClick={onCTAClick}
                style={{
                  background: 'linear-gradient(135deg, #E84E8A 0%, #D63B78 100%)',
                  border: 'none',
                  color: 'white',
                  fontFamily: tokens.font.sans,
                  fontSize: '12px',
                  fontWeight: tokens.weight.medium,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginTop: '8px',
                  boxShadow: '0 2px 8px rgba(232, 78, 138, 0.25)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(232, 78, 138, 0.35)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(232, 78, 138, 0.25)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                Learn More
              </button>
            </div>

            {/* Front white card */}
            <div className="front-card">
              <div className="front-card-clip-area" />

              <div className="front-card-header">
                <h2 className="front-card-name">{name}</h2>
                <p className="front-card-role">{role}</p>
              </div>

              <div className="front-card-detail">
                <div className="detail-square" />
                <div className="detail-square" />
                <div className="detail-square" />
                <div className="detail-square" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Badge;
