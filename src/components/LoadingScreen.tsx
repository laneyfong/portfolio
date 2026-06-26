import type { FC } from "react";
import { useEffect, useState } from "react";
import { tokens } from "../tokens";
import Logo from "./Logo";

const LoadingScreen: FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loading screen for 1.5 seconds then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: tokens.color.white,
        zIndex: 9999,
        animation: "loadingFadeOut 0.3s ease forwards 1.5s",
      }}
    >
      <style>{`
        @keyframes logoScale {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes logoRotate {
          0% {
            transform: rotate(-10deg) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes logoPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes loadingFadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            pointer-events: none;
          }
        }

        .loading-logo-container {
          animation: logoRotate 1s ease-out forwards;
        }

        .loading-logo-container::after {
          content: '';
          position: absolute;
          inset: -30px;
          border: 2px solid ${tokens.color.accent};
          border-radius: 50%;
          opacity: 0;
          animation: logoPulse 1.5s ease-in-out infinite;
        }
      `}</style>

      <div style={{ position: "relative" }}>
        <div className="loading-logo-container">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
