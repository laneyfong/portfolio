import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoStackProps {
  photos: Photo[];
  onPhotoChange?: (index: number) => void;
}

const PhotoStack: FC<PhotoStackProps> = ({ photos, onPhotoChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % photos.length;

    // Brief delay for the flip animation
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, 200);

    onPhotoChange?.(nextIndex);
  };

  // Calculate offset for peeking photos
  const stackOffset = 20;
  const stackRotation = 3;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3 / 2",
      }}
    >
      {/* Peeking photos (behind) - always visible */}
      {photos.map((photo, index) => {
        if (index === currentIndex) return null;
        const offset = index > currentIndex ? index - currentIndex : photos.length + index - currentIndex;
        if (offset > 2) return null; // Only show next 2 photos

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: stackOffset * offset,
              left: stackOffset * offset,
              right: -stackOffset * offset,
              bottom: -stackOffset * offset,
              border: "8px solid #ECE7D9",
              borderRadius: 2,
              overflow: "hidden",
              aspectRatio: "3 / 2",
              transform: `rotate(${stackRotation * offset}deg)`,
              zIndex: 1 - offset,
              opacity: 0.7 - offset * 0.2,
              pointerEvents: "none",
              transition: isTransitioning ? "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)" : "none",
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 55%",
                display: "block",
              }}
            />
          </div>
        );
      })}

      {/* Main photo card */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Click to view next photo"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          border: "8px solid #ECE7D9",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: isHovered ? tokens.shadow.cardHoverLarge : tokens.shadow.card,
          transform: isTransitioning ? "rotateY(90deg) scale(0.95)" : isHovered ? "rotate(0deg)" : "rotate(3deg)",
          transition: isTransitioning
            ? "transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            : "transform 0.3s ease, box-shadow 0.22s ease",
          zIndex: 10,
          backgroundColor: tokens.color.offWhite,
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={photos[currentIndex].src}
          alt={photos[currentIndex].alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 55%",
            display: "block",
          }}
        />
      </div>

      {/* Click indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.sm,
          color: tokens.color.muted,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          opacity: isHovered ? 0 : 0.6,
          zIndex: 20,
        }}
      >
        Click to flip
      </div>
    </div>
  );
};

export default PhotoStack;
