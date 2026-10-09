import type { FC } from "react";
import { useState, useRef } from "react";

const DynamicSliderCard: FC = () => {
  const [value, setValue] = useState(0);
  const [shake, setShake] = useState(0);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value, 10);
    setValue(newValue);

    if (isDragging.current) {
      setShake(newValue / 10);
    }
  };

  const getSliderColor = () => {
    const startColor = [211, 211, 211];
    const endColor = [30, 58, 138];

    const ratio = value / 100;
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * ratio);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * ratio);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const fontSize = 48 + (value / 100) * 32;
  const shakeAmount = shake * 2;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        background: "#F0F0F0",
        borderRadius: "14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "40px 30px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Slider and Number Container */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          gap: "12px",
        }}
      >
        {/* Number Display - positioned above slider */}
        <div
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: 500,
            color: "#333333",
            lineHeight: 1,
            transform: `translateX(calc(-50% + ${(value / 100) * 120}px)) translateX(${(Math.random() - 0.5) * shakeAmount}px)`,
            transition: "transform 0.05s ease-out",
            fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            letterSpacing: "-0.05em",
            position: "relative",
            left: "50%",
            height: `${fontSize}px`,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          {value}
        </div>

        {/* Slider Track */}
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "#E0E0E0",
            borderRadius: "4px",
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Filled track */}
          <div
            style={{
              position: "absolute",
              height: "100%",
              background: getSliderColor(),
              borderRadius: "4px",
              width: `${value}%`,
              transition: "background 0.1s ease-out",
            }}
          />

          {/* Slider Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              cursor: "pointer",
              appearance: "none",
              background: "transparent",
              zIndex: 5,
              padding: 0,
              border: "none",
              margin: 0,
            }}
          />
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${getSliderColor()};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: background 0.1s ease-out;
          margin-top: -6px;
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${getSliderColor()};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: background 0.1s ease-out;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          background: transparent;
          outline: none;
          padding: 0;
          margin: 0;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          appearance: none;
          height: 8px;
          background: transparent;
          border-radius: 4px;
        }

        input[type="range"]::-moz-range-track {
          background: transparent;
          border: none;
          height: 8px;
        }
      `}</style>
    </div>
  );
};

export default DynamicSliderCard;
