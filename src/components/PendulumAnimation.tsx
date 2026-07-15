import type { FC } from "react";
import { useState, useEffect } from "react";
import { tokens } from "../tokens";

interface PendulumAnimationProps {
  title?: string;
}

const PendulumAnimation: FC<PendulumAnimationProps> = ({ title = "Pendulum Loading" }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: 400,
        backgroundColor: tokens.color.offWhite,
        borderRadius: tokens.radius.sm,
        border: `1px solid ${tokens.color.cardBorder}`,
        padding: 32,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .pendulum-container {
          display: none;
        }

        .pendulum-pivot {
          position: absolute;
          top: 0;
          left: 50%;
          width: 12px;
          height: 12px;
          backgroundColor: ${tokens.color.ink};
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .pendulum-rod {
          position: absolute;
          top: 6px;
          left: 50%;
          width: 2px;
          height: 180px;
          backgroundColor: ${tokens.color.ink};
          transform-origin: top center;
          animation: swing 2s cubic-bezier(0.42, 0, 0.58, 1) infinite;
        }

        .pendulum-bob {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 32px;
          height: 32px;
          backgroundColor: ${tokens.color.accent};
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 4px 12px rgba(255, 22, 84, 0.2);
        }

        @keyframes swing {
          0%, 100% {
            transform: rotateZ(-35deg);
          }
          50% {
            transform: rotateZ(35deg);
          }
        }

        .pendulum-text {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.medium};
          color: ${tokens.color.muted};
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-align: center;
          margin-bottom: 16px;
        }

        .loading-dots {
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${tokens.color.accent};
          animation: pulse 1.4s ease-in-out infinite;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .dot:nth-child(4) {
          animation-delay: 0.6s;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .completion-message {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          color: ${tokens.color.body};
          text-align: center;
          margin-top: 12px;
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pendulum-rod,
          .dot {
            animation: none !important;
          }
        }
      `}</style>

      <div style={{ width: "100%" }}>
        <h3
          style={{
            margin: "0 0 16px 0",
            fontFamily: tokens.font.sans,
            fontSize: "18px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
            textAlign: "center",
          }}
        >
          {title}
        </h3>

        <div className="pendulum-container">
          <div className="pendulum-pivot" />
          <div className="pendulum-rod">
            <div className="pendulum-bob" />
          </div>
        </div>

        {isLoading ? (
          <>
            <div className="pendulum-text">Loading</div>
            <div className="loading-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </>
        ) : (
          <div className="completion-message">
            Animation complete. Observe the pattern.
          </div>
        )}
      </div>
    </div>
  );
};

export default PendulumAnimation;
