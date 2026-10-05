import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "../tokens";

interface HeroEnvironmentProps {
  width: number;
  height: number;
  isFlipped?: boolean;
}

const HeroEnvironment: FC<HeroEnvironmentProps> = ({ width, height, isFlipped = false }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [canvasWidth, setCanvasWidth] = useState(width);
  const [canvasHeight, setCanvasHeight] = useState(height);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enabledRef = useRef({ cursor: true });

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    enabledRef.current.cursor = !reduceMotionQuery.matches;
    reduceMotionQuery.addEventListener("change", () => {
      enabledRef.current.cursor = !reduceMotionQuery.matches;
    });
    return () => reduceMotionQuery.removeEventListener("change", () => {});
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!enabledRef.current.cursor) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    setCanvasWidth(width);
    setCanvasHeight(height);
  }, [width, height]);

  // Draw subtle interactive field on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Clear canvas
    ctx.fillStyle = "transparent";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!enabledRef.current.cursor) return;

    // Draw subtle dot field with cursor influence
    const dotSpacing = 60;
    const dotRadius = 1;
    const influenceRadius = 150;

    for (let x = 0; x < canvasWidth; x += dotSpacing) {
      for (let y = 0; y < canvasHeight; y += dotSpacing) {
        const dx = x - mousePos.x;
        const dy = y - mousePos.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);

        // Base opacity is very subtle
        let opacity = 0.08;
        // Increase opacity near cursor
        opacity += influence * 0.12;

        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw subtle connecting lines to nearby dots
        if (influence > 0.3) {
          const nextX = x + dotSpacing;
          const nextY = y + dotSpacing;
          if (nextX < canvasWidth && nextY < canvasHeight) {
            const lineOpacity = influence * 0.04;
            ctx.strokeStyle = `rgba(0, 0, 0, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
        }
      }
    }
  }, [canvasWidth, canvasHeight, mousePos]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Canvas for interactive field */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: isFlipped ? 0.15 : 0.1,
          transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        aria-hidden
      />

      {/* Large background typography */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            fontSize: "clamp(80px, 18vw, 280px)",
            fontWeight: tokens.weight.regular,
            color: "rgba(0, 0, 0, 0.04)",
            lineHeight: 0.9,
            textAlign: "center",
            whiteSpace: "nowrap",
            transform: `translateX(${enabledRef.current.cursor ? (mousePos.x - window.innerWidth / 2) * 0.02 : 0}px)`,
            transition: enabledRef.current.cursor ? "none" : "transform 0.3s ease-out",
            userSelect: "none",
            letterSpacing: "-0.02em",
          }}
        >
          {isFlipped ? "THINKING" : "DESIGNING"}
        </div>
      </div>
    </div>
  );
};

export default HeroEnvironment;
