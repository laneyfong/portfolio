import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "../tokens";

interface TimeValue {
  hours: number;
  minutes: number;
}

const DayLightCard: FC = () => {
  const [time, setTime] = useState<TimeValue>({ hours: 12, minutes: 0 });
  const wheelRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const scrollOffsetRef = useRef(0);

  // Calculate lighting based on time
  const calculateLighting = (hours: number) => {
    if (hours >= 8 && hours < 20) {
      const progress = (hours - 8) / 12;
      const brightness = 1 - progress * 0.3;
      const warmth = 1 - progress * 0.5;
      return { brightness, warmth, isNight: false };
    } else {
      return { brightness: 0.2, warmth: 0, isNight: true };
    }
  };

  const { brightness, warmth, isNight } = calculateLighting(time.hours);

  const getBackgroundStyle = () => {
    if (isNight) {
      return {
        background: `linear-gradient(135deg, #0a1428 0%, #1a2a4a 100%)`,
      };
    }
    const baseHue = 200 + warmth * 30;
    const saturation = 30 + warmth * 20;
    const lightness = 85 - (1 - brightness) * 30;

    return {
      background: `linear-gradient(135deg,
        hsl(${baseHue}, ${saturation}%, ${lightness}%) 0%,
        hsl(${baseHue - 10}, ${saturation - 10}%, ${lightness - 5}%) 100%)`,
    };
  };

  // Generate stars
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }
    return stars;
  };

  const [stars] = useState(generateStars());

  // Handle time wheel scrolling (Apple-style)
  const handleWheelStart = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    e.preventDefault();
  };

  const handleWheelMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaY = e.clientY - startYRef.current;
    scrollOffsetRef.current += deltaY;

    // Every 40px of scroll = 1 hour change
    const hourChange = Math.floor(scrollOffsetRef.current / 40);

    if (hourChange !== 0) {
      let newHours = time.hours - hourChange; // Invert: scroll down = later time
      if (newHours < 0) newHours += 24;
      if (newHours >= 24) newHours -= 24;

      setTime({ ...time, hours: newHours });
      scrollOffsetRef.current -= hourChange * 40;
    }

    startYRef.current = e.clientY;
  };

  const handleWheelEnd = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleWheelMove as any);
    window.addEventListener("mouseup", handleWheelEnd);
    return () => {
      window.removeEventListener("mousemove", handleWheelMove as any);
      window.removeEventListener("mouseup", handleWheelEnd);
    };
  }, [time]);

  // Generate hour numbers for the picker (like iOS alarm)
  const getVisibleHours = () => {
    const hours = [];
    for (let i = -2; i <= 2; i++) {
      let h = time.hours + i;
      if (h < 0) h += 24;
      if (h >= 24) h -= 24;
      hours.push({ value: h, offset: i });
    }
    return hours;
  };

  const visibleHours = getVisibleHours();

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        minHeight: 400,
        background: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        borderRadius: tokens.radius.sm,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: isDraggingRef.current ? "grabbing" : "grab",
      }}
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--star-opacity); }
          50% { opacity: var(--star-opacity, 0.5) * 0.6; }
        }

        .star {
          animation: twinkle 3s infinite ease-in-out;
        }

        .hour-number {
          position: absolute;
          font-family: ${tokens.font.sans};
          font-weight: ${tokens.weight.medium};
          font-size: 48px;
          transition: opacity 0.1s ease-out, transform 0.1s ease-out;
        }

        .hour-number.selected {
          font-size: 56px;
          font-weight: ${tokens.weight.medium};
        }
      `}</style>

      {/* Time Picker Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          ...getBackgroundStyle(),
          transition: "background 0.2s ease",
          userSelect: "none",
        }}
        ref={wheelRef}
        onMouseDown={handleWheelStart}
        onMouseMove={handleWheelMove}
        onMouseUp={handleWheelEnd}
        onMouseLeave={handleWheelEnd}
      >
        {/* Stars for night mode */}
        {isNight &&
          stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                position: "absolute",
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                borderRadius: "50%",
                background: "white",
                "--star-opacity": star.opacity,
              } as React.CSSProperties}
            />
          ))}

        {/* Center selection indicator */}
        <div
          style={{
            position: "absolute",
            width: "80%",
            height: 70,
            left: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            borderTop: `2px solid ${isNight ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
            borderBottom: `2px solid ${isNight ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Time wheel (Apple-style scrolling numbers) */}
        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              height: 240,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Hours display */}
            {visibleHours.map((h) => (
              <div
                key={h.value}
                className={h.offset === 0 ? "hour-number selected" : "hour-number"}
                style={{
                  color: isNight ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.85)",
                  opacity: h.offset === 0 ? 1 : 0.3,
                  transform: `translateY(${h.offset * 70}px)`,
                  letterSpacing: "-2px",
                }}
              >
                {String(h.value).padStart(2, "0")}
              </div>
            ))}

            {/* Colon separator */}
            <div
              style={{
                position: "absolute",
                right: "35%",
                fontSize: 48,
                fontWeight: 500,
                color: isNight ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.2)",
                letterSpacing: "-2px",
              }}
            >
              :
            </div>

            {/* Minutes (fixed at 00) */}
            <div
              style={{
                position: "absolute",
                left: "35%",
                fontSize: 56,
                fontWeight: 500,
                color: isNight ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.85)",
                letterSpacing: "-2px",
              }}
            >
              00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayLightCard;
