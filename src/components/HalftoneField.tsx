import type { FC } from "react";
import { useEffect, useRef } from "react";
import gradientVideo from "../assets/gradient-background.mp4";

interface HalftoneFieldProps {
  width: number;
  height: number;
}

const HalftoneField: FC<HalftoneFieldProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (containerRef.current) {
        // Trigger animation when tab becomes visible
        if (document.hidden === false) {
          containerRef.current.style.animation = "none";
          // Trigger reflow to restart animation
          void containerRef.current.offsetHeight;
          containerRef.current.style.animation = "gradientFadeIn 2s ease-out forwards";
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        animation: "gradientFadeIn 2s ease-out forwards",
      }}
    >
      <style>{`
        @keyframes gradientFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
          backgroundColor: "#ffffff",
          opacity: 0.55,
          filter: "brightness(1.25) blur(3px) saturate(1.3) hue-rotate(-10deg)",
        }}
      >
        <source src={gradientVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 0.38)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default HalftoneField;
