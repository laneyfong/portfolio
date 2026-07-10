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

  // Calculate if it's night mode based on time
  const calculateLighting = (hours: number) => {
    return {
      isNight: hours < 8 || hours >= 20,
    };
  };

  const { isNight } = calculateLighting(time.hours);

  const getBackgroundStyle = () => {
    if (isNight) {
      return {
        background: `linear-gradient(135deg, #0f1b3c 0%, #1a2d52 100%)`,
      };
    }

    // Accurate real-world sky colors based on time of day
    // 8 AM: Light periwinkle blue with pinkish tint
    // 9-11 AM: Bright sky blue
    // 12-4 PM: Deep saturated blue
    // 5 PM: Light orange-peach
    // 6 PM: Golden-orange
    // 7 PM: Deep orange-red
    // 8 PM: Purple-red transitioning to night

    let topColor = "#87CEEB";
    let bottomColor = "#E0F6FF";

    if (time.hours >= 8 && time.hours < 9) {
      // 8 AM: Early morning, pale blue with pinkish horizon
      topColor = "#9DB4D1";
      bottomColor = "#FFB6D9";
    } else if (time.hours >= 9 && time.hours < 11) {
      // 9-11 AM: Clear morning sky, bright blue
      topColor = "#87CEEB";
      bottomColor = "#E0F6FF";
    } else if (time.hours >= 11 && time.hours < 13) {
      // 11 AM - 1 PM: Mid-morning to noon, very bright blue
      topColor = "#4DB8FF";
      bottomColor = "#B0E0FF";
    } else if (time.hours >= 13 && time.hours < 16) {
      // 1-4 PM: Afternoon, deep saturated blue
      topColor = "#1E90FF";
      bottomColor = "#6DB3FF";
    } else if (time.hours >= 16 && time.hours < 17) {
      // 4-5 PM: Late afternoon, sky begins warming
      topColor = "#5BA3D0";
      bottomColor = "#FFD699";
    } else if (time.hours >= 17 && time.hours < 18) {
      // 5-6 PM: Early sunset, peachy-orange
      topColor = "#FFA500";
      bottomColor = "#FFB347";
    } else if (time.hours >= 18 && time.hours < 19) {
      // 6-7 PM: Full sunset, golden-orange
      topColor = "#FF8C00";
      bottomColor = "#FF7F50";
    } else if (time.hours >= 19 && time.hours < 20) {
      // 7-8 PM: Deep sunset, red-orange
      topColor = "#DC143C";
      bottomColor = "#FF6347";
    }

    return {
      background: `linear-gradient(135deg, ${topColor} 0%, ${bottomColor} 100%)`,
      transition: "background 0.2s ease",
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
          overflow: "hidden",
        }}
        ref={wheelRef}
        onMouseDown={handleWheelStart}
        onMouseMove={handleWheelMove}
        onMouseUp={handleWheelEnd}
        onMouseLeave={handleWheelEnd}
      >
        {/* Bottom glow effect - changes from yellow sunrise to sunset glow */}
        {!isNight && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: (() => {
                // Determine glow color based on time
                let glowColor = "#FFD700"; // Default yellow
                let glowColorFade = "#FFD70099"; // Default with transparency

                if (time.hours >= 8 && time.hours < 12) {
                  // Morning (8-12): Bright yellow glow
                  glowColor = "#FFD700";
                  glowColorFade = "#FFD70099";
                } else if (time.hours >= 12 && time.hours < 17) {
                  // Afternoon (12-17): Fade yellow to orange
                  const progress = (time.hours - 12) / 5;
                  // Interpolate between yellow and orange
                  const r = Math.round(255 - progress * 85); // 255 to 170
                  const g = Math.round(215 - progress * 30); // 215 to 185
                  const b = Math.round(0 - progress * 0); // 0 to 0
                  glowColor = `rgb(${r}, ${g}, ${b})`;
                  glowColorFade = `rgba(${r}, ${g}, ${b}, 0.6)`;
                } else if (time.hours >= 17 && time.hours < 20) {
                  // Sunset (17-20): Orange to deep red with yellow mixed
                  const progress = (time.hours - 17) / 3;
                  // Start with orange, move to red
                  const r = Math.round(255 - progress * 50); // 255 to 205
                  const g = Math.round(165 + progress * -120); // 165 to 45
                  const b = Math.round(0 + progress * 20); // 0 to 20
                  glowColor = `rgb(${r}, ${g}, ${b})`;
                  glowColorFade = `rgba(${r}, ${g}, ${b}, 0.6)`;
                }

                return `radial-gradient(ellipse 120% 100% at 50% 100%, ${glowColor} 0%, ${glowColorFade} 30%, transparent 70%)`;
              })(),
              pointerEvents: "none",
              zIndex: 2,
              opacity: 0.7,
              transition: "background 0.3s ease",
            }}
          />
        )}

        {/* Sunset circle - fades in during sunset, fades out into night */}
        {!isNight && time.hours >= 17 && (
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              // Calculate sunset progression (17:00 to 20:00 = 5 PM to 8 PM)
              // At 5 PM: yellow, full opacity
              // At 8 PM: fades out, becomes red
              background: `radial-gradient(circle at 30% 30%,
                hsl(${45 - (time.hours - 17) * 10}, 100%, ${60 - (time.hours - 17) * 8}%) 0%,
                hsl(${35 - (time.hours - 17) * 12}, 90%, ${50 - (time.hours - 17) * 10}%) 40%,
                transparent 70%)`,
              opacity: Math.max(0, 1 - (time.hours - 17) / 3), // Fades out from 17:00 to 20:00
              filter: "blur(60px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}

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
            gap: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              height: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            {/* Hours display (scrollable) */}
            {visibleHours.map((h) => (
              <div
                key={h.value}
                className={h.offset === 0 ? "hour-number selected" : "hour-number"}
                style={{
                  position: "absolute",
                  color: isNight ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.85)",
                  opacity: h.offset === 0 ? 1 : 0.3,
                  transform: `translateY(${h.offset * 70}px)`,
                  letterSpacing: "-2px",
                  right: "25%",
                }}
              >
                {String(h.value).padStart(2, "0")}
              </div>
            ))}
          </div>

          {/* Colon separator */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 500,
              color: isNight ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.2)",
              letterSpacing: "-2px",
              padding: "0 8px",
              flexShrink: 0,
            }}
          >
            :
          </div>

          {/* Minutes (fixed at 00) - on the right side, not overlapping */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 500,
              color: isNight ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.85)",
              letterSpacing: "-2px",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            00
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayLightCard;
