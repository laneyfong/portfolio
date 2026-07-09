import type { FC } from "react";
import { tokens } from "../tokens";

const LoadingDots: FC = () => {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes dot1Active {
          0%, 25%, 100% { background-color: ${tokens.color.muted}; }
          0.01%, 24.99% { background-color: #2a2a2a; }
        }

        @keyframes dot2Active {
          0%, 100% { background-color: ${tokens.color.muted}; }
          25%, 49.99% { background-color: #2a2a2a; }
          50%, 100% { background-color: ${tokens.color.muted}; }
        }

        @keyframes dot3Active {
          0%, 100% { background-color: ${tokens.color.muted}; }
          50%, 74.99% { background-color: #2a2a2a; }
          75%, 100% { background-color: ${tokens.color.muted}; }
        }

        @keyframes dot4Active {
          0%, 100% { background-color: ${tokens.color.muted}; }
          75%, 99.99% { background-color: #2a2a2a; }
          100% { background-color: ${tokens.color.muted}; }
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${tokens.color.muted};
          transition: background-color 0.1s ease;
        }

        .dot:nth-child(1) {
          animation: dot1Active 4s steps(100, end) infinite;
        }

        .dot:nth-child(2) {
          animation: dot2Active 4s steps(100, end) infinite;
        }

        .dot:nth-child(3) {
          animation: dot3Active 4s steps(100, end) infinite;
        }

        .dot:nth-child(4) {
          animation: dot4Active 4s steps(100, end) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dot {
            animation: none !important;
            background-color: ${tokens.color.muted};
          }
        }
      `}</style>

      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

export default LoadingDots;
