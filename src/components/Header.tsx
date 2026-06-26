import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const ROUTES: Record<string, string> = {
  Work: "/",
  About: "/about",
  Lab: "/lab",
  Resume: "/resume",
};

const NAV_ITEMS = ["Work", "About", "Lab", "Resume"];

const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const getActive = () => {
    switch (location.pathname) {
      case "/about":
        return "About";
      case "/lab":
        return "Lab";
      case "/resume":
        return "Resume";
      default:
        return "Work";
    }
  };

  const active = getActive();

  const handleSelect = (item: string) => {
    const path = ROUTES[item];
    if (path) navigate(path);
  };


  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(250, 250, 248, 0.8)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital@0;1&display=swap');

        .nav-link {
          position: relative;
          color: #3A3A3A;
          text-decoration: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link:hover {
          color: #111111;
        }

        .nav-link-underline {
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          background: #111111;
          transform-origin: left;
          animation: expandUnderline 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .nav-link.active {
          color: #111111;
          font-weight: 500;
        }

        .nav-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #4A9EFF;
          animation: dotPulse 0.4s ease-out forwards;
        }

        @keyframes expandUnderline {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes dotPulse {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        .header-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 12px clamp(16px, 6vw, 64px);
        }

        .header-brand {
          display: flex;
          flex-direction: column;
          gap: 1px;
          flex-shrink: 0;
        }

        .header-name {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3px;
          color: #111111;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .header-title {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          font-size: 10px;
          letter-spacing: 0.3px;
          color: #6A6A6A;
          text-transform: uppercase;
          font-weight: 400;
          line-height: 1.2;
        }

        .header-nav {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .header-nav-item {
          position: relative;
        }

        .nav-link-hover-state {
          position: absolute;
          top: 0;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border-radius: 2px;
          background: rgba(0, 0, 0, 0.02);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .header-nav-item:hover .nav-link-hover-state {
          opacity: 1;
        }

        @media (max-width: 900px) {
          .header-nav {
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .header-container {
            padding: 10px 12px;
          }
          .header-brand {
            gap: 0px;
          }
          .header-name {
            font-size: 10px;
          }
          .header-title {
            font-size: 9px;
          }
          .header-nav {
            gap: 16px;
          }
          .nav-link {
            font-size: 10px;
          }
        }
      `}</style>

      <div className="header-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div className="header-brand">
            <div className="header-name">Laney Fong</div>
            <div className="header-title">UX Designer</div>
          </div>

          <div
            className="header-nav"
            ref={navRef}
            onMouseLeave={() => setHoveredItem(null)}
          >
          {NAV_ITEMS.map((item) => {
            const isActive = item === active;
            const isHovered = item === hoveredItem;

            return (
              <div key={item} className="header-nav-item">
                <div className="nav-link-hover-state" />
                <button
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    outline: "none",
                    transform: isHovered || isActive ? "translateY(-1px)" : "translateY(0)",
                    transition: "transform 0.2s ease",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item}
                  {isHovered && !isActive && <div className="nav-dot" />}
                </button>
                {isActive && (
                  <div className="nav-link-underline" />
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
