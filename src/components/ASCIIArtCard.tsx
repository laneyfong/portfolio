import type { FC } from "react";
import { useState, useRef } from "react";
import { tokens } from "../tokens";

interface Ripple {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

const ASCIIArtCard: FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);

  const asciiArt = `
    ～～～～～～～
   ◇  ◇  ◇  ◇  ◇
    ～～～～～～～
   ◇  ◇  ◇  ◇  ◇
    ～～～～～～～
  `;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x,
      y,
      createdAt: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      style={{
        position: "relative",
        height: "100%",
        minHeight: 400,
        background: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        borderRadius: tokens.radius.sm,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "box-shadow 0.22s ease",
      }}
      onMouseEnter={() => {
        if (cardRef.current) {
          cardRef.current.style.boxShadow = tokens.shadow.subtle;
        }
      }}
      onMouseLeave={() => {
        if (cardRef.current) {
          cardRef.current.style.boxShadow = "none";
        }
      }}
    >
      <style>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }

        .ripple-circle {
          position: absolute;
          border: 2px solid ${tokens.color.body};
          border-radius: 50%;
          pointer-events: none;
          animation: ripple 0.8s cubic-bezier(0.4, 0, 0.6, 1) forwards;
        }
      `}</style>

      {/* ASCII Art */}
      <pre
        style={{
          margin: 0,
          fontFamily: "'Courier New', monospace",
          fontSize: "16px",
          color: tokens.color.body,
          whiteSpace: "pre",
          lineHeight: 1.6,
          position: "relative",
          zIndex: 10,
          userSelect: "none",
          fontWeight: tokens.weight.regular,
        }}
      >
        {asciiArt}
      </pre>

      {/* Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-circle"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export default ASCIIArtCard;
