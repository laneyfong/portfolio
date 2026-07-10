import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../tokens";

const NAV_ITEMS = [
  { label: "Work", path: "/" },
  { label: "About", path: "/about" },
  { label: "Lab", path: "/lab" },
  { label: "Resume", path: "/resume" },
];

const TopNav: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{`
        .top-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .top-nav.scrolled {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .top-nav-content {
          max-width: 1450px;
          margin: 0 auto;
          padding: 0 clamp(32px, 7vw, 80px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
          box-sizing: border-box;
        }

        .top-nav-brand {
          font-family: ${tokens.font.sans};
          font-size: 16px;
          font-weight: ${tokens.weight.medium};
          letter-spacing: ${tokens.tracking.tight};
          color: #999999;
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
        }

        .top-nav-brand::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            #D9757D,
            #E8A876,
            #D4C266,
            #B8D9A8,
            #7FB3D4,
            #8B9BC5,
            #B899D6,
            #D9757D
          );
          background-size: 200% 100%;
          background-position: 200% 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .top-nav-brand:hover::before {
          opacity: 1;
          animation: rainbowShine 5s ease infinite;
        }

        @keyframes rainbowShine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .top-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .top-nav-link {
          font-family: ${tokens.font.sans};
          font-size: 14px;
          font-weight: ${tokens.weight.regular};
          letter-spacing: ${tokens.tracking.tight};
          color: ${tokens.color.body};
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: color 0.2s ease;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;
        }

        .top-nav-link:hover {
          color: ${tokens.color.ink};
          border-bottom-color: ${tokens.color.ink};
          border-bottom: 1px solid currentColor;
        }

        .top-nav-link.active {
          color: ${tokens.color.ink};
          font-weight: ${tokens.weight.medium};
          border-bottom: 1px solid ${tokens.color.ink};
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: ${tokens.color.ink};
          font-size: 20px;
        }

        @media (max-width: 900px) {
          .top-nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-menu {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background: white;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            gap: 0;
            list-style: none;
            margin: 0;
            padding: 16px 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            z-index: 99;
          }

          .mobile-menu.open {
            max-height: 300px;
          }

          .mobile-menu-item {
            padding: 12px clamp(32px, 7vw, 80px);
            font-family: ${tokens.font.sans};
            font-size: 14px;
            font-weight: ${tokens.weight.regular};
            letter-spacing: ${tokens.tracking.tight};
            color: ${tokens.color.body};
            text-decoration: none;
            cursor: pointer;
            transition: color 0.2s ease;
          }

          .mobile-menu-item:hover {
            color: ${tokens.color.ink};
          }

          .mobile-menu-item.active {
            color: ${tokens.color.ink};
            font-weight: ${tokens.weight.medium};
          }
        }

        @media (max-width: 640px) {
          .top-nav-brand {
            font-size: 14px;
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`top-nav ${isScrolled ? "scrolled" : ""}`}
        style={{
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.92)" : "transparent",
        }}
      >
        <div className="top-nav-content">
          <div
            className="top-nav-brand"
            onClick={() => navigate("/")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/");
              }
            }}
          >
            Laney Fong
          </div>

          <ul className="top-nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.path}
                  className={`top-nav-link ${isActive(item.path) ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <ul className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.path}
                className={`mobile-menu-item ${isActive(item.path) ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TopNav;
