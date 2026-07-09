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

  // Calculate lighting based on time
  const calculateLighting = (hours: number) => {
    // 8:00 AM (8) = brightest (day)
    // 8:00 PM (20) = darkest (night)
    // Transitions smoothly

    if (hours >= 8 && hours < 20) {
      // Daytime: 8 AM to 8 PM
      const progress = (hours - 8) / 12; // 0 to 1
      const brightness = 1 - progress * 0.3; // 1 (bright) to 0.7 (dimmer)
      const warmth = 1 - progress * 0.5; // Yellow warmth fades
      return { brightness, warmth, isNight: false };
    } else {
      // Nighttime: 8 PM to 8 AM
      return { brightness: 0.2, warmth: 0, isNight: true };
    }
  };

  const { brightness, warmth, isNight } = calculateLighting(time.hours);

  // Background gradient based on time
  const getBackgroundStyle = () => {
    if (isNight) {
      return {
        background: `linear-gradient(135deg, #0a1428 0%, #1a2a4a 100%)`,
      };
    }

    // Day gradient - becomes progressively warmer to cooler
    const baseHue = 200 + warmth * 30; // From blue to orange-ish
    const saturation = 30 + warmth * 20;
    const lightness = 85 - (1 - brightness) * 30;

    return {
      background: `linear-gradient(135deg,
        hsl(${baseHue}, ${saturation}%, ${lightness}%) 0%,
        hsl(${baseHue - 10}, ${saturation - 10}%, ${lightness - 5}%) 100%)`,
    };
  };

  // Generate random stars for night mode
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

  // Handle time wheel scrolling
  const handleWheelStart = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    e.preventDefault();
  };

  const handleWheelMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaY = e.clientY - startYRef.current;
    const hourChange = Math.round(deltaY / 20); // 20px = 1 hour

    let newHours = time.hours + hourChange;
    if (newHours < 0) newHours += 24;
    if (newHours >= 24) newHours -= 24;

    setTime({ ...time, hours: newHours });
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

  const formatTime = (hours: number) => {
    const m = String(time.minutes).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, "0")}:${m} ${period}`;
  };

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
      `}</style>

      {/* Time Display */}
      <div
        style={{
          padding: "28px 28px 20px",
          borderBottom: `1px solid ${tokens.color.cardBorder}`,
          background: tokens.color.white,
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            color: tokens.color.muted,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            opacity: 0.5,
            marginBottom: 8,
          }}
        >
          DAY/NIGHT CYCLE
        </div>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontFamily: tokens.font.sans,
            fontSize: "18px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
          }}
        >
          Light Simulation
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: tokens.font.sans,
            fontSize: "13px",
            fontWeight: tokens.weight.regular,
            color: tokens.color.body,
            lineHeight: 1.5,
            opacity: 0.8,
          }}
        >
          Scroll on the preview to change time. Watch the light shift through the day.
        </p>
      </div>

      {/* Time Wheel Preview */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          ...getBackgroundStyle(),
          transition: "background 0.3s ease",
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

        {/* Central time display circle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: isNight ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${isNight ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)"}`,
            zIndex: 10,
          }}
        >
          {isNight ? (
            <div
              style={{
                fontSize: "40px",
                marginBottom: 4,
              }}
            >
              🌙
            </div>
          ) : (
            <div
              style={{
                fontSize: "40px",
                marginBottom: 4,
              }}
            >
              ☀️
            </div>
          )}
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "16px",
              fontWeight: tokens.weight.medium,
              color: isNight ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
              letterSpacing: tokens.tracking.tight,
            }}
          >
            {formatTime(time.hours)}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "10px",
              fontWeight: tokens.weight.regular,
              color: isNight ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
              marginTop: 2,
            }}
          >
            scroll to adjust
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div
        style={{
          padding: "16px 28px 20px",
          borderTop: `1px solid ${tokens.color.cardBorder}`,
          background: tokens.color.white,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "11px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.muted,
                opacity: 0.6,
              }}
            >
              Status
            </div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
                marginTop: 2,
              }}
            >
              {isNight ? "🌙 Night Mode" : "☀️ Day Mode"}
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "11px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.muted,
                opacity: 0.6,
              }}
            >
              Brightness
            </div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
                marginTop: 2,
              }}
            >
              {Math.round(brightness * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayLightCard;
