import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "../tokens";
import avatarSticker from "../assets/avatar-sticker.png";

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

        @keyframes rearCardDrift {
          0%, 100% {
            transform: rotateZ(-4deg) translateX(0px) translateY(0px);
          }
          33% {
            transform: rotateZ(-3.5deg) translateX(1px) translateY(-1px);
          }
          66% {
            transform: rotateZ(-4.5deg) translateX(-1px) translateY(1px);
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
        }

        .rear-card {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(200, 150, 220, 0.4) 0%, rgba(150, 200, 220, 0.3) 50%, rgba(220, 150, 190, 0.35) 100%);
          border-radius: 16px;
          transform: ${`rotateZ(-4deg) translateX(8px) translateY(6px)`};
          animation: ${prefersReducedMotion ? 'none' : 'rearCardDrift 4s ease-in-out infinite'};
          backdrop-filter: blur(2px);
          box-shadow:
            0 8px 24px rgba(150, 100, 180, 0.15),
            inset 0 1px 20px rgba(255, 200, 220, 0.2);
          border: 1px solid rgba(220, 150, 190, 0.3);
        }

        .rear-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 70% 70%, rgba(220, 150, 190, 0.25) 0%, rgba(150, 180, 220, 0.15) 40%, transparent 70%);
          border-radius: 16px;
          pointer-events: none;
        }

        .front-card {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F8 100%);
          border-radius: 16px;
          padding: 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transform-style: preserve-3d;
          z-index: 10;
          cursor: pointer;
          transition: transform 0.2s ease-out;
        }

        .front-card:hover {
          transform: translateY(-1px);
        }

        .avatar-area {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 12px;
          background: linear-gradient(135deg, #F0E6FF 0%, #E6F0FF 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .avatar-area img {
          width: 70%;
          height: 70%;
          object-fit: contain;
        }

        .badge-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .badge-name {
          font-family: ${tokens.font.sans};
          font-size: 18px;
          font-weight: ${tokens.weight.medium};
          color: ${tokens.color.ink};
          line-height: 1.1;
          letter-spacing: ${tokens.tracking.tight};
        }

        .badge-role {
          font-family: ${tokens.font.sans};
          font-size: 13px;
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.body};
          line-height: 1.3;
          letter-spacing: ${tokens.tracking.tight};
        }

        .badge-description {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          font-weight: ${tokens.weight.light};
          color: ${tokens.color.muted};
          line-height: 1.4;
          letter-spacing: ${tokens.tracking.tight};
        }

        .logo-accent {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: linear-gradient(135deg, #E94B8C 0%, #D73B7A 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: bold;
          align-self: flex-start;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .badge-hanging-container {
            scale: 0.85;
            transform-origin: top center;
          }

          .badge-name {
            font-size: 16px;
          }

          .badge-role {
            font-size: 12px;
          }

          .badge-description {
            font-size: 11px;
          }

          .lanyard {
            height: 50px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .badge-layers-wrapper {
            animation: none !important;
          }

          .rear-card {
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
          {/* Rear translucent card */}
          <div className="rear-card">
            <div className="rear-card-glow" />
          </div>

          {/* Front white card */}
          <div className="front-card">
            {/* Avatar area */}
            <div className="avatar-area">
              <img src={avatarSticker} alt={name} />
            </div>

            {/* Badge info */}
            <div className="badge-info">
              <div className="badge-name">{name}</div>
              <div className="badge-role">{role}</div>
              <div className="badge-description">{description}</div>
            </div>

            {/* Logo accent */}
            <div className="logo-accent">LF</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Badge;
