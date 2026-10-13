import type { FC } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle: FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "relative",
        width: "clamp(32px, 3.5vw, 42px)",
        height: "clamp(18px, 1.8vw, 22px)",
        border: "none",
        background: isDarkMode ? "rgba(100, 100, 100, 0.3)" : "rgba(200, 200, 200, 0.4)",
        borderRadius: "50px",
        cursor: "pointer",
        padding: "2px",
        transition: "background 0.3s ease",
        display: "flex",
        alignItems: "center",
        boxShadow: isDarkMode
          ? "inset 0 1px 2px rgba(0, 0, 0, 0.2)"
          : "inset 0 1px 2px rgba(255, 255, 255, 0.15)",
        outline: "none",
        flexShrink: 0,
      }}
      aria-label="Toggle dark mode"
      onFocus={(e) => {
        (e.currentTarget as HTMLButtonElement).style.outline = "2px solid #4060c8";
        (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px";
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.outline = "none";
      }}
    >
      <style>{`
        button {
          -webkit-tap-highlight-color: transparent;
        }

        button:active {
          filter: none;
        }

        @keyframes toggle-slide-left {
          from { transform: translateX(clamp(10px, 2.5vw, 18px)); }
          to { transform: translateX(0); }
        }

        @keyframes toggle-slide-right {
          from { transform: translateX(0); }
          to { transform: translateX(clamp(10px, 2.5vw, 18px)); }
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
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: none;
          transition: none;
        }

        .toggle-icon-small {
          width: clamp(8px, 1.2vw, 12px);
          height: clamp(8px, 1.2vw, 12px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          flex-shrink: 0;
        }

        .toggle-icon-small svg {
          width: 100%;
          height: 100%;
          stroke: #333333;
          fill: none;
          stroke-width: 2;
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
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Sliding thumb with icon */}
        <div
          style={{
            position: "absolute",
            width: "clamp(12px, 1.5vw, 16px)",
            height: "clamp(12px, 1.5vw, 16px)",
            background: "white",
            borderRadius: "50%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            left: isDarkMode ? "calc(100% - clamp(12px, 1.5vw, 16px) - 2px)" : "2px",
            transition: "left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Icon on the dot */}
          <div className="toggle-icon-small">
            {isDarkMode ? (
              <svg key="moon" viewBox="0 0 24 24" className="icon-enter">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
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
      </div>
    </button>
  );
};

export default DarkModeToggle;
