import type { FC } from "react";
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
import nvidiaLogo from "./assets/nvidia-logo.png";
import platoHome from "./assets/plato-home.png";

// Preload hero image for faster initial render
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = laneyPhoto;
  document.head.appendChild(link);
}


const Portfolio: FC = () => {
  const { ref: workSectionRef, isVisible: workVisible } = useScrollReveal();
  const { ref: card1Ref, isVisible: card1Visible } = useScrollReveal();
  const { ref: card2Ref, isVisible: card2Visible } = useScrollReveal();
  const { ref: card3Ref, isVisible: card3Visible } = useScrollReveal();
  const { ref: transitionRef, isVisible: transitionVisible } = useScrollReveal();

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

        .card-reveal {
          opacity: 0;
          transform: translateY(20px);
        }

        .card-1-reveal {
          animation: ${card1Visible ? "scrollFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
        }

        .card-2-reveal {
          animation: ${card2Visible ? "scrollFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards" : "none"};
        }

        .card-3-reveal {
          animation: ${card3Visible ? "scrollFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards" : "none"};
        }

        .transition-reveal {
          opacity: 0;
          transform: translateY(20px);
          animation: ${transitionVisible ? "scrollFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
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
            <div ref={card1Ref} className="card-reveal card-1-reveal">
              <ProjectCard
                screenshot={myshakeApp}
                layout="portrait"
                height={650}
                roleOutcome="Mobile Design × Crisis Response"
                caption="Turned earthquake safety into the priority. Reduced steps from 7 to 3. Designed for crisis, not exploration."
                captionItalic="45% engagement increase"
                to="/myshake-design"
                darkHoverMode={true}
              />
            </div>

            <div ref={card2Ref} className="card-reveal card-2-reveal">
              <ProjectCard
                screenshot={nvidiaLogo}
                layout="landscape"
                height={650}
                roleOutcome="AI Design × Automation"
                caption="Built an AI usability tester that spots friction points humans miss. Never sleeps. Always learning."
                captionItalic="Autonomous UX validation"
                to="/nvidia-ai-ux-agent"
                darkHoverMode={true}
              />
            </div>

            <div ref={card3Ref} className="card-reveal card-3-reveal">
              <ProjectCard
                screenshot={platoHome}
                layout="landscape"
                height={550}
                roleOutcome="Travel Planning × Decision Design"
                caption="A solution to decision fatigue and itinerary planning for travelers."
                captionItalic="decision fatigue"
                darkHoverMode={true}
              />
            </div>
          </div>
        </ContentContainer>

        <ContentContainer>
          <div ref={transitionRef} className="transition-reveal">
            <WorkTransition />
          </div>
        </ContentContainer>
      </div>

      <div className="content-reveal">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
