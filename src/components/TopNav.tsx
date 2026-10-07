import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import { RESUME_URL } from "./SocialIcons";

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
          z-index: 101;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .top-nav.scrolled {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .top-nav-content {
          max-width: 100%;
          margin: 0 auto;
          padding: 10px 52px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 45px;
          box-sizing: border-box;
        }

        .top-nav-brand {
          font-family: 'Manrope', ${tokens.font.sans};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.05em;
          color: #111111;
          text-decoration: none;
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
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
          color: #ABADAF;
          text-decoration: none;
        }

        .top-nav.scrolled .top-nav-brand {
          color: #111111;
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
          color: #ABADAF;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: color 0.2s ease;
        }

        .top-nav-link:hover {
          color: #111111;
        }

        .top-nav-link.active {
          color: #111111;
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
            gap: 24px;
            list-style: none;
            margin: 0;
            padding: 20px 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            z-index: 99;
          }

          .mobile-menu.open {
            max-height: 400px;
          }
        }

        @media (min-width: 769px) and (max-width: 900px) {
          .mobile-menu {
            gap: 20px;
            padding: 16px 0;
          }

          .mobile-menu.open {
            max-height: 350px;
          }

          .mobile-menu-item {
            padding: 14px clamp(32px, 7vw, 80px);
            font-size: 15px;
          }

          .mobile-menu-item {
            padding: 18px clamp(32px, 7vw, 80px);
            font-family: ${tokens.font.sans};
            font-size: 16px;
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
