import type { FC } from "react";
import { useEffect, useState } from "react";

const LOADING_DURATION = 1800; // 1.8 seconds

const LoadingScreen: FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const animationFrame = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / LOADING_DURATION) * 100, 100);
      setProgress(percentage);

      if (percentage >= 100) {
        clearInterval(animationFrame);
      }
    }, 16); // ~60fps

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, LOADING_DURATION - 300); // Start fade 300ms before complete

    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, LOADING_DURATION);

    return () => {
      clearInterval(animationFrame);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#FAFAF8",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-out",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=Manrope:wght@400;500&display=swap');

        @keyframes dotPulse {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        @keyframes grainShift {
          0% {
            backgroundPosition: 0 0;
          }
          100% {
            backgroundPosition: 100px 100px;
          }
        }

        @keyframes textFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .loading-grain {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          backgroundImage: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" /></filter><rect width="100%" height="100%" fill="%23000" filter="url(%23noise)"/></svg>');
          animation: grainShift 8s linear infinite;
          pointerEvents: none;
        }

        .loading-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
        }

        .loading-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: textFadeIn 0.8s ease-out;
        }

        .loading-micro {
          font-family: 'Manrope', sans-serif;
          font-size: 10px;
          letter-spacing: 1.2px;
          color: #3A3A3A;
          font-weight: 500;
          text-transform: uppercase;
          line-height: 1.4;
        }

        .loading-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
          padding: 0 48px;
        }

        .loading-title {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(36px, 7vw, 56px);
          font-weight: 400;
          color: #111111;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0;
          animation: textFadeIn 0.8s ease-out 0.1s both;
        }

        .loading-title-serif {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
        }

        .loading-progress-container {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
          animation: textFadeIn 0.8s ease-out 0.2s both;
        }

        .loading-progress-line {
          flex: 1;
          height: 1px;
          background: #E8E8E6;
          position: relative;
          overflow: hidden;
        }

        .loading-progress-fill {
          height: 100%;
          background: #111111;
          width: ${progress}%;
          transition: width 0.016s linear;
        }

        .loading-dots {
          display: flex;
          gap: 8px;
          position: absolute;
          left: ${progress}%;
          top: -4px;
          transform: translateX(-50%);
        }

        .loading-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4A9EFF;
          opacity: 0;
        }

        .loading-dot:nth-child(1) {
          animation: dotPulse 0.6s ease-out ${progress > 20 ? "0s" : "0s"} both;
        }

        .loading-dot:nth-child(2) {
          animation: dotPulse 0.6s ease-out ${progress > 50 ? "0.1s" : "0s"} both;
        }

        .loading-dot:nth-child(3) {
          animation: dotPulse 0.6s ease-out ${progress > 80 ? "0.2s" : "0s"} both;
        }

        .loading-footer {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          animation: textFadeIn 0.8s ease-out 0.3s both;
        }

        .loading-mono {
          font-family: 'Manrope', monospace;
          font-size: 10px;
          letter-spacing: 1.2px;
          color: #3A3A3A;
          font-weight: 400;
          text-transform: uppercase;
          line-height: 1.4;
        }
      `}</style>

      <div className="loading-grain" />

      <div className="loading-container">
        {/* Header */}
        <div className="loading-header">
          <div className="loading-micro">Laney Fong</div>
          <div className="loading-micro">UX Designer</div>
          <div className="loading-micro">San Francisco</div>
        </div>

        {/* Center */}
        <div className="loading-center">
          <h1 className="loading-title">
            Preparing
            <br />
            <span className="loading-title-serif">meaningful</span>
            <br />
            experiences.
          </h1>

          <div className="loading-progress-container">
            <div className="loading-progress-line">
              <div className="loading-progress-fill" />
              <div className="loading-dots">
                <div className="loading-dot" />
                <div className="loading-dot" />
                <div className="loading-dot" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="loading-footer">
          <div className="loading-mono">Archive_2026</div>
          <div className="loading-mono">Loading Experience</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
