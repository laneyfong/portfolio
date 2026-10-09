import type { FC } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle: FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "relative",
        width: "54px",
        height: "28px",
        border: "none",
        background: isDarkMode ? "rgba(100, 100, 100, 0.3)" : "rgba(200, 200, 200, 0.4)",
        borderRadius: "100px",
        cursor: "pointer",
        padding: "3px",
        transition: "background 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        boxShadow: isDarkMode
          ? "inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 12px rgba(100, 150, 255, 0.1)"
          : "inset 0 1px 3px rgba(255, 255, 255, 0.2), 0 0 12px rgba(255, 180, 0, 0.1)",
      }}
      aria-label="Toggle dark mode"
    >
      <style>{`
        @keyframes toggle-slide-left {
          from { transform: translateX(24px); }
          to { transform: translateX(0); }
        }

        @keyframes toggle-slide-right {
          from { transform: translateX(0); }
          to { transform: translateX(24px); }
        }

        @keyframes icon-pop-in {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
          }
          70% {
            transform: scale(1.15) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes icon-spin-out {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(180deg);
          }
        }

        .toggle-thumb {
          position: absolute;
          width: 22px;
          height: 22px;
          background: #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .toggle-icon-small {
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .toggle-icon-small svg {
          width: 100%;
          height: 100%;
          stroke: #333333;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          position: absolute;
        }

        .icon-enter {
          animation: icon-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .icon-exit {
          animation: icon-spin-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div
        className="toggle-thumb"
        style={{
          left: isDarkMode ? "29px" : "3px",
        }}
      >
        <div className="toggle-icon-small">
          {isDarkMode ? (
            // Moon icon
            <svg key="moon" viewBox="0 0 24 24" className="icon-enter">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            // Sun icon
            <svg key="sun" viewBox="0 0 24 24" className="icon-enter">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;
