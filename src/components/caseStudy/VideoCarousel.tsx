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
  hideControls?: boolean;
}> = ({ items, title, description, aspectRatio = 16 / 9, hideControls = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentItem = items[currentIndex];

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
      videoRef.current.pause();
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

  useEffect(() => {
    // Auto-advance images in fullscreen mode (Instagram stories style)
    if (isFullscreen && currentItem.type === "image" && items.length > 1) {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      autoAdvanceTimerRef.current = setTimeout(() => {
        handleNext();
      }, 4000); // Auto-advance after 4 seconds
    }

    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [isFullscreen, currentIndex, currentItem.type]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        marginBottom: 80,
      }}
    >
      <style>{`
        @keyframes carouselFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel-container {
          animation: carouselFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .carousel-glass-background {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(20, 184, 184, 0.04) 50%, transparent 70%);
          filter: blur(48px);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {(title || description) && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            animation: "carouselFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards",
            opacity: 0,
          }}
        >
          {title && (
            <h3
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.lg,
                fontWeight: tokens.weight.medium,
                color: "var(--text-dark)",
                letterSpacing: "-0.02em",
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
                color: "var(--text-secondary)",
                lineHeight: tokens.leading.normal,
                maxWidth: 700,
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      <div
        style={{
          position: "relative",
          animation: "carouselFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards",
          opacity: 0,
        }}
      >
        {/* Ambient backlighting */}
        <div className="carousel-glass-background" />

        <div
          ref={containerRef}
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            aspectRatio: `${aspectRatio}`,
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.05)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 1,
          }}
          onClick={() => setIsFullscreen(true)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "rgba(255, 255, 255, 0.07)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15), inset 1px 1px 2px rgba(255, 255, 255, 0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "rgba(255, 255, 255, 0.05)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.05)";
          }}
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
              controls={!hideControls}
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

        {/* Integrated Caption Bar */}
        {(currentItem.title || currentItem.description) && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2), transparent)",
              padding: "32px 24px 24px",
              pointerEvents: "none",
            }}
          >
            {currentItem.title && (
              <p
                style={{
                  margin: "0 0 6px",
                  fontFamily: tokens.font.sans,
                  fontSize: "13px",
                  fontWeight: tokens.weight.medium,
                  color: "rgba(255, 255, 255, 0.7)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
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
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: tokens.leading.snug,
                  maxWidth: 500,
                }}
              >
                {currentItem.description}
              </p>
            )}
          </div>
        )}

        {/* Fullscreen hint */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            color: "rgba(255, 255, 255, 0.8)",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: tokens.font.sans,
            pointerEvents: "none",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            letterSpacing: "0.3px",
            fontWeight: 500,
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
              aria-label="Previous item"
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
            <div style={{ display: "flex", gap: 8 }} role="tablist" aria-label="Carousel pages">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Go to item ${idx + 1} of ${items.length}`}
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
              aria-label="Next item"
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

      {/* Item Descriptions moved to integrated caption bar - no separate text block needed */}

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
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const thirdWidth = rect.width / 3;

            // Left third = previous, Right third = next, Center = close
            if (currentItem.type === "image") {
              if (clickX < thirdWidth && items.length > 1) {
                handlePrevious();
              } else if (clickX > thirdWidth * 2 && items.length > 1) {
                handleNext();
              } else {
                setIsFullscreen(false);
              }
            } else {
              // Videos just close on click
              setIsFullscreen(false);
            }
          }}
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
                controls={!hideControls}
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

          {/* Auto-advance progress bar for images */}
          {currentItem.type === "image" && items.length > 1 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: 2,
                background: "rgba(255, 255, 255, 0.6)",
                animation: "progress 4s linear forwards",
              }}
            >
              <style>{`
                @keyframes progress {
                  from { width: 0%; }
                  to { width: 100%; }
                }
              `}</style>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
