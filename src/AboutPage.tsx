import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { tokens } from "./tokens";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhotoCollage from "./components/PhotoCollage";
import { LinkedInIcon, EmailIcon, SocialIconLink, LINKEDIN_URL, CONTACT_EMAIL } from "./components/SocialIcons";
import aboutBioPhoto from "./assets/about-bio-photo.jpg";
import aboutProudPhoto from "./assets/about-proud-photo.jpg";
import aboutTravelPhoto from "./assets/about-travel-photo.jpg";

// TODO: link to a real hosted resume file once one exists.
const RESUME_URL = "#";

const Italic: FC<{ children: string }> = ({ children }) => (
  <em style={{ fontFamily: tokens.font.serifItalic, fontStyle: "italic", fontWeight: 400 }}>{children}</em>
);

function withItalics(text: string, terms: string[]): ReactNode[] {
  const pattern = new RegExp(`(${terms.join("|")})`, "g");
  return text.split(pattern).map((part, i) => (terms.includes(part) ? <Italic key={i}>{part}</Italic> : part));
}

const PinIcon: FC = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 6.6 11.4 7.3 12a1 1 0 0 0 1.4 0c.7-.6 7.3-6.6 7.3-12 0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const pillStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 12px",
  borderRadius: tokens.radius.full,
  background: "rgba(255, 255, 255, 0.88)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  fontFamily: tokens.font.sans,
  fontSize: tokens.text.sm,
  fontWeight: tokens.weight.regular,
  color: tokens.color.ink,
  whiteSpace: "nowrap" as const,
};

const HERO_WIDTH = "min(500px, 88vw)";
const PANEL_WIDTH = 252;
const ROW_GAP = 40;

const AboutPage: FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [photoHovered, setPhotoHovered] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const panelTransition = reduceMotion
    ? "none"
    : "flex-basis 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
  const rowGapTransition = reduceMotion ? "none" : "gap 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

  const panelBase = (side: "left" | "right") => ({
    flexBasis: revealed ? PANEL_WIDTH : 0,
    width: revealed ? PANEL_WIDTH : 0,
    minWidth: revealed ? 200 : 0,
    opacity: revealed ? 1 : 0,
    overflow: "hidden",
    transition: panelTransition,
    transform: revealed ? "translateX(0)" : `translateX(${side === "left" ? 16 : -16}px)`,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.color.white,
        fontFamily: tokens.font.sans,
        color: tokens.color.body,
      }}
    >
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
            Introducing <Italic>Laney Fong</Italic>
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: revealed ? ROW_GAP : 0,
            transition: rowGapTransition,
          }}
        >
          {/* Life Outside of Design */}
          <div style={{ ...panelBase("left"), alignSelf: "flex-start" }}>
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
            <PhotoCollage
              src={aboutTravelPhoto}
              height={170}
              gap={2}
              gridTemplateColumns="1fr 1fr"
              gridTemplateRows="1fr 1fr"
              cells={[
                { size: "320% auto", position: "30% 20%" },
                { size: "260% auto", position: "70% 10%" },
                { size: "280% auto", position: "40% 70%" },
                { size: "300% auto", position: "80% 80%" },
              ]}
            />
            <p
              style={{
                marginTop: 10,
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.sm,
                color: tokens.color.body,
              }}
            >
              I love traveling
            </p>
          </div>

          {/* Center bio photo — click to reveal the side panels */}
          <div style={{ width: HERO_WIDTH, flexShrink: 0 }}>
            <div
              role="button"
              tabIndex={0}
              aria-pressed={revealed}
              aria-label={revealed ? "Hide more about Laney" : "Reveal more about Laney"}
              onClick={() => setRevealed((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setRevealed((v) => !v);
                }
              }}
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
              style={{
                position: "relative",
                cursor: "pointer",
                borderRadius: tokens.radius.lg,
                overflow: "hidden",
                aspectRatio: "624 / 412",
                boxShadow: photoHovered
                  ? `${tokens.shadow.cardGlowHover}, ${tokens.shadow.imageFrame}`
                  : tokens.shadow.imageFrame,
                transform: photoHovered ? "translateY(-3px)" : "translateY(0)",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
              }}
            >
              <PhotoCollage
                src={aboutBioPhoto}
                height="100%"
                gap={2}
                gridTemplateColumns="1fr 1fr"
                gridTemplateRows="1fr 1fr"
                cells={[
                  { size: "280% auto", position: "49% 61%" },
                  { size: "250% auto", position: "16% 22%" },
                  { size: "230% auto", position: "79% 13%" },
                  { size: "300% auto", position: "51% 44%" },
                ]}
              />
              <div style={{ position: "absolute", top: 16, left: 16, ...pillStyle }}>
                <PinIcon /> SF Bay Area
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: revealed ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                  ...pillStyle,
                }}
              >
                Click to reveal more
              </div>
            </div>
          </div>

          {/* Contact panel */}
          <div style={{ ...panelBase("right"), alignSelf: "center" }}>
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
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  width: "100%",
                  textAlign: "center",
                  padding: "14px 20px",
                  borderRadius: tokens.radius.full,
                  background: resumeHovered ? "#EFEFEF" : tokens.color.offWhite,
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.body,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s ease",
                }}
              >
                View my resume
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
        <div style={{ marginTop: 64 }}>
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
              maxWidth: 740,
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
            <div style={{ borderRadius: tokens.radius.sm, overflow: "hidden" }}>
              <img
                src={aboutProudPhoto}
                alt="UC Berkeley UX club members celebrating together"
                style={{ width: "100%", display: "block", filter: "grayscale(1)" }}
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
