import type { FC } from "react";
import { tokens } from "../tokens";

const LoadingDots: FC = () => {
  return (
    <div style={{ display: "flex", gap: "28px", alignItems: "center", justifyContent: "center", minHeight: "80px" }}>
      <style>{`
        @keyframes pendulum {
          0% { transform: translateX(0) rotateZ(0deg); opacity: 0.4; }
          25% { transform: translateX(-12px) rotateZ(-8deg); opacity: 0.7; }
          50% { transform: translateX(0) rotateZ(0deg); opacity: 1; }
          75% { transform: translateX(12px) rotateZ(8deg); opacity: 0.7; }
          100% { transform: translateX(0) rotateZ(0deg); opacity: 0.4; }
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${tokens.color.muted};
          opacity: 0.4;
        }

        .dot:nth-child(1) {
          animation: pendulum 2.4s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          animation-delay: 0s;
        }

        .dot:nth-child(2) {
          animation: pendulum 2.4s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          animation-delay: 0.1s;
        }

        .dot:nth-child(3) {
          animation: pendulum 2.4s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          animation-delay: 0.2s;
        }

        .dot:nth-child(4) {
          animation: pendulum 2.4s cubic-bezier(0.42, 0, 0.58, 1) infinite;
          animation-delay: 0.3s;
        }

        @media (prefers-reduced-motion: reduce) {
          .dot {
            animation: none !important;
            opacity: 0.4;
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
