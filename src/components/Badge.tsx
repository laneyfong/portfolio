import type { FC } from "react";
import { useState, useEffect } from "react";
import { tokens } from "../tokens";
import avatarSticker from "../assets/avatar-sticker.png";

interface BadgeProps {
  name?: string;
  role?: string;
  specialization?: string;
  location?: string;
  description?: string;
  photo?: string;
  onCTAClick?: () => void;
  onFlipChange?: (isFlipped: boolean) => void;
  onHoverChange?: (isHovered: boolean) => void;
  externalIsFlipped?: boolean;
}

const Badge: FC<BadgeProps> = ({
  name = "Laney Fong",
  role = "Product Designer",
  location = "San Francisco Bay Area",
  description = "B.A. Cognitive Science @ UC Berkeley | M.S. HCI @ UCSC",
  photo,
  onCTAClick,
  onFlipChange,
  onHoverChange,
  externalIsFlipped,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // Use external state if provided, otherwise use internal state
  const displayFlipped = externalIsFlipped !== undefined ? externalIsFlipped : isFlipped;

  useEffect(() => {
    if (isHovered) {
      setShowSparkle(true);
      const timer = setTimeout(() => setShowSparkle(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowSparkle(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    onFlipChange?.(newFlipped);
  };

  // Dot pattern for badge accent
  const DotPattern = () => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }} aria-hidden>
      {/* Outer ring dots */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 28 * Math.cos(rad);
        const y = 50 + 28 * Math.sin(rad);
        return <circle key={`outer-${angle}`} cx={x} cy={y} r="2.5" fill="#000" />;
      })}

      {/* Middle ring dots */}
      {[30, 90, 150, 210, 270, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 18 * Math.cos(rad);
        const y = 50 + 18 * Math.sin(rad);
        return <circle key={`mid-${angle}`} cx={x} cy={y} r="1.8" fill="#000" />;
      })}

      {/* Center dot */}
      <circle cx="50" cy="50" r="5" fill="#000" />
    </svg>
  );

  return (
    <div
      className="badge-container"
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleFlip();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label="Click or press Enter to flip card"
      style={{
        width: "clamp(235px, 24vw, 360px)",
        aspectRatio: "2.125 / 3.370",
        perspective: "1200px",
        fontFamily: tokens.font.sans,
        cursor: "pointer",
        position: "relative",
        outline: "none",
      }}
    >
      <div
        className="badge-flip-inner"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: displayFlipped
            ? "rotateY(180deg)"
            : isHovered
            ? "rotateY(10deg)"
            : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="badge-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F8F8FA 100%)",
            borderRadius: "24px",
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "16px 16px 24px 16px",
            boxSizing: "border-box",
            overflow: "visible",
          }}
        >
      <style>{`
        @keyframes lightFieldShift {
          0% {
            background-position: 0% 0%, 100% 100%;
          }
          25% {
            background-position: 25% 25%, 75% 75%;
          }
          50% {
            background-position: 50% 50%, 50% 50%;
          }
          75% {
            background-position: 75% 75%, 25% 25%;
          }
          100% {
            background-position: 0% 0%, 100% 100%;
          }
        }

        @keyframes refractionSweep {
          0% {
            opacity: 0;
            transform: translateX(-100%) translateY(-100%);
          }
          10% {
            opacity: 0.08;
          }
          50% {
            opacity: 0.08;
            transform: translateX(100%) translateY(100%);
          }
          90% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: translateX(100%) translateY(100%);
          }
        }

        @keyframes sparkleFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
        }

        .sparkle {
          animation: sparkleFloat 2s ease-out forwards;
        }

        @keyframes textureFlow {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(3px, -4px) scale(1.02); }
          50% { transform: translate(-2px, 3px) scale(0.99); }
          75% { transform: translate(2px, -2px) scale(1.01); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes lightShift {
          0% { transform: translate(-15%, -15%) scale(1.2); }
          33% { transform: translate(10%, 5%) scale(1.1); }
          66% { transform: translate(-5%, 12%) scale(1.15); }
          100% { transform: translate(-15%, -15%) scale(1.2); }
        }

        .liquid-avatar-bg {
          position: relative;
        }

        .material-texture {
          animation: textureFlow 26s ease-in-out infinite;
          opacity: 0.95;
        }

        .subtle-light {
          animation: lightShift 32s ease-in-out infinite;
          mix-blend-mode: screen;
          opacity: 0.6;
        }

        @media (prefers-reduced-motion: reduce) {
          .material-texture,
          .subtle-light {
            animation: none !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .badge-container {
            width: clamp(280px, 28vw, 420px) !important;
          }
        }
        @media (max-width: 768px) {
          .badge-container {
            width: clamp(180px, 70vw, 300px) !important;
          }
          .badge-flip-inner {
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
          }
          .badge-front, .badge-back {
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
          }
          .badge-front h2 {
            font-size: 16px !important;
          }
          .badge-front p {
            font-size: 14px !important;
          }
          .badge-front p:last-child {
            font-size: 13px !important;
          }
          .badge-back-value {
            font-size: 14px !important;
          }
          .badge-back-label {
            font-size: 11px !important;
          }
          .badge-container button {
            min-height: 48px !important;
            min-width: 48px !important;
          }
        }
        @media (max-width: 640px) {
          .badge-container {
            width: clamp(160px, 75vw, 260px) !important;
          }
          .badge-front, .badge-back {
            padding: 12px 12px 18px 12px !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
          }
          .badge-front h2 {
            font-size: 14px !important;
          }
          .badge-front p {
            font-size: 13px !important;
          }
          .badge-front p:last-child {
            font-size: 12px !important;
          }
          .badge-back-value {
            font-size: 12px !important;
          }
          .badge-back-label {
            font-size: 10px !important;
          }
          .badge-container button {
            min-height: 44px !important;
            min-width: 44px !important;
            padding: 12px !important;
          }
        }
      `}</style>

          {/* FRONT: Accent area with liquid iridescent effect */}
          <div
            className="liquid-avatar-bg"
            style={{
              flex: 1,
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              marginBottom: "16px",
              background: "linear-gradient(135deg, #4B63B5, #6B7FCF)",
            }}
          >
            {/* Subtle animated texture deformation layer */}
            <svg
              className="material-texture"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <defs>
                <filter id="subtleMarble">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="12"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
              <rect width="100" height="100" fill="#4B63B5" filter="url(#subtleMarble)" />
            </svg>

            {/* Very subtle light shift layer - only grayscale, no color */}
            <svg
              className="subtle-light"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <defs>
                <radialGradient id="softLight" cx="40%" cy="40%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
                  <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.01" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#softLight)" />
            </svg>

            {/* Fine grain texture overlay - subtle film grain */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='finegrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='12' numOctaves='3' result='noise' seed='5' /%3E%3C/filter%3E%3Crect width='300' height='300' fill='%23000' filter='url(%23finegrain)' opacity='0.04'/%3E%3C/svg%3E")
                `,
                backgroundSize: "150px 150px",
                pointerEvents: "none",
                zIndex: 8,
              }}
            />

            {/* Avatar sticker */}
            <img
              src={avatarSticker}
              alt="Avatar"
              style={{
                width: "75%",
                height: "75%",
                objectFit: "contain",
                position: "relative",
                zIndex: 3,
              }}
            />

            {/* Photo/Image fallback */}
            {photo && (
              <img
                src={photo}
                alt={name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "absolute",
                  zIndex: 1,
                }}
              />
            )}

            {/* Dot pattern when no photo */}
            {!photo && <div style={{ position: "absolute", zIndex: 1 }}><DotPattern /></div>}
          </div>


          {/* Bottom info section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <h2
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "18px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.ink,
                lineHeight: 1.2,
              }}
            >
              {name}
            </h2>

            <p
              style={{
                margin: "-2px 0 0 0",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "16px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.body,
                lineHeight: 1.5,
              }}
            >
              {role}
            </p>

            <p
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "14px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.body,
                lineHeight: 1.6,
              }}
            >
              Designing accessible-first products 0→1 with confident, polished UI
            </p>

            <p
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "14px",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.muted,
                lineHeight: 1.4,
                textAlign: "center",
              }}
            >
              ↻ Flip to explore
            </p>

            {/* Sparkle emoji - only on front */}
            {showSparkle && (
              <div
                className="sparkle"
                style={{
                  position: "absolute",
                  top: "20%",
                  right: "10%",
                  fontSize: "32px",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              >
                ✨
              </div>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="badge-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F8F8FA 100%)",
            borderRadius: "20px",
            boxShadow: "0 10px 28px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            padding: "66px 20px 16px 20px",
            boxSizing: "border-box",
            transform: "rotateY(180deg)",
            overflowY: "auto",
          }}
        >
          {/* BACK: Location, Background, Design Philosophy */}
          <div
            className="badge-back-section"
            style={{
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: `1px solid rgba(0, 0, 0, 0.06)`,
            }}
          >
            <div
              className="badge-back-label"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "11px",
                color: tokens.color.muted,
                lineHeight: 1.3,
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Location
            </div>
            <div
              className="badge-back-value"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "16px",
                color: tokens.color.body,
                lineHeight: 1.5,
              }}
            >
              {location}
            </div>
          </div>

          <div
            className="badge-back-section"
            style={{
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: `1px solid rgba(0, 0, 0, 0.06)`,
            }}
          >
            <div
              className="badge-back-label"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "11px",
                color: tokens.color.muted,
                lineHeight: 1.3,
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Background
            </div>
            <div
              className="badge-back-value"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "16px",
                color: tokens.color.body,
                lineHeight: 1.5,
              }}
            >
              {description}
            </div>
          </div>

          <div
            className="badge-back-section"
            style={{
              marginBottom: 0,
            }}
          >
            <div
              className="badge-back-label"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "11px",
                color: tokens.color.muted,
                lineHeight: 1.3,
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              Approach
            </div>
            <div
              className="badge-back-value"
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "16px",
                color: tokens.color.body,
                lineHeight: 1.5,
              }}
            >
              Research-backed decisions, obsessive attention to accessibility, ruthless focus on reducing friction.
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCTAClick?.();
            }}
            style={{
              marginTop: "auto",
              paddingTop: 12,
              width: "100%",
              boxSizing: "border-box",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: "12px",
                border: `1px solid ${tokens.color.cardBorder}`,
                padding: "11px 18px",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "14px",
                color: tokens.color.ink,
                lineHeight: 1.4,
                transition: "background-color 0.2s ease, border-color 0.2s ease",
                backgroundColor: "transparent",
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = tokens.color.muted;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLDivElement).style.borderColor = tokens.color.cardBorder;
              }}
              onTouchStart={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(0, 0, 0, 0.08)";
                (e.currentTarget as HTMLDivElement).style.borderColor = tokens.color.muted;
              }}
              onTouchEnd={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLDivElement).style.borderColor = tokens.color.cardBorder;
              }}
            >
              See work
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  border: "0.75px solid currentColor",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="6" height="7" viewBox="0 0 8.271 8.974" fill="currentColor">
                  <path
                    d="M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z"
                    fillRule="nonzero"
                  />
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Badge;
