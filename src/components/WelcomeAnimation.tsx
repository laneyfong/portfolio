import type { FC } from "react";
import { useEffect, useState } from "react";
import { tokens } from "../tokens";

const WelcomeAnimation: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showMessage, setShowMessage] = useState(true);
  const [messagePhase, setMessagePhase] = useState<"fadeIn" | "fadeOut">("fadeIn");

  useEffect(() => {
    // Timeline (slower, more intentional):
    // 0-1000ms: Message fades in slowly and smoothly
    // 1000-2200ms: Message holds on screen (1200ms - longer pause)
    // 2200-3000ms: Message fades out with upward motion (800ms - slow fade)
    // ~3100ms: All done, complete callback

    // Phase 1: Hold text until it's time to fade out
    const fadeOutTimer = setTimeout(() => {
      setMessagePhase("fadeOut");
    }, 2200);

    // Phase 2: Hide message and trigger completion
    const completeTimer = setTimeout(() => {
      setShowMessage(false);
      onComplete();
    }, 3100);

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

        .welcome-message {
          text-align: center;
          animation: welcomeFadeIn 1s ease-in-out forwards;
        }

        .welcome-message.fade-out {
          animation: welcomeFadeUp 0.8s ease-in-out forwards;
        }

        .welcome-line {
          font-family: ${tokens.font.sans};
          font-size: 28px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.ink};
          line-height: 1.3;
          margin: 0;
        }

        .welcome-line + .welcome-line {
          margin-top: 16px;
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
