import type { FC } from "react";
import { useEffect, useRef } from "react";

interface HalftoneFieldProps {
  width: number;
  height: number;
}

interface FloatingOrb {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  phase: number;
}

const HalftoneField: FC<HalftoneFieldProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const orbsRef = useRef<FloatingOrb[]>([]);
  const timeRef = useRef(0);

  const PASTEL_COLORS = [
    "rgba(255, 179, 198, 0.4)", // Pastel pink
    "rgba(200, 229, 255, 0.4)", // Pastel blue
    "rgba(179, 255, 230, 0.4)", // Pastel mint
    "rgba(255, 244, 179, 0.4)", // Pastel yellow
    "rgba(230, 204, 255, 0.4)", // Pastel lavender
    "rgba(255, 214, 195, 0.4)", // Pastel peach
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize floating orbs
    const orbs: FloatingOrb[] = [];
    const orbCount = 7;

    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        radius: 80 + Math.random() * 120,
        color: PASTEL_COLORS[i % PASTEL_COLORS.length],
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    orbsRef.current = orbs;

    // Animation loop
    const animate: FrameRequestCallback = () => {
      timeRef.current += 0.016; // ~60fps
      const t = timeRef.current;

      // Clear canvas
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Draw floating orbs with blur
      orbs.forEach((orb, index) => {
        // Organic floating motion using sine/cosine waves
        const offsetX = Math.sin(t * 0.3 + orb.phase) * 40 + Math.sin(t * 0.15 + orb.phase * 0.7) * 20;
        const offsetY = Math.cos(t * 0.35 + orb.phase) * 40 + Math.cos(t * 0.12 + orb.phase * 0.9) * 20;

        orb.x = orb.baseX + offsetX;
        orb.y = orb.baseY + offsetY;

        // Slowly drift the base position
        orb.baseX += orb.speedX * 0.02;
        orb.baseY += orb.speedY * 0.02;

        // Keep orbs within bounds with wrapping
        if (orb.baseX < -200) orb.baseX = width + 200;
        if (orb.baseX > width + 200) orb.baseX = -200;
        if (orb.baseY < -200) orb.baseY = height + 200;
        if (orb.baseY > height + 200) orb.baseY = -200;

        // Draw with radial gradient for soft glow
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);

        // Extract color for gradient stops
        const colorStops = orb.color.replace("rgba(", "").replace(")", "").split(",");
        const r = colorStops[0].trim();
        const g = colorStops[1].trim();
        const b = colorStops[2].trim();

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.6)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
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
        filter: "blur(40px)",
      }}
    />
  );
};

export default HalftoneField;
