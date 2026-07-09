import type { FC } from "react";
import { useEffect, useState } from "react";
import { tokens } from "../tokens";

type Stage = "text" | "badge" | "done";

const LoadingScreen: FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [stage, setStage] = useState<Stage>("text");

  useEffect(() => {
    // Text phase: 400ms
    // Badge enter: 500ms
    // Total loading: ~1300ms

    const textTimer = setTimeout(() => {
      setStage("badge");
    }, 400);

    const doneTimer = setTimeout(() => {
      setStage("done");
    }, 1250);

    const callbackTimer = setTimeout(() => {
      onLoadingComplete();
    }, 1300);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(doneTimer);
      clearTimeout(callbackTimer);
    };
  }, [onLoadingComplete]);

  if (stage === "done") return null;

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
        pointerEvents: stage !== "text" && stage !== "badge" ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes textFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes textFadeUpOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        @keyframes badgeEnter {
          from {
            opacity: 0;
            transform: translateY(120px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loading-text-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .loading-text-name {
          font-family: ${tokens.font.sans};
          font-size: 28px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.ink};
          margin: 0;
          line-height: 1.2;
          animation: textFadeIn 0.25s ease-out 0.05s both;
        }

        .loading-text-role {
          font-family: ${tokens.font.sans};
          font-size: 16px;
          font-weight: ${tokens.weight.regular};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          margin: 0;
          line-height: 1.2;
          animation: textFadeIn 0.25s ease-out 0.1s both;
        }

        .loading-badge-placeholder {
          width: 240px;
          aspect-ratio: 2.125 / 3.370;
          background: ${tokens.color.white};
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08);
          animation: badgeEnter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation-delay: 0.4s;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 100%;
          height: 100%;
          justify-content: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-text-name,
          .loading-text-role,
          .loading-badge-placeholder {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="loading-content">
        {stage === "text" && (
          <div className="loading-text-container">
            <h1 className="loading-text-name">Laney Fong</h1>
            <p className="loading-text-role">Product Designer</p>
          </div>
        )}

        {stage !== "text" && (
          <div className="loading-badge-placeholder" />
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
