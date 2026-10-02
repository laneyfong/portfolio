import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
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

const STORY_DURATION = 5000; // 5 seconds per story

const ImageStory: FC<ImageStoryProps> = ({ images, onImageChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState(new Set([0]));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  // Preload all images on mount for smooth transitions
  useEffect(() => {
    images.forEach((img, idx) => {
      const image = new Image();
      image.src = img.src;
      image.onload = () => {
        setLoadedIndices((prev) => new Set([...prev, idx]));
      };
    });
  }, [images]);

  // Auto-progression effect
  useEffect(() => {
    if (isHovered || isPressed) return; // Pause on hover or press

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    progressRef.current = 0;
    setProgress(0);

    // Start new timer
    timerRef.current = setInterval(() => {
      progressRef.current += 100 / (STORY_DURATION / 50);

      if (progressRef.current >= 100) {
        // Move to next story
        setCurrentIndex((prev) => {
          const newIndex = (prev + 1) % images.length;
          onImageChange?.(newIndex);
          progressRef.current = 0;
          return newIndex;
        });
      } else {
        setProgress(progressRef.current);
      }
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, isPressed, images.length, onImageChange]);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    progressRef.current = 0;
    setProgress(0);
    onImageChange?.(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    progressRef.current = 0;
    setProgress(0);
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
        userSelect: "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onClick={handleNext}
    >
      <img
        src={currentImage.src}
        alt={currentImage.alt}
        decoding="async"
        loading="eager"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: currentIndex === 2 ? "center 65%" : "center",
          display: "block",
          transition: "none",
          filter: loadedIndices.has(currentIndex) ? "blur(0px)" : "blur(4px)",
        }}
      />

      {/* Progress bars at top */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            gap: "4px",
            padding: "8px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)",
            zIndex: 5,
          }}
        >
          {images.map((_, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: "2px",
                background: "rgba(255, 255, 255, 0.4)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "white",
                  width:
                    idx === currentIndex
                      ? `${progress}%`
                      : idx < currentIndex
                      ? "100%"
                      : "0%",
                  transition: "none",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Navigation arrows on hover */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: isHovered ? "flex" : "none",
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
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              cursor: "pointer",
              pointerEvents: "auto",
              transition: "color 0.2s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.color =
                "rgba(255, 255, 255, 1)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.color =
                "rgba(255, 255, 255, 0.7)")
            }
          >
            ←
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              cursor: "pointer",
              pointerEvents: "auto",
              transition: "color 0.2s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.color =
                "rgba(255, 255, 255, 1)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.color =
                "rgba(255, 255, 255, 0.7)")
            }
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
