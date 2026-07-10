import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface ProudMoment {
  src: string;
  srcWebp: string;
  alt: string;
  label: string;
}

interface ProudMomentsCarouselProps {
  moments: ProudMoment[];
}

const ProudMomentsCarousel: FC<ProudMomentsCarouselProps> = ({ moments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % moments.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
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
          padding-bottom: 100%;
          background: ${tokens.color.offWhite};
          overflow: hidden;
        }

        .carousel-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          filter: grayscale(1) brightness(1.15);
          transition: filter 0.3s ease;
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
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
          z-index: 5;
        }

        .carousel-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .carousel-indicator.active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-image,
          .carousel-nav,
          .carousel-indicator {
            transition: none !important;
          }
        }
      `}</style>

      <div className="carousel-container" onMouseEnter={() => {}}>
        <div className="carousel-image-wrapper">
          <picture>
            <source srcSet={currentMoment.srcWebp} type="image/webp" />
            <img
              src={currentMoment.src}
              alt={currentMoment.alt}
              className="carousel-image"
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
                  onClick={() => setCurrentIndex(idx)}
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
