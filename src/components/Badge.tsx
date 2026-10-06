import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "../tokens";

interface BadgeProps {
  name?: string;
  role?: string;
  specialization?: string;
  description?: string;
  onCTAClick?: () => void;
  onHoverChange?: (isHovered: boolean) => void;
}

const Badge: FC<BadgeProps> = ({
  name = "Laney Fong",
  role = "Product Designer",
  description = "B.A. Cognitive Science @ UC Berkeley | M.S. HCI @ UCSC",
  onCTAClick,
  onHoverChange,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rearCardOffset] = useState(0);
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
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
    onHoverChange?.(false);
  };

  const hoverTilt = isHovered ? {
    tilt: Math.min(Math.max(mousePos.x / 100, -2), 2),
    tiltY: Math.min(Math.max(mousePos.y / 100, -1), 1),
  } : { tilt: 0, tiltY: 0 };

  return (
    <>
      <style>{`
        @keyframes gentleSwing {
          0%, 100% {
            transform: translateY(0px) rotateZ(-0.5deg);
          }
          50% {
            transform: translateY(-2px) rotateZ(0.5deg);
          }
        }

        .badge-hanging-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }

        .lanyard {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 60px;
          background: linear-gradient(90deg, #E94B8C 0%, #E94B8C 100%);
          clip-path: polygon(30% 0%, 70% 0%, 85% 100%, 15% 100%);
          box-shadow: inset -1px 0 2px rgba(0, 0, 0, 0.2), inset 1px 0 2px rgba(255, 255, 255, 0.2);
          z-index: 3;
        }

        .lanyard-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          font-size: 8px;
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          text-transform: uppercase;
          z-index: 4;
          pointer-events: none;
          font-family: ${tokens.font.sans};
        }

        .metal-ring {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 24px;
          border: 2px solid #B0B0B0;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%);
          box-shadow:
            inset 0 1px 3px rgba(255, 255, 255, 0.4),
            inset 0 -1px 2px rgba(0, 0, 0, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.2);
          z-index: 5;
        }

        .metal-clip {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 42px;
          height: 28px;
          background: linear-gradient(135deg, #D8D8D8 0%, #B0B0B0 50%, #909090 100%);
          border-radius: 3px 3px 8px 8px;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.25),
            inset 0 1px 2px rgba(255, 255, 255, 0.3),
            inset 0 -1px 1px rgba(0, 0, 0, 0.2);
          z-index: 6;
        }

        .clip-grip {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 3px;
          background: repeating-linear-gradient(
            90deg,
            #808080 0px,
            #808080 2px,
            #A0A0A0 2px,
            #A0A0A0 4px
          );
          border-radius: 2px;
          opacity: 0.7;
        }

        .badge-layers-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
          animation: ${prefersReducedMotion ? 'none' : 'gentleSwing 3s ease-in-out infinite'};
          overflow: hidden;
        }

        .rear-card {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(200, 150, 220, 0.4) 0%, rgba(150, 200, 220, 0.3) 50%, rgba(220, 150, 190, 0.35) 100%);
          border-radius: 16px;
          transform: rotateZ(-4deg);
          backdrop-filter: blur(2px);
          box-shadow:
            0 8px 24px rgba(150, 100, 180, 0.15),
            inset 0 1px 20px rgba(255, 200, 220, 0.2);
          border: 1px solid rgba(220, 150, 190, 0.3);
          padding: 40px 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 32px;
          overflow: hidden;
        }

        .rear-card-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .rear-card-label {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          font-weight: ${tokens.weight.medium};
          color: rgba(0, 0, 0, 0.5);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .rear-card-content {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.light};
          color: rgba(0, 0, 0, 0.7);
          line-height: 1.5;
          letter-spacing: ${tokens.tracking.tight};
        }

        .front-card {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F8 100%);
          border-radius: 16px;
          padding: 40px 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transform-style: preserve-3d;
          z-index: 10;
          cursor: pointer;
          transition: transform 0.2s ease-out;
          transform: translateY(${rearCardOffset}px);
        }

        .front-card-header {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .front-card-name {
          font-family: ${tokens.font.sans};
          font-size: 32px;
          font-weight: ${tokens.weight.medium};
          color: ${tokens.color.ink};
          line-height: 1;
          letter-spacing: ${tokens.tracking.tight};
        }

        .front-card-role {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.body};
          line-height: 1.3;
          letter-spacing: ${tokens.tracking.tight};
        }

        .front-card-description {
          font-family: ${tokens.font.sans};
          font-size: 13px;
          font-weight: ${tokens.weight.light};
          color: ${tokens.color.muted};
          line-height: 1.5;
          letter-spacing: ${tokens.tracking.tight};
          margin-top: 16px;
        }

        .front-card-detail {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #E94B8C 0%, #D73B7A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: bold;
          align-self: flex-start;
        }

        .badge-container-outer {
          position: relative;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 768px) {
          .badge-hanging-container {
            scale: 0.85;
            transform-origin: top center;
          }

          .front-card-name {
            font-size: 24px;
          }

          .front-card-role {
            font-size: 12px;
          }

          .front-card-description {
            font-size: 11px;
          }

          .front-card,
          .rear-card {
            padding: 28px 24px;
          }

          .lanyard {
            height: 50px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .badge-layers-wrapper {
            animation: none !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="badge-hanging-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onCTAClick}
        role="button"
        tabIndex={0}
        aria-label="Portfolio badge"
        style={{
          width: "clamp(240px, 26vw, 320px)",
          aspectRatio: "1 / 1.4",
          position: "relative",
        }}
      >
        {/* Lanyard */}
        <div className="lanyard">
          <div className="lanyard-text">Portfolio</div>
        </div>

        {/* Metal ring connector */}
        <div className="metal-ring" />

        {/* Metal clip */}
        <div className="metal-clip">
          <div className="clip-grip" />
        </div>

        {/* Main badge layers */}
        <div
          className="badge-layers-wrapper"
          style={{
            transform: !prefersReducedMotion && isHovered
              ? `perspective(1000px) rotateX(${hoverTilt.tiltY}deg) rotateY(${hoverTilt.tilt}deg)`
              : undefined,
          }}
        >
          {/* Rear card - visible when scrolled up */}
          <div className="rear-card" style={{ transform: `translateY(calc(100% + ${rearCardOffset}px))` }}>
            <div className="rear-card-section">
              <div className="rear-card-label">About</div>
              <div className="rear-card-content">
                I design accessible-first products that simplify complex systems through thoughtful, confident UI.
              </div>
            </div>

            <div className="rear-card-section">
              <div className="rear-card-label">Focus</div>
              <div className="rear-card-content">
                Accessibility · AI × UX · Design Systems
              </div>
            </div>

            <div className="rear-card-section">
              <div className="rear-card-label">Currently</div>
              <div className="rear-card-content">
                M.S. Human-Computer Interaction, UC Santa Cruz
              </div>
            </div>
          </div>

          {/* Front card */}
          <div className="front-card">
            <div className="front-card-header">
              <div className="front-card-name">{name}</div>
              <div className="front-card-role">{role}</div>
              <div className="front-card-description">{description}</div>
            </div>

            <div className="front-card-detail">LF</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Badge;
