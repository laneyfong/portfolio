import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

interface MyShakeCardProps {
  defaultImage: string;
  alertImage: string;
  detailsImage: string;
  caption: string;
  captionItalic: string;
  roleOutcome: string;
  to: string;
}

const MyShakeCard: FC<MyShakeCardProps> = ({
  defaultImage,
  alertImage,
  detailsImage,
  caption,
  captionItalic,
  roleOutcome,
  to,
}) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const captionParts = caption.split(captionItalic);

  return (
    <>
      <style>{`
        @keyframes slideOutLeft {
          from {
            opacity: 0;
            visibility: visible;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 0;
            visibility: visible;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
          }
        }

        .myshake-card-container {
          position: relative;
          height: 650px;
          display: flex;
          flex-direction: column;
        }

        .myshake-image-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 12px;
          overflow: hidden;
          position: relative;
          border-radius: 14px;
          background: ${tokens.color.offWhite};
          gap: 2px;
        }

        .myshake-center-image {
          width: 40%;
          height: 100%;
          object-fit: contain;
          border-radius: 14px;
          transition: transform 0.22s ease;
        }

        .myshake-left-screen {
          width: 22%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          animation: ${hovered ? "slideOutLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
        }

        .myshake-right-screen {
          width: 26%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          animation: ${hovered ? "slideOutRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
        }

        @media (prefers-reduced-motion: reduce) {
          .myshake-left-screen,
          .myshake-right-screen {
            animation: none !important;
            opacity: ${hovered ? 1 : 0};
            transition: opacity 0.2s ease;
          }
        }
      `}</style>

      <div
        className="myshake-card-container"
        role="link"
        tabIndex={0}
        onClick={() => navigate(to)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(to);
          }
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: tokens.radius.sm,
          cursor: "pointer",
          backgroundColor: tokens.color.offWhite,
          border: `1px solid ${tokens.color.cardBorder}`,
          color: hovered ? "#ffffff" : tokens.color.body,
          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: hovered ? "translateY(-2px) scale(1.005)" : "translateY(0) scale(1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 24,
            padding: "12px 12px 0px 12px",
            flex: "0 0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: "16px",
              color: tokens.color.body,
              lineHeight: tokens.leading.snug,
              flex: 1,
              transition: "color 0.32s ease",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {captionParts[0]}
            <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>
              {captionItalic}
            </em>
            {captionParts[1]}
          </span>
        </div>

        {/* Image Section with Consistent Flex Layout */}
        <div className="myshake-image-section">
          {/* Left Alert Screen - Always in Layout, Hidden by Default */}
          <div className="myshake-left-screen">
            <img src={alertImage} alt="MyShake earthquake alert" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          {/* Center Screen - Always Visible */}
          <img src={defaultImage} alt="MyShake pinned locations" className="myshake-center-image" />

          {/* Right Details Screen - Always in Layout, Hidden by Default */}
          <div className="myshake-right-screen">
            <img src={detailsImage} alt="MyShake earthquake details" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "12px 12px 16px 12px",
            borderTop: `1px solid ${tokens.color.cardBorder}`,
            transition: "border-color 0.5s ease",
            flex: "0 0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: "12px",
              color: tokens.color.muted,
              letterSpacing: tokens.tracking.tight,
              textTransform: "uppercase",
              lineHeight: tokens.leading.none,
              transition: "color 0.5s ease",
            }}
          >
            {roleOutcome}
          </span>
        </div>
      </div>
    </>
  );
};

export default MyShakeCard;
