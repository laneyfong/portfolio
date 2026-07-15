import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface DashDesignathonCarouselProps {
  images: string[];
}

const DashDesignathonCarousel: FC<DashDesignathonCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <style>{`
        .dash-carousel-container {
          position: relative;
          border-radius: ${tokens.radius.sm};
          overflow: hidden;
          background: ${tokens.color.offWhite};
          border: 1px solid ${tokens.color.cardBorder};
          display: flex;
          flex-direction: column;
          height: 550px;
        }

        .dash-carousel-wrapper {
          position: relative;
          width: 100%;
          flex: 1;
          overflow: hidden;
        }

        .dash-carousel-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: ${tokens.color.offWhite};
        }

        .dash-carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(0, 0, 0, 0.4);
          border: none;
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.2s ease;
        }

        .dash-carousel-nav:hover {
          background: rgba(0, 0, 0, 0.6);
          transform: translateY(-50%) scale(1.05);
        }

        .dash-carousel-nav:active {
          transform: translateY(-50%) scale(0.95);
        }

        .dash-carousel-nav-prev {
          left: 16px;
        }

        .dash-carousel-nav-next {
          right: 16px;
        }

        .dash-carousel-indicators {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 5;
        }

        .dash-carousel-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .dash-carousel-indicator:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        .dash-carousel-indicator.active {
          background: white;
          width: 32px;
          border-radius: 5px;
        }

        .dash-carousel-info {
          padding: 32px;
          background: white;
        }

        .dash-carousel-title {
          font-family: ${tokens.font.sans};
          font-size: 24px;
          font-weight: ${tokens.weight.medium};
          color: ${tokens.color.ink};
          margin: 0 0 12px 0;
        }

        .dash-carousel-subtitle {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.muted};
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dash-carousel-description {
          font-family: ${tokens.font.sans};
          font-size: 16px;
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.body};
          line-height: ${tokens.leading.normal};
          margin: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .dash-carousel-nav,
          .dash-carousel-indicator {
            transition: none !important;
          }
        }
      `}</style>

      <div className="dash-carousel-container">
        <div className="dash-carousel-wrapper">
          <img
            src={images[currentIndex]}
            alt={`Dash Designathon design ${currentIndex + 1}`}
            className="dash-carousel-image"
          />

          {/* Navigation */}
          <button
            className="dash-carousel-nav dash-carousel-nav-prev"
            onClick={goToPrev}
            aria-label="Previous design"
          >
            ←
          </button>
          <button
            className="dash-carousel-nav dash-carousel-nav-next"
            onClick={goToNext}
            aria-label="Next design"
          >
            →
          </button>

          {/* Indicators */}
          <div className="dash-carousel-indicators">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`dash-carousel-indicator ${idx === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to design ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="dash-carousel-info">
          <h3 className="dash-carousel-subtitle">DoorDash Designathon</h3>
          <h2 className="dash-carousel-title">Dash: Accountability Pet</h2>
          <p className="dash-carousel-description">
            We created an accountability pet named Dash to encourage healthier eating habits among college students using food delivery services. The pet grows and thrives based on users' nutritional choices, creating a fun, gamified approach to better dietary decisions. This project won recognition at the DoorDash Designathon for its innovative approach to behavioral change through delightful interactions.
          </p>
        </div>
      </div>
    </>
  );
};

export default DashDesignathonCarousel;
