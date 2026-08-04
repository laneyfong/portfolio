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
import IconHighlight from "./components/caseStudy/IconHighlight";
import DesignPrinciples from "./components/caseStudy/DesignPrinciples";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import { AlertIcon, PinIcon } from "./components/icons/CaseStudyIcons";
import myshakeThumbnail from "./assets/myshake-thumbnail.png";
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

  /* Mobile responsive: convert horizontal layouts to vertical */
  @media (max-width: 768px) {
    /* Stack 2-column and 3-column grids vertically */
    [style*="gridTemplateColumns"][style*="1fr"] {
      grid-template-columns: 1fr !important;
    }

    /* Convert fixed-width sidebars to full width */
    [style*="width: 320px"] {
      width: 100% !important;
      max-width: 100% !important;
      margin-bottom: 20px;
    }

    /* Convert flexbox row to column */
    [style*="gap: 32"] {
      flex-direction: column !important;
      gap: 24px !important;
    }

    /* Prevent horizontal overflow on flex containers */
    [style*="display: flex"] {
      overflow-x: hidden !important;
    }

    /* Stack information grids vertically */
    [style*="gridTemplateRows"] {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
    }
  }

  @media (max-width: 640px) {
    /* Extra tight spacing on small screens */
    [style*="gap: 60"] {
      gap: 24px !important;
    }

    [style*="gap: 40"] {
      gap: 20px !important;
    }

    /* Ensure no horizontal overflow */
    * {
      max-width: 100vw;
      overflow-x: hidden;
    }
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
            maxWidth: 440,
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
          <p style={{ fontFamily: tokens.font.sans, fontSize: "14px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 440 }}>
            I led the design with 2 engineers, starting mobile-first then expanding to tablet. The app needed to feel fast and intuitive during high-stress moments — every tap counted.
          </p>
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
          <div style={{ background: tokens.color.offWhite, padding: "40px", borderRadius: tokens.radius.md, marginBottom: 48 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: tokens.color.accent }}>
                  <AlertIcon size={28} />
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "16px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                  EEW (Early Warning)
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
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

        <div style={{ marginBottom: 80 }}>
          <Kicker>The Challenge: Grow from 5% to 12.5% active users in 3 months</Kicker>
          <Reveal>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "14px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 440 }}>
              With only 5% of MyShake's 3.8M users actively engaging with the app during earthquakes, the team needed to increase engagement to 12.5%.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "14px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 440 }}>
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
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>I started with direct user research to understand the core problem</SectionHeading>
          <SkillRow items={["User Interviews", "Competitive Analysis", "Survey Design"]} />
        </Reveal>

        <Reveal>
          <StatRow items={[
            { value: "5", label: "User Interviews" },
            { value: "50+", label: "Survey Responses" },
            { value: "3", label: "Competitors Analyzed" },
          ]} />
        </Reveal>

        <Reveal>
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
            <p style={{ fontFamily: tokens.font.sans, fontSize: "14px", color: tokens.color.muted, textAlign: "center", margin: 0 }}>
              The existing app prioritized earthquake data over personal safety.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: 80 }}>
            <Kicker>What users actually want</Kicker>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "14px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 440 }}>
              From 5 interviews and 50+ survey responses, we discovered three clear priorities that would guide every design decision.
            </p>
            <ExpandableRankedList items={[
              { rank: 1, title: "Personal Safety", detail: "In interviews and usability testing, users prioritized their own safety above all else. They want instant access to earthquake information for their location and immediate guidance on what to do. This insight shaped the dashboard-first design, putting personal location and alerts at the top of the experience." },
              { rank: 2, title: "Family Safety", detail: "After personal safety, knowing loved ones are safe was the second priority. Users want to quickly check on family members' locations and safety status during earthquakes—often requiring just 1-3 taps. This led to the pinned contacts feature and the 2-alert system (EEW vs CEN) to clarify communication timing." },
              { rank: 3, title: "Property Damage", detail: "While important, property damage ranked third. Users acknowledged property concerns but the immediate focus is always on human safety first. However, 2 of 5 users mentioned confusion between alert types, requiring clearer visual distinction in the design." },
            ]} />
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
          <SectionHeading>I synthesized insights into a user-centered solution</SectionHeading>
          <SkillRow items={["Information Architecture", "Storyboarding"]} />
        </Reveal>

        <div style={{ marginBottom: 60 }}>
          <Reveal>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "14px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 440 }}>
              The old flow required users to navigate through 7 screens just to check on a single loved one: launch app → navigate to search → enter name → wait for results → verify location → check status → confirm safety. During an earthquake, this friction meant users gave up. Our redesign cuts this to 3 steps by putting pinned loved ones on the dashboard and making status checks instant.
            </p>
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
          <SectionHeading>I explored multiple design directions and tested with users</SectionHeading>
          <SkillRow items={["A/B Testing", "Design Systems", "Accessibility (WCAG)"]} />
        </Reveal>

        <div style={{ marginBottom: 80 }}>
          <Reveal>
            <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <ABWireframe variant={abVariant} />
              <div key={abVariant} className="case-fade-in">
                <div style={{ display: "inline-flex", padding: 4, borderRadius: tokens.radius.full, background: tokens.color.offWhite, marginBottom: 24 }}>
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
                <div style={{ fontFamily: tokens.font.sans, fontWeight: tokens.weight.medium, fontSize: tokens.text.base, color: tokens.color.ink, marginBottom: 8 }}>
                  {AB_VARIATIONS[abVariant].title}
                </div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0 }}>
                  {AB_VARIATIONS[abVariant].description}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ marginBottom: 100 }}>
          <Reveal>
            <div>
              <div style={{ marginBottom: 48 }}>
                <Kicker>Design principles</Kicker>
              </div>
              <DesignPrinciples />
            </div>
          </Reveal>
        </div>

        <div style={{ marginBottom: 100 }}>
          <Reveal>
            <IconHighlight
              icon="🎨"
              title="Color Strategy"
              description="We tested four color variations to make magnitude badges visually distinct while remaining accessible for color blindness."
            />
            <div style={{ marginTop: 48 }}>
              <ColorVariationGrid />
            </div>
          </Reveal>
        </div>

        <div style={{ marginBottom: 100 }}>
          <Reveal>
            <IconHighlight
              icon="🔤"
              title="Typography"
              description="Plus Jakarta Sans gave us welcoming letterforms without sacrificing clarity at small sizes."
            />
            <div style={{ marginTop: 48 }}>
              <TypeCompare />
            </div>
          </Reveal>
        </div>

        <div style={{ marginBottom: 100 }}>
          <Reveal>
            <div>
              <div style={{ marginBottom: 48 }}>
                <Kicker>What gets built</Kicker>
              </div>
              <EffortImpactMatrix />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <IconHighlight
            icon="📐"
            title="Design System"
            description="We created MyShake's first design system—every component WCAG-compliant and stress-tested for moments when users need clarity most."
          />
          <img
            src={myshakeDesignSystem}
            alt="MyShake design system"
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              borderRadius: tokens.radius.md,
              marginTop: 48,
              display: "block",
            }}
          />
        </Reveal>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>The final design prioritizes safety and clarity during emergencies</SectionHeading>
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
              marginBottom: 16,
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

        <div style={{ marginTop: 80 }}>
          <Reveal dramatic>
            <Callout>Design Decisions</Callout>
          </Reveal>

          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 60 }}>
            {/* Decision 1 */}
            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "18px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Dashboard-First Layout
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "16px", lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  Pinned loved ones appear instantly on launch. No search, no navigation layers. In an earthquake, every second matters—users shouldn't have to dig.
                </div>
              </div>
            </Reveal>

            {/* Decision 2 */}
            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "18px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Two-Alert System
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "16px", lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  EEW alerts arrive seconds after shaking starts; CEN notifications come after. Distinct visual treatment (color, language) helps users understand timing and urgency without thinking.
                </div>
              </div>
            </Reveal>
          </div>

          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 60 }}>
            {/* Decision 3 */}
            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "18px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Gesture Design for Mobile
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "16px", lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  Tap-to-expand locations and swipe between pinned contacts. Designed for one-handed use during stressful moments, minimizing the mental load of complex interactions.
                </div>
              </div>
            </Reveal>

            {/* Decision 4 */}
            <Reveal>
              <div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "18px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 16 }}>
                  Responsive Grid System
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "16px", lineHeight: tokens.leading.normal, color: tokens.color.body }}>
                  Mobile uses single-column stacking; tablet expands to a 2-column layout with the map on left and content on right. The grid adapts layout without rethinking information hierarchy.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Walkthrough */}
      <DashboardWalkthrough
        dashboardImage={myshakeDashboard}
        annotation1={myshakeCarouselNote}
        annotation2={myshakePrepareNote}
        annotation3={myshakeNotificationsNote}
      />

      {/* UI Details */}
      <section style={{ paddingTop: 60, paddingBottom: 60 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Key Design Details</SectionHeading>
          <SkillRow items={["Micro-interactions", "Accessibility", "User Testing Refinements"]} />
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
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
          <SectionHeading>This project taught me the power of saying no and advocating for research</SectionHeading>
          <PullQuote>This is my proudest work.</PullQuote>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 440 }}>
            The most important moment was saying no to immediate redesign pressure and advocating for research instead. Those 5 interviews and 50+ survey responses fundamentally shaped the information architecture. We built MyShake's first design system—every component battle-tested for crisis moments. Cutting user friction from 7 steps to 3, increasing engagement by 45%, and seeing the app shipped with our foundation meant everything.
          </p>
          <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 440 }}>
            I'm deeply proud of what we took as a win together. This redesign shipped because my two engineering partners believed in user research, ruthless iteration, and accessibility-first thinking. To the team: thank you for building something that helps people stay safe during earthquakes.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 80 }}>
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
