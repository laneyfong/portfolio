import type { FC } from "react";
import { useRef, useEffect } from "react";
import { tokens } from "../tokens";

interface LetterState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
}

const InteractiveTypography: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lettersRef = useRef<
    Array<{ char: string; origX: number; origY: number; state: LetterState }>
  >([]);

  // Design process keywords
  const words = [
    "DESIGN",
    "INTENTION",
    "PEOPLE",
    "RESEARCH",
    "SYSTEMS",
    "ITERATE",
    "PROTOTYPE",
    "MOTION",
    "ACCESSIBILITY",
    "AI",
    "EXPERIMENT",
    "CRAFT",
    "DISCOVERY",
    "INTERACTION",
    "VISUAL",
    "THINKING",
    "CURIOSITY",
    "FLOW",
    "EMPATHY",
    "CONSTRAINT",
    "SIMPLICITY",
    "FEEDBACK",
    "EVOLVE",
    "EXPLORE",
    "CREATE",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Configure font
    const fontSize = 14;
    const fontFamily = "monospace";
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = tokens.color.ink;
    ctx.textBaseline = "top";

    // Create letter grid
    const charWidth = ctx.measureText("A").width;
    const charHeight = fontSize + 8;
    const charsPerRow = Math.floor(width / charWidth);
    const rows = Math.floor(height / charHeight);

    let letterIndex = 0;
    const newLetters: (typeof lettersRef.current) = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < charsPerRow; col++) {
        const wordIndex = letterIndex % words.length;
        const word = words[wordIndex];
        const charInWord = letterIndex % word.length;
        const char = word[charInWord];

        const x = col * charWidth + 8;
        const y = row * charHeight + 8;

        newLetters.push({
          char,
          origX: x,
          origY: y,
          state: {
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
          },
        });

        letterIndex++;
      }
    }

    lettersRef.current = newLetters;

    // Physics constants
    const springStiffness = 0.2;
    const damping = 0.92;
    const maxDistance = 100;
    const maxForce = 3;

    const applyRipple = (
      mouseX: number,
      mouseY: number,
      intensity: number = 1
    ) => {
      lettersRef.current.forEach((letter) => {
        const dx = letter.origX - mouseX;
        const dy = letter.origY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const force =
            (1 - distance / maxDistance) *
            maxForce *
            intensity *
            (Math.random() * 0.5 + 0.5);
          const angle = Math.atan2(dy, dx);

          letter.state.ax = Math.cos(angle) * force;
          letter.state.ay = Math.sin(angle) * force;
        }
      });
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = tokens.color.ink;
      ctx.textBaseline = "top";

      lettersRef.current.forEach((letter) => {
        const { state, origX, origY } = letter;

        // Apply spring force back to original position
        const dx = origX - state.x;
        const dy = origY - state.y;

        state.ax += dx * springStiffness;
        state.ay += dy * springStiffness;

        // Apply damping
        state.vx *= damping;
        state.vy *= damping;

        // Update velocity
        state.vx += state.ax;
        state.vy += state.ay;

        // Update position
        state.x += state.vx;
        state.y += state.vy;

        // Reset acceleration
        state.ax = 0;
        state.ay = 0;

        // Draw letter
        ctx.fillText(letter.char, state.x, state.y);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle click
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      applyRipple(x, y, 1);
    };

    // Handle mouse move for subtle hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Very subtle effect for hover
      applyRipple(x, y, 0.1);
    };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        background: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        borderRadius: tokens.radius.md,
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "400px",
        }}
      />
    </div>
  );
};

export default InteractiveTypography;
