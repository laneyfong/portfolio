import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { tokens } from "../tokens";

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
        background: isScrolled ? `rgba(250, 250, 251, 0.7)` : tokens.color.offWhite,
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(8px)" : "none",
        borderBottom: isScrolled
          ? `1px solid ${tokens.color.cardBorder}`
          : `1px solid ${tokens.color.cardBorder}`,
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
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          transition: color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
          position: relative;
          z-index: 2;
        }

        .nav-item:hover .nav-item-label {
          transform: translateY(-1px);
          color: ${tokens.color.ink};
        }

        .nav-item-micro {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.muted};
          margin-top: 3px;
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: blur(2px);
          white-space: nowrap;
          font-weight: ${tokens.weight.light};
        }

        .nav-item:hover .nav-item-micro {
          opacity: 1;
          filter: blur(0);
        }

        .nav-item.active .nav-item-label {
          color: ${tokens.color.ink};
          font-weight: ${tokens.weight.medium};
        }

        .nav-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          border-radius: 6px;
          transition: background 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 1;
          pointer-events: none;
        }

        .nav-item:hover .nav-background {
          background: rgba(141, 200, 228, 0.08);
        }

        .nav-item.active .nav-background {
          background: rgba(141, 200, 228, 0.12);
          box-shadow: inset 0 0 0 1px rgba(141, 200, 228, 0.3);
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
              fontFamily: tokens.font.sans,
              fontSize: "14px",
              fontWeight: tokens.weight.medium,
              letterSpacing: tokens.tracking.tight,
              color: tokens.color.ink,
              textTransform: "uppercase",
              lineHeight: "1.2",
            }}
          >
            Laney Fong
          </div>
          <div
            className="header-brand-title"
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "12px",
              letterSpacing: tokens.tracking.tight,
              color: tokens.color.muted,
              textTransform: "uppercase",
              fontWeight: tokens.weight.light,
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
                  position: "relative",
                  padding: "8px 12px",
                }}
              >
                <div className="nav-background" />
                <div className="nav-item-label">{item.label}</div>
                {isHovered && (
                  <div className="nav-item-micro">{item.micro}</div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Status Indicator */}
        <div
          style={{
            fontSize: "12px",
            letterSpacing: tokens.tracking.tight,
            color: tokens.color.muted,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.light,
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
