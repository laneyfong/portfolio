import type { FC, ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "../../tokens";

interface CarouselItem {
  type: "video" | "image";
  src: string;
  title?: string;
  description?: string;
}

export const VideoCarousel: FC<{
  items: CarouselItem[];
  title?: ReactNode;
  description?: ReactNode;
  aspectRatio?: number;
}> = ({ items, title, description, aspectRatio = 16 / 9 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    if (videoRef.current && items[currentIndex].type === "video") {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's ok
      });
    }
  }, [currentIndex, items]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  const currentItem = items[currentIndex];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        marginBottom: 80,
      }}
    >
      {(title || description) && (
        <div>
          {title && (
            <h3
              style={{
                margin: "0 0 12px",
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
              }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.body,
                lineHeight: tokens.leading.normal,
                maxWidth: 600,
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          position: "relative",
          borderRadius: tokens.radius.md,
          overflow: "hidden",
          background: tokens.color.ink,
          aspectRatio: `${aspectRatio}`,
          cursor: "pointer",
        }}
        onClick={() => setIsFullscreen(true)}
      >
        {/* Content */}
        <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {currentItem.type === "video" ? (
            <video
              ref={videoRef}
              src={currentItem.src}
              onEnded={handleVideoEnded}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
              controls
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={currentItem.src}
              alt={currentItem.title || "Carousel item"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          )}
        </div>

        {/* Fullscreen hint */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "8px 12px",
            borderRadius: tokens.radius.sm,
            fontSize: "12px",
            fontFamily: tokens.font.sans,
            pointerEvents: "none",
          }}
        >
          Click to expand
        </div>

        {/* Navigation Controls */}
        {items.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px",
              background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
            }}
          >
            <button
              onClick={handlePrevious}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255, 255, 255, 0.2)";
              }}
            >
              ←
            </button>

            {/* Dots Indicator */}
            <div style={{ display: "flex", gap: 8 }}>
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: idx === currentIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      idx === currentIndex
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.4)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255, 255, 255, 0.2)";
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Item Descriptions */}
      {currentItem.title || currentItem.description ? (
        <div style={{ paddingBottom: 20 }}>
          {currentItem.title && (
            <p
              style={{
                margin: "0 0 8px",
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
              }}
            >
              {currentItem.title}
            </p>
          )}
          {currentItem.description && (
            <p
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.sm,
                color: tokens.color.body,
                lineHeight: tokens.leading.normal,
                maxWidth: 600,
              }}
            >
              {currentItem.description}
            </p>
          )}
        </div>
      ) : null}

      {/* Fullscreen Modal Overlay */}
      {isFullscreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(2px)",
          }}
          onClick={() => setIsFullscreen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              width: 40,
              height: 40,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255, 255, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255, 255, 255, 0.1)";
            }}
          >
            ✕
          </button>

          {/* Fullscreen content */}
          <div
            style={{
              width: "90vw",
              height: "90vh",
              maxWidth: "1600px",
              maxHeight: "900px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === "video" ? (
              <video
                ref={fullscreenVideoRef}
                src={currentItem.src}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                controls
                autoPlay
              />
            ) : (
              <img
                src={currentItem.src}
                alt={currentItem.title || "Fullscreen view"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>

          {/* Navigation arrows in fullscreen */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                style={{
                  position: "absolute",
                  left: 20,
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255, 255, 255, 0.1)";
                }}
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                style={{
                  position: "absolute",
                  right: 20,
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255, 255, 255, 0.1)";
                }}
              >
                →
              </button>
            </>
          )}

          {/* Info at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: tokens.font.sans,
              fontSize: "14px",
            }}
          >
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
