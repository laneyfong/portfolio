import type { FC } from "react";
import { useEffect, useRef } from "react";
import { tokens } from "../tokens";
import LoadingDots from "./LoadingDots";

type ModuleType = "motion" | "ai" | "interaction" | "concept" | "system" | "prototype" | "generative" | "accessibility";

interface LabCardProps {
  type: ModuleType;
  title: string;
  description: string;
  experimentId: string;
  date: string;
  status?: "exploring" | "paused" | "archived";
  tags?: string[];
  isLoading?: boolean;
}

interface MotionState {
  rotX: number;
  rotY: number;
  rotZ: number;
  liftY: number;
  rotXV: number;
  rotYV: number;
  rotZV: number;
  liftYV: number;
  targetRotX: number;
  targetRotY: number;
  targetRotZ: number;
  targetLiftY: number;
}

const LabCard: FC<LabCardProps> = ({ type, title, description, experimentId, date, status, tags, isLoading }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Physics constants for heavy, deliberate movement
  const STIFFNESS = 35; // Lower = slower response, feels heavier
  const DAMPING_RATIO = 0.8; // Higher = more damping, less bounce
  const DAMPING = 2 * Math.sqrt(STIFFNESS) * DAMPING_RATIO;
  const MAX_ROTATION = 4; // 3-5 degrees
  const MAX_LIFT = 12; // pixels

  const motionRef = useRef<MotionState>({
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    liftY: 0,
    rotXV: 0,
    rotYV: 0,
    rotZV: 0,
    liftYV: 0,
    targetRotX: 0,
    targetRotY: 0,
    targetRotZ: 0,
    targetLiftY: 0,
  });

  function springTo(pos: number, vel: number, target: number, stiffness: number, damping: number, dt: number) {
    const accel = stiffness * (target - pos) - damping * vel;
    const nextVel = vel + accel * dt;
    const nextPos = pos + nextVel * dt;
    return [nextPos, nextVel] as const;
  }

  // Calculate dynamic shadow based on rotation
  const calculateShadow = (rotX: number, rotY: number) => {
    const shadowOffsetX = rotY * 1.5;
    const shadowOffsetY = rotX * 1.5 + 8;
    const shadowBlur = 20 + Math.abs(rotX) + Math.abs(rotY);
    const shadowOpacity = 0.08 + Math.abs(rotX) * 0.01 + Math.abs(rotY) * 0.01;

    return `${shadowOffsetX.toFixed(2)}px ${shadowOffsetY.toFixed(2)}px ${shadowBlur.toFixed(1)}px rgba(0, 0, 0, ${shadowOpacity})`;
  };

  // Calculate edge highlight based on rotation
  const calculateHighlight = (rotX: number, rotY: number) => {
    const highlightOpacity = Math.max(0, 0.15 - Math.abs(rotX) * 0.02 - Math.abs(rotY) * 0.02);
    return highlightOpacity;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = (e.clientX - centerX) / rect.width;
      const dy = (e.clientY - centerY) / rect.height;

      // Subtle cursor tracking for tilt
      motionRef.current.targetRotY = dx * MAX_ROTATION;
      motionRef.current.targetRotX = -dy * MAX_ROTATION;
      motionRef.current.targetLiftY = MAX_LIFT;
    };

    const handleMouseLeave = () => {
      motionRef.current.targetRotX = 0;
      motionRef.current.targetRotY = 0;
      motionRef.current.targetRotZ = 0;
      motionRef.current.targetLiftY = 0;
    };

    const handleMouseEnter = () => {
      // Ensure we're tracking movement when hovering
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          // Just enable the lift effect to show it's interactive
          motionRef.current.targetLiftY = MAX_LIFT * 0.5;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    cardRef.current?.addEventListener("mouseleave", handleMouseLeave);
    cardRef.current?.addEventListener("mouseenter", handleMouseEnter);

    let raf = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.016); // Cap at 60fps
      lastTime = now;
      const m = motionRef.current;

      [m.rotX, m.rotXV] = springTo(m.rotX, m.rotXV, m.targetRotX, STIFFNESS, DAMPING, dt);
      [m.rotY, m.rotYV] = springTo(m.rotY, m.rotYV, m.targetRotY, STIFFNESS, DAMPING, dt);
      [m.liftY, m.liftYV] = springTo(m.liftY, m.liftYV, m.targetLiftY, STIFFNESS, DAMPING, dt);

      if (containerRef.current) {
        const shadow = calculateShadow(m.rotX, m.rotY);
        const highlightOpacity = calculateHighlight(m.rotX, m.rotY);

        containerRef.current.style.transform = `perspective(1200px) rotateX(${m.rotX.toFixed(3)}deg) rotateY(${m.rotY.toFixed(3)}deg) translateY(${(-m.liftY).toFixed(2)}px)`;
        containerRef.current.style.boxShadow = shadow;
        containerRef.current.style.setProperty("--highlight-opacity", highlightOpacity.toString());
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      cardRef.current?.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const typeLabels: Record<ModuleType, string> = {
    motion: "Motion Study",
    ai: "AI Prototype",
    interaction: "Interaction Experiment",
    concept: "Concept Exploration",
    system: "Visual System",
    prototype: "Rapid Prototype",
    generative: "Generative Design",
    accessibility: "Accessibility Exploration",
  };

  return (
    <div
      ref={cardRef}
      style={{
        perspective: "1200px",
        width: "100%",
        height: "100%",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .lab-card-container {
          animation: fadeInUp 0.6s ease-out forwards;
          transition: box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }

        .lab-card-edge-highlight {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(255, 255, 255, var(--highlight-opacity)) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0) 100%);
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-card-container {
            animation: none !important;
          }
          .lab-card-container,
          .lab-card-edge-highlight {
            transform: none !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="lab-card-container"
        style={{
          position: "relative",
          background: tokens.color.offWhite,
          border: `1px solid ${tokens.color.cardBorder}`,
          borderRadius: "24px",
          padding: "28px",
          cursor: "pointer",
          willChange: "transform, box-shadow",
        }}
      >
        {/* Edge highlight for material depth */}
        <div className="lab-card-edge-highlight" />

        {/* Experiment metadata */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div
              style={{
                fontSize: "10px",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                color: tokens.color.muted,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                opacity: 0.5,
                marginBottom: 6,
              }}
            >
              {experimentId}
            </div>
            <div
              style={{
                fontSize: "11px",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                color: tokens.color.body,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                paddingBottom: 8,
              }}
            >
              {typeLabels[type]}
            </div>
          </div>
          {status && (
            <div
              style={{
                fontSize: "9px",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                color: status === "exploring" ? tokens.color.accent : tokens.color.muted,
                textTransform: "capitalize",
                opacity: 0.7,
              }}
            >
              ● {status}
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            margin: "0 0 10px 0",
            fontFamily: tokens.font.sans,
            fontSize: "18px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        {/* Description or Loading */}
        {isLoading ? (
          <div style={{ margin: "0 0 16px 0", minHeight: "40px", display: "flex", alignItems: "center" }}>
            <LoadingDots />
          </div>
        ) : (
          <p
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "13px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            {description}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "10px",
                  fontFamily: tokens.font.sans,
                  fontWeight: tokens.weight.regular,
                  color: tokens.color.body,
                  backgroundColor: tokens.color.white,
                  border: `0.5px solid ${tokens.color.cardBorder}`,
                  padding: "3px 7px",
                  borderRadius: "4px",
                  opacity: 0.6,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date footer */}
        <div
          style={{
            fontSize: "11px",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.light,
            color: tokens.color.muted,
            marginTop: "auto",
            paddingTop: 10,
            borderTop: `0.5px solid ${tokens.color.cardBorder}`,
            opacity: 0.6,
          }}
        >
          {date}
        </div>
      </div>
    </div>
  );
};

export default LabCard;
