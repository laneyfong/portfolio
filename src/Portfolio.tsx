import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Badge from "./components/Badge";
import HangingCard from "./components/HangingCard";
import ProjectCard from "./components/ProjectCard";
import MyShakeCard from "./components/MyShakeCard";
import IDbridgeCard from "./components/IDbridgeCard";
import Footer from "./components/Footer";
import { useScrollReveal } from "./hooks/useScrollReveal";

import laneyPhoto from "./assets/laney-photo.jpg";
import myshakeDefault from "./assets/myshake-default.png";
import myshakeAlert from "./assets/myshake-alert.png";
import myshakeDetails from "./assets/myshake-details.png";
import idbridgeThumbnail from "./assets/idbridge-thumbnail.png";
import idbridgeDocuments from "./assets/idbridge-documents.png";
import idbridgeHistory from "./assets/idbridge-history.png";
import idbridgeMap from "./assets/idbridge-map.png";
import nvidiaLogo from "./assets/nvidia-logo.webp";

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

  const halftoneRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!halftoneRef.current) return;
      const rect = halftoneRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        <style>{`
          .halftone-bg {
            position: absolute;
            inset: 0;
            background-image:
              radial-gradient(circle, #000 0%, #000 2px, transparent 2px),
              radial-gradient(circle, #000 0%, #000 2.5px, transparent 2.5px),
              radial-gradient(circle, #000 0%, #000 1.5px, transparent 1.5px);
            background-size: 30px 30px, 50px 50px, 20px 20px;
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
            will-change: background-position;
          }
        `}</style>
        <div
          ref={halftoneRef}
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
            overflow: "hidden",
          }}
        >
          <div
            className="halftone-bg"
            style={{
              backgroundPosition: `${mousePos.x * 0.3}px ${mousePos.y * 0.3}px, ${mousePos.x * 0.5}px ${mousePos.y * 0.5}px, ${mousePos.x * 0.2}px ${mousePos.y * 0.2}px`,
            }}
          />
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
              <MyShakeCard
                defaultImage={myshakeDefault}
                alertImage={myshakeAlert}
                detailsImage={myshakeDetails}
                roleOutcome="Mobile Design × Crisis Response"
                caption="Turned earthquake safety into the priority. Reduced steps from 7 to 3. Designed for crisis, not exploration."
                captionItalic="45% engagement increase"
                context="Internship"
                to="/myshake-design"
              />
            </div>

            <div ref={card2Ref} className="card-reveal card-2-reveal">
              <IDbridgeCard
                defaultImage={idbridgeThumbnail}
                documentsImage={idbridgeDocuments}
                historyImage={idbridgeHistory}
                mapImage={idbridgeMap}
                roleOutcome="Social Impact × Accessibility"
                caption="Won Google x UCSC Designathon. Designed a verified identity platform for unhoused individuals to access housing in just 6 hours."
                captionItalic="First place winner"
                context="Designathon"
                to="/idbridge-design"
              />
            </div>

            <div ref={card3Ref} className="card-reveal card-3-reveal">
              <ProjectCard
                screenshot={nvidiaLogo}
                layout="landscape"
                height={550}
                roleOutcome="AI Design × Automation"
                caption="Built an AI usability tester that spots friction points humans miss. Never sleeps. Always learning."
                captionItalic="Autonomous UX validation"
                context="Capstone Project"
                to="/nvidia-ai-ux-agent"
                wipLabel="WIP"
              />
            </div>
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
