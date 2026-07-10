import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoStackProps {
  photos: (Photo & { label?: string })[];
  onPhotoChange?: (index: number) => void;
}

const PhotoStack: FC<PhotoStackProps> = ({ photos, onPhotoChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    setIsTransitioning(true);
    const nextIndex = (currentIndex + 1) % photos.length;

    // Delay for shuffle animation
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, 400);

    onPhotoChange?.(nextIndex);
  };

  // Calculate offset for peeking photos
  const stackOffset = 20;
  const peekRotations = [5, 8]; // Increasing rotation angles for peeking photos

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

        // Get rotation angle based on offset position
        const rotationAngle = peekRotations[offset - 1] || 8;

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
              transform: isTransitioning
                ? `translate(${-stackOffset * (offset - 1)}px, ${-stackOffset * (offset - 1)}px) rotate(0deg)`
                : `rotate(${rotationAngle}deg)`,
              zIndex: 1 - offset,
              opacity: isTransitioning ? (0.7 - offset * 0.2) : (0.7 - offset * 0.2),
              pointerEvents: "none",
              transition: isTransitioning ? "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
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
          borderTop: "8px solid #ECE7D9",
          borderLeft: "8px solid #ECE7D9",
          borderRight: "8px solid #ECE7D9",
          borderBottom: "28px solid #ECE7D9",
          borderRadius: 2,
          overflow: "hidden",
          boxSizing: "border-box",
          boxShadow: isHovered ? tokens.shadow.cardHoverLarge : tokens.shadow.card,
          transform: isTransitioning ? "translateY(-120px) rotateX(20deg)" : "translateY(0) rotateX(0)",
          transition: isTransitioning
            ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
            : "transform 0.3s ease, box-shadow 0.22s ease",
          zIndex: 10,
          backgroundColor: "#ECE7D9",
          display: "flex",
          flexDirection: "column",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
            overflow: "hidden",
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
