import type { FC } from "react";
import { useState, useEffect } from "react";
import { tokens } from "../tokens";

interface ProudMoment {
  src: string;
  srcWebp: string;
  alt: string;
  label: string;
}

interface ProudMomentsCarouselProps {
  moments: ProudMoment[];
  onIndexChange?: (index: number) => void;
}

const STORY_DURATION = 8000; // 8 seconds per story

const ProudMomentsCarousel: FC<ProudMomentsCarouselProps> = ({ moments, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-progression effect
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / STORY_DURATION) * 50; // Update every 50ms
        if (newProgress >= 100) {
          // Move to next story
          setCurrentIndex((prev) => {
            const newIndex = (prev + 1) % moments.length;
            onIndexChange?.(newIndex);
            return newIndex;
          });
          return 0;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered, moments.length, onIndexChange]);

  // Reset progress when index changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % moments.length;
    setCurrentIndex(newIndex);
    setProgress(0);
    onIndexChange?.(newIndex);
  };

  const goToPrev = () => {
    const newIndex = (currentIndex - 1 + moments.length) % moments.length;
    setCurrentIndex(newIndex);
    setProgress(0);
    onIndexChange?.(newIndex);
  };

  const currentMoment = moments[currentIndex];

  return (
    <>
      <style>{`
        .carousel-container {
          position: relative;
          border-radius: ${tokens.radius.sm};
          overflow: hidden;
          cursor: pointer;
        }

        .carousel-image-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 50%;
          background: ${tokens.color.offWhite};
          overflow: hidden;
        }

        .carousel-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          filter: grayscale(1) brightness(1.15);
          transition: filter 0.3s ease;
          cursor: pointer;
        }

        .carousel-container:hover .carousel-image {
          filter: grayscale(0) brightness(1.1);
        }

        .carousel-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          color: white;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          z-index: 5;
          line-height: 1.5;
        }

        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(0, 0, 0, 0.3);
          border: none;
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.2s ease;
        }

        .carousel-nav:hover {
          background: rgba(0, 0, 0, 0.5);
          transform: translateY(-50%) scale(1.05);
        }

        .carousel-nav:active {
          transform: translateY(-50%) scale(0.95);
        }

        .carousel-nav-prev {
          left: 12px;
        }

        .carousel-nav-next {
          right: 12px;
        }

        .carousel-indicators {
          display: none;
        }

        .carousel-indicator {
          display: none;
        }

        .carousel-indicator.active {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-image,
          .carousel-nav,
          .carousel-indicator {
            transition: none !important;
          }
        }
      `}</style>

      <div
        className="carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Story progress bars at top */}
        {moments.length > 1 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              display: "flex",
              gap: "4px",
              padding: "8px",
              zIndex: 20,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
              borderRadius: `${tokens.radius.sm} ${tokens.radius.sm} 0 0`,
            }}
          >
            {moments.map((_, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: "5px",
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "white",
                    width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? "100%" : "0%",
                    transition: idx === currentIndex ? "none" : "width 0.3s ease",
                    boxShadow: idx === currentIndex ? "0 0 8px rgba(255, 255, 255, 0.6)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <div className="carousel-image-wrapper">
          <picture>
            <source srcSet={currentMoment.srcWebp} type="image/webp" />
            <img
              src={currentMoment.src}
              alt={currentMoment.alt}
              className="carousel-image"
              onClick={goToNext}
            />
          </picture>

          <div className="carousel-label">{currentMoment.label}</div>

          {/* Navigation Arrows */}
          {moments.length > 1 && (
            <>
              <button
                className="carousel-nav carousel-nav-prev"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                className="carousel-nav carousel-nav-next"
                onClick={goToNext}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          {/* Indicators */}
          {moments.length > 1 && (
            <div className="carousel-indicators">
              {moments.map((_, idx) => (
                <button
                  key={idx}
                  className={`carousel-indicator ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    onIndexChange?.(idx);
                  }}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProudMomentsCarousel;
