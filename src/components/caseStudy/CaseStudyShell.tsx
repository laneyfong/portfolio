import type { FC, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../tokens";
import { BackArrowIcon, ChevronIcon } from "./CaseStudyKit";

export const SIDEBAR_WIDTH = 160;

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
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-reveal-animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".section-reveal");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
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
        @keyframes section-fade-in {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .section-reveal {
          opacity: 0;
          transform: translateY(40px);
        }
        .section-reveal-animate {
          animation: section-fade-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .section-reveal-animate {
            animation: none;
            opacity: 1;
            transform: translateY(0);
          }
        }
        .case-shot { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .case-shot:hover { transform: translateY(-4px) scale(1.015); }
        .case-tabs-scroll::-webkit-scrollbar { display: none; }
        /* Tactile feedback for things that are actually clickable — nav buttons, tabs,
           toggles. Cards with no click action intentionally don't get this. */
        .case-btn-press { transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
        .case-btn-press:active { transform: scale(0.94); }
        /* Fluid grid layouts with auto-fit for responsive rearrangement */
        .case-grid-3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
        .case-grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
        .case-intro-shots { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

        @media (max-width: 900px) {
          .case-sidebar { display: none !important; }
          .case-mobile-back { display: flex !important; }
          .case-mobile-tabs { display: flex !important; }
          .case-main, .case-footer-wrap { margin-left: 0 !important; }
          .case-main { padding-top: 132px !important; }
        }
        @media (max-width: 768px) {
          /* Prevent horizontal overflow */
          html, body, main { overflow-x: hidden !important; max-width: 100vw; }

          /* Ensure minimum 48x48px touch targets on mobile */
          button, a, input, .case-btn-press { min-width: 48px !important; min-height: 48px !important; }

          /* Flexible spacing for mobile */
          .case-grid-3, .case-grid-2, .case-intro-shots { grid-template-columns: 1fr !important; gap: clamp(16px, 4vw, 32px); }

          /* Stack flex containers vertically */
          [style*="display: flex"] { flex-direction: column !important; }

          /* Convert fixed widths to responsive */
          [style*="width:"] { max-width: 100% !important; width: auto !important; }

          /* Reduce font sizes smoothly */
          .case-main { padding: clamp(16px, 5vw, 60px) !important; }
        }
        @media (max-width: 640px) {
          /* Extra small screens */
          button, a, .case-btn-press { min-width: 44px !important; min-height: 44px !important; padding: 12px 16px !important; }
          .case-main { padding: clamp(12px, 3vw, 40px) !important; }

          /* Aggressive horizontal overflow prevention */
          * { max-width: 100vw !important; overflow-x: hidden !important; }
        }
        ${extraStyle}
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 20, background: "transparent", opacity: 0.6 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: tokens.color.accent, transition: "width 0.1s ease-out" }} />
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
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          padding: "32px 20px",
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
            border: `1px solid ${tokens.color.cardBorder}`,
            background: "transparent",
            color: tokens.color.textDark,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 64,
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.color.offWhite;
            e.currentTarget.style.borderColor = tokens.color.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = tokens.color.cardBorder;
          }}
        >
          <BackArrowIcon />
        </button>

        <nav style={{ position: "relative", paddingLeft: 10 }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: indicatorTop + 4,
              width: 1,
              height: 10,
              borderRadius: tokens.radius.full,
              background: tokens.color.accent,
              opacity: 0.6,
              transition: "top 0.25s ease",
            }}
          />
          <div ref={navListRef} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                  fontSize: 13,
                  lineHeight: 1.3,
                  color: active === s.id ? tokens.color.textDark : tokens.color.muted,
                  fontWeight: tokens.weight.regular,
                  transition: "color 0.2s ease",
                  letterSpacing: "-0.3px",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {highlights.length > 0 && (
          <div style={{ marginTop: "auto", paddingTop: 20, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
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
                fontSize: 12,
                lineHeight: 1.2,
                fontWeight: tokens.weight.regular,
                color: tokens.color.muted,
                letterSpacing: "-0.3px",
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
                      color: tokens.color.body,
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
                        background: tokens.color.muted,
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
          padding: "80px 0 0",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "clamp(320px, 90vw, 880px)",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "clamp(20px, 3.5%, 48px)",
            paddingRight: "clamp(20px, 3.5%, 48px)",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};
