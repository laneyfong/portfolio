import type { FC } from "react";
import { useState, useEffect } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Badge from "./components/Badge";
import HangingCard from "./components/HangingCard";
import HalftoneField from "./components/HalftoneField";
import HeroEnvironment from "./components/HeroEnvironment";
import DesignStatus from "./components/DesignStatus";
import MyShakeCard from "./components/MyShakeCard";
import IDbridgeCard from "./components/IDbridgeCard";
import VeriSupplyCard from "./components/VeriSupplyCard";
import NvidiaCard from "./components/NvidiaCard";
import FeaturedWorkShowcase from "./components/FeaturedWorkShowcase";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import { useScrollReveal } from "./hooks/useScrollReveal";


const Portfolio: FC = () => {
  const { ref: workSectionRef, isVisible: workVisible } = useScrollReveal();

  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [videoReady, setVideoReady] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);
  const [hoveredCaseStudy, setHoveredCaseStudy] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

      <main style={{ width: "100%", padding: "40px 0 0", boxSizing: "border-box", marginTop: "24px", position: "relative" }}>
        <AnimatedBackground />

        <div
          className="badge-section badge-reveal"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
            marginTop: -180,
            minHeight: "clamp(300px, 40vh, 60vh)",
            paddingBottom: 40,
            background: "white",
            overflow: "visible",
          }}
        >
          <HalftoneField width={dimensions.width} height={dimensions.height * 1.2} onVideoReady={() => setVideoReady(true)} />

          {/* Hero environment: background field and typography */}
          <HeroEnvironment
            width={dimensions.width}
            height={dimensions.height * 1.2}
            isFlipped={isFlipped}
          />

          {/* Central hanging badge */}
          <div style={{ position: "relative", zIndex: 10, marginBottom: 20 }}>
            <HangingCard stringHeight={280} holeCenterOffset={36}>
              <Badge
                onCTAClick={scrollToWork}
                onFlipChange={setIsFlipped}
                onHoverChange={setIsBadgeHovered}
                externalIsFlipped={isFlipped}
              />
            </HangingCard>
          </div>

          {/* Hero headline and CTA - visible without flipping */}
          <div
            style={{
              textAlign: "center",
              maxWidth: "500px",
              zIndex: 5,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <h1
              style={{
                margin: "0 0 12px 0",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "clamp(24px, 4vw, 32px)",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.ink,
                lineHeight: 1.3,
              }}
            >
              Accessible-first product design
            </h1>
            <p
              style={{
                margin: "0 0 20px 0",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.regular,
                fontSize: "clamp(14px, 2.5vw, 16px)",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.body,
                lineHeight: 1.5,
              }}
            >
              Building confident, polished products from concept to launch.
            </p>
            <button
              onClick={scrollToWork}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                borderRadius: "12px",
                border: `1px solid ${tokens.color.cardBorder}`,
                padding: "11px 24px",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "14px",
                color: tokens.color.ink,
                lineHeight: 1.4,
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "background-color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                e.currentTarget.style.borderColor = tokens.color.muted;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = tokens.color.cardBorder;
              }}
            >
              View my work
              <svg width="12" height="12" viewBox="0 0 8.271 8.974" fill="currentColor">
                <path
                  d="M 8.271 4.838 L 4.135 8.974 L 0 4.838 L 0.396 4.443 L 3.854 7.901 L 3.854 0 L 4.417 0 L 4.417 7.901 L 7.875 4.443 L 8.271 4.838 Z"
                  fillRule="nonzero"
                />
              </svg>
            </button>
          </div>

          {/* Design status indicator */}
          <DesignStatus
            isBadgeHovered={isBadgeHovered}
            isFlipped={isFlipped}
            activeCaseStudy={hoveredCaseStudy}
          />
        </div>
      </main>

      <div ref={workSectionRef} id="work-container" className="work-section-reveal" style={{ width: "100%", paddingTop: "clamp(30px, 3vw, 50px)", paddingBottom: "clamp(200px, 20vw, 400px)", boxSizing: "border-box" }}>
        <ContentContainer>
          <section id="work" style={{ width: "100%" }}>
            <h1
              style={{
                margin: "0 0 32px 0",
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.light,
                fontSize: "clamp(20px, 3vw, 28px)",
                letterSpacing: tokens.tracking.tight,
                color: tokens.color.ink,
                lineHeight: 1.3,
              }}
            >
              Featured Work
            </h1>
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
                roleOutcome="Mobile Design × Crisis Response"
                caption="Turned earthquake safety into the priority. Reduced steps from 7 to 3. Designed for crisis, not exploration. "
                captionItalic="45% engagement increase"
                context="Internship"
                to="/myshake-design"
                boldMetrics={["7 to 3", "45%"]}
              />
              <VeriSupplyCard />
              <IDbridgeCard
                roleOutcome="Social Impact × Accessibility"
                caption="Won Google x UCSC Designathon. Designed a verified identity platform for unhoused individuals to access housing in just 6 hours. "
                captionItalic="First place winner"
                context="Designathon"
                to="/idbridge-design"
              />
              <NvidiaCard />
            </FeaturedWorkShowcase>
          </section>
        </ContentContainer>
      </div>

      <div className="content-reveal">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
