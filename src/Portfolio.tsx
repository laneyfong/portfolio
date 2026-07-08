import type { FC } from "react";
import { useState } from "react";
import { tokens } from "./tokens";
import Header from "./components/Header";
import Badge from "./components/Badge";
import HangingCard from "./components/HangingCard";
import ProjectCard from "./components/ProjectCard";
import Footer from "./components/Footer";

import laneyPhoto from "./assets/laney-photo.jpg";
import myshakeLogo from "./assets/myshake-logo.png";
import myshakeApp from "./assets/myshake-app.png";
import nvidiaLogo from "./assets/nvidia-logo.png";
import uxAgentScreenshot from "./assets/ux-agent-screenshot.png";
import platoHome from "./assets/plato-home.png";
import platoItinerary from "./assets/plato-itinerary.png";

const ArrowIcon: FC = () => (
  <svg width="8" height="9" viewBox="0 0 8.271 8.974" fill="currentColor">
    <path
      d="M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z"
      fillRule="nonzero"
    />
  </svg>
);

// Premium halftone texture pattern for hero section
// Fine dots evenly spaced for editorial magazine aesthetic
const HALFTONE_PATTERN = `
<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
  <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.6"/>
  <circle cx="8" cy="8" r="1.2" fill="currentColor" opacity="0.6"/>
</svg>
`;

const getHalftonePatternUrl = () => {
  return `data:image/svg+xml;base64,${btoa(HALFTONE_PATTERN)}`;
};

const ViewMoreCard: FC = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 255,
        backgroundColor: tokens.color.offWhite,
        borderRadius: tokens.radius.md,
        border: `1px solid ${tokens.color.cardBorder}`,
        textDecoration: "none",
        boxSizing: "border-box",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? tokens.shadow.subtle : "none",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: tokens.font.sans,
          fontWeight: tokens.weight.regular,
          fontSize: tokens.text.base,
          color: tokens.color.body,
        }}
      >
        View more work
        <span
          style={{
            display: "inline-flex",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
            transition: "transform 0.15s ease",
          }}
        >
          <ArrowIcon />
        </span>
      </span>
    </a>
  );
};

const PlatoCard: FC = () => {
  const [hovered, setHovered] = useState(false);
  const caption = "A solution to decision fatigue and itinerary planning.";
  const italic = "decision fatigue";
  const [before, after] = caption.split(italic);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        height: 467,
        borderRadius: tokens.radius.sm,
        cursor: "pointer",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        // box-shadow lives on this outer, overflow-visible box so the shadow isn't clipped
        // by the inner content's overflow:hidden (needed for the peeking-phone effect).
        boxShadow: hovered ? tokens.shadow.subtle : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: tokens.color.offWhite,
          borderRadius: tokens.radius.sm,
          border: `1px solid ${tokens.color.cardBorder}`,
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 32,
            padding: "36px 36px 0 36px",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              width: 263,
              height: 249,
              borderRadius: tokens.radius.md,
              backgroundImage: `url(${platoHome})`,
              backgroundSize: "100% auto",
              backgroundPosition: "0 -481px",
              boxShadow: tokens.shadow.card,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 263,
              height: 700,
              borderRadius: "24px 24px 0 0",
              backgroundImage: `url(${platoHome})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              boxShadow: tokens.shadow.card,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 263,
              height: 700,
              borderRadius: "24px 24px 0 0",
              backgroundImage: `url(${platoItinerary})`,
              backgroundSize: "cover",
              backgroundPosition: "top center",
              boxShadow: tokens.shadow.card,
              flexShrink: 0,
            }}
          />
        </div>

        <span
          style={{
            position: "absolute",
            bottom: 36,
            left: 36,
            width: 230,
            maxWidth: "calc(100% - 72px)",
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.regular,
            fontSize: tokens.text.md,
            color: tokens.color.body,
            lineHeight: tokens.leading.snug,
          }}
        >
          {before}
          <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>{italic}</em>
          {after}
        </span>
      </div>
    </div>
  );
};

const Portfolio: FC = () => {
  const scrollToWork = () => {
    const target = document.getElementById("work");
    if (!target) return;
    const navOffset = tokens.layout.navClearance;
    const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.color.white,
        fontFamily: tokens.font.sans,
        color: tokens.color.body,
        position: "relative",
      }}
    >
      {/* Premium halftone texture for hero section */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1000px",
          backgroundImage: `url('${getHalftonePatternUrl()}')`,
          backgroundRepeat: "repeat",
          backgroundSize: "12px 12px",
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "darken",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      <style>{`
        @media (max-width: 880px) {
          .grid-cols { grid-template-columns: 1fr !important; }
        }
        /* Tablet responsiveness */
        @media (max-width: 900px) {
          main { margin-left: 100px !important; width: calc(100% - 100px) !important; }
          div[id="work-container"] { margin-left: 100px !important; width: calc(100% - 100px) !important; }
          .badge-section { min-height: clamp(420px, 65vh, 90vh) !important; margin-bottom: 96px !important; margin-top: -24px !important; }
        }
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          main { margin-left: 0 !important; width: 100% !important; }
          div[id="work-container"] { margin-left: 0 !important; width: 100% !important; }
          .badge-section { min-height: clamp(350px, 55vh, 80vh) !important; margin-bottom: 40px !important; margin-top: -24px !important; }
          .badge-bg-pattern { display: none !important; }
          .work-grid > div:last-child { order: 1; }
          .work-grid > div:first-child { order: 2; }
        }
      `}</style>

      <Header />

      <main style={{ marginLeft: 120, width: "calc(100% - 120px)", padding: "64px clamp(32px, 7vw, 80px) 0", boxSizing: "border-box" }}>
        <div
          className="badge-section"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginBottom: 96,
            marginTop: -280,
            minHeight: "clamp(400px, 50vh, 70vh)",
            alignItems: "center",
            background: "transparent",
          }}
        >
          <div style={{ position: "relative", zIndex: 10 }}>
            <HangingCard stringHeight={280} holeCenterOffset={36}>
              <Badge photo={laneyPhoto} onCTAClick={scrollToWork} />
            </HangingCard>
          </div>
        </div>
      </main>

      <div id="work-container" style={{ marginLeft: 120, width: "calc(100% - 120px)", padding: "0 clamp(32px, 7vw, 80px) clamp(80px, 12vw, 150px)", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1450, margin: "0 auto", width: "100%" }}>
          <div
            id="work"
            className="grid-cols work-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: 12,
              alignItems: "start",
              minWidth: 0,
            }}
          >
          <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
            <ProjectCard
              logo={myshakeLogo}
              logoAlt="MyShake"
              logoHeight={20}
              screenshot={myshakeApp}
              layout="portrait"
              height={760}
              caption="Users couldn't find critical earthquake info fast. Restructured IA around safety first, not data visualization."
              captionItalic="45% engagement increase"
              metrics={[
                { value: "45%", label: "↑ engagement" },
                { value: "7→3", label: "steps to check loved ones" },
              ]}
              to="/myshake-design"
            />
            <ViewMoreCard />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
            <ProjectCard
              logo={nvidiaLogo}
              logoAlt="NVIDIA"
              logoHeight={20}
              screenshot={uxAgentScreenshot}
              layout="landscape"
              height={506}
              caption="Built an AI agent that autonomously tests product UX, catching issues researchers would miss—speeding up internal iteration cycles."
              captionItalic="AI-powered usability testing"
              to="/nvidia-ai-ux-agent"
            />
            <PlatoCard />
          </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
