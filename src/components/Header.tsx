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
  const [hoverDelay, setHoverDelay] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleMouseEnter = (item: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverDelay(item);
      setHoveredItem(item);
    }, 75); // 75ms hover delay
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoverDelay(null);
    setHoveredItem(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
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
        transition: "background 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <style>{`
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
          padding: 8px 12px;
          outline: none;
          background: none;
          border: none;
          font-family: ${tokens.font.sans};
        }

        .nav-item-label {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          white-space: nowrap;
          position: relative;
          z-index: 2;
          transition: color 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-item:hover .nav-item-label,
        .nav-item.hovered .nav-item-label {
          transform: translateY(-1px);
          color: ${tokens.color.ink};
        }

        .nav-item-micro {
          font-family: ${tokens.font.sans};
          font-size: 12px;
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.muted};
          margin-top: 2px;
          white-space: nowrap;
          font-weight: ${tokens.weight.light};
          position: relative;
          z-index: 2;
          max-width: 100px;
          text-align: center;
          line-height: 1.3;
        }

        .nav-item-micro.visible {
          animation: microFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .nav-item-micro.hidden {
          animation: microFadeOut 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes microFadeIn {
          from {
            opacity: 0;
            filter: blur(4px);
          }
          to {
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes microFadeOut {
          from {
            opacity: 1;
            filter: blur(0);
          }
          to {
            opacity: 0;
            filter: blur(4px);
          }
        }

        .nav-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          border-radius: 8px;
          transition: background 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
          pointer-events: none;
        }

        .nav-item:hover .nav-background,
        .nav-item.hovered .nav-background {
          background: rgba(141, 200, 228, 0.08);
        }

        .nav-item.active .nav-background {
          background: rgba(141, 200, 228, 0.12);
          box-shadow: inset 0 0 0 1px rgba(141, 200, 228, 0.3);
        }

        .nav-item.active .nav-item-label {
          color: ${tokens.color.ink};
          font-weight: ${tokens.weight.medium};
        }

        @media (max-width: 900px) {
          .nav-item-label {
            font-size: 13px;
          }
          .nav-item-micro {
            font-size: 11px;
            margin-top: 1px;
          }
          .header-brand-name {
            font-size: 12px !important;
          }
        }

        @media (max-width: 640px) {
          .nav-item {
            padding: 6px 10px;
          }
          .nav-item-label {
            font-size: 12px;
          }
          .nav-item-micro {
            font-size: 10px;
            display: none;
          }
          .header-brand-name {
            font-size: 11px !important;
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
          transition: "padding 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
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
              lineHeight: "1.2",
            }}
          >
            Laney Fong
          </div>
        </div>

        {/* Navigation */}
        <nav
          ref={navRef}
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            position: "relative",
            animation: "headerFadeIn 0.6s ease-out 0.2s both",
          }}
          onMouseLeave={handleMouseLeave}
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive = item.label === active;
            const isHovered = item.label === hoveredItem;
            const willShow = item.label === hoverDelay || isHovered;

            return (
              <button
                key={item.label}
                className={`nav-item ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
                onClick={() => handleSelect(item.label)}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
                aria-current={isActive ? "page" : undefined}
                style={{
                  animation: `headerFadeIn 0.6s ease-out ${0.2 + index * 0.05}s both`,
                }}
              >
                <div className="nav-background" />
                <div className="nav-item-label">{item.label}</div>
                <div
                  className={`nav-item-micro ${willShow ? "visible" : "hidden"}`}
                  style={{
                    display: willShow ? "block" : "none",
                  }}
                >
                  {item.micro}
                </div>
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
          • Available for new opportunities
        </div>
      </div>
    </header>
  );
};

export default Header;
