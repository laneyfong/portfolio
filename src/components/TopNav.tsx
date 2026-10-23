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
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: auto;
          z-index: 101;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-bottom: 0.5px solid var(--border-color);
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
          padding: 6px 52px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: auto;
          box-sizing: border-box;
          transition: padding 0.3s ease;
        }

        @media (max-width: 1200px) {
          .top-nav-content {
            padding: 6px 16px;
          }
        }

        @media (max-width: 640px) {
          .top-nav-content {
            padding: 6px 12px;
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
          line-height: 1.2;
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
          line-height: 1.2;
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
          padding: 0px 6px;
          border-radius: 4px;
          outline: none;
          line-height: 1.2;
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

          {/* LaneyLM Icon Button - Toggle Chat */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "4px 8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.8s ease",
              width: "auto",
              height: "auto",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              // Change icon color to blue
              const paths = e.currentTarget.querySelectorAll("svg path");
              paths.forEach((path) => {
                (path as SVGElement).style.transition = "fill 0.8s ease";
                path.setAttribute("fill", "#4060c8");
              });
              // Show text
              const textSpan = e.currentTarget.querySelector(".laneyLM-text") as HTMLElement;
              if (textSpan) {
                textSpan.style.opacity = "1";
                textSpan.style.maxWidth = "200px";
              }
            }}
            onMouseLeave={(e) => {
              // Change icon color back to grey
              const paths = e.currentTarget.querySelectorAll("svg path");
              paths.forEach((path) => {
                (path as SVGElement).style.transition = "fill 0.8s ease";
                path.setAttribute("fill", "#808080");
              });
              // Hide text
              const textSpan = e.currentTarget.querySelector(".laneyLM-text") as HTMLElement;
              if (textSpan) {
                textSpan.style.opacity = "0";
                textSpan.style.maxWidth = "0px";
              }
            }}
            title={isOpen ? "Close chat" : "Open chat"}
          >
            {/* AI Icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 1430 1100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              <path d="M681.334 163.718C698.242 161.314 715.628 174.162 720.691 189.864C726.954 209.279 726.633 231.393 728.204 251.638C732.037 301.075 746.658 349.661 772.787 391.93C810.136 454.32 886.684 471.188 954.155 475.057C983.726 476.753 1033.69 468.749 1051.81 498.971C1055.94 505.778 1057.22 513.944 1055.35 521.686C1048.5 548.954 1009.59 550.031 987.112 551.336C943.954 553.843 900.537 557.495 862.685 581.1C797.944 621.473 772.018 711.04 774.211 783.424C775.202 816.011 785.99 850.101 778.617 882.989C773.876 905.003 755.421 922.98 731.618 916.904C688.579 903.46 694.826 825.342 694.715 790.212C694.803 773.087 693.908 755.976 692.034 738.949C686.683 693.138 668.903 640.628 631.354 611.149C593.463 581.4 555.207 585.956 511.613 595.391C485.792 601.671 464.464 604.999 438.166 609.81C404.374 615.992 363.227 597.624 384.846 558.427C398.156 534.293 439.95 530.07 466.184 523.745C480.891 520.199 495.342 515.663 509.438 510.167C542.952 497.188 572.863 478.477 595.677 450.045C630.066 407.189 645.835 345.488 642.784 291.115C641.442 270.251 636.786 249.912 634.037 229.17C629.453 194.58 644.396 167.222 681.334 163.718Z" fill="#808080"/>
              <path d="M906.584 667.186C915.41 666.22 924.242 667.8 932.649 672.571C959.929 688.052 996.699 733.369 981.428 766.25C978.349 772.878 970.466 777.285 963.463 779.177C928.92 781.762 897.681 738.984 887.047 709.567C880.407 691.189 886.747 672.883 906.584 667.186Z" fill="#808080"/>
              <path d="M907.401 231.308C912.728 230.817 917.553 231.535 922.287 234.104C928.083 237.227 932.398 242.533 934.269 248.848C943.43 280.013 895.789 338.411 866.554 347.15C853.301 350.191 840.774 343.343 838.568 329.459C835.286 308.772 847.938 287.019 858.978 270.271C870.247 253.182 886.649 235.377 907.401 231.308Z" fill="#808080"/>
              <path d="M561.984 656.599C571.669 655.579 582.048 658.326 584.529 669.067C589.976 692.649 570.495 720.364 557.356 738.53C547.65 751.946 532.073 767.828 516.398 772.312C477.73 777.453 496.525 726 507.793 709.308C520.889 689.903 538 662.786 561.984 656.599Z" fill="#808080"/>
            </svg>
            <span
              className="laneyLM-text"
              style={{
                fontSize: "13px",
                fontWeight: "400",
                color: "#4060c8",
                fontFamily: tokens.font.sans,
                transition: "opacity 0.8s ease, max-width 0.8s ease",
                letterSpacing: "-0.05em",
                opacity: 0,
                maxWidth: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              Ask LaneyLM
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
