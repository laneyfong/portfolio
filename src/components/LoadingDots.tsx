import type { FC } from "react";
import { tokens } from "../tokens";

const LoadingDots: FC = () => {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }}>
      <style>{`
        @keyframes dotJump {
          0% { opacity: 0.4; }
          100% { opacity: 0.4; }
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${tokens.color.muted};
        }

        .dot.active {
          background-color: #2a2a2a;
          animation: dotJump 4s steps(1, end) infinite;
        }

        .dot:nth-child(1).active {
          animation-delay: 0s;
        }

        .dot:nth-child(2).active {
          animation-delay: -3s;
        }

        .dot:nth-child(3).active {
          animation-delay: -2s;
        }

        .dot:nth-child(4).active {
          animation-delay: -1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .dot.active {
            animation: none;
          }
          .dot.active {
            background-color: ${tokens.color.muted};
          }
        }
      `}</style>

      <div className="dot active" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

export default LoadingDots;
