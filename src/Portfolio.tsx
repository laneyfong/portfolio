import type { FC } from "react";
import { useState } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Badge from "./components/Badge";
import HangingCard from "./components/HangingCard";
import ProjectCard from "./components/ProjectCard";
import WorkTransition from "./components/WorkTransition";
import Footer from "./components/Footer";
import { useScrollReveal } from "./hooks/useScrollReveal";

import laneyPhoto from "./assets/laney-photo.jpg";
import myshakeApp from "./assets/myshake-app.png";
import uxAgentScreenshot from "./assets/ux-agent-screenshot.png";
import platoHome from "./assets/plato-home.png";
import platoItinerary from "./assets/plato-itinerary.png";

// Preload hero image for faster initial render
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = laneyPhoto;
  document.head.appendChild(link);
}

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
        minHeight: 467,
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
  const { ref: workSectionRef, isVisible: workVisible } = useScrollReveal();

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
      <style>{`
        .work-grid > :last-child {
          grid-column: 1 / -1;
        }

        @media (max-width: 768px) {
          .work-grid { grid-template-columns: 1fr !important; }
          .work-grid > :last-child {
            grid-column: 1 / -1;
          }
        }

        @keyframes scrollFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .badge-reveal {
          opacity: 1;
        }

        .hero-reveal {
          opacity: 1;
        }

        .content-reveal {
          opacity: 1;
        }

        .work-section-reveal {
          opacity: 0;
          transform: translateY(20px);
          animation: ${workVisible ? "scrollFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
        }

        @media (prefers-reduced-motion: reduce) {
          .top-nav-reveal,
          .badge-reveal,
          .hero-reveal,
          .content-reveal,
          .work-section-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <TopNav />

      <main style={{ width: "100%", padding: "80px 0 0", boxSizing: "border-box", marginTop: "64px" }}>
        <div
          className="badge-section badge-reveal"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            marginBottom: 72,
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

      <div ref={workSectionRef} id="work-container" className="work-section-reveal" style={{ width: "100%", paddingTop: "clamp(80px, 12vw, 150px)", paddingBottom: "clamp(80px, 12vw, 150px)", boxSizing: "border-box" }}>
        <ContentContainer>
          <div
            id="work"
            className="grid-cols work-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
              alignItems: "stretch",
              minWidth: 0,
            }}
          >
            <ProjectCard
              screenshot={myshakeApp}
              layout="portrait"
              height={650}
              roleOutcome="Mobile Design × Crisis Response"
              caption="Turned earthquake safety into the priority. Reduced steps from 7 to 3. Designed for crisis, not exploration."
              captionItalic="45% engagement increase"
              to="/myshake-design"
            />

            <ProjectCard
              screenshot={uxAgentScreenshot}
              layout="landscape"
              height={650}
              roleOutcome="AI Design × Automation"
              caption="Built an AI usability tester that spots friction points humans miss. Never sleeps. Always learning."
              captionItalic="Autonomous UX validation"
              to="/nvidia-ai-ux-agent"
            />

            <PlatoCard />
          </div>
        </ContentContainer>

        <ContentContainer>
          <WorkTransition />
        </ContentContainer>
      </div>

      <div className="content-reveal">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
