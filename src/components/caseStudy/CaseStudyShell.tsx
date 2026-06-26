import type { FC, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../tokens";
import Footer from "../Footer";
import { BackArrowIcon, ChevronIcon } from "./CaseStudyKit";

export const SIDEBAR_WIDTH = 220;

export interface CaseSection {
  id: string;
  label: string;
}

interface CaseStudyShellProps {
  sections: CaseSection[];
  highlights: string[];
  children: ReactNode;
  /** Extra CSS rules appended to the page's shared <style> block — for page-specific
   * keyframes/visuals (e.g., MyShake's seismic-wave or shake-in animations). */
  extraStyle?: string;
}

// The reusable page chassis for every case study: fixed dark sidebar with a sliding
// active-section indicator and a collapsible "Highlights" panel, a mobile back button +
// horizontally-scrollable section tabs (the sidebar is desktop-only), a reading-progress
// bar, scroll-spy, and the content + footer slot. Built once for MyShake, reused as-is
// for NVIDIA so every case study shares the same navigation and motion language.
export const CaseStudyShell: FC<CaseStudyShellProps> = ({ sections, highlights, children, extraStyle = "" }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const navListRef = useRef<HTMLDivElement>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);

  useEffect(() => {
    const idx = sections.findIndex((s) => s.id === active);
    const el = navListRef.current?.children[idx] as HTMLElement | undefined;
    if (el) setIndicatorTop(el.offsetTop);
  }, [active, sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      // Show scroll-up button after scrolling past 300px
      setShowScrollUp(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="case-page-fade-in" style={{ minHeight: "100vh", background: tokens.color.white, fontFamily: tokens.font.sans }}>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .case-page-fade-in { animation: case-page-fade-in 0.7s ease; }
          .case-fade-in { animation: case-fade-in 0.3s ease backwards; }
        }
        @keyframes case-page-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes case-fade-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .case-shot { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .case-shot:hover { transform: translateY(-4px) scale(1.015); }
        .case-tabs-scroll::-webkit-scrollbar { display: none; }
        /* Tactile feedback for things that are actually clickable — nav buttons, tabs,
           toggles. Cards with no click action intentionally don't get this. */
        .case-btn-press { transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
        .case-btn-press:active { transform: scale(0.94); }
        @media (max-width: 900px) {
          .case-sidebar { display: none !important; }
          .case-mobile-back { display: flex !important; }
          .case-mobile-tabs { display: none !important; }
          .case-main, .case-footer-wrap { margin-left: 0 !important; }
          .case-main { padding-top: 80px !important; padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (max-width: 760px) {
          .case-grid-3 { grid-template-columns: 1fr !important; }
          .case-grid-2 { grid-template-columns: 1fr !important; }
          .case-intro-shots { grid-template-columns: 1fr !important; }
          .case-main { padding: 80px 12px 0 12px !important; }
        }
        /* Accessibility: Focus styles for keyboard navigation */
        a:focus-visible, button:focus-visible { outline: 2px solid #8DC8E4; outline-offset: 2px; }
        /* Ensure sufficient color contrast and readability */
        @media (prefers-contrast: more) {
          body { letter-spacing: -0.01em; }
        }
        /* Touch target sizes (minimum 44x44px for mobile) */
        @media (max-width: 900px) {
          .case-btn-press { min-width: 44px !important; min-height: 44px !important; }
          button { min-height: 44px; }
        }
        /* Responsive typography on mobile */
        @media (max-width: 760px) {
          h2 { font-size: 20px !important; }
          p { font-size: 15px !important; }
        }
        @media (max-width: 640px) {
          h2 { font-size: 18px !important; }
          p { font-size: 14px !important; }
        }
        /* Mobile tabs: center content and remove background */
        @media (max-width: 900px) {
          .case-mobile-tabs {
            justify-content: center !important;
            background: transparent !important;
            border-bottom: none !important;
            box-shadow: none !important;
          }
        }
        /* Hide scroll-up button on desktop */
        @media (min-width: 901px) {
          button[aria-label="Scroll to top"] {
            display: none !important;
          }
        }
        /* UserJourney responsive: vertical layout on mobile */
        @media (max-width: 760px) {
          .user-journey-stages {
            flex-direction: column !important;
            gap: 16px !important;
          }
        }
        ${extraStyle}
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 4, zIndex: 20, background: "transparent" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: tokens.color.accent }} />
      </div>

      {/* Desktop sidebar */}
      <div
        className="case-sidebar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: SIDEBAR_WIDTH,
          background: tokens.color.ink,
          display: "flex",
          flexDirection: "column",
          padding: "32px 28px",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={() => navigate("/")}
          aria-label="Back to home"
          className="case-btn-press"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            background: "transparent",
            color: tokens.color.white,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 64,
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.borderColor = tokens.color.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
          }}
        >
          <BackArrowIcon />
        </button>

        <nav style={{ position: "relative", paddingLeft: 14 }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: indicatorTop + 2,
              width: 2,
              height: 13,
              borderRadius: tokens.radius.full,
              background: tokens.color.accent,
              transition: "top 0.25s ease",
            }}
          />
          <div ref={navListRef} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="case-btn-press"
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: tokens.font.sans,
                  fontSize: 14,
                  lineHeight: 1.2,
                  color: active === s.id ? tokens.color.white : "rgba(255, 255, 255, 0.45)",
                  fontWeight: active === s.id ? tokens.weight.medium : tokens.weight.regular,
                  transition: "color 0.2s ease",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {highlights.length > 0 && (
          <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
            <button
              onClick={() => setHighlightsOpen((open) => !open)}
              aria-expanded={highlightsOpen}
              className="case-btn-press"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: tokens.font.sans,
                fontSize: 14,
                lineHeight: 1.2,
                fontWeight: tokens.weight.medium,
                color: tokens.color.white,
              }}
            >
              Highlights
              <ChevronIcon open={highlightsOpen} />
            </button>

            {highlightsOpen && (
              <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {highlights.map((item, i) => (
                  <li
                    key={item}
                    className="case-fade-in"
                    style={{
                      position: "relative",
                      paddingLeft: 14,
                      fontFamily: tokens.font.sans,
                      fontSize: 12.5,
                      lineHeight: 1.4,
                      color: "rgba(255, 255, 255, 0.65)",
                      animationDelay: `${i * 80}ms`,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 7,
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.45)",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile back button */}
      <button
        className="case-mobile-back case-btn-press"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        style={{
          display: "none",
          position: "fixed",
          top: 20,
          left: 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1px solid ${tokens.color.cardBorder}`,
          background: tokens.color.white,
          color: tokens.color.ink,
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          boxShadow: tokens.shadow.subtle,
        }}
      >
        <BackArrowIcon />
      </button>

      {/* Mobile section tabs — the sidebar's the only way to jump between sections, and
          it's hidden below 900px, so this fills that gap with a horizontally scrollable
          equivalent. */}
      <div
        className="case-mobile-tabs case-tabs-scroll"
        style={{
          display: "none",
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          zIndex: 9,
          gap: 8,
          padding: "0 20px 12px",
          overflowX: "auto",
          background: tokens.color.white,
          borderBottom: `1px solid ${tokens.color.cardBorder}`,
          boxShadow: tokens.shadow.subtle,
        }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="case-btn-press"
            style={{
              flexShrink: 0,
              padding: "6px 14px",
              borderRadius: tokens.radius.full,
              border: `1px solid ${active === s.id ? tokens.color.ink : tokens.color.cardBorder}`,
              background: active === s.id ? tokens.color.ink : tokens.color.white,
              color: active === s.id ? tokens.color.white : tokens.color.body,
              fontFamily: tokens.font.sans,
              fontSize: 13,
              fontWeight: tokens.weight.medium,
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <main
        className="case-main"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          maxWidth: 940,
          padding: "80px clamp(24px, 6vw, 64px) 0",
          boxSizing: "border-box",
        }}
      >
        {children}
      </main>

      {/* Mobile scroll-up button */}
      {showScrollUp && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            bottom: 32,
            right: 20,
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: tokens.color.ink,
            color: tokens.color.white,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: tokens.shadow.subtle,
            zIndex: 50,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = tokens.shadow.cardHoverLarge;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = tokens.shadow.subtle;
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      <div className="case-footer-wrap" style={{ marginLeft: SIDEBAR_WIDTH }}>
        <Footer />
      </div>
    </div>
  );
};
