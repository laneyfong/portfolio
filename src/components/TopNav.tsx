import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import { RESUME_URL } from "./SocialIcons";
import DarkModeToggle from "./DarkModeToggle";

interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Work", path: "/" },
  { label: "About", path: "/about" },
  { label: "Lab", path: "/lab" },
  { label: "Resume", path: RESUME_URL, external: true },
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
          width: 100%;
          z-index: 101;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-bottom: 1px solid var(--border-color);
        }

        [data-theme="dark"] .top-nav {
          background-color: rgba(15, 15, 15, 0.8);
          border-bottom: 1px solid var(--border-color);
        }

        .top-nav.scrolled {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        [data-theme="dark"] .top-nav.scrolled {
          background-color: rgba(26, 26, 26, 0.95);
        }

        .top-nav-content {
          max-width: 100%;
          width: 100%;
          margin: 0;
          padding: 8px 52px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: auto;
          min-height: 45px;
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          .top-nav-content {
            padding: 8px 16px;
          }
        }

        @media (max-width: 640px) {
          .top-nav-content {
            padding: 8px 12px;
          }
        }

        .top-nav-brand {
          font-family: 'Manrope', ${tokens.font.sans};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.05em;
          color: var(--text-primary);
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .top-nav-brand:hover {
          color: #4060c8;
        }

        .top-nav-brand-separator {
          width: 6px;
          height: 6px;
          background: #4060c8;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .top-nav-brand-role {
          font-family: 'Manrope', ${tokens.font.sans};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.05em;
          color: var(--text-muted);
          text-decoration: none;
        }

        .top-nav.scrolled .top-nav-brand {
          color: var(--text-dark);
        }

        .top-nav-links {
          display: flex;
          gap: 24px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .top-nav-link {
          font-family: 'Manrope', ${tokens.font.sans};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.05em;
          color: var(--text-muted);
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: color 0.2s ease;
        }

        .top-nav-link:hover {
          color: #4060c8;
        }

        .top-nav-link.active {
          color: var(--text-primary);
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
            top: 45px;
            left: 0;
            right: 0;
            background: white;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            gap: 0;
            list-style: none;
            margin: 0;
            padding: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            z-index: 99;
          }

          .mobile-menu.open {
            max-height: 500px;
          }
        }

        .mobile-menu-item {
          padding: 14px 16px;
          font-family: 'Manrope', ${tokens.font.sans};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.05em;
          color: #333333;
          text-decoration: none !important;
          cursor: pointer;
          transition: color 0.2s ease;
          display: block;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }

        .mobile-menu-item:hover {
          color: #4060c8;
          text-decoration: none !important;
        }

        .mobile-menu-item.active {
          color: #111111;
          font-weight: 500;
          text-decoration: none !important;
        }

        @media (max-width: 640px) {
          .top-nav-brand {
            font-size: 14px;
          }

          .mobile-menu {
            padding: 12px 0;
          }

          .mobile-menu.open {
            max-height: 300px;
          }

          .mobile-menu-item {
            padding: 12px 12px;
            font-size: 14px;
            color: #333333;
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
            aria-label="Go to home"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/");
              }
            }}
          >
            <span>Laney Fong</span>
            <div className="top-nav-brand-separator" />
            <span className="top-nav-brand-role">Product Designer</span>
          </div>

          <ul className="top-nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.path}
                  className={`top-nav-link ${!item.external && isActive(item.path) ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.external) {
                      window.open(item.path, "_blank");
                    } else {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <DarkModeToggle />

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
                className={`mobile-menu-item ${!item.external && isActive(item.path) ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.external) {
                    window.open(item.path, "_blank");
                  } else {
                    navigate(item.path);
                  }
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
