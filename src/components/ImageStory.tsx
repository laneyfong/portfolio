import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

interface StoryImage {
  src: string;
  srcWebp?: string;
  alt: string;
  label?: string;
}

interface ImageStoryProps {
  images: StoryImage[];
  onImageChange?: (index: number) => void;
}

const ImageStory: FC<ImageStoryProps> = ({ images, onImageChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    onImageChange?.(newIndex);
  };

  const currentImage = images[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "3 / 2",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: tokens.color.offWhite,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNext}
    >
      <style>{`
        @keyframes storyFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .image-story-img {
          animation: storyFade 0.3s ease;
        }
      `}</style>

      <picture>
        {currentImage.srcWebp && (
          <source srcSet={currentImage.srcWebp} type="image/webp" />
        )}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="image-story-img"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.2s ease",
            transform: isHovered ? "scale(1.02)" : "scale(1)",
          }}
        />
      </picture>

      {/* Progress bar at top */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            gap: "3px",
            padding: "8px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
            zIndex: 5,
          }}
        >
          {images.map((_, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: "2px",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "white",
                  width: idx <= currentIndex ? "100%" : "0%",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Navigation overlay hint */}
      {isHovered && images.length > 1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: "bold",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            ←
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: "bold",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            →
          </div>
        </div>
      )}

      {/* Counter at bottom */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "white",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "12px",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            backdropFilter: "blur(4px)",
            zIndex: 5,
          }}
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageStory;
