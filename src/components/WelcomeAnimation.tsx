import type { FC } from "react";
import { useEffect, useState } from "react";
import { tokens } from "../tokens";

const WelcomeAnimation: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showMessage, setShowMessage] = useState(true);
  const [messagePhase, setMessagePhase] = useState<"fadeIn" | "fadeOut">("fadeIn");

  useEffect(() => {
    // Shorter, lighter welcome animation:
    // 0-600ms: Message fades in
    // 600-1500ms: Message holds on screen (900ms)
    // 1500-2100ms: Message fades out with upward motion (600ms)
    // ~2100ms: All done, complete callback

    // Phase 1: Hold text until it's time to fade out
    const fadeOutTimer = setTimeout(() => {
      setMessagePhase("fadeOut");
    }, 1500);

    // Phase 2: Hide message and trigger completion
    const completeTimer = setTimeout(() => {
      setShowMessage(false);
      onComplete();
    }, 2100);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!showMessage) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: tokens.color.white,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes welcomeFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes welcomeFadeUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @keyframes textShine {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .welcome-message {
          text-align: center;
          animation: welcomeFadeIn 0.6s ease-in-out forwards;
        }

        .welcome-message.fade-out {
          animation: welcomeFadeUp 0.6s ease-in-out forwards;
        }

        .welcome-line {
          font-family: ${tokens.font.sans};
          font-size: 28px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          line-height: 1.3;
          margin: 0;
          position: relative;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgb(255, 0, 0) 12%,
            rgb(255, 127, 0) 25%,
            rgb(255, 255, 0) 37%,
            rgb(0, 255, 0) 50%,
            rgb(0, 0, 255) 62%,
            rgb(75, 0, 130) 75%,
            rgb(148, 0, 211) 87%,
            transparent 100%
          );
          background-size: 1000px 100%;
          background-position: -1000px 0;
          background-clip: text;
          -webkit-background-clip: text;
          animation: textShine 2.4s ease-in-out infinite;
        }

        .welcome-line + .welcome-line {
          margin-top: 16px;
        }

        .welcome-message.fade-out .welcome-line {
          animation: none !important;
          background: none !important;
        }

        @media (max-width: 640px) {
          .welcome-line {
            font-size: 24px;
          }
          .welcome-line + .welcome-line {
            margin-top: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .welcome-message,
          .welcome-message.fade-out {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .welcome-line {
            animation: none !important;
            background: none !important;
          }
        }
      `}</style>

      <div className={`welcome-message ${messagePhase === "fadeOut" ? "fade-out" : ""}`}>
        <p className="welcome-line">Designing with intention.</p>
        <p className="welcome-line">Creating for people.</p>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
