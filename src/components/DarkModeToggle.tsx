import type { FC } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle: FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "relative",
        width: "138px",
        height: "66px",
        border: "none",
        background: "rgba(217, 217, 217, 0.2)",
        borderRadius: "100px",
        cursor: "pointer",
        padding: 0,
        transition: "background 0.3s ease",
        display: "flex",
        alignItems: "center",
      }}
      aria-label="Toggle dark mode"
    >
      <style>{`
        .toggle-thumb {
          position: absolute;
          width: 56px;
          height: 56px;
          top: 5px;
          background: #FFFFFF;
          border-radius: 50%;
          transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .toggle-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .lightbulb {
          width: 20px;
          height: 24px;
          stroke: #222222;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .moon-slash {
          width: 20px;
          height: 24px;
          position: relative;
        }

        .moon-slash svg {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      {/* Thumb */}
      <div
        className="toggle-thumb"
        style={{
          left: isDarkMode ? "75px" : "7px",
        }}
      >
        {/* Icons */}
        <div className="toggle-icon">
          {isDarkMode ? (
            // Moon with slash icon
            <div className="moon-slash">
              <svg viewBox="0 0 24 24" className="lightbulb">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M17 8l-5 5-5-5" />
              </svg>
              {/* Slash */}
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  top: "-2px",
                  left: "-2px",
                }}
              >
                <line
                  x1="4"
                  y1="4"
                  x2="20"
                  y2="20"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ) : (
            // Light bulb icon
            <svg viewBox="0 0 24 24" className="lightbulb">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-20C6.48 1 4 3.48 4 6c0 2.85 2.92 5.21 6 5.69V16h2V11.69c3.08-.48 6-2.84 6-5.69 0-2.52-2.48-5-5.5-5z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;
