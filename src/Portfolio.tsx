import type { FC } from "react";
import { useState } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import MyShakeCard from "./components/MyShakeCard";
import IDbridgeCard from "./components/IDbridgeCard";
import VeriSupplyCard from "./components/VeriSupplyCard";
import NvidiaCard from "./components/NvidiaCard";
import FeaturedWorkShowcase from "./components/FeaturedWorkShowcase";
import Footer from "./components/Footer";
import { useScrollReveal } from "./hooks/useScrollReveal";
import kinoSvg from "./assets/kino.svg";


const Portfolio: FC = () => {
  const { ref: workSectionRef, isVisible: workVisible } = useScrollReveal();
  const [videoReady] = useState(true);
  const [, setHoveredCaseStudy] = useState<string | null>(null);


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
      <img
        src={kinoSvg}
        alt="Kino background"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          height: "400px",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />
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
          opacity: ${videoReady ? 1 : 0};
          transform: ${videoReady ? "translateY(0)" : "translateY(20px)"};
          animation: ${videoReady && workVisible ? "scrollFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "none"};
          transition: ${!videoReady ? "opacity 0.4s ease-out" : "none"};
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

      <main style={{ width: "100%", padding: "40px 0 0", boxSizing: "border-box", marginTop: "24px", position: "relative", zIndex: 1 }}>
        <div
          className="hero-section badge-reveal"
          style={{
            position: "relative",
            paddingBottom: 16,
            paddingLeft: "62px",
            paddingRight: "52px",
            paddingTop: "98px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <h1 style={{
            fontFamily: "'Manrope'",
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: "33px",
            letterSpacing: "-0.05em",
            color: "#BEBEBE",
            maxWidth: "891px",
            margin: 0,
            padding: 0,
          }}>
            I design <strong style={{ fontWeight: 500, color: "#111111" }}>0 to 1</strong> interfaces that are inclusive, drive business growth, and executed with taste.
          </h1>
          <p style={{
            fontFamily: "'Manrope'",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "-0.05em",
            color: "#BEBEBE",
            margin: 0,
            padding: 0,
          }}>
            Based in San Francisco Bay Area
          </p>
        </div>
      </main>

      <div ref={workSectionRef} id="work-container" className="work-section-reveal" style={{ width: "100%", paddingTop: "8px", paddingBottom: "clamp(200px, 20vw, 400px)", paddingLeft: "52px", paddingRight: "52px", boxSizing: "border-box" }}>
        <section id="work" style={{ width: "100%" }}>
          <FeaturedWorkShowcase
            onActiveIndexChange={(index) => {
              if (workVisible) {
                const caseStudies = ["MyShake", "VeriSupply", "IDBridge", "Nvidia"];
                setHoveredCaseStudy(caseStudies[index] || null);
              } else {
                setHoveredCaseStudy(null);
              }
            }}
          >
            <MyShakeCard
              caption="Increased engagement by 45% through "
              captionItalic="IA restructure"
              context="Internship"
              to="/myshake-design"
              boldMetrics={["45%"]}
            />
            <VeriSupplyCard />
            <IDbridgeCard
              caption="Designed accessible identity platform in "
              captionItalic="6 hours"
              context="Designathon"
              to="/idbridge-design"
            />
            <NvidiaCard />
          </FeaturedWorkShowcase>
        </section>
      </div>

      <div className="content-reveal">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
