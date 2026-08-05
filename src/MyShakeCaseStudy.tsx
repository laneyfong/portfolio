import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "./tokens";
import {
  Reveal,
  Italic,
  Emphasis,
  TagPill,
  Callout,
  Kicker,
  SkillRow,
  SnapshotBar,
  FeatureCard,
  PullQuote,
  BarCompare,
  TypeCompare,
  UserJourney,
  ProcessFlow,
  StatRow,
  BigImpactStat,
  HMWStatement,
  ExpandableRankedList,
} from "./components/caseStudy/CaseStudyKit";
import ColorVariationGrid from "./components/caseStudy/ColorVariationGrid";
import EffortImpactMatrix from "./components/caseStudy/EffortImpactMatrix";
import ResearchInsights from "./components/caseStudy/ResearchInsights";
import SolutionBreakdown from "./components/caseStudy/SolutionBreakdown";
import StepsComparison from "./components/caseStudy/StepsComparison";
import DesignPrinciples from "./components/caseStudy/DesignPrinciples";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import { AlertIcon, PinIcon } from "./components/icons/CaseStudyIcons";
import myshakeThumbnail from "./assets/myshake-thumbnail.png";
import myshakeAlert from "./assets/myshake-alert.png";
import myshakeDetails from "./assets/myshake-details.png";
import myshakeBeforeScreens from "./assets/myshake-before-screens.png";
import myshakeDesignSystem from "./assets/myshake-design-system.png";
import myshakeStoryboard from "./assets/myshake-storyboard.png";
import myshakeHomeExplanation from "./assets/myshake-home-explanation.png";
import myshakeDashboard from "./assets/myshake-dashboard.png";
import myshakeCarouselNote from "./assets/myshake-carousel-note.png";
import myshakePrepareNote from "./assets/myshake-prepare-note.png";
import myshakeNotificationsNote from "./assets/myshake-notifications-note.png";
import myshakeTeam from "./assets/myshake-team.png";

const SECTIONS: CaseSection[] = [
  { id: "intro", label: "Intro" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "ideation", label: "Ideation" },
  { id: "solution", label: "Solution" },
  { id: "reflection", label: "Reflection" },
];

const TAGS = ["Product/UX Design", "Design Systems", "Product Strategy", "Shipped"];

const HIGHLIGHTS = [
  "Increased user engagement 45% by restructuring the IA around personal safety, not data visualization.",
  "Cut the steps to check on a loved one from 7 to 3 — from a multi-screen search to two taps.",
  "Talked through a no-research mandate with the client and landed on a scoped study plan that shaped every decision.",
];

const WireListRow: FC = () => (
  <div
    style={{
      height: 12,
      borderRadius: tokens.radius.xs,
      background: tokens.color.stroke,
      width: "100%",
    }}
    aria-hidden
  />
);

const WireMap: FC<{ flex: number }> = ({ flex }) => (
  <div
    style={{
      flex,
      borderRadius: tokens.radius.md,
      background: tokens.color.offWhite,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
    }}
    aria-hidden
  >
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: 50,
        background: tokens.color.cardBorder,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 30, height: 30, borderRadius: 50, background: tokens.color.accent, opacity: 0.6 }} />
    </div>
    <div style={{ height: 4, width: "70%", borderRadius: 2, background: tokens.color.stroke }} />
  </div>
);

const ABWireframe: FC<{ variant: 0 | 1 }> = ({ variant }) => (
  <div
    key={variant}
    className="case-fade-in"
    style={{
      height: 200,
      borderRadius: tokens.radius.md,
      background: tokens.color.white,
      padding: 12,
      display: "flex",
      gap: 8,
      boxSizing: "border-box",
    }}
    aria-hidden
  >
    {variant === 0 ? (
      <>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
          <WireListRow />
          <WireListRow />
          <WireListRow />
          <WireListRow />
        </div>
        <WireMap flex={1.2} />
      </>
    ) : (
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.3fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8 }}>
        <div style={{ gridRow: "1 / 3", height: "100%" }}>
          <WireMap flex={1} />
        </div>
        <div
          style={{
            borderRadius: tokens.radius.xs,
            background: tokens.color.offWhite,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            justifyContent: "center",
            padding: "0 10px",
          }}
        >
          <div style={{ height: 4, width: "60%", borderRadius: 2, background: tokens.color.cardBorder }} />
          <div style={{ height: 4, width: "40%", borderRadius: 2, background: tokens.color.stroke }} />
        </div>
        <div
          style={{
            borderRadius: tokens.radius.xs,
            background: tokens.color.offWhite,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 10px",
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: 4, background: tokens.color.accent, flexShrink: 0 }} />
          <div style={{ height: 4, width: "50%", borderRadius: 2, background: tokens.color.cardBorder }} />
        </div>
      </div>
    )}
  </div>
);

interface AnnotationConfig {
  threshold: number;
  side: "left" | "right";
  title: string;
  description: string;
  image: string;
}

const ScrollDrivenProductShowcase: FC<{
  dashboardImage: string;
  annotations: AnnotationConfig[];
}> = ({ dashboardImage, annotations }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrolled = windowHeight - rect.top;
        const totalHeight = rect.height;
        const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getAnnotationState = (annotation: AnnotationConfig) => {
    const transitionWindow = 0.15;
    const threshold = annotation.threshold;
    const entryStart = threshold - 0.02;
    const entryEnd = threshold + transitionWindow;
    const exitStart = threshold + transitionWindow;
    const exitEnd = threshold + transitionWindow * 2;

    let opacity = 0;
    let progress = 0;

    if (scrollProgress >= entryStart && scrollProgress < entryEnd) {
      progress = (scrollProgress - entryStart) / transitionWindow;
      opacity = progress;
    } else if (scrollProgress >= exitStart && scrollProgress < exitEnd) {
      progress = 1 - (scrollProgress - exitStart) / transitionWindow;
      opacity = progress;
    }

    const offset = annotation.side === "left"
      ? -32 * (1 - Math.max(opacity, 0))
      : 32 * (1 - Math.max(opacity, 0));

    return { opacity: Math.max(0, Math.min(1, opacity)), offset };
  };

  return (
    <section
      style={{ paddingTop: 0, paddingBottom: 400, position: "relative" }}
      className="section-reveal"
      ref={containerRef}
    >
      <div style={{ position: "relative", minHeight: "350vh" }}>
        {/* Sticky Container - Three Column Layout */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            zIndex: 10,
            pointerEvents: "none",
            padding: "60px 40px",
            boxSizing: "border-box",
          }}
        >
          {/* LEFT ANNOTATIONS COLUMN */}
          <div style={{ width: "320px", flexShrink: 0, pointerEvents: "auto", display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}>
            {annotations
              .filter((a) => a.side === "left")
              .map((annotation, idx) => {
                const { opacity, offset } = getAnnotationState(annotation);

                return (
                  <div
                    key={idx}
                    style={{
                      opacity,
                      transform: `translateX(${offset}px)`,
                      transition:
                        "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      willChange: "opacity, transform",
                      background: tokens.color.white,
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: tokens.font.sans,
                        fontSize: "16px",
                        fontWeight: tokens.weight.medium,
                        color: tokens.color.textDark,
                        margin: "0 0 10px",
                        lineHeight: tokens.leading.snug,
                        wordWrap: "break-word",
                      }}
                    >
                      {annotation.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: tokens.font.sans,
                        fontSize: "14px",
                        color: tokens.color.body,
                        margin: 0,
                        lineHeight: tokens.leading.normal,
                        wordWrap: "break-word",
                      }}
                    >
                      {annotation.description}
                    </p>
                  </div>
                );
              })}
          </div>

          {/* CENTER PRODUCT COLUMN */}
          <div
            style={{
              maxWidth: "300px",
              width: "100%",
              pointerEvents: "auto",
              zIndex: 20,
              flexShrink: 0,
            }}
          >
            <img
              src={dashboardImage}
              alt="MyShake dashboard showing pinned locations and earthquakes"
              style={{
                width: "100%",
                height: "auto",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
                display: "block",
              }}
            />
          </div>

          {/* RIGHT ANNOTATIONS COLUMN */}
          <div style={{ width: "320px", flexShrink: 0, pointerEvents: "auto", display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-end" }}>
            {annotations
              .filter((a) => a.side === "right")
              .map((annotation, idx) => {
                const { opacity, offset } = getAnnotationState(annotation);

                return (
                  <div
                    key={idx}
                    style={{
                      opacity,
                      transform: `translateX(${-offset}px)`,
                      transition:
                        "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      willChange: "opacity, transform",
                      background: tokens.color.white,
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: tokens.font.sans,
                        fontSize: "16px",
                        fontWeight: tokens.weight.medium,
                        color: tokens.color.textDark,
                        margin: "0 0 10px",
                        lineHeight: tokens.leading.snug,
                        wordWrap: "break-word",
                      }}
                    >
                      {annotation.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: tokens.font.sans,
                        fontSize: "14px",
                        color: tokens.color.body,
                        margin: 0,
                        lineHeight: tokens.leading.normal,
                        wordWrap: "break-word",
                      }}
                    >
                      {annotation.description}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

const MYSHAKE_EXTRA_STYLE = `
  @media (prefers-reduced-motion: no-preference) {
    .case-shake-in { animation: case-shake-in 0.7s ease; }
  }
  @keyframes case-shake-in {
    0% { transform: translate(0, 0) rotate(0deg); }
    15% { transform: translate(-7px, 2px) rotate(-1deg); }
    30% { transform: translate(6px, -2px) rotate(1deg); }
    45% { transform: translate(-4px, 2px) rotate(-0.6deg); }
    60% { transform: translate(3px, -1px) rotate(0.4deg); }
    75% { transform: translate(-2px, 1px) rotate(-0.2deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
  }

  @media (max-width: 768px) {
    html, body, main { overflow-x: hidden !important; max-width: 100vw; }
    button, a, input, .case-btn-press { min-width: 48px !important; min-height: 48px !important; }
    .case-grid-3, .case-grid-2, .case-intro-shots { grid-template-columns: 1fr !important; gap: clamp(16px, 4vw, 32px); }
    [style*="display: flex"] { flex-direction: column !important; }
    [style*="width:"] { max-width: 100% !important; width: auto !important; }
    .case-main { padding: clamp(16px, 5vw, 60px) !important; }
  }
  @media (max-width: 640px) {
    button, a, .case-btn-press { min-width: 44px !important; min-height: 44px !important; padding: 12px 16px !important; }
    .case-main { padding: clamp(12px, 3vw, 40px) !important; }
    * { max-width: 100vw !important; overflow-x: hidden !important; }
  }
`;

const MyShakeCaseStudy: FC = () => {
  const [abVariant, setAbVariant] = useState<0 | 1>(0);

  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS} extraStyle={MYSHAKE_EXTRA_STYLE}>
      {/* Intro */}
      <section id="intro" style={{ paddingBottom: 96 }} className="section-reveal">
        <Reveal>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted }}>
              Earthquake alerts. High anxiety. Low clarity.
            </span>
          </div>
          <h1
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text["2xl"],
              color: tokens.color.ink,
              lineHeight: tokens.leading.snug,
              margin: "0 0 20px",
              maxWidth: 480,
            }}
          >
            Redesigning earthquake alerts for <Italic>intuitive, high-stakes navigation</Italic>.
          </h1>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {TAGS.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>

          <Reveal>
            <SnapshotBar
              items={[
                { label: "Role", value: "Product Designer, End-to-end" },
                { label: "Team", value: "5 Designers · 1 PM · 2 Engineers" },
                { label: "Timeline", value: "3 months" },
                { label: "Impact", value: "45% ↑ engagement" },
              ]}
            />
          </Reveal>

          <Reveal>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 480 }}>
              I led the design with 2 engineers, starting mobile-first then expanding to tablet. The app needed to feel fast and intuitive during high-stress moments — every tap counted.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div
              style={{
                background: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)",
                padding: "40px",
                borderRadius: tokens.radius.md,
                marginBottom: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 400,
              }}
            >
              <img
                src={myshakeThumbnail}
                alt="MyShake redesigned app - the new safety-focused design"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: tokens.radius.md,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  maxWidth: 320,
                }}
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
              <FeatureCard title="Problem">
                The app felt outdated — poor onboarding, confusing navigation, and low engagement left users with no reason to return.
              </FeatureCard>
              <FeatureCard title="Solution">
                Redesigned MyShake from passive info tool into a safety-first utility for checking loved ones instantly.
              </FeatureCard>
              <FeatureCard title="Result">
                Users now instantly access loved ones' safety status, transforming MyShake into a trusted companion.
              </FeatureCard>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ background: tokens.color.offWhite, padding: "40px", borderRadius: tokens.radius.md, marginBottom: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: tokens.color.accent }}>
                    <AlertIcon size={28} />
                  </div>
                  <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                    EEW (Early Warning)
                  </div>
                  <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                    Seconds before shaking starts
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: "20px", opacity: 0.3, color: tokens.color.ink }}>→</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: tokens.color.accent }}>
                    <PinIcon size={28} />
                  </div>
                  <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                    CEN (Post-Earthquake)
                  </div>
                  <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                    Notification after shaking detected
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Reveal>

        <div style={{ marginBottom: 80 }}>
          <Kicker>The Challenge: Grow from 5% to 12.5% active users in 3 months</Kicker>
          <Reveal>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 480 }}>
              With only 5% of MyShake's 3.8M users actively engaging with the app during earthquakes, the team needed to increase engagement to 12.5%.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 480 }}>
              The current interface's data-heavy approach and confusing alert system meant users weren't finding the information they needed when seconds mattered most.
            </p>
          </Reveal>
          <Reveal>
            <BarCompare
              title="Engagement goal"
              bars={[
                { label: "Current", value: 5, display: "3.8M users · 5% active" },
                { label: "Target", value: 12.5, display: "4M users · 12.5% active" },
              ]}
            />
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div style={{ marginBottom: 60 }}>
            <img
              src={myshakeBeforeScreens}
              alt="MyShake existing screens showing data-first approach"
              style={{
                width: "100%",
                maxWidth: "640px",
                height: "auto",
                borderRadius: tokens.radius.md,
                marginBottom: 24,
                display: "block",
                margin: "0 auto 24px",
              }}
            />
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, textAlign: "center", margin: 0 }}>
              The existing app prioritized earthquake data over personal safety.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted, display: "block" }}>
              Research
            </span>
          </div>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text["2xl"],
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: tokens.leading.snug,
              margin: "0 0 8px",
              maxWidth: 480,
            }}
          >
            I started with direct user research to understand the core problem
          </h2>
          <SkillRow items={["User Interviews", "Competitive Analysis", "Survey Design"]} />
        </Reveal>

        <Reveal>
          <StatRow
            items={[
              { value: "5", label: "User Interviews" },
              { value: "50+", label: "Survey Responses" },
              { value: "3", label: "Competitors Analyzed" },
            ]}
          />
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: 60 }}>
            <Kicker>What users actually want</Kicker>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 24, maxWidth: 480 }}>
              From 5 interviews and 50+ survey responses, we discovered three clear priorities that would guide every design decision.
            </p>
            <ExpandableRankedList
              items={[
                { rank: 1, title: "Personal Safety", detail: "In interviews and usability testing, users prioritized their own safety above all else. They want instant access to earthquake information for their location and immediate guidance on what to do. This insight shaped the dashboard-first design, putting personal location and alerts at the top of the experience." },
                { rank: 2, title: "Family Safety", detail: "After personal safety, knowing loved ones are safe was the second priority. Users want to quickly check on family members' locations and safety status during earthquakes—often requiring just 1-3 taps. This led to the pinned contacts feature and the 2-alert system (EEW vs CEN) to clarify communication timing." },
                { rank: 3, title: "Property Damage", detail: "While important, property damage ranked third. Users acknowledged property concerns but the immediate focus is always on human safety first. However, 2 of 5 users mentioned confusion between alert types, requiring clearer visual distinction in the design." },
              ]}
            />
          </div>
        </Reveal>

        <Reveal>
          <ResearchInsights />
        </Reveal>

        <div style={{ marginTop: 60 }}>
          <Reveal>
            <UserJourney
              stages={[
                {
                  label: "Awareness",
                  description: "Users worry about earthquake safety and want timely alerts",
                  color: "#FF6B6B",
                },
                {
                  label: "Evaluation",
                  description: "They search for apps but aren't sure which one is worth trusting",
                  color: "#FFA500",
                },
                {
                  label: "Adoption",
                  description: "Downloaded, but the confusing interface means they don't come back",
                  color: "#FFD93D",
                },
                {
                  label: "Churn",
                  description: "Without a real earthquake, it's just another app they'll uninstall",
                  color: "#A8A8A8",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Synthesis */}
      <section id="synthesis" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted, display: "block" }}>
              Synthesis
            </span>
          </div>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text["2xl"],
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: tokens.leading.snug,
              margin: "0 0 8px",
              maxWidth: 480,
            }}
          >
            I synthesized insights into a user-centered solution
          </h2>
          <SkillRow items={["Information Architecture", "Storyboarding"]} />
        </Reveal>

        <div style={{ marginBottom: 80 }}>
          <Reveal>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 480 }}>
              The old flow required 7 screens to check on a single loved one: launch app → search → enter name → wait → verify location → check status → confirm safety.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 480 }}>
              During an earthquake, this friction meant users gave up. Our redesign cuts this to 3 steps by putting pinned loved ones on the dashboard and making status checks instant.
            </p>
          </Reveal>
          <Reveal>
            <StepsComparison />
          </Reveal>
        </div>

        <div style={{ marginBottom: 60 }}>
          <Reveal>
            <HMWStatement>How might we help users find <Emphasis>a loved one's safety status</Emphasis> in under <Emphasis>3 taps</Emphasis>?</HMWStatement>
          </Reveal>
        </div>

        <Reveal>
          <img
            src={myshakeStoryboard}
            alt="User storyboard showing the ideal emergency flow"
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: tokens.radius.md,
              display: "block",
            }}
          />
        </Reveal>
      </section>

      {/* Ideation */}
      <section id="ideation" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted, display: "block" }}>
              Ideation
            </span>
          </div>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text["2xl"],
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: tokens.leading.snug,
              margin: "0 0 8px",
              maxWidth: 480,
            }}
          >
            I explored multiple design directions and tested with users
          </h2>
          <SkillRow items={["A/B Testing", "Design Systems", "Accessibility (WCAG)"]} />
        </Reveal>

        <div style={{ marginBottom: 80 }}>
          <Reveal>
            <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <ABWireframe variant={abVariant} />
              <div key={abVariant} className="case-fade-in">
                <div style={{ display: "inline-flex", padding: 4, borderRadius: tokens.radius.full, background: tokens.color.offWhite, marginBottom: 24 }}>
                  {[
                    { label: "Variation 1", title: "Half-list + half-map", description: "A split landing page: a list of nearby earthquakes on one side, a live map on the other." },
                    { label: "Variation 2", title: "Bento-style dashboard", description: "A bento grid surfacing pinned locations, nearby earthquakes, and education cards at a glance." },
                  ].map((v, i) => (
                    <button
                      key={v.label}
                      onClick={() => setAbVariant(i as 0 | 1)}
                      aria-pressed={abVariant === i}
                      className="case-btn-press"
                      style={{
                        padding: "8px 18px",
                        borderRadius: tokens.radius.full,
                        border: "none",
                        cursor: "pointer",
                        background: abVariant === i ? tokens.color.ink : "transparent",
                        color: abVariant === i ? tokens.color.white : tokens.color.body,
                        fontFamily: tokens.font.sans,
                        fontSize: tokens.text.sm,
                        fontWeight: tokens.weight.medium,
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontWeight: tokens.weight.medium, fontSize: tokens.text.base, color: tokens.color.ink, marginBottom: 8 }}>
                  {[
                    { title: "Half-list + half-map" },
                    { title: "Bento-style dashboard" },
                  ][abVariant]?.title}
                </div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0 }}>
                  {[
                    { description: "A split landing page: a list of nearby earthquakes on one side, a live map on the other." },
                    { description: "A bento grid surfacing pinned locations, nearby earthquakes, and education cards at a glance." },
                  ][abVariant]?.description}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ColorVariationGrid />
        </Reveal>

        <Reveal>
          <DesignPrinciples />
        </Reveal>

        <Reveal>
          <TypeCompare />
        </Reveal>

        <Reveal>
          <EffortImpactMatrix />
        </Reveal>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted, display: "block" }}>
              Solution
            </span>
          </div>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text["2xl"],
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: tokens.leading.snug,
              margin: "0 0 8px",
              maxWidth: 480,
            }}
          >
            The final design prioritizes safety and clarity during emergencies
          </h2>
          <SkillRow items={["Interaction Design", "Visual Design", "Prototyping"]} />
          <Callout>Transforming MyShake from a passive alert tool into an active earthquake companion.</Callout>
        </Reveal>

        <Reveal>
          <div
            style={{
              background: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)",
              padding: "60px 40px",
              borderRadius: tokens.radius.md,
              display: "flex",
              justifyContent: "center",
              marginBottom: 80,
            }}
          >
            <img
              src={myshakeHomeExplanation}
              alt="MyShake app features and interaction design"
              style={{
                width: "100%",
                maxWidth: "640px",
                height: "auto",
                borderRadius: tokens.radius.md,
                display: "block",
              }}
            />
          </div>
        </Reveal>

        <div style={{ marginBottom: 60 }}>
          <Callout>Core features of the redesign</Callout>
        </div>
        <Reveal>
          <SolutionBreakdown />
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: 80 }}>
            <BigImpactStat value="45%" label="Increase in user engagement" color={tokens.color.accent} />
          </div>
        </Reveal>

        <div style={{ marginBottom: 60 }}>
          <Callout>The Solution: 3 steps instead of 7.</Callout>
        </div>

        <Reveal>
          <ProcessFlow
            steps={[
              {
                title: "Open App",
                description: "Dashboard immediately visible with pinned loved ones",
                color: "#6BCB77",
                icon: "1",
              },
              {
                title: "Tap Contact",
                description: "One tap to see location and safety status in real-time",
                color: "#4D96FF",
                icon: "2",
              },
              {
                title: "Get Status",
                description: "Critical information displayed instantly and clearly",
                color: "#FFB84D",
                icon: "3",
              },
            ]}
          />
        </Reveal>

        <div style={{ marginTop: 80 }}>
          <Reveal dramatic>
            <Callout>Design Decisions</Callout>
          </Reveal>

          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 60 }}>
            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.md, fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Dashboard-First Layout
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  Pinned loved ones appear instantly on launch. No search, no navigation layers. In an earthquake, every second matters—users shouldn't have to dig.
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.md, fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Two-Alert System
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  EEW alerts arrive seconds after shaking starts; CEN notifications come after. Distinct visual treatment (color, language) helps users understand timing and urgency without thinking.
                </div>
              </div>
            </Reveal>
          </div>

          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 60 }}>
            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.md, fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Gesture Design for Mobile
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  Tap-to-expand locations and swipe between pinned contacts. Designed for one-handed use during stressful moments, minimizing the mental load of complex interactions.
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.md, fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Responsive Grid System
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  Mobile uses single-column stacking; tablet expands to a 2-column layout with the map on left and content on right. The grid adapts layout without rethinking information hierarchy.
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <ScrollDrivenProductShowcase
          dashboardImage={myshakeDashboard}
          annotations={[
            {
              threshold: 0.15,
              side: "right",
              title: "Swipe Between Pinned Contacts",
              description: "Users can quickly swipe left/right to check each pinned loved one's status. No searching, no waiting.",
              image: myshakeCarouselNote,
            },
            {
              threshold: 0.5,
              side: "left",
              title: "One-Tap Prepare Mode",
              description: "Before an earthquake, users can arm alerts and set preferences. When shaking starts, the app is ready.",
              image: myshakePrepareNote,
            },
            {
              threshold: 0.8,
              side: "right",
              title: "Clear Alert Hierarchy",
              description: "EEW (seconds before shaking) and CEN (post-earthquake) are visually distinct. No confusion.",
              image: myshakeNotificationsNote,
            },
          ]}
        />

        <section style={{ paddingTop: 60, paddingBottom: 60 }} className="section-reveal">
          <Reveal dramatic>
            <div style={{ marginBottom: 32 }}>
              <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted, marginBottom: 12, display: "block" }}>
                Key Design Details
              </span>
            </div>
            <SkillRow items={["Micro-interactions", "Accessibility", "User Testing Refinements"]} />
          </Reveal>

          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              <div>
                <img
                  src={myshakeAlert}
                  alt="Alert notification screens showing EEW vs CEN differentiation"
                  style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }}
                />
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.textDark, marginBottom: 4 }}>
                  Alert Flows
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  EEW and CEN alerts visually distinct
                </div>
              </div>
              <div>
                <img
                  src={myshakeDetails}
                  alt="Detailed information screens with optimized content hierarchy"
                  style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }}
                />
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.textDark, marginBottom: 4 }}>
                  Detail Screens
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  Information hierarchy optimized for crisis moments
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginTop: 60 }}>
              <div style={{ marginBottom: 32 }}>
                <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted, marginBottom: 12, display: "block" }}>
                  MyShake's first design system
                </span>
              </div>
              <img
                src={myshakeDesignSystem}
                alt="MyShake design system"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: tokens.radius.md,
                  display: "block",
                }}
              />
            </div>
          </Reveal>
        </section>
      </section>

      {/* Reflection */}
      <section id="reflection" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted, display: "block" }}>
              Reflection
            </span>
          </div>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text["2xl"],
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: tokens.leading.snug,
              margin: "0 0 8px",
              maxWidth: 480,
            }}
          >
            This project taught me the power of saying no and advocating for research
          </h2>
          <PullQuote>This is my proudest work.</PullQuote>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 480 }}>
            The most important moment was saying no to immediate redesign pressure and advocating for research instead. Those 5 interviews and 50+ survey responses fundamentally shaped the information architecture. We built MyShake's first design system—every component battle-tested for crisis moments. Cutting user friction from 7 steps to 3, increasing engagement by 45%, and seeing the app shipped with our foundation meant everything.
          </p>
          <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 24, maxWidth: 480 }}>
            I'm deeply proud of what we took as a win together. This redesign shipped because my two engineering partners believed in user research, ruthless iteration, and accessibility-first thinking. To the team: thank you for building something that helps people stay safe during earthquakes.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 40 }}>
            <img
              src={myshakeTeam}
              alt="MyShake team celebrating the project launch"
              style={{
                width: "100%",
                maxWidth: "100%",
                aspectRatio: "16/9",
                objectFit: "cover",
                borderRadius: tokens.radius.md,
                display: "block",
              }}
            />
          </div>
        </Reveal>
      </section>

      {/* Next Case Study */}
      <section style={{ paddingTop: 96, paddingBottom: 100 }} className="section-reveal">
        <Reveal dramatic>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
            <div>
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  fontWeight: tokens.weight.regular,
                  color: tokens.color.muted,
                  marginBottom: 12,
                }}
              >
                Next case study
              </div>
              <h2
                style={{
                  fontFamily: tokens.font.sans,
                  fontWeight: tokens.weight.medium,
                  fontSize: tokens.text.lg,
                  color: tokens.color.textDark,
                  margin: 0,
                }}
              >
                NVIDIA AI UX Agent
              </h2>
              <p
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: tokens.color.body,
                  margin: "8px 0 0",
                  maxWidth: 400,
                }}
              >
                Designing an AI UX agent that engineers actually trust.
              </p>
            </div>
            <a
              href="/nvidia-ai-ux-agent"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: `1px solid ${tokens.color.cardBorder}`,
                color: tokens.color.ink,
                cursor: "pointer",
                fontSize: 20,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = tokens.color.offWhite;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              }}
            >
              →
            </a>
          </div>
        </Reveal>
      </section>
    </CaseStudyShell>
  );
};

export default MyShakeCaseStudy;
