import type { FC } from "react";
import { useState } from "react";
import gradientVideo from "../assets/gradient-background.mp4";

interface HalftoneFieldProps {
  width: number;
  height: number;
}

const HalftoneField: FC<HalftoneFieldProps> = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(230, 220, 250, 0.6) 0%, rgba(220, 240, 255, 0.6) 50%, rgba(230, 250, 240, 0.6) 100%)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: videoLoaded ? 0 : 1,
          transition: "opacity 0.6s ease-out",
        }}
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => setVideoLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 1,
          opacity: videoLoaded ? 0.65 : 0,
          filter: "brightness(1.25) blur(3px) saturate(1.6) hue-rotate(-10deg)",
          transition: "opacity 0.6s ease-out",
        }}
      >
        <source src={gradientVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 0.32)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </>
  );
};

export default HalftoneField;
