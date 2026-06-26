import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const ROUTES: Record<string, string> = {
  Work: "/",
  About: "/about",
  Lab: "/lab",
  Resume: "/resume",
};

const NAV_ITEMS = [
  { label: "Work", micro: "Selected Projects" },
  { label: "About", micro: "Design Philosophy" },
  { label: "Lab", micro: "Experiments + Play" },
  { label: "Resume", micro: "Experience" },
];

const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isScrolled ? "rgba(250, 250, 248, 0.7)" : "#FAFAF8",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(8px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(0, 0, 0, 0.05)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital@0;1&display=swap');

        @keyframes grain {
          0%, 100% {
            backgroundPosition: 0 0;
          }
          100% {
            backgroundPosition: 100px 100px;
          }
        }

        @keyframes headerFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-grain {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          pointerEvents: none;
          backgroundImage: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" /></filter><rect width="100%" height="100%" fill="%23000" filter="url(%23noise)"/></svg>');
          animation: grain 8s linear infinite;
        }

        .nav-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          padding: 8px 0;
          outline: none;
          background: none;
          border: none;
        }

        .nav-item-label {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.3px;
          color: #111111;
          text-transform: uppercase;
          transition: color 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }

        .nav-item:hover .nav-item-label {
          transform: translateY(-1px);
          color: #111111;
        }

        .nav-item-micro {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2px;
          color: #6A6A6A;
          margin-top: 3px;
          opacity: 0;
          transition: opacity 0.3s ease, filter 0.3s ease;
          filter: blur(2px);
          white-space: nowrap;
          font-weight: 400;
        }

        .nav-item:hover .nav-item-micro {
          opacity: 1;
          filter: blur(0);
        }

        .nav-item.active .nav-item-label {
          color: #111111;
          font-weight: 600;
        }

        .nav-underline {
          position: absolute;
          bottom: -2px;
          height: 1px;
          background: #111111;
          width: 0;
          transform-origin: left;
          transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .nav-item.active .nav-underline,
        .nav-item:hover .nav-underline {
          width: 100%;
        }

        .nav-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #356AE6;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-item.active .nav-dot {
          opacity: 1;
        }

        @media (max-width: 900px) {
          .nav-item-label {
            font-size: 10px;
          }
          .nav-item-micro {
            font-size: 8px;
            margin-top: 2px;
          }
        }

        @media (max-width: 640px) {
          .nav-item-label {
            font-size: 9px;
          }
          .nav-item-micro {
            font-size: 7px;
          }
          .header-brand-name {
            font-size: 10px !important;
          }
          .header-brand-title {
            font-size: 8px !important;
          }
        }
      `}</style>

      <div className="header-grain" />

      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: isScrolled ? "12px 32px" : "24px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "48px",
          position: "relative",
          transition: "padding 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: "headerFadeIn 0.6s ease-out 0.1s both",
        }}
      >
        {/* Brand Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flexShrink: 0,
            animation: "headerFadeIn 0.6s ease-out 0.1s both",
          }}
        >
          <div
            className="header-brand-name"
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.3px",
              color: "#111111",
              textTransform: "uppercase",
              lineHeight: "1.2",
            }}
          >
            Laney Fong
          </div>
          <div
            className="header-brand-title"
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3px",
              color: "#6A6A6A",
              textTransform: "uppercase",
              fontWeight: 400,
              lineHeight: "1.2",
            }}
          >
            UX Designer
          </div>
        </div>

        {/* Navigation */}
        <nav
          ref={navRef}
          style={{
            display: "flex",
            gap: "48px",
            alignItems: "center",
            position: "relative",
            animation: "headerFadeIn 0.6s ease-out 0.2s both",
          }}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive = item.label === active;
            const isHovered = item.label === hoveredItem;

            return (
              <button
                key={item.label}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(item.label)}
                onMouseEnter={() => setHoveredItem(item.label)}
                aria-current={isActive ? "page" : undefined}
                style={{
                  animation: `headerFadeIn 0.6s ease-out ${0.2 + index * 0.05}s both`,
                }}
              >
                <div className="nav-item-label">{item.label}</div>
                {isHovered && (
                  <div className="nav-item-micro">{item.micro}</div>
                )}
                <div
                  className="nav-underline"
                  style={{
                    width: isActive || isHovered ? "100%" : "0%",
                  }}
                />
                {isActive && <div className="nav-dot" />}
              </button>
            );
          })}
        </nav>

        {/* Status Indicator */}
        <div
          style={{
            fontSize: "10px",
            letterSpacing: "0.3px",
            color: "#6A6A6A",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
            fontWeight: 400,
            flexShrink: 0,
            animation: "headerFadeIn 0.6s ease-out 0.3s both",
          }}
        >
          • AVAILABLE FOR NEW OPPORTUNITIES
        </div>
      </div>
    </header>
  );
};

export default Header;
