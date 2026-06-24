import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";

interface HangingCardProps {
  children: ReactNode;
  stringHeight?: number;
  /** Distance from the card's top edge to the center of its hole/grommet — the lanyard clip threads through here. */
  holeCenterOffset?: number;
}

// Tunables for the suspended-badge feel.
const IDLE_PERIOD = 3.4; // seconds per idle swing cycle
const IDLE_AMPLITUDE = 0.7; // degrees — "barely noticeable"
const PROXIMITY_RADIUS = 460; // px — how far the cursor's influence reaches
const MAX_ROTATION = 6; // degrees
const MAX_TRANSLATE = 9; // px
const MAX_DT = 0.05; // clamp so a backgrounded tab doesn't cause a huge jump on return

// Continuous cursor-follow: a real mass-spring-damper, integrated with the
// actual frame delta so it's correct at any refresh rate. Damping is kept
// close to critical (ratio ~0.92) so it tracks the cursor responsively and
// settles back calmly, with no visible overshoot — "suspended," not "springy."
const TILT_STIFFNESS = 210; // 1/s² — higher = snappier, more immediate
const TILT_DAMPING = 2 * Math.sqrt(TILT_STIFFNESS) * 0.92;

// Click/tap "nudge": a true lightly-damped pendulum released from an
// impulse — it swings past center a couple of times, losing amplitude
// each pass, then comes to rest. No scaling, no bounce, just rotation.
const PENDULUM_STIFFNESS = 42; // sets the swing's natural period (~1s)
const PENDULUM_DAMPING_RATIO = 0.28; // well underdamped — a few decaying swings
const PENDULUM_DAMPING = 2 * Math.sqrt(PENDULUM_STIFFNESS) * PENDULUM_DAMPING_RATIO;
const PENDULUM_IMPULSE = 26; // deg/s injected on a nudge
const PENDULUM_MAX_DEG = 6; // hard ceiling so it can never look exaggerated

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
    const start = lastTime;
    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, MAX_DT);
      lastTime = now;
      const t = (now - start) / 1000;
      const m = motion.current;
      const idle = enabledRef.current.idle ? Math.sin(t / IDLE_PERIOD) * IDLE_AMPLITUDE : 0;

      [m.rot, m.rotV] = springTo(m.rot, m.rotV, m.targetRot, TILT_STIFFNESS, TILT_DAMPING, dt);
      [m.tx, m.txV] = springTo(m.tx, m.txV, m.targetTx, TILT_STIFFNESS, TILT_DAMPING, dt);
      [m.ty, m.tyV] = springTo(m.ty, m.tyV, m.targetTy, TILT_STIFFNESS, TILT_DAMPING, dt);
      // Free pendulum — always relaxing toward 0, no target to chase.
      [m.pendulum, m.pendulumV] = springTo(m.pendulum, m.pendulumV, 0, PENDULUM_STIFFNESS, PENDULUM_DAMPING, dt);
      const pendulumClamped = Math.max(-PENDULUM_MAX_DEG, Math.min(PENDULUM_MAX_DEG, m.pendulum));

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${m.tx.toFixed(2)}px, ${m.ty.toFixed(2)}px) rotate(${(m.rot + idle + pendulumClamped).toFixed(3)}deg)`;
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
    // Alternate the push direction a little so repeated nudges don't feel mechanical.
    const dir = Math.random() < 0.5 ? -1 : 1;
    motion.current.pendulumV += dir * PENDULUM_IMPULSE;
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
              width: 5,
              height: stringHeight,
              margin: "0 auto",
              borderRadius: "2px 2px 0 0",
              background: "linear-gradient(to bottom, rgba(64, 66, 70, 0.55), rgba(64, 66, 70, 0.28))",
              boxShadow: "0 0 0 0.5px rgba(0,0,0,0.05)",
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
              width: 13,
              height: Math.max(0, holeCenterOffset - 8),
              borderRadius: "0 0 3px 3px",
              background: "linear-gradient(135deg, #e7e9eb, #a9adb3)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              zIndex: 2,
            }}
          />
          {/* swivel ring — threaded through the badge's hole */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: stringHeight + holeCenterOffset - 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "2.5px solid rgba(130, 134, 140, 0.95)",
              boxSizing: "border-box",
              background: "transparent",
              boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HangingCard;
