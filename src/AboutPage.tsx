import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { tokens } from "./tokens";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LinkedInIcon, EmailIcon, SocialIconLink, LINKEDIN_URL, CONTACT_EMAIL } from "./components/SocialIcons";
import aboutBioPhoto from "./assets/about-bio-photo.jpg";
import clubPic from "./assets/club-pic.jpg";
import aboutStoryNewYork from "./assets/about-story-newyork.jpg";
import aboutStoryFoodie from "./assets/about-story-foodie.jpg";
import cursorDog from "./assets/cursor-dog.png";
import coffeeMug from "./assets/coffee-mug.png";
import resumeIcon from "./assets/resume-icon.png";

// TODO: link to a real hosted resume file once one exists.
const RESUME_URL = "#";

const Italic: FC<{ children: string; color?: string }> = ({ children, color }) => (
  <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400, color }}>{children}</em>
);

function withItalics(text: string, terms: string[]): ReactNode[] {
  const pattern = new RegExp(`(${terms.join("|")})`, "g");
  return text.split(pattern).map((part, i) => (terms.includes(part) ? <Italic key={i}>{part}</Italic> : part));
}

const HERO_WIDTH = "min(500px, 88vw)";
const PANEL_WIDTH = 252;
const ROW_GAP = 40;
const PEEK_HEIGHT = 28;

const STORY_SLIDES = [
  { src: aboutStoryNewYork, caption: "I love traveling!" },
  { src: aboutStoryFoodie, caption: "Huge foodie <3" },
];
const STORY_DURATION_MS = 6000;

const AboutPage: FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [photoHovered, setPhotoHovered] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [storySlide, setStorySlide] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [delayedPos, setDelayedPos] = useState({ x: 0, y: 0 });
  const [storyHovered, setStoryHovered] = useState(false);
  const [bioPhotoHovered, setBioPhotoHovered] = useState(false);
  const [proudPhotoHovered, setProudPhotoHovered] = useState(false);
  const [dogWaving, setDogWaving] = useState(false);
  const [coffeeHovered, setCoffeeHovered] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  // Re-arms on every slide change (including manual taps), so a tap resets the clock.
  useEffect(() => {
    if (!revealed || reduceMotion) return;
    const id = setTimeout(() => {
      setStorySlide((s) => (s + 1) % STORY_SLIDES.length);
    }, STORY_DURATION_MS);
    return () => clearTimeout(id);
  }, [storySlide, revealed, reduceMotion]);

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

  const advanceStory = () => setStorySlide((s) => (s + 1) % STORY_SLIDES.length);

  const panelTransition = reduceMotion
    ? "none"
    : "flex-basis 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), margin 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

  // Only the "Life Outside of Design" panel is gated behind the photo click — contact
  // info and the resume should always be reachable without needing to discover that
  // interaction first. The row keeps a constant `gap`; the collapsed left panel cancels
  // its share of that gap with a matching negative margin, then releases it on reveal.
  const leftPanelStyle = {
    flexBasis: revealed ? PANEL_WIDTH : 0,
    width: revealed ? PANEL_WIDTH : 0,
    minWidth: revealed ? 200 : 0,
    opacity: revealed ? 1 : 0,
    marginRight: revealed ? 0 : -ROW_GAP,
    overflow: "hidden",
    transition: panelTransition,
    transform: revealed ? "translateX(0)" : "translateX(16px)",
    alignSelf: "flex-start" as const,
  };

  const rightPanelStyle = {
    flexBasis: PANEL_WIDTH,
    width: PANEL_WIDTH,
    alignSelf: "center" as const,
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
        @keyframes aboutStoryFill {
          from { width: 0%; }
          to { width: 100%; }
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
        /* Mobile responsiveness */
        @media (max-width: 900px) {
          main { padding: 64px 16px 64px !important; }
        }
        @media (max-width: 640px) {
          main { padding: 48px 12px 48px !important; }
          .about-right-panel { align-self: flex-start !important; }
        }
      `}</style>

      <Header />

      <main style={{ maxWidth: 1320, margin: "0 auto", padding: "96px 32px 96px" }}>
        <div style={{ width: HERO_WIDTH, margin: "0 auto 20px" }}>
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
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: ROW_GAP,
          }}
        >
          {/* Life Outside of Design */}
          <div style={leftPanelStyle}>
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
              Life <Italic>Outside</Italic> of design
            </h3>
            <div style={{ height: 1, background: tokens.color.cardBorder, margin: "10px 0 12px" }} />
            <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
              {STORY_SLIDES.map((_, i) => {
                const isPast = i < storySlide;
                const isActive = i === storySlide;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 2,
                      borderRadius: 1,
                      background: tokens.color.cardBorder,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: tokens.color.body,
                        width: isPast ? "100%" : isActive ? "100%" : "0%",
                        animation: isActive && !reduceMotion ? `aboutStoryFill ${STORY_DURATION_MS}ms linear` : undefined,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-label="Next photo"
              onClick={advanceStory}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  advanceStory();
                }
              }}
              onMouseEnter={() => setStoryHovered(true)}
              onMouseLeave={() => setStoryHovered(false)}
              className="about-photo-card"
              style={{
                position: "relative",
                height: 240,
                borderRadius: tokens.radius.sm,
                overflow: "hidden",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {STORY_SLIDES.map((slide, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${slide.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: i === storySlide ? 1 : 0,
                    transition: reduceMotion ? "none" : "opacity 0.5s ease",
                  }}
                />
              ))}
              {/* Hover doodles */}
              {storyHovered && (
                <>
                  <div
                    className="story-doodle story-doodle-1"
                    style={{
                      opacity: storyHovered ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    ✨
                  </div>
                  <div
                    className="story-doodle story-doodle-2"
                    style={{
                      opacity: storyHovered ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    💫
                  </div>
                  <div
                    className="story-doodle story-doodle-3"
                    style={{
                      opacity: storyHovered ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    ⭐
                  </div>
                </>
              )}
            </div>
            <p
              style={{
                marginTop: 10,
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.sm,
                color: tokens.color.body,
                transition: reduceMotion ? "none" : "opacity 0.3s ease",
              }}
            >
              {STORY_SLIDES[storySlide].caption}
            </p>
          </div>

          {/* Center bio photo — click to reveal the side panels */}
          <div style={{ width: HERO_WIDTH, flexShrink: 0 }}>
            <div style={{ position: "relative" }}>
              {/* Backdrop card — stays flat (0deg), peeks out below the rotated photo */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: -PEEK_HEIGHT,
                  background: "#F1F0EE",
                  borderRadius: 2,
                  boxShadow: tokens.shadow.subtle,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 12,
                    transform: "translateX(-50%)",
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.sm,
                    color: tokens.color.muted,
                    opacity: revealed ? 0 : 1,
                    transition: "opacity 0.3s ease",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                  }}
                >
                  Click to reveal
                </span>
              </div>

              {/* Photo card — 3deg at rest, straightens to 0deg once revealed */}
              <div
                role="button"
                tabIndex={0}
                aria-pressed={revealed}
                aria-label={revealed ? "Hide life outside of design" : "Show life outside of design"}
                onClick={() => setRevealed((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setRevealed((v) => !v);
                  }
                }}
                onMouseEnter={() => {
                  setPhotoHovered(true);
                  setBioPhotoHovered(true);
                }}
                onMouseLeave={() => {
                  setPhotoHovered(false);
                  setBioPhotoHovered(false);
                }}
                className="about-photo-card"
                style={{
                  position: "relative",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  outline: "none",
                  border: "8px solid #ECE7D9",
                  borderRadius: 2,
                  overflow: "hidden",
                  aspectRatio: "3 / 2",
                  transformOrigin: "center center",
                  transform: revealed ? "rotate(0deg)" : "rotate(3deg)",
                  boxShadow: photoHovered ? tokens.shadow.cardHoverLarge : tokens.shadow.card,
                  transition: reduceMotion
                    ? "box-shadow 0.22s ease"
                    : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.22s ease",
                }}
              >
                <img
                  src={aboutBioPhoto}
                  alt="Laney Fong in the SF Bay Area"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 55%",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Contact panel — always visible, not gated behind the photo click */}
          <div className="about-right-panel" style={rightPanelStyle}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div
                style={{
                  position: "relative",
                  width: 80,
                  height: 80,
                }}
                onMouseEnter={() => setCoffeeHovered(true)}
                onMouseLeave={() => setCoffeeHovered(false)}
              >
                <img
                  src={coffeeMug}
                  alt="Black & White coffee mug"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    marginBottom: 4,
                  }}
                />
                {/* Steam particles */}
                {coffeeHovered && (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        left: 15,
                        top: -10,
                        fontSize: "12px",
                        animation: "steamRise 2s ease-in-out infinite",
                        "--offset": "-8px",
                      } as any}
                    >
                      ☁️
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        left: 32,
                        top: -5,
                        fontSize: "14px",
                        animation: "steamRise 2s ease-in-out 0.3s infinite",
                        "--offset": "0px",
                      } as any}
                    >
                      ☁️
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        left: 48,
                        top: -8,
                        fontSize: "12px",
                        animation: "steamRise 2s ease-in-out 0.6s infinite",
                        "--offset": "8px",
                      } as any}
                    >
                      ☁️
                    </div>
                  </>
                )}
              </div>
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
              <div style={{ display: "flex", gap: 10 }}>
                <SocialIconLink href={LINKEDIN_URL} label="LinkedIn" external variant="light">
                  <LinkedInIcon />
                </SocialIconLink>
                <SocialIconLink href={`mailto:${CONTACT_EMAIL}`} label="Email" variant="light">
                  <EmailIcon />
                </SocialIconLink>
              </div>
              <a
                href={RESUME_URL}
                onMouseEnter={() => setResumeHovered(true)}
                onMouseLeave={() => setResumeHovered(false)}
                aria-label="Download resume"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  minHeight: 140,
                  textDecoration: "none",
                  cursor: "pointer",
                  borderRadius: tokens.radius.md,
                  background: resumeHovered ? "#F5F5F5" : "transparent",
                  border: `2px solid ${tokens.color.cardBorder}`,
                  opacity: resumeHovered ? 0.85 : 1,
                  transform: resumeHovered ? "translateY(-2px)" : "translateY(0)",
                  transition: "opacity 0.2s ease, transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: resumeHovered ? tokens.shadow.subtle : "none",
                }}
              >
                <img
                  src={resumeIcon}
                  alt="Download resume"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bio copy */}
        <div style={{ width: HERO_WIDTH, margin: "44px auto 0" }}>
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
              "I specialize in designing with strict intention—focusing on accessibility, inclusive systems, and transforming complex digital user flows into intuitive experiences.",
              ["intention", "accessibility, inclusive systems"]
            )}
          </p>
        </div>

        {/* Things I am proud of */}
        <div style={{ width: HERO_WIDTH, margin: "64px auto 0" }}>
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
              border: `1px solid ${tokens.color.cardBorder}`,
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
              As president, I revitalized UC Berkeley's dedication to user experience by restructuring its primary UX
              club. My focus on member engagement and real-world project experience transformed the organization into
              a thriving, tight-knit professional community!
            </p>
            <div
              onMouseEnter={() => setProudPhotoHovered(true)}
              onMouseLeave={() => setProudPhotoHovered(false)}
              style={{ borderRadius: tokens.radius.sm, overflow: "hidden", cursor: "pointer" }}
            >
              <img
                src={clubPic}
                alt="UC Berkeley UX club members celebrating together"
                style={{
                  width: "100%",
                  display: "block",
                  filter: proudPhotoHovered
                    ? "grayscale(0) brightness(1.1)"
                    : "grayscale(1) brightness(1.15)",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
