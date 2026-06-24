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
import heroBgPattern from "./assets/hero-bg-pattern.svg";

const ArrowIcon: FC = () => (
  <svg width="8" height="9" viewBox="0 0 8.271 8.974" fill="currentColor">
    <path
      d="M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z"
      fillRule="nonzero"
    />
  </svg>
);

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
        boxShadow: hovered ? `${tokens.shadow.cardGlowHover}, ${tokens.shadow.subtle}` : "none",
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
        // box-shadow lives on this outer, overflow-visible box so the glow ring isn't clipped
        // by the inner content's overflow:hidden (needed for the peeking-phone effect).
        boxShadow: hovered ? `${tokens.shadow.cardGlowHover}, ${tokens.shadow.subtle}` : "none",
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
      }}
    >
      <style>{`
        @media (max-width: 880px) {
          .grid-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header />

      <main style={{ maxWidth: 1320, margin: "0 auto", padding: "28px 32px 96px" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginBottom: 56,
          }}
        >
          <img
            src={heroBgPattern}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(1100px, 96vw)",
              maxWidth: "none",
              zIndex: 0,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <HangingCard stringHeight={48} holeCenterOffset={36}>
              <Badge photo={laneyPhoto} onCTAClick={scrollToWork} />
            </HangingCard>
          </div>
        </div>

        <div
          id="work"
          className="grid-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "377px 1fr",
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
              height={717}
              caption="Increasing user engagement through restructuring IA."
              captionItalic="Increasing user engagement"
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
              caption="Designing an AI UX Agent for internal usability testing."
              captionItalic="AI UX Agent"
            />
            <PlatoCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
