import type { FC } from "react";
import { useState } from "react";
import gradientVideo from "../assets/gradient-background.mp4";

interface HalftoneFieldProps {
  width: number;
  height: number;
}

const HalftoneField: FC<HalftoneFieldProps> = () => {
  return (
    <>
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
          filter: "brightness(1.25) blur(3px) saturate(1.6) hue-rotate(-10deg)",
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
          zIndex: 1,
        }}
      />
    </>
  );
};

export default HalftoneField;
