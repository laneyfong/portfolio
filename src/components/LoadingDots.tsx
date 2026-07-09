import type { FC } from "react";
import { tokens } from "../tokens";

const LoadingDots: FC = () => {
  return (
    <div style={{ display: "flex", gap: "28px", alignItems: "center", justifyContent: "center", minHeight: "80px" }}>
      <style>{`
        @keyframes hopToPosition1 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }

        @keyframes hopToPosition2 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }

        @keyframes hopToPosition3 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }

        @keyframes hopToPosition4 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${tokens.color.muted};
          opacity: 0.3;
        }

        .dot:nth-child(1) {
          animation: hopToPosition1 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        .dot:nth-child(2) {
          animation: hopToPosition2 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          animation-delay: -3s;
        }

        .dot:nth-child(3) {
          animation: hopToPosition3 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          animation-delay: -2s;
        }

        .dot:nth-child(4) {
          animation: hopToPosition4 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
          animation-delay: -1s;
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
