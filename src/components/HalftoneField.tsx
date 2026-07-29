import type { FC } from "react";
import { useEffect, useRef } from "react";
import gradientVideo from "../assets/gradient-background.mp4";

interface HalftoneFieldProps {
  width: number;
  height: number;
  onVideoReady?: () => void;
}

const HalftoneField: FC<HalftoneFieldProps> = ({ onVideoReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      onVideoReady?.();
    };

    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [onVideoReady]);

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
        animation: "gradientFadeIn 1.2s ease-out 0.1s forwards",
        opacity: 0,
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
      <video
        ref={videoRef}
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
          opacity: 0.62,
          filter: "brightness(1.28) blur(1.5px) saturate(1.7) hue-rotate(5deg)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <source src={gradientVideo} type="video/mp4" />
      </video>
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
