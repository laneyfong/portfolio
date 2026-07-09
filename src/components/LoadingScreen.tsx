import type { FC } from "react";
import { useEffect, useState } from "react";
import { tokens } from "../tokens";

type Stage = "cursor" | "frame" | "type" | "transition" | "hidden";

const LoadingScreen: FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [stage, setStage] = useState<Stage>("cursor");
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    // Timeline:
    // 0ms: cursor appears
    // 300ms: frame starts appearing
    // 600ms: frame complete, text starts typing
    // 900ms: text complete
    // 1100ms: frame scales and transitions
    // 1900ms: transition complete, page visible
    // 2000ms: loading screen removed

    const stages: Array<{ time: number; stage: Stage }> = [
      { time: 300, stage: "frame" },
      { time: 600, stage: "type" },
      { time: 1100, stage: "transition" },
      { time: 1900, stage: "hidden" },
    ];

    stages.forEach(({ time, stage: nextStage }) => {
      setTimeout(() => setStage(nextStage), time);
    });

    // Typing animation
    const fullText = "Designing intentionally.\nFor humans.";
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setTypedText(fullText.slice(0, charIndex));
        charIndex++;
      }
    }, 40); // Natural typing speed

    setTimeout(() => {
      clearInterval(typeInterval);
      onLoadingComplete();
    }, 2000);

    return () => clearInterval(typeInterval);
  }, [onLoadingComplete]);

  if (stage === "hidden") return null;

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
        opacity: stage === "transition" ? 0 : 1,
        transition: stage === "transition" ? "opacity 0.8s ease-out" : "none",
      }}
    >
      <style>{`
        @keyframes blink {
          0%, 49%, 100% { opacity: 1; }
          50%, 99% { opacity: 0; }
        }

        @keyframes frameAppear {
          from {
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
            opacity: 0;
          }
          to {
            stroke-dasharray: 600;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes frameScale {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes textFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .loading-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: ${tokens.color.ink};
          animation: blink 1s infinite;
          margin-left: 4px;
        }

        .loading-frame-svg {
          position: absolute;
          animation: ${stage === "transition" ? "frameScale 0.8s ease-out forwards" : "none"};
          animation-delay: ${stage === "transition" ? "0s" : "0s"};
        }

        .loading-frame-rect {
          animation: ${stage === "frame" || stage === "type" || stage === "transition" ? "frameAppear 0.3s ease-out forwards" : "none"};
          animation-delay: ${stage === "cursor" ? "-0.3s" : "0s"};
        }

        .loading-text {
          position: absolute;
          text-align: center;
          white-space: pre-line;
          animation: ${stage === "transition" ? "textFadeOut 0.6s ease-out forwards" : "none"};
          animation-delay: ${stage === "transition" ? "0.2s" : "0s"};
        }

        .loading-text-line1 {
          font-family: ${tokens.font.sans};
          font-size: 18px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.ink};
          margin: 0;
          line-height: 1.4;
        }

        .loading-text-line2 {
          margin-top: 4px;
        }

        .loading-text-humans {
          font-family: ${tokens.font.serifItalic};
          font-style: italic;
          font-weight: 400;
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-cursor,
          .loading-frame-svg,
          .loading-frame-rect,
          .loading-text {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* Stage 1: Cursor */}
      {stage === "cursor" && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: 18,
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              letterSpacing: tokens.tracking.tight,
              height: 28,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="loading-cursor" />
          </div>
        </div>
      )}

      {/* Stage 2+: Frame with text */}
      {(stage === "frame" || stage === "type" || stage === "transition") && (
        <>
          {/* Design Frame */}
          <svg
            className="loading-frame-svg"
            width="480"
            height="280"
            viewBox="0 0 480 280"
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
            }}
          >
            <rect
              className="loading-frame-rect"
              x="1"
              y="1"
              width="478"
              height="278"
              fill="none"
              stroke={tokens.color.ink}
              strokeWidth="1"
              rx="12"
              ry="12"
            />
          </svg>

          {/* Text inside frame */}
          {(stage === "type" || stage === "transition") && (
            <div
              className="loading-text"
              style={{
                width: 400,
                lineHeight: 1.4,
              }}
            >
              <div className="loading-text-line1">Designing intentionally.</div>
              <div className="loading-text-line1 loading-text-line2">
                For <span className="loading-text-humans">humans</span>.
              </div>

              {(stage === "type" || stage === "transition") && (
                <div
                  style={{
                    display: "inline-block",
                    marginLeft: 4,
                    marginTop: 4,
                  }}
                >
                  <span className="loading-cursor" />
                </div>
              )}

              {/* Display typed text with blinking cursor */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  width: 400,
                  margin: "0 auto",
                  whiteSpace: "pre-line",
                  minHeight: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: stage === "transition" ? 0 : 1,
                  transition: stage === "transition" ? "opacity 0.3s ease-out" : "none",
                }}
              >
                <div>
                  {typedText.split("\n").map((line, idx) => (
                    <div
                      key={idx}
                      className={`loading-text-line1 ${idx === 1 ? "loading-text-line2" : ""}`}
                    >
                      {idx === 1 ? (
                        <>
                          For{" "}
                          <span className="loading-text-humans">
                            {line.replace("For ", "")}
                          </span>
                        </>
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                  {typedText.length < "Designing intentionally.\nFor humans.".length && (
                    <span className="loading-cursor" />
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoadingScreen;
