import type { FC } from "react";
import { useEffect, useRef } from "react";

interface HalftoneFieldProps {
  width: number;
  height: number;
}

const HalftoneField: FC<HalftoneFieldProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const dotsRef = useRef<Array<{ x: number; y: number; baseY: number; baseX: number }>>([]);
  const mouseRef = useRef({ x: width / 2, y: height / 2, active: false });
  const timeRef = useRef(0);
  const rippleRef = useRef<{ x: number; y: number; radius: number; maxRadius: number } | null>(null);

  const DOT_RADIUS = 0.6;
  const DOT_SPACING = 35;
  const INFLUENCE_RADIUS = 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize dots grid
    const dots: typeof dotsRef.current = [];
    for (let y = -DOT_SPACING; y < height + DOT_SPACING; y += DOT_SPACING) {
      for (let x = -DOT_SPACING; x < width + DOT_SPACING; x += DOT_SPACING) {
        dots.push({ x, y, baseX: x, baseY: y });
      }
    }
    dotsRef.current = dots;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      rippleRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 200,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    // Animation loop
    const animate: FrameRequestCallback = () => {
      timeRef.current += 0.016; // ~60fps
      const t = timeRef.current;

      // Clear canvas
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      // Create radial gradient mask for edges
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, Math.max(width, height) * 0.7);
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      // Draw dots with layered sine wave animation
      ctx.fillStyle = "#000";
      ctx.globalAlpha = 1;

      dots.forEach((dot) => {
        let x = dot.baseX;
        let y = dot.baseY;

        // Base wave animation - multiple sine waves for organic motion
        const wave1 = Math.sin(t * 0.3 + dot.baseX * 0.01) * 3;
        const wave2 = Math.sin(t * 0.2 + dot.baseY * 0.01) * 2;
        const wave3 = Math.cos(t * 0.15 + (dot.baseX + dot.baseY) * 0.005) * 1.5;

        y += wave1 + wave2 + wave3;
        x += Math.sin(t * 0.25 + dot.baseY * 0.01) * 1.5;

        // Mouse influence - gravitational field
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - dot.baseX;
          const dy = mouseRef.current.y - dot.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < INFLUENCE_RADIUS) {
            const influence = (1 - distance / INFLUENCE_RADIUS) * 0.6;
            const angle = Math.atan2(dy, dx);

            // Bend dots away from cursor
            x -= Math.cos(angle) * influence * 8;
            y -= Math.sin(angle) * influence * 8;
          }
        }

        // Ripple effect
        if (rippleRef.current) {
          const dx = dot.baseX - rippleRef.current.x;
          const dy = dot.baseY - rippleRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const rippleFalloff = Math.max(0, 1 - Math.abs(distance - rippleRef.current.radius) / 15);
          if (rippleFalloff > 0) {
            const rippleStrength = rippleFalloff * (1 - rippleRef.current.radius / rippleRef.current.maxRadius) * 4;
            const angle = Math.atan2(dy, dx);
            x += Math.cos(angle) * rippleStrength;
            y += Math.sin(angle) * rippleStrength;
          }

          // Update ripple
          rippleRef.current.radius += 2.5;
          if (rippleRef.current.radius > rippleRef.current.maxRadius) {
            rippleRef.current = null;
          }
        }

        // Calculate opacity based on distance from center (radial mask)
        const centerDist = Math.sqrt(
          Math.pow(dot.baseX - width / 2, 2) + Math.pow(dot.baseY - height / 2, 2)
        );
        const maxDist = Math.max(width, height) * 0.7;
        const opacity = Math.max(0, 1 - centerDist / maxDist);

        ctx.globalAlpha = opacity * 0.15;
        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default HalftoneField;
