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
  { number: "01", label: "Work", micro: "Selected Projects" },
  { number: "02", label: "About", micro: "Design Philosophy" },
  { number: "03", label: "Lab", micro: "Experiments + Play" },
  { number: "04", label: "Resume", micro: "Experience" },
];

const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoverDelay, setHoverDelay] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
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
    }, 75);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoverDelay(null);
    setHoveredItem(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = 200;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
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
    <>
      <style>{`
        @keyframes railFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .rail-divider {
          height: 1px;
          background: ${tokens.color.cardBorder};
          margin: 20px 0;
        }

        .nav-rail {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 120px;
          background: ${tokens.color.offWhite};
          border-right: 1px solid ${tokens.color.cardBorder};
          padding: 32px 16px;
          display: flex;
          flex-direction: column;
          gap: 0;
          z-index: 100;
          overflow-y: auto;
          animation: railFadeIn 0.6s ease-out;
        }

        .rail-header {
          margin-bottom: 32px;
          animation: railFadeIn 0.6s ease-out 0.1s both;
        }

        .rail-name {
          font-family: ${tokens.font.sans};
          font-size: 13px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.ink};
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .rail-title {
          font-family: ${tokens.font.sans};
          font-size: 11px;
          font-weight: ${tokens.weight.regular};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          line-height: 1.2;
        }

        .rail-nav {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 32px;
          animation: railFadeIn 0.6s ease-out 0.15s both;
          flex: 1;
        }

        .nav-item {
          position: relative;
          cursor: pointer;
          padding: 0;
          outline: none;
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: none;
        }

        .nav-item-header {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .nav-item-number {
          font-family: ${tokens.font.sans};
          font-size: 11px;
          font-weight: ${tokens.weight.light};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.muted};
          transition: color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-item:hover .nav-item-number,
        .nav-item.hovered .nav-item-number {
          color: ${tokens.color.ink};
        }

        .nav-item-label {
          font-family: ${tokens.font.sans};
          font-size: 13px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          transition: color 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
        }

        .nav-item:hover .nav-item-label,
        .nav-item.hovered .nav-item-label {
          color: ${tokens.color.ink};
          transform: translateY(-1px);
        }

        .nav-item-micro {
          font-family: ${tokens.font.sans};
          font-size: 10px;
          font-weight: ${tokens.weight.light};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.muted};
          line-height: 1.3;
          max-width: 100px;
          text-align: left;
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
            filter: blur(3px);
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
            filter: blur(3px);
          }
        }

        .nav-item-indicator {
          position: absolute;
          left: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background: ${tokens.color.accent};
          border-radius: 2px;
          transition: height 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-item.active .nav-item-indicator {
          height: 24px;
        }

        .nav-item-dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: ${tokens.color.accent};
          margin-left: 2px;
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-item:hover .nav-item-dot,
        .nav-item.hovered .nav-item-dot,
        .nav-item.active .nav-item-dot {
          opacity: 1;
        }

        .rail-footer {
          margin-top: auto;
          animation: railFadeIn 0.6s ease-out 0.2s both;
        }

        .rail-metadata {
          font-family: ${tokens.font.sans};
          font-size: 9px;
          font-weight: ${tokens.weight.light};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.muted};
          line-height: 1.6;
          text-transform: uppercase;
        }

        .rail-availability {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 12px;
          font-size: 10px;
          font-weight: ${tokens.weight.light};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.muted};
        }

        .rail-availability-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: ${tokens.color.accent};
        }

        @media (max-width: 900px) {
          .nav-rail {
            width: 100px;
            padding: 24px 12px;
          }

          .rail-header {
            margin-bottom: 24px;
          }

          .rail-name {
            font-size: 11px;
          }

          .rail-title {
            font-size: 10px;
          }

          .nav-item-label {
            font-size: 12px;
          }

          .nav-item-number {
            font-size: 10px;
          }

          .nav-item-micro {
            font-size: 9px;
          }

          .rail-metadata {
            font-size: 8px;
          }
        }

        @media (max-width: 640px) {
          .nav-rail {
            display: none;
          }
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${tokens.color.cardBorder};
          border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${tokens.color.muted};
        }
      `}</style>

      <div
        className="nav-rail"
        ref={railRef}
        style={{
          opacity: 1 - scrollProgress * 0.15,
          transition: "opacity 0.2s ease-out",
        }}
      >
        {/* Header Section */}
        <div className="rail-header">
          <div className="rail-name">Laney</div>
          <div className="rail-name">Fong</div>
          <div className="rail-title">Product Designer</div>
        </div>

        <div className="rail-divider" />

        {/* Navigation Section */}
        <nav
          className="rail-nav"
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
                  animation: `railFadeIn 0.6s ease-out ${0.15 + index * 0.05}s both`,
                }}
              >
                <div className="nav-item-indicator" />
                <div className="nav-item-header">
                  <span className="nav-item-number">{item.number}</span>
                  <span className="nav-item-label">
                    {item.label}
                    <span className="nav-item-dot" />
                  </span>
                </div>
                <div
                  className={`nav-item-micro ${willShow ? "visible" : "hidden"}`}
                  style={{
                    display: willShow ? "block" : "none",
                    height: willShow ? "auto" : "0",
                    overflow: "hidden",
                  }}
                >
                  {item.micro}
                </div>
              </button>
            );
          })}
        </nav>

        <div className="rail-divider" />

        {/* Footer Section */}
        <div className="rail-footer">
          <div className="rail-metadata">
            San Francisco
            <br />
            Updated June 2026
            <br />
            Est. 2021
          </div>
          <div className="rail-availability">
            <div className="rail-availability-dot" />
            <span>Available</span>
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
