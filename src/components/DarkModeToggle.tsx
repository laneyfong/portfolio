import type { FC } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle: FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "relative",
        width: "48px",
        height: "28px",
        border: "none",
        background: isDarkMode ? "rgba(60, 60, 60, 0.4)" : "rgba(217, 217, 217, 0.3)",
        borderRadius: "100px",
        cursor: "pointer",
        padding: 0,
        transition: "background 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: isDarkMode ? "flex-end" : "flex-start",
        paddingRight: isDarkMode ? "4px" : "0",
        paddingLeft: isDarkMode ? "0" : "4px",
      }}
      aria-label="Toggle dark mode"
    >
      <style>{`
        .toggle-icon-small {
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
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
        }

        [data-theme="dark"] .toggle-icon-small svg {
          stroke: #D0D0D0;
        }
      `}</style>

      {isDarkMode ? (
        // Moon icon
        <div className="toggle-icon-small">
          <svg viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      ) : (
        // Sun icon
        <div className="toggle-icon-small">
          <svg viewBox="0 0 24 24">
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
        </div>
      )}
    </button>
  );
};

export default DarkModeToggle;
