import type { FC } from "react";
import { useState } from "react";
import { tokens } from "../tokens";

const BudgetSlider: FC = () => {
  const [value, setValue] = useState(33);

  const getEmojiCount = () => {
    if (value >= 66) return 3;
    if (value >= 33) return 2;
    return 1;
  };

  const getCashEmojis = () => {
    const count = getEmojiCount();
    return Array.from({ length: count }, (_, i) => i);
  };

  const getBudgetLabel = () => {
    if (value <= 20) return "Lean";
    if (value <= 40) return "Moderate";
    if (value <= 60) return "Comfortable";
    if (value <= 80) return "Generous";
    return "Unlimited";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        padding: 24,
        borderRadius: tokens.radius.sm,
        backgroundColor: tokens.color.offWhite,
        border: `1px solid ${tokens.color.cardBorder}`,
        minHeight: "350px",
        width: "100%",
        boxSizing: "border-box",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pop-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes dramatic-pop {
          0% {
            transform: scale(0) rotate(-20deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .emoji {
          font-size: 48px;
          display: inline-block;
          margin: 0 8px;
          animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .emoji-third {
          animation: dramatic-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .emoji:nth-child(1) {
          animation-delay: 0s;
        }

        .emoji:nth-child(2) {
          animation-delay: 0.1s;
        }

        .emoji:nth-child(3) {
          animation-delay: 0.2s;
        }

        .emoji-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80px;
        }

        .slider-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        input[type="range"] {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(
            to right,
            ${tokens.color.accent} 0%,
            ${tokens.color.accent} ${value}%,
            #e0e0e0 ${value}%,
            #e0e0e0 100%
          );
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${tokens.color.accent};
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(255, 22, 84, 0.3);
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(255, 22, 84, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${tokens.color.accent};
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(255, 22, 84, 0.3);
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(255, 22, 84, 0.5);
        }

        .slider-label {
          text-align: center;
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.medium};
          color: ${tokens.color.ink};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .budget-info {
          text-align: center;
          font-family: ${tokens.font.sans};
          font-size: 12px;
          color: ${tokens.color.muted};
          opacity: 0.7;
        }

        @media (prefers-reduced-motion: reduce) {
          .emoji {
            animation: none !important;
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* Header */}
      <div>
        <h2
          style={{
            margin: "0 0 8px 0",
            fontFamily: tokens.font.sans,
            fontSize: "18px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
          }}
        >
          Budget Explorer
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            fontFamily: tokens.font.sans,
            color: tokens.color.muted,
            opacity: 0.6,
          }}
        >
          Slide to adjust budget allocation
        </p>
      </div>

      {/* Emoji Display */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
          padding: "24px",
          backgroundColor: tokens.color.white,
          borderRadius: "12px",
          border: `1px solid ${tokens.color.cardBorder}`,
          width: "100%",
          boxSizing: "border-box",
          margin: 0,
          overflow: "hidden",
        }}
      >
        <div className="emoji-container">
          {getCashEmojis().map((index) => (
            <div
              key={index}
              className={`emoji ${index === 2 ? "emoji-third" : ""}`}
              role="img"
              aria-label="cash"
            >
              💰
            </div>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="slider-container">
        <div className="slider-label">{getBudgetLabel()}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Budget slider"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <div className="budget-info">${Math.round((value / 100) * 1000)}k allocation</div>
      </div>
    </div>
  );
};

export default BudgetSlider;
