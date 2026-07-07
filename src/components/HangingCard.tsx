import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";

interface HangingCardProps {
  children: ReactNode;
  stringHeight?: number;
  /** Distance from the card's top edge to the center of its hole/grommet — the lanyard clip threads through here. */
  holeCenterOffset?: number;
}

// Realistic physics for a physical badge with mass
// — inertia, gentle damping, no springiness

const PROXIMITY_RADIUS = 380; // px — how far the cursor's influence reaches (reduced, subtler)
const MAX_ROTATION = 3.5; // degrees — tiny rotation (reduced from 6)
const MAX_TRANSLATE = 4; // px — minimal movement (reduced from 9)
const MAX_DT = 0.05; // clamp so a backgrounded tab doesn't cause a huge jump on return

// Cursor-follow: heavily damped to feel like inertia, not spring physics.
// The badge resists movement and settles slowly with real damping.
// Damping ratio > 1.0 means overdamped (no oscillation, slow settling).
const TILT_STIFFNESS = 80; // 1/s² — much lower = lethargic, heavy feeling
const TILT_DAMPING = 2 * Math.sqrt(TILT_STIFFNESS) * 1.8; // ratio ~1.8 = heavily overdamped, no bounce

// Nudge behavior: minimal, quick decay. Not a pendulum, just a tiny nudge.
// When clicked, the badge barely moves and settles immediately.
const NUDGE_STIFFNESS = 120; // rapid settling
const NUDGE_DAMPING_RATIO = 2.2; // very overdamped — no overshoot, no oscillation
const NUDGE_DAMPING = 2 * Math.sqrt(NUDGE_STIFFNESS) * NUDGE_DAMPING_RATIO;
const NUDGE_IMPULSE = 8; // deg/s injected on a nudge (small!)
const NUDGE_MAX_DEG = 2; // hard ceiling — barely noticeable

function springTo(pos: number, vel: number, target: number, stiffness: number, damping: number, dt: number) {
  const accel = stiffness * (target - pos) - damping * vel;
  const nextVel = vel + accel * dt;
  const nextPos = pos + nextVel * dt;
  return [nextPos, nextVel] as const;
}

interface MotionState {
  rot: number;
  tx: number;
  ty: number;
  rotV: number;
  txV: number;
  tyV: number;
  targetRot: number;
  targetTx: number;
  targetTy: number;
  pendulum: number;
  pendulumV: number;
}

const HangingCard: FC<HangingCardProps> = ({ children, stringHeight = 64, holeCenterOffset = 42 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const motion = useRef<MotionState>({
    rot: 0,
    tx: 0,
    ty: 0,
    rotV: 0,
    txV: 0,
    tyV: 0,
    targetRot: 0,
    targetTx: 0,
    targetTy: 0,
    pendulum: 0,
    pendulumV: 0,
  });
  const enabledRef = useRef({ idle: true, cursor: true, anyMotion: true });

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateFlags = () => {
      enabledRef.current.anyMotion = !reduceMotionQuery.matches;
      enabledRef.current.idle = !reduceMotionQuery.matches;
      enabledRef.current.cursor = !reduceMotionQuery.matches && fineHoverQuery.matches;
      if (!enabledRef.current.cursor) {
        motion.current.targetRot = 0;
        motion.current.targetTx = 0;
        motion.current.targetTy = 0;
      }
    };
    updateFlags();
    reduceMotionQuery.addEventListener("change", updateFlags);
    fineHoverQuery.addEventListener("change", updateFlags);

    const handleMove = (e: MouseEvent) => {
      if (!enabledRef.current.cursor || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const influence = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
      const norm = Math.max(-1, Math.min(1, dx / PROXIMITY_RADIUS));
      motion.current.targetRot = norm * MAX_ROTATION * influence;
      motion.current.targetTx = norm * MAX_TRANSLATE * influence;
      motion.current.targetTy = (dy / PROXIMITY_RADIUS) * MAX_TRANSLATE * 0.6 * influence;
    };

    const handleLeaveWindow = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        motion.current.targetRot = 0;
        motion.current.targetTx = 0;
        motion.current.targetTy = 0;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseout", handleLeaveWindow, { passive: true });

    let raf = 0;
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, MAX_DT);
      lastTime = now;
      const m = motion.current;

      [m.rot, m.rotV] = springTo(m.rot, m.rotV, m.targetRot, TILT_STIFFNESS, TILT_DAMPING, dt);
      [m.tx, m.txV] = springTo(m.tx, m.txV, m.targetTx, TILT_STIFFNESS, TILT_DAMPING, dt);
      [m.ty, m.tyV] = springTo(m.ty, m.tyV, m.targetTy, TILT_STIFFNESS, TILT_DAMPING, dt);
      // Nudge response — decays quickly with heavy damping, no oscillation
      [m.pendulum, m.pendulumV] = springTo(m.pendulum, m.pendulumV, 0, NUDGE_STIFFNESS, NUDGE_DAMPING, dt);
      const nudgeClamped = Math.max(-NUDGE_MAX_DEG, Math.min(NUDGE_MAX_DEG, m.pendulum));

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${m.tx.toFixed(2)}px, ${m.ty.toFixed(2)}px) rotate(${(m.rot + nudgeClamped).toFixed(3)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      reduceMotionQuery.removeEventListener("change", updateFlags);
      fineHoverQuery.removeEventListener("change", updateFlags);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeaveWindow);
    };
  }, []);

  const nudge = () => {
    if (!enabledRef.current.anyMotion) return;
    // Tiny nudge that settles immediately — barely noticeable
    const dir = Math.random() < 0.5 ? -1 : 1;
    motion.current.pendulumV += dir * NUDGE_IMPULSE;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
      <div style={{ position: "relative" }}>
        {/* mount pin, fixed at the pivot — where the lanyard attaches to the ceiling */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #c4c8cc, #8d9197)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.18)",
            zIndex: 1,
          }}
        />
        <div
          ref={wrapperRef}
          data-hanging-wrapper=""
          style={{ position: "relative", transformOrigin: "top center", willChange: "transform" }}
        >
          {/* lanyard strap — from the ceiling pin down to the card's top edge */}
          <div
            aria-hidden
            style={{
              width: 7,
              height: stringHeight,
              margin: "0 auto",
              borderRadius: "3px 3px 0 0",
              background: "linear-gradient(to bottom, rgba(80, 82, 86, 0.6), rgba(60, 62, 66, 0.35))",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          />

          <div ref={cardRef} onClick={nudge} onTouchStart={nudge}>
            {children}
          </div>

          {/* clip body — bridges from the card's top edge down to its hole, in front of the card */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: stringHeight,
              left: "50%",
              transform: "translateX(-50%)",
              width: 20,
              height: Math.max(0, holeCenterOffset - 4),
              borderRadius: "0 0 4px 4px",
              background: "linear-gradient(135deg, #f0f0f0, #d8d8d8)",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
              zIndex: 2,
            }}
          />
          {/* swivel ring — threaded through the badge's hole */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: stringHeight + holeCenterOffset - 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "3px solid rgba(140, 140, 145, 0.9)",
              boxSizing: "border-box",
              background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 70%)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HangingCard;
