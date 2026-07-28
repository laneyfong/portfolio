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
          background: "linear-gradient(135deg, rgba(200, 180, 230, 0.8) 0%, rgba(180, 220, 240, 0.8) 50%, rgba(200, 240, 220, 0.8) 100%)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: videoLoaded ? 0 : 1,
          transition: "opacity 0.5s ease-out",
          filter: "brightness(1.1) blur(2px)",
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
          transition: "opacity 0.5s ease-out",
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
          transition: "opacity 0.5s ease-out",
        }}
      />
    </>
  );
};

export default HalftoneField;
