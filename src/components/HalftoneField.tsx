import type { FC } from "react";
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
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.45,
          filter: "brightness(1.25) blur(2px)",
        }}
      >
        <source src={gradientVideo} type="video/mp4" />
      </video>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 0.35)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </>
  );
};

export default HalftoneField;
