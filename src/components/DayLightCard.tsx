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

  // Calculate lighting and colors based on time with smooth transitions
  const calculateLighting = (hours: number) => {
    // 8 AM to 8 PM progression
    if (hours >= 8 && hours < 20) {
      // 8 AM - 12 PM: Bright morning (8-12)
      // 12 PM - 5 PM: Warm afternoon (12-17)
      // 5 PM - 7 PM: Golden sunset (17-19)
      // 7 PM - 8 PM: Deep orange sunset (19-20)

      const progress = (hours - 8) / 12; // 0 to 1

      // Brightness gradually decreases
      const brightness = 1 - progress * 0.6; // 100% to 40%

      // Warmth increases significantly for sunset effect
      // 8-12 (morning): cool blues (warmth 0)
      // 12-17 (afternoon): warming up (warmth 0 to 0.5)
      // 17-19 (sunset): very warm (warmth 0.5 to 1)
      // 19-20 (deep sunset): deepest orange (warmth 1)

      let warmth = 0;
      if (hours < 12) {
        // Morning: 8-12, warmth stays cool
        warmth = 0;
      } else if (hours < 17) {
        // Afternoon: 12-17, gradually warming
        warmth = (hours - 12) / 5 * 0.5; // 0 to 0.5
      } else if (hours < 19) {
        // Sunset: 17-19, getting very warm
        warmth = 0.5 + (hours - 17) / 2 * 0.5; // 0.5 to 1
      } else {
        // Deep sunset: 19-20, deepest warmth
        warmth = 1;
      }

      return { brightness, warmth, isNight: false, progress };
    } else {
      // Night mode
      return { brightness: 0.2, warmth: 0, isNight: true, progress: 1 };
    }
  };

  const { brightness, warmth, isNight } = calculateLighting(time.hours);

  const getBackgroundStyle = () => {
    if (isNight) {
      return {
        background: `linear-gradient(135deg, #0a1428 0%, #1a2a4a 100%)`,
      };
    }

    // Smooth color progression from cool blue (morning) to deep orange (sunset)
    // 8 AM: Light sky blue
    // 12 PM: Warm day blue
    // 5 PM: Golden orange
    // 7 PM: Deep orange/red
    // 8 PM: Deep night

    let baseHue = 200; // Start with sky blue
    let saturation = 40;
    let lightness = 80;

    if (warmth < 0.2) {
      // Morning (8-12): Cool blue skies
      baseHue = 200;
      saturation = 35;
      lightness = 85 - (1 - brightness) * 15;
    } else if (warmth < 0.5) {
      // Afternoon (12-17): Warmer tones
      baseHue = 200 - (warmth - 0.2) / 0.3 * 40; // 200 to 160
      saturation = 35 + (warmth - 0.2) / 0.3 * 15;
      lightness = 80 - (1 - brightness) * 20;
    } else if (warmth < 1) {
      // Sunset (17-20): Golden to deep orange
      baseHue = 160 - (warmth - 0.5) / 0.5 * 80; // 160 to 80
      saturation = 50 + (warmth - 0.5) / 0.5 * 40;
      lightness = 70 - (1 - brightness) * 25;
    }

    return {
      background: `linear-gradient(135deg,
        hsl(${baseHue}, ${saturation}%, ${lightness}%) 0%,
        hsl(${baseHue - 20}, ${saturation - 10}%, ${lightness - 8}%) 100%)`,
      transition: "background 0.15s ease",
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
