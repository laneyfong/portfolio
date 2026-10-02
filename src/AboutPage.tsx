import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { tokens } from "./tokens";
import TopNav from "./components/TopNav";
import ContentContainer from "./components/ContentContainer";
import Footer from "./components/Footer";
import ImageStory from "./components/ImageStory";
import ProudMomentsCarousel from "./components/ProudMomentsCarousel";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { LinkedInIcon, EmailIcon, ResumeIcon, SocialIconLink, LINKEDIN_URL, CONTACT_EMAIL, RESUME_URL } from "./components/SocialIcons";
import clubPic from "./assets/club-pic.jpg";
import clubPicWebp from "./assets/club-pic.webp";
import designathonWin from "./assets/designathon-win.jpg";
import cursorDog from "./assets/cursor-dog.png";

const Italic: FC<{ children: string; color?: string }> = ({ children, color }) => (
  <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400, color }}>{children}</em>
);

function withItalics(text: string, terms: string[]): ReactNode[] {
  const pattern = new RegExp(`(${terms.join("|")})`, "g");
  return text.split(pattern).map((part, i) => (terms.includes(part) ? <Italic key={i}>{part}</Italic> : part));
}

const HERO_WIDTH = "min(720px, 90vw)";
const PANEL_WIDTH = 252;

const AboutPage: FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [delayedPos, setDelayedPos] = useState({ x: 0, y: 0 });
  const [bioPhotoHovered, setBioPhotoHovered] = useState(false);
  const [dogWaving, setDogWaving] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [proudMomentIndex, setProudMomentIndex] = useState(0);
  const { ref: bioSectionRef } = useScrollReveal({ threshold: 0.3 });
  const { ref: proudSectionRef, isVisible: proudVisible } = useScrollReveal({ threshold: 0.2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let rafId: number;
    const smoothFollow = () => {
      setDelayedPos((prev) => {
        const dx = cursorPos.x - prev.x;
        const dy = cursorPos.y - prev.y;
        return {
          x: prev.x + dx * 0.06,
          y: prev.y + dy * 0.06,
        };
      });
      rafId = requestAnimationFrame(smoothFollow);
    };
    rafId = requestAnimationFrame(smoothFollow);
    return () => cancelAnimationFrame(rafId);
  }, [cursorPos]);

  // Reset dog waving after animation completes
  useEffect(() => {
    if (!dogWaving) return;
    const id = setTimeout(() => setDogWaving(false), 600);
    return () => clearTimeout(id);
  }, [dogWaving]);

  // Dog says hello on any click
  useEffect(() => {
    const handleClick = () => setDogWaving(true);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const rightPanelStyle = {
    flexBasis: PANEL_WIDTH,
    width: PANEL_WIDTH,
    alignSelf: "flex-start" as const,
    paddingTop: 0,
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
      {/* Cursor-following dog */}
      <img
        src={cursorDog}
        alt="Cute dog following cursor"
        style={{
          position: "fixed",
          width: 43,
          height: 47,
          pointerEvents: "none",
          left: `${delayedPos.x}px`,
          top: `${delayedPos.y}px`,
          transform: bioPhotoHovered ? "translate(-20px, 20px)" : "translate(-20px, 20px)",
          zIndex: 999,
          animation: dogWaving ? "dogWave 0.6s ease-in-out 1" : bioPhotoHovered ? "dogBounce 2s ease-in-out infinite" : "none",
        }}
      />

      <style>{`
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

        @keyframes aboutStoryFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        .bio-section-reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .proud-section-reveal {
          opacity: 0;
          transform: translateY(20px);
          animation: ${proudVisible ? "scrollFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards" : "none"};
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes dogBounce {
          0%, 100% { transform: translate(-20px, 20px) scale(1); }
          12.5% { transform: translate(-20px, -5px) scale(1.1); }
          25% { transform: translate(-20px, 20px) scale(1); }
          37.5% { transform: translate(-20px, 5px) scale(1.05); }
          50% { transform: translate(-20px, 20px) scale(1); }
          50.1%, 100% { transform: translate(-20px, 20px) scale(1); }
        }
        @keyframes dogWave {
          0% { transform: translate(-20px, 20px) scale(1) rotate(0deg); }
          10% { transform: translate(-20px, 20px) scale(1) rotate(-20deg); }
          20% { transform: translate(-20px, 20px) scale(1) rotate(20deg); }
          30% { transform: translate(-20px, 20px) scale(1) rotate(-20deg); }
          40% { transform: translate(-20px, 20px) scale(1) rotate(20deg); }
          50% { transform: translate(-20px, 20px) scale(1) rotate(-10deg); }
          60%, 100% { transform: translate(-20px, 20px) scale(1) rotate(0deg); }
        }
        @keyframes dogSpin {
          0% { transform: translate(-20px, 20px) rotate(0deg) scale(1); }
          100% { transform: translate(-20px, 20px) rotate(360deg) scale(1); }
        }
        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(0px) translateX(0px); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-40px) translateX(var(--offset, 0px)); }
        }
        .about-photo-card:focus {
          outline: none;
        }
        .about-photo-card:focus-visible {
          outline: 2px solid ${tokens.color.accent};
          outline-offset: 4px;
        }
        .story-doodle {
          position: absolute;
          font-size: 24px;
          opacity: 0;
          animation: float 2s ease-in-out infinite;
        }
        .story-doodle-1 {
          top: -10px;
          left: 10%;
          animation: float 2s ease-in-out infinite;
        }
        .story-doodle-2 {
          top: 5px;
          right: 15%;
          animation: float-2 2.5s ease-in-out infinite 0.3s;
        }
        .story-doodle-3 {
          bottom: 10px;
          left: 20%;
          animation: float-3 2.2s ease-in-out infinite 0.6s;
        }
        /* Main layout adjustments for top nav */
        main {
          margin-top: 64px !important;
        }

        /* Mobile responsiveness */
        @media (max-width: 760px) {
          .about-container {
            gap: 24px !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .about-left-panel {
            display: none !important;
            width: 100% !important;
            flex-basis: 100% !important;
            min-width: 100% !important;
            order: 2 !important;
          }
          .about-left-panel.revealed {
            display: block !important;
            margin-top: 32px !important;
          }
          .about-center-photo {
            width: 100% !important;
            flex-basis: 100% !important;
            flex-shrink: 0 !important;
            order: 1 !important;
          }
          .about-right-panel {
            width: 100% !important;
            flex-basis: 100% !important;
            min-width: 100% !important;
            align-self: stretch !important;
            order: 3 !important;
          }
          /* Hide side label and photo notes on mobile */
          .about-center-photo > div:nth-child(2) {
            display: none !important;
          }
          .about-center-photo div[role="button"] + div {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          main { margin-left: 0 !important; width: 100% !important; padding: 64px 0 96px !important; }
          .about-container {
            gap: 20px !important;
          }
          /* Ensure content fits viewport on mobile */
          * {
            box-sizing: border-box !important;
          }
          body, html {
            width: 100% !important;
            overflow-x: hidden !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bio-section-reveal,
          .proud-section-reveal {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <TopNav />

      <main style={{ width: "100%", padding: "64px 0 96px", boxSizing: "border-box", marginTop: "64px" }}>
        <ContentContainer>
        <div style={{ width: HERO_WIDTH, margin: "0 auto 16px" }}>
          <h1
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: tokens.text.xl,
              color: tokens.color.muted,
              margin: 0,
            }}
          >
            Introducing <Italic color={tokens.color.ink}>Laney Fong</Italic>
          </h1>
        </div>

        <div
          className="about-container"
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 14,
            width: HERO_WIDTH,
            margin: "0 auto",
          }}
        >

          {/* Top: Photos */}
          <div
            className="about-center-photo"
            style={{ width: "100%", flexShrink: 0, position: "relative" }}
            onMouseEnter={() => setBioPhotoHovered(true)}
            onMouseLeave={() => setBioPhotoHovered(false)}
          >
            <ImageStory
              images={[
                { src: "/IMG_0338.PNG", alt: "Portfolio moment 1" },
                { src: "/IMG_0336.PNG", alt: "Portfolio moment 2" },
                { src: "/IMG_0340.PNG", alt: "Portfolio moment 3" },
                { src: "/IMG_0342.PNG", alt: "Portfolio moment 4" },
              ]}
              onImageChange={(index) => setCurrentPhotoIndex(index)}
            />

            {/* Side label */}
            <div
              style={{
                position: "absolute",
                right: -180,
                top: 0,
                zIndex: 100,
                pointerEvents: "none",
              }}
            >
              {/* Handwritten label */}
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: tokens.color.muted,
                  transform: "rotate(-8deg)",
                  letterSpacing: "0.5px",
                  maxWidth: "150px",
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  paddingTop: "16px",
                  whiteSpace: "normal",
                }}
              >
                {["", "", "", ""][currentPhotoIndex]}
              </div>
            </div>
          </div>

          {/* Bottom: Contact panel */}
          <div className="about-left-panel" style={rightPanelStyle}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h3
                style={{
                  fontFamily: tokens.font.sans,
                  fontWeight: tokens.weight.regular,
                  fontSize: tokens.text.base,
                  color: tokens.color.body,
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                Let's <Italic>matcha</Italic> (or <Italic>coffee</Italic>) chat
              </h3>
              <div style={{ display: "flex", gap: 10, margin: 0 }}>
                <SocialIconLink href={LINKEDIN_URL} label="LinkedIn" external variant="light">
                  <LinkedInIcon />
                </SocialIconLink>
                <SocialIconLink href={`mailto:${CONTACT_EMAIL}`} label="Email" variant="light">
                  <EmailIcon />
                </SocialIconLink>
                <SocialIconLink href={RESUME_URL} label="Download resume" external variant="light">
                  <ResumeIcon />
                </SocialIconLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bio copy */}
        <div ref={bioSectionRef} className="bio-section-reveal" style={{ width: HERO_WIDTH, margin: "8px auto 0" }}>
          <p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.md,
              lineHeight: tokens.leading.normal,
              color: tokens.color.body,
              margin: "0 0 16px",
            }}
          >
            {withItalics(
              "A Product Designer with a background in Cognitive Science @ UC Berkeley and is currently finishing up her HCI master's @ UCSC.",
              ["Product Designer", "Cognitive Science @ UC Berkeley", "HCI master's @ UCSC"]
            )}
          </p>
          <p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              lineHeight: tokens.leading.normal,
              color: tokens.color.body,
              margin: "0 0 16px",
            }}
          >
            Hello! I am Laney.
          </p>
          <p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              lineHeight: tokens.leading.normal,
              color: tokens.color.body,
              margin: "0 0 16px",
            }}
          >
            {withItalics(
              "Raised by a designer and an engineer in the Bay Area, I grew up at the intersection of art and technology. Seeing those two worlds blend early on, I always knew design was my calling. That early passion, combined with a deep curiosity about human behavior, led me to product design.",
              ["product design"]
            )}
          </p>
          <p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              lineHeight: tokens.leading.normal,
              color: tokens.color.body,
              margin: 0,
            }}
          >
            {withItalics(
              "I design products that work for everyone. My approach: research-backed decisions, obsessive attention to accessibility, and ruthless focus on reducing friction. Every pixel serves a purpose.",
              ["research-backed", "accessibility", "friction"]
            )}
          </p>
        </div>

        {/* Things I am proud of */}
        <div ref={proudSectionRef} className="proud-section-reveal" style={{ width: HERO_WIDTH, margin: "64px auto 0" }}>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.regular,
              fontSize: tokens.text.lg,
              color: tokens.color.muted,
              margin: "0 0 20px",
            }}
          >
            Things I am proud of
          </h2>
          <div
            style={{
              background: tokens.color.offWhite,
              borderRadius: tokens.radius.md,
              padding: 28,
            }}
          >
            <p
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                lineHeight: tokens.leading.normal,
                color: tokens.color.body,
                margin: "0 0 20px",
              }}
            >
              {proudMomentIndex === 0
                ? "As president, I revitalized UC Berkeley's dedication to user experience by restructuring its primary UX club. My focus on member engagement and real-world project experience transformed the organization into a thriving, tight-knit professional community!"
                : "We won first place in the Google Designathon building an app that connects unhoused individuals to resources. This experience reinforced my belief in design's power to create meaningful social impact. Shout out to my amazing team members Kaiwen, Hribav, Andrew, and Gabriel!"}
            </p>
            <ProudMomentsCarousel
              onIndexChange={setProudMomentIndex}
              moments={[
                {
                  src: clubPic,
                  srcWebp: clubPicWebp,
                  alt: "UC Berkeley UX club members celebrating together",
                  label: "UC Berkeley UX Club",
                },
                {
                  src: designathonWin,
                  srcWebp: designathonWin,
                  alt: "Google Designathon Win",
                  label: "Google Designathon",
                },
              ]}
            />
          </div>
        </div>

        </ContentContainer>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
