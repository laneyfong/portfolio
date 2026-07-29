import type { FC } from "react";
import { useEffect, useRef } from "react";

interface HalftoneFieldProps {
  width: number;
  height: number;
  onVideoReady?: () => void;
}

const HalftoneField: FC<HalftoneFieldProps> = ({ onVideoReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CSS gradient loads instantly
    onVideoReady?.();
  }, [onVideoReady]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (containerRef.current) {
        if (document.hidden === false) {
          containerRef.current.style.animation = "none";
          void containerRef.current.offsetHeight;
          containerRef.current.style.animation = "gradientFadeIn 1.2s ease-out 0.1s forwards";
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
        animation: "gradientFadeIn 1.2s ease-out 0.1s forwards",
        background: "linear-gradient(135deg, #9966ff 0%, #3399ff 25%, #ffcc00 50%, #33ff99 75%, #ff66cc 100%)",
        maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.3) 85%, rgba(0, 0, 0, 0) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 60%, rgba(0, 0, 0, 0.3) 85%, rgba(0, 0, 0, 0) 100%)",
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 0.28)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default HalftoneField;
