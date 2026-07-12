import type { FC } from "react";
import { useEffect } from "react";

interface ImageModalProps {
  image: string;
  alt: string;
  title: string;
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ image, alt, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .image-modal-overlay,
          .image-modal-content {
            animation: none !important;
          }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="image-modal-overlay"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          animation: "fadeIn 0.3s ease-out",
          cursor: "pointer",
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label="Close enlarged image"
      >
        {/* Modal Content */}
        <div
          className="image-modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            animation: "scaleIn 0.3s ease-out",
          }}
        >
          {/* Image Container */}
          <div
            style={{
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
              borderRadius: 16,
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >
            <img
              src={image}
              alt={alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: 12,
              }}
            />
          </div>

          {/* Title and Close */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
              paddingRight: 8,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close enlarged image (Esc)"
              style={{
                background: "white",
                border: "none",
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 24,
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              ✕
            </button>
          </div>

          {/* Hint */}
          <div
            style={{
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: 12,
            }}
          >
            Press ESC to close or click outside
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
