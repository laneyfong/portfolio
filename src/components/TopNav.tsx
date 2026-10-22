import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../tokens";
import { RESUME_URL } from "./SocialIcons";
import { useChatState } from "../ChatContext";

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
  const { isOpen, setIsOpen } = useChatState();

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
          height: auto;
          z-index: 101;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-bottom: 1px solid var(--border-color);
        }

        .top-nav.scrolled {
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .top-nav-content {
          max-width: 100%;
          width: 100%;
          margin: 0;
          padding: 0px 52px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: auto;
          min-height: auto;
          box-sizing: border-box;
        }

        @media (max-width: 1200px) {
          .top-nav-content {
            padding: 0px 16px;
          }
        }

        @media (max-width: 640px) {
          .top-nav-content {
            padding: 0px 12px;
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
          padding: 4px 6px;
          border-radius: 4px;
          outline: none;
        }

        .top-nav-link:hover {
          color: #4060c8;
        }

        .top-nav-link:focus-visible {
          outline: 2px solid #4060c8;
          outline-offset: 2px;
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
          color: var(--text-dark);
          font-size: 20px;
          transition: color 0.3s ease;
        }

        @media (max-width: 1200px) {
          .top-nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .mobile-menu {
            position: fixed;
            top: 55px;
            left: 0;
            right: 0;
            background: white;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            gap: 0;
            list-style: none;
            margin: 0;
            padding: 12px 0;
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
          padding: 16px 16px;
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
          min-height: 44px;
          display: flex;
          align-items: center;
          outline: none;
        }

        .mobile-menu-item:hover {
          color: #4060c8;
          text-decoration: none !important;
        }

        .mobile-menu-item:focus-visible {
          outline: 2px solid #4060c8;
          outline-offset: -2px;
          background: rgba(64, 96, 200, 0.05);
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
            top: 50px;
            padding: 8px 0;
          }

          .mobile-menu.open {
            max-height: 300px;
          }

          .mobile-menu-item {
            padding: 14px 12px;
            font-size: 14px;
            color: #333333;
            min-height: 40px;
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`top-nav ${isScrolled ? "scrolled" : ""}`}
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

          {/* AIney Badge - Toggle Chat */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 6px",
              background: "#E4E4E4",
              borderRadius: "100px",
              height: "23px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#D0D0D0";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#E4E4E4";
              e.currentTarget.style.transform = "scale(1)";
            }}
            title={isOpen ? "Close chat" : "Open chat"}
          >
            {/* Sparkle Icon */}
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M5.5 0.5L6.5 3L9 4.5L6.5 6L5.5 8.5L4.5 6L2 4.5L4.5 3L5.5 0.5Z"
                fill="#254DFA"
              />
            </svg>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: "#254DFA",
                fontFamily: tokens.font.sans,
              }}
            >
              AIney
            </span>
          </button>

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
