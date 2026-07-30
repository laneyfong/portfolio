import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { tokens } from "./tokens";
import {
  Reveal,
  Italic,
  Emphasis,
  TagPill,
  SectionHeading,
  Callout,
  Kicker,
  SkillRow,
  SnapshotBar,
  FeatureCard,
  PullQuote,
  BarCompare,
  RankedBars,
  TypeCompare,
  UserJourney,
  ProcessFlow,
  StatRow,
  InsightCard,
  BigImpactStat,
  HMWStatement,
} from "./components/caseStudy/CaseStudyKit";
import ColorVariationGrid from "./components/caseStudy/ColorVariationGrid";
import EffortImpactMatrix from "./components/caseStudy/EffortImpactMatrix";
import ResearchInsights from "./components/caseStudy/ResearchInsights";
import SolutionBreakdown from "./components/caseStudy/SolutionBreakdown";
import StepsComparison from "./components/caseStudy/StepsComparison";
import IconHighlight from "./components/caseStudy/IconHighlight";
import DesignPrinciples from "./components/caseStudy/DesignPrinciples";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import myshakeThumbnail from "./assets/myshake-thumbnail.png";
import myshakeFinalScreens from "./assets/myshake-final-screens.png";
import myshakeAlert from "./assets/myshake-alert.png";
import myshakeDetails from "./assets/myshake-details.png";
import myshakeBeforeScreens from "./assets/myshake-before-screens.png";
import myshakeDesignSystem from "./assets/myshake-design-system.png";
import myshakeStoryboard from "./assets/myshake-storyboard.png";
import myshakeFinalSolution from "./assets/myshake-final-solution.png";
import myshakeHomeExplanation from "./assets/myshake-home-explanation.png";
import myshakeDashboard from "./assets/myshake-dashboard.png";
import myshakeCarouselNote from "./assets/myshake-carousel-note.png";
import myshakePrepareNote from "./assets/myshake-prepare-note.png";
import myshakeNotificationsNote from "./assets/myshake-notifications-note.png";

const SECTIONS: CaseSection[] = [
  { id: "intro", label: "Intro" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "ideation", label: "Ideation" },
  { id: "solution", label: "Solution" },
  { id: "reflection", label: "Reflection" },
];

const TAGS = ["Product/UX Design", "Design Systems", "Product Strategy", "Shipped"];

const AB_VARIATIONS = [
  {
    label: "Variation 1",
    title: "Half-list + half-map",
    description: "A split landing page: a list of nearby earthquakes on one side, a live map on the other.",
  },
  {
    label: "Variation 2",
    title: "Bento-style dashboard",
    description: "A bento grid surfacing pinned locations, nearby earthquakes, and education cards at a glance.",
  },
];

// Restates facts already established elsewhere on the page (engagement lift, step
// reduction, research pushback) — not new claims, just a scannable summary.
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
`;

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
                      border: `1px solid ${tokens.color.cardBorder}`,
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
                      border: `1px solid ${tokens.color.cardBorder}`,
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

        <style>{`
          @media (max-width: 1200px) {
            /* Hide annotations on smaller screens */
          }

          @media (prefers-reduced-motion: reduce) {
            div[style*="transform"] {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

const DashboardWalkthrough: FC<{
  dashboardImage: string;
  annotation1: string;
  annotation2: string;
  annotation3: string;
}> = ({ dashboardImage, annotation1, annotation2, annotation3 }) => {
  const annotations: AnnotationConfig[] = [
    {
      threshold: 0.15,
      side: "right",
      title: "Carousel map",
      description: "Allows users to click on different locations at the top. Default will always be on your location.",
      image: annotation1,
    },
    {
      threshold: 0.5,
      side: "left",
      title: "Earthquakes near you",
      description: "Horizontal scroll of earthquakes that are near you with the highest magnitude.",
      image: annotation2,
    },
    {
      threshold: 0.8,
      side: "right",
      title: "Safety information",
      description: "Informs users of earthquake procedures.",
      image: annotation3,
    },
  ];

  return <ScrollDrivenProductShowcase dashboardImage={dashboardImage} annotations={annotations} />;
};

const MyShakeCaseStudy: FC = () => {
  const [abVariant, setAbVariant] = useState<0 | 1>(0);

  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS} extraStyle={MYSHAKE_EXTRA_STYLE}>
      {/* Intro */}
      <section id="intro" style={{ paddingBottom: 96 }} className="section-reveal">
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted }}>
            High anxiety. Low clarity.
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
            maxWidth: 680,
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

        <Reveal delay={100}>
          <div style={{
            background: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)",
            padding: "40px",
            borderRadius: "14px",
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400
          }}>
            <img src={myshakeThumbnail} alt="MyShake redesigned app - the new safety-focused design" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }} />
          </div>
        </Reveal>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            <FeatureCard title="Problem">
              The app felt outdated — poor onboarding, confusing navigation, and low engagement left users with no
              reason to return.
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
          <div style={{ marginBottom: 40 }}>
            <div style={{ marginBottom: 32 }}>
              <Kicker>The Transformation</Kicker>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: tokens.font.sans, fontSize: "12px", fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>Before</span>
                </div>
                <img src={myshakeBeforeScreens} alt="Old MyShake design - data-focused dashboard" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <div style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                    <strong>7 steps</strong> to check on a loved one<br/>Data-focused, overwhelming
                  </div>
                </div>
              </div>
              <div>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: tokens.font.sans, fontSize: "12px", fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: "0.5px" }}>After</span>
                </div>
                <img src={myshakeFinalScreens} alt="New MyShake design - final redesigned screens" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <div style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                    <strong>3 steps</strong> to check on a loved one<br/>Safety-focused, people-first
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ background: tokens.color.offWhite, padding: "40px", borderRadius: tokens.radius.md, marginBottom: 48 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "32px", marginBottom: 12 }}>🔔</div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "16px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                  EEW (Early Warning)
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                  Seconds before shaking starts
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: "20px", opacity: 0.6 }}>→</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "32px", marginBottom: 12 }}>📍</div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "16px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                  CEN (Post-Earthquake)
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                  Notification after shaking detected
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div style={{ marginBottom: 40 }}>
          <Kicker>The Challenge: Grow from 5% to 12.5% active users in 3 months</Kicker>
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
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Research</SectionHeading>
          <SkillRow items={["User Interviews", "Competitive Analysis", "Survey Design"]} />
        </Reveal>

        <Reveal>
          <StatRow items={[
            { icon: "👥", value: "5", label: "User Interviews" },
            { icon: "📋", value: "50+", label: "Survey Responses" },
            { icon: "🔍", value: "3", label: "Competitors Analyzed" },
          ]} />
        </Reveal>

        <PullQuote>The only existing research we have is the active user rate.</PullQuote>
        <img
          src={myshakeBeforeScreens}
          alt="MyShake existing screens: Map view with earthquake search, earthquake list view, and safety information pages"
          style={{
            width: "100%",
            maxWidth: "640px",
            height: "auto",
            borderRadius: tokens.radius.md,
            marginBottom: 48,
            display: "block",
            margin: "0 auto 48px",
          }}
        />

        <Reveal>
          <InsightCard number={1} color="#FF6B6B" insight={<>Users prioritize <Emphasis>personal & family safety</Emphasis> above all</>} detail="In 5 interviews and usability testing, safety concerns ranked first—not property damage, not data." />
          <InsightCard number={2} color="#4D96FF" insight={<>Competitors <Emphasis>distinguish alert types</Emphasis> visually</>} detail="3 apps analyzed separated early warnings from post-earthquake alerts. MyShake conflated them." />
          <InsightCard number={3} color="#FFB84D" insight={<>Users demand <Emphasis>speed to critical information</Emphasis></>} detail="From 50+ survey responses: users want status in 2–3 taps, not through maps or dashboards." />
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 48, marginBottom: 32 }}>
            <Kicker>Top priorities, in order</Kicker>
            <RankedBars title="" items={["Personal Safety", "Family Safety", "Property Damage"]} />
          </div>
        </Reveal>

        <Callout>Key research findings at a glance</Callout>
        <Reveal>
          <ResearchInsights />
        </Reveal>

        <Callout>User journey: From awareness to churn.</Callout>
        <Reveal>
          <UserJourney
            stages={[
              {
                label: "Awareness",
                description: "Users feel concerned about earthquake risk in their area and want timely alerts",
                color: "#FF6B6B",
              },
              {
                label: "Evaluation",
                description: "They research available apps but are unsure if MyShake is better than alternatives",
                color: "#FFA500",
              },
              {
                label: "Adoption",
                description: "Users download but engagement is low due to confusing UX and unclear value",
                color: "#FFD93D",
              },
              {
                label: "Churn",
                description: "Without a crisis moment, users quickly uninstall—the app feels like a novelty",
                color: "#A8A8A8",
              },
            ]}
          />
        </Reveal>
      </section>

      {/* Synthesis */}
      <section id="synthesis" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Synthesis</SectionHeading>
          <SkillRow items={["Information Architecture", "Storyboarding"]} />
        </Reveal>

        <Callout>The Problem: 7 steps to find a loved one.</Callout>

        <Reveal>
          <StepsComparison />
        </Reveal>

        <Reveal>
          <HMWStatement>How might we help users find <Emphasis>a loved one's safety status</Emphasis> in under <Emphasis>3 taps</Emphasis>?</HMWStatement>
        </Reveal>

        <Reveal>
          <img
            src={myshakeStoryboard}
            alt="User storyboard: Daniel clicks on his Mom's pinned location to quickly view the area, sees the bad earthquake in her region, clicks on the map to expand the view, and finds out she is unharmed and okay."
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: tokens.radius.md,
              marginBottom: 32,
              display: "block",
            }}
          />
        </Reveal>
      </section>

      {/* Ideation */}
      <section id="ideation" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Ideation</SectionHeading>
          <SkillRow items={["A/B Testing", "Design Systems", "Accessibility (WCAG)"]} />
        </Reveal>

        <Callout>A/B Testing</Callout>

        <div style={{ display: "inline-flex", padding: 4, borderRadius: tokens.radius.full, background: tokens.color.offWhite, marginBottom: 20 }}>
          {AB_VARIATIONS.map((v, i) => (
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

        <Reveal>
          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center", marginBottom: 48 }}>
            <ABWireframe variant={abVariant} />
            <div key={abVariant} className="case-fade-in">
              <div style={{ fontFamily: tokens.font.sans, fontWeight: tokens.weight.medium, fontSize: tokens.text.base, color: tokens.color.ink, marginBottom: 8 }}>
                {AB_VARIATIONS[abVariant].title}
              </div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0 }}>
                {AB_VARIATIONS[abVariant].description}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <DesignPrinciples />
        </Reveal>

        <div style={{ marginTop: 48 }}>
          <Reveal>
            <IconHighlight
              icon="🎨"
              title="Color Strategy"
              description="Tested four color variations to balance visual distinction with color-blind accessibility."
            />
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 32 }}>
              <ColorVariationGrid />
            </div>
          </Reveal>
        </div>

        <div style={{ marginTop: 48 }}>
          <Reveal>
            <IconHighlight
              icon="🔤"
              title="Typography Selection"
              description="Plus Jakarta Sans won—welcoming letterforms with clarity at small sizes beat Helvetica Neue."
            />
          </Reveal>
          <Reveal>
            <div style={{ marginTop: 32 }}>
              <TypeCompare />
            </div>
          </Reveal>
        </div>

        <div style={{ marginTop: 48 }}>
          <Reveal>
            <EffortImpactMatrix />
          </Reveal>
        </div>

        <div style={{ marginTop: 48 }}>
          <Reveal>
            <IconHighlight
              icon="📐"
              title="Design System"
              description="Created MyShake's first design system—WCAG-compliant, standardized components designed for clarity during crises."
            />
          </Reveal>
          <Reveal>
            <img
              src={myshakeDesignSystem}
              alt="MyShake design system showing components, radius options, input states, color palette, and earthquake magnitude scale"
              style={{
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                borderRadius: tokens.radius.md,
                marginTop: 32,
                display: "block",
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Solution</SectionHeading>
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
              marginBottom: 32,
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

        <Callout>Core features of the redesign</Callout>
        <Reveal>
          <SolutionBreakdown />
        </Reveal>

        <Reveal>
          <BigImpactStat value="45%" label="Increase in user engagement" color={tokens.color.accent} />
        </Reveal>

        <Callout>The Solution: 3 steps instead of 7.</Callout>

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
      </section>

      {/* Interactive Dashboard Walkthrough */}
      <DashboardWalkthrough
        dashboardImage={myshakeDashboard}
        annotation1={myshakeCarouselNote}
        annotation2={myshakePrepareNote}
        annotation3={myshakeNotificationsNote}
      />

      {/* UI Details */}
      <section style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Key Design Details</SectionHeading>
          <SkillRow items={["Micro-interactions", "Accessibility", "User Testing Refinements"]} />
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
            <div>
              <img src={myshakeAlert} alt="Alert notification screens showing EEW vs CEN differentiation" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }} />
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.textDark, marginBottom: 4 }}>
                Alert Flows
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                EEW and CEN alerts visually distinct
              </div>
            </div>
            <div>
              <img src={myshakeDetails} alt="Detailed information screens with optimized content hierarchy" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }} />
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.textDark, marginBottom: 4 }}>
                Detail Screens
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                Information hierarchy optimized for crisis moments
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reflection */}
      <section id="reflection" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Reflection</SectionHeading>
          <PullQuote>This is my proudest work.</PullQuote>
        </Reveal>
        <Reveal>
          <InsightCard number={1} color="#6BCB77" insight={<><Emphasis>Research advocacy</Emphasis> shaped the entire IA</>} detail="Negotiated a scoped research plan against pressure to redesign without data. Those findings became the foundation." />
          <InsightCard number={2} color="#4D96FF" insight={<><Emphasis>Design systems</Emphasis> enable scale</>} detail="Built the first design system for MyShake. Every component WCAG-compliant and stress-tested for crisis UX." />
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
                  fontWeight: tokens.weight.medium,
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
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: tokens.color.ink,
                color: tokens.color.white,
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: tokens.shadow.subtle,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = tokens.shadow.cardHoverLarge;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = tokens.shadow.subtle;
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </section>

      {/* Final Solution */}
      <section id="final-solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <div style={{
            background: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)",
            padding: "60px 40px",
            borderRadius: "14px",
            marginBottom: 40
          }}>
            <img src={myshakeFinalSolution} alt="MyShake final solution - complete app screens" style={{ width: "100%", height: "auto", borderRadius: "14px" }} />
          </div>
        </Reveal>
      </section>
    </CaseStudyShell>
  );
};

export default MyShakeCaseStudy;
