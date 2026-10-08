import type { FC } from "react";
import { useState, useEffect } from "react";
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
          opacity: Math.max(0.8 - scrollY / 1000, 0),
          transform: `translateY(-${Math.min(scrollY * 0.4, 300)}px)`,
          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        }}
      />
      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .work-grid > :last-child {
          grid-column: 1;
        }

        @media (max-width: 768px) {
          .work-grid {
            grid-template-columns: 1fr !important;
          }
          .work-grid > :last-child {
            grid-column: 1 !important;
          }
          main {
            padding-top: 24px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
            margin-top: 16px !important;
          }
          .hero-section {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 60px !important;
            padding-bottom: 12px !important;
          }
          .hero-section h1 {
            font-size: 18px !important;
            line-height: 26px !important;
          }
          .hero-section p {
            font-size: 12px !important;
          }
          #work-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 12px !important;
          }
        }

        @media (max-width: 640px) {
          main {
            padding-top: 20px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
            margin-top: 12px !important;
          }
          .hero-section {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-top: 50px !important;
            padding-bottom: 8px !important;
            gap: 4px !important;
          }
          .hero-section h1 {
            font-size: 16px !important;
            line-height: 22px !important;
            font-weight: 500 !important;
          }
          .hero-section p {
            font-size: 12px !important;
          }
          #work-container {
            padding-left: 16px !important;
            padding-right: 16px !important;
            padding-top: 8px !important;
            padding-bottom: 120px !important;
          }
          .work-grid {
            gap: 12px !important;
          }
        }

        @media (max-width: 480px) {
          main {
            padding-top: 16px !important;
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .hero-section {
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-top: 40px !important;
            padding-bottom: 4px !important;
          }
          .hero-section h1 {
            font-size: 14px !important;
            line-height: 20px !important;
          }
          .hero-section p {
            font-size: 11px !important;
          }
          #work-container {
            padding-left: 12px !important;
            padding-right: 12px !important;
            padding-top: 4px !important;
            padding-bottom: 100px !important;
          }
          .work-grid {
            gap: 8px !important;
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .work-section-cards > div {
          opacity: 0;
        }

        .work-section-cards.visible > div:nth-child(1),
        .work-section-cards.visible > div:nth-child(2) {
          animation: slideUpFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .work-section-cards.visible > div:nth-child(3),
        .work-section-cards.visible > div:nth-child(4) {
          animation: none;
        }

        .work-section-cards.visible.scrolled > div:nth-child(3),
        .work-section-cards.visible.scrolled > div:nth-child(4) {
          animation: slideUpFadeIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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


        @media (max-width: 768px) {
          img[alt="Kino background"] {
            display: none !important;
          }
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

      <main style={{ width: "100%", padding: "40px 0 0", boxSizing: "border-box", marginTop: "65px", position: "relative", zIndex: 1 }}>
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
            transform: `translateY(-${Math.min(scrollY * 0.3, 200)}px)`,
            opacity: Math.max(1 - scrollY / 800, 0),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
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
            textWrap: "balance",
          }}>
            I design <strong style={{ fontWeight: 500, color: "#111111" }}>0 to 1</strong> interfaces that are inclusive, drive business growth, and executed with taste.
          </h1>
          <p style={{
            fontFamily: "'Manrope'",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "-0.05em",
            color: "#808080",
            margin: 0,
            padding: 0,
          }}>
            Currently studying HCI @ UCSC, Prev. @ MyShake
          </p>
        </div>
      </main>

      <div ref={workSectionRef} id="work-container" className="work-section-reveal" style={{ width: "100%", paddingTop: "8px", paddingBottom: "clamp(200px, 20vw, 400px)", paddingLeft: "52px", paddingRight: "52px", boxSizing: "border-box" }}>
        <section id="work" style={{ width: "100%" }}>
          <FeaturedWorkShowcase
            className={`work-section-cards ${workVisible ? "visible" : ""} ${scrollY > 400 ? "scrolled" : ""}`}
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
              caption="A solution to verify unhoused individuals in "
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
