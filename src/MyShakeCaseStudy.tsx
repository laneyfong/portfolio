import type { FC, ReactNode } from "react";
import { useState } from "react";
import { tokens } from "./tokens";
import {
  Reveal,
  Italic,
  TagPill,
  SectionHeading,
  Callout,
  Paragraph,
  Kicker,
  SkillRow,
  SnapshotBar,
  FeatureCard,
  IconCard,
  FindingRow,
  PullQuote,
  BarCompare,
  RankedBars,
  RadialStat,
  TypeCompare,
  Bullets,
  SearchIcon,
  BellIcon,
  ThumbsDownIcon,
  UserJourney,
  ProcessFlow,
} from "./components/caseStudy/CaseStudyKit";
import { useInView } from "./components/caseStudy/useInView";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import myshakeDashboard from "./assets/myshake-dashboard.png";
import myshakePinned from "./assets/myshake-pinned-locations.png";

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

// ---------- MyShake-only visuals ----------

const WireListRow: FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 10px" }}>
    <div style={{ width: 10, height: 10, borderRadius: "50%", background: tokens.color.accent, flexShrink: 0 }} />
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ height: 4, width: "70%", borderRadius: 2, background: tokens.color.cardBorder }} />
      <div style={{ height: 4, width: "40%", borderRadius: 2, background: tokens.color.stroke }} />
    </div>
  </div>
);

// A bit of road/pin texture so this reads as a deliberate low-fidelity wireframe rather
// than an unfinished placeholder block.
const WireMap: FC<{ flex: number }> = ({ flex }) => (
  <div
    style={{
      position: "relative",
      flex,
      height: "100%",
      width: "100%",
      borderRadius: tokens.radius.sm,
      background: "#EAF1EC",
      overflow: "hidden",
    }}
  >
    <svg width="100%" height="100%" viewBox="0 0 120 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
      <path d="M0 72 Q 40 52 62 64 T 120 38" stroke="#D3E2D8" strokeWidth="3" fill="none" />
      <path d="M8 12 Q 48 30 78 20 T 120 32" stroke="#D3E2D8" strokeWidth="3" fill="none" />
    </svg>
    <div style={{ position: "absolute", top: "32%", left: "42%", width: 10, height: 10, borderRadius: "50%", background: tokens.color.accent }} />
    <div style={{ position: "absolute", top: "58%", left: "66%", width: 8, height: 8, borderRadius: "50%", background: tokens.color.ink }} />
  </div>
);

const ABWireframe: FC<{ variant: 0 | 1 }> = ({ variant }) => (
  <div
    key={variant}
    className="case-fade-in"
    style={{
      height: 200,
      borderRadius: tokens.radius.md,
      border: `1px solid ${tokens.color.cardBorder}`,
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

// A brief tremor on the hero screenshots the first time they scroll into view — the one
// place on the page where "shaking" is the literal, on-brand gesture rather than a
// generic entrance animation.
const ShakeOnView: FC<{ children: ReactNode }> = ({ children }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={inView ? "case-shake-in" : undefined}>
      {children}
    </div>
  );
};

// Small epicenter-ping icon — two expanding rings around a dot, like a radar/seismic
// pulse. Sits next to the opening kicker line as a one-glance "this is an earthquake
// app" signal before any copy is read.
const EpicenterPulse: FC = () => (
  <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10, flexShrink: 0 }} aria-hidden>
    <span
      className="case-pulse-ring"
      style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px solid ${tokens.color.accent}` }}
    />
    <span
      className="case-pulse-ring"
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: `1.5px solid ${tokens.color.accent}`,
        animationDelay: "1.1s",
      }}
    />
    <span style={{ position: "relative", width: 6, height: 6, margin: 2, borderRadius: "50%", background: tokens.color.accent }} />
  </span>
);

const SEISMIC_UNIT_WIDTH = 800;

// Two sine components plus an occasional sharp spike, all at frequencies that complete
// a whole number of cycles across SEISMIC_UNIT_WIDTH — so the waveform's value (and
// slope) at x=0 and x=SEISMIC_UNIT_WIDTH match exactly, and the looped animation has no
// visible seam.
function buildSeismicUnit(baseline: number, amplitude: number) {
  const points: string[] = [];
  const k1 = (2 * Math.PI * 3) / SEISMIC_UNIT_WIDTH;
  const k2 = (2 * Math.PI * 7) / SEISMIC_UNIT_WIDTH;
  const kSpike = (2 * Math.PI * 11) / SEISMIC_UNIT_WIDTH;
  for (let x = 0; x <= SEISMIC_UNIT_WIDTH; x += 8) {
    const spike = Math.sin(x * kSpike) > 0.94 ? amplitude * 0.9 : 0;
    const y = baseline + Math.sin(x * k1) * amplitude * 0.4 + Math.sin(x * k2) * amplitude * 0.25 + spike;
    points.push(`${x},${y.toFixed(1)}`);
  }
  return points;
}

const SEISMIC_UNIT = buildSeismicUnit(18, 13);
const SEISMIC_POINTS_DOUBLE = [
  ...SEISMIC_UNIT,
  ...SEISMIC_UNIT.map((p) => {
    const [x, y] = p.split(",");
    return `${Number(x) + SEISMIC_UNIT_WIDTH},${y}`;
  }),
].join(" ");

// A continuously-scrolling seismograph line — ambient, not scroll-triggered, since a
// live-reading instrument is the visual metaphor.
const SeismicWave: FC = () => (
  <div style={{ width: "100%", height: 36, overflow: "hidden", margin: "8px 0 44px" }} aria-hidden>
    <svg
      width="200%"
      height="36"
      viewBox={`0 0 ${SEISMIC_UNIT_WIDTH * 2} 36`}
      preserveAspectRatio="none"
      className="case-seismic-svg"
      style={{ display: "block" }}
    >
      <polyline
        points={SEISMIC_POINTS_DOUBLE}
        fill="none"
        stroke={tokens.color.accent}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const MYSHAKE_EXTRA_STYLE = `
  @media (prefers-reduced-motion: no-preference) {
    .case-shake-in { animation: case-shake-in 0.7s ease; }
    .case-pulse-ring { animation: case-pulse 2.2s ease-out infinite; }
    .case-seismic-svg { animation: case-seismic-scroll 9s linear infinite; }
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
  @keyframes case-pulse {
    0% { transform: scale(0.6); opacity: 0.7; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes case-seismic-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
`;

const MyShakeCaseStudy: FC = () => {
  const [abVariant, setAbVariant] = useState<0 | 1>(0);

  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS} extraStyle={MYSHAKE_EXTRA_STYLE}>
      {/* Intro */}
      <section id="intro" style={{ paddingBottom: 96 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <EpicenterPulse />
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

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            <FeatureCard title="Problem">
              The app felt outdated — poor onboarding, confusing navigation, and low engagement left users with no
              reason to return.
            </FeatureCard>
            <FeatureCard title="Solution">
              Redesigned MyShake from a passive information tool into a high-stakes navigation utility, with instant
              access to pinned family locations and critical safety status.
            </FeatureCard>
            <FeatureCard title="Result">
              45% increase in user engagement by evolving MyShake into an all-in-one earthquake care package.
            </FeatureCard>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ShakeOnView>
            <div className="case-intro-shots" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 16, marginBottom: 32 }}>
              <img
                src={myshakeDashboard}
                alt="MyShake dashboard with pinned locations and earthquake education cards"
                className="case-shot"
                style={{ width: "100%", display: "block", borderRadius: tokens.radius.md, boxShadow: tokens.shadow.card }}
              />
              <img
                src={myshakePinned}
                alt="MyShake pinned locations and earthquake details screens"
                className="case-shot"
                style={{ width: "100%", display: "block", borderRadius: tokens.radius.md, boxShadow: tokens.shadow.card }}
              />
            </div>
          </ShakeOnView>
        </Reveal>

        <SeismicWave />

        <Paragraph>
          MyShake notifies users of nearby earthquakes — but it was conflating two very different kinds of alerts
          under one undifferentiated UI:
        </Paragraph>

        <Reveal>
          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
            <FeatureCard title="CEN">Informs users with a notification once an earthquake has occurred.</FeatureCard>
            <FeatureCard title="EEW — Early Warning">
              A government alert, available in CA, OR, and WA, that can notify users a few seconds before shaking starts.
            </FeatureCard>
          </div>
        </Reveal>

        <div style={{ marginBottom: 40 }}>
          <Kicker>The Challenge</Kicker>
          <Paragraph>
            MyShake wanted to be the #1 earthquake app in the market by increasing engagement and growing the
            active-user rate from 5% to 12.5%, while navigating a tight 3-month timeline and data privacy restrictions.
          </Paragraph>
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
      <section id="research" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Research</SectionHeading>
          <SkillRow items={["User Interviews", "Competitive Analysis", "Survey Design"]} />
        </Reveal>

        <PullQuote>The only existing research we have is the active user rate.</PullQuote>
        <Paragraph>
          I asked our client for any existing user research. Their answer: just the active-user rate, and it was
          low. My job was to find out why.
        </Paragraph>
        <Paragraph>
          The core problem: the app leaned on data visualization — maps of past earthquakes — instead of utility
          during a crisis. Users opened it out of curiosity, not need.
        </Paragraph>

        <PullQuote dark attribution="Stakeholder, kickoff meeting">
          Skip research, just redesign.
        </PullQuote>
        <Paragraph>
          We didn't agree at first. I walked through what redesigning on assumptions alone would risk — wasted
          engineering time on the wrong fix — and we landed on a middle ground: three lightweight studies, run in
          parallel, scoped to fit inside the three-month timeline.
        </Paragraph>

        <Callout>Users want a way to get to critical information quickly in a short amount of time.</Callout>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FindingRow method="Competitive Analysis">
              Simplicity and a half-list/half-map layout won. Competitors also drew a clear line between CEN
              (crowdsourced alerts) and EEW (early-warning alerts) — something MyShake didn't do.
            </FindingRow>
            <FindingRow method="Usability Testing + User Interviews">
              <RankedBars title="Top priorities, in order" items={["Personal Safety", "Family Safety", "Property Damage"]} />
            </FindingRow>
            <FindingRow method="User Survey">
              Users didn't see the value in downloading the app at all — they felt they could just search for the
              same information elsewhere.
            </FindingRow>
          </div>
        </Reveal>

        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, marginBottom: 16 }}>
            More of what surfaced from interviews
          </div>
          <Reveal>
            <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              <IconCard icon={<SearchIcon />} title="What users wanted" items={["Earthquake Tracking", "Information Access", "Reporting"]} />
              <IconCard icon={<BellIcon />} title="What users expected" items={["Early Alert", "Safety & Communication"]} />
              <IconCard
                icon={<ThumbsDownIcon />}
                title="What users disliked"
                items={["Poor UI aesthetics", "The confusing I felt shake button", "Lack of color on the map"]}
              />
            </div>
          </Reveal>
        </div>

        <Callout>User journey: From awareness to churn.</Callout>
        <Paragraph>
          Research revealed a critical problem: users were downloading the app out of concern but had no reason to keep it.
        </Paragraph>
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
      <section id="synthesis" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Synthesis</SectionHeading>
          <SkillRow items={["Information Architecture", "Storyboarding"]} />
        </Reveal>
        <Paragraph>
          Having identified core user needs, we pivoted to prioritizing high-impact solutions that could
          realistically be delivered within our timeframe.
        </Paragraph>

        <Callout>The Problem: 7 steps to find a loved one.</Callout>
        <Paragraph>
          In a high-stakes moment, users had to navigate through too many steps to get critical information. Each step added friction and cognitive load during a crisis.
        </Paragraph>

        <Reveal>
          <ProcessFlow
            direction="vertical"
            steps={[
              { title: "Launch app", description: "User opens MyShake in panic", color: "#FF6B6B", icon: "1" },
              { title: "Navigate to search", description: "Find the search feature buried in menu", color: "#FF8C42", icon: "2" },
              { title: "Enter name", description: "Type loved one's name or number", color: "#FFA500", icon: "3" },
              { title: "Wait for results", description: "Slow API returns fuzzy matches", color: "#FFB84D", icon: "4" },
              { title: "Verify location", description: "Check if result matches the right person", color: "#FFC870", icon: "5" },
              { title: "Get status", description: "Finally see if they're safe", color: "#FFD93D", icon: "6" },
              { title: "Relief", description: "7+ steps to get critical information", color: "#A8A8A8", icon: "7" },
            ]}
          />
        </Reveal>

        <Callout>Empathizing with users to find the most intuitive flow.</Callout>
        <Paragraph>
          We storyboarded the ideal emergency flow end-to-end, drawing on our competitive analysis and interview
          findings to map the fastest path from "something happened" to "my people are safe."
        </Paragraph>
      </section>

      {/* Ideation */}
      <section id="ideation" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Ideation</SectionHeading>
          <SkillRow items={["A/B Testing", "Design Systems", "Accessibility (WCAG)"]} />
        </Reveal>
        <Paragraph>
          We used a bento-grid framework to create a clear hierarchy for high-stakes user actions, drawing from
          Uber's high-frequency navigation patterns to build a layout optimized for immediate access to critical
          features.
        </Paragraph>

        <Callout>A/B Testing</Callout>
        <Paragraph>
          We employed A/B testing to quantitatively validate our design hypotheses and converge on a data-backed
          final solution. Toggle between the two variations we tested:
        </Paragraph>

        <div style={{ display: "inline-flex", padding: 4, borderRadius: tokens.radius.full, background: tokens.color.offWhite, border: `1px solid ${tokens.color.cardBorder}`, marginBottom: 20 }}>
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
          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center", marginBottom: 32 }}>
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

        <Callout>Restructuring the landing page to minimize time-to-task for essential safety information.</Callout>

        <Callout>Design principles: From data tool to safety companion.</Callout>
        <Paragraph>
          We established four core principles to guide the redesign and ensure the app served users in high-stakes moments.
        </Paragraph>
        <Reveal>
          <UserJourney
            stages={[
              {
                label: "Speed",
                description: "Minimize taps and cognitive load to find critical info instantly",
                color: "#FF6B6B",
              },
              {
                label: "Clarity",
                description: "Make the app's purpose clear — safety, not data visualization",
                color: "#6BCB77",
              },
              {
                label: "Reassurance",
                description: "Provide immediate visual confirmation of loved ones' safety status",
                color: "#4D96FF",
              },
              {
                label: "Accessibility",
                description: "Design for all users, not just data enthusiasts or scientists",
                color: "#FFB84D",
              },
            ]}
          />
        </Reveal>

        <Callout>Choosing a font that balances brand and accessibility.</Callout>
        <Paragraph>
          I tested Helvetica Neue against Plus Jakarta Sans to find the right balance of authority and
          approachability. Plus Jakarta Sans won — rounder, more welcoming letterforms without losing clarity at
          small sizes.
        </Paragraph>
        <Reveal>
          <TypeCompare />
        </Reveal>

        <Callout>Design System</Callout>
        <Paragraph>
          I designed a universally accessible UI that maintains an authoritative presence while removing visual
          barriers for a general audience — an accessible, WCAG-compliant design system that reduced cognitive load
          and accelerated access to vital features. I also authored the brand's first component library,
          standardizing typography, grids, and UI elements across the experience.
        </Paragraph>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Solution</SectionHeading>
          <SkillRow items={["Interaction Design", "Visual Design", "Prototyping"]} />
          <Callout>An all-in-one earthquake care package, built for high-stakes navigation.</Callout>
        </Reveal>
        <Paragraph>
          Transforming MyShake from a passive alert tool into an active earthquake companion, using simplified
          navigation to encourage frequent user interaction with readiness features.
        </Paragraph>

        <Reveal>
          <div
            style={{
              margin: "32px 0",
              background: tokens.color.offWhite,
              border: `2px dashed ${tokens.color.cardBorder}`,
              borderRadius: tokens.radius.md,
              padding: 60,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: 8,
              }}
            >
              ▶️
            </div>
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontWeight: tokens.weight.medium,
                fontSize: "18px",
                color: tokens.color.textDark,
                marginBottom: 4,
              }}
            >
              Interactive Product Demo
            </div>
            <p
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "14px",
                color: tokens.color.body,
                margin: 0,
                maxWidth: 400,
                lineHeight: tokens.leading.normal,
              }}
            >
              Try the redesigned app flow: Open dashboard → Tap a contact → See safety status in 3 steps
            </p>
          </div>
        </Reveal>

        <Reveal>
          <RadialStat percent={45} label="Increase in user engagement, driven by the restructured information architecture." />
        </Reveal>

        <Callout>The Solution: 3 steps instead of 7.</Callout>
        <Paragraph>
          By restructuring the information architecture around personal safety instead of data visualization, we reduced the time-to-critical-information from 7 steps to just 3.
        </Paragraph>

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

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, margin: "32px 0" }}>
            <FeatureCard title="Personal Safety">
              Nearby earthquakes and pinned locations first — a movable map prioritizing loved ones and yourself.
            </FeatureCard>
            <FeatureCard title="Education & Engagement">
              Safety information on what to do in an emergency, with gamified features to increase engagement.
            </FeatureCard>
            <FeatureCard title="Accessible Design">
              Designed for all users and age groups — data made digestible, not just for scientists.
            </FeatureCard>
          </div>
        </Reveal>
        <div style={{ display: "inline-flex", marginBottom: 20 }}>
          <TagPill>Goal: find a loved one in two taps</TagPill>
        </div>
        <Paragraph>
          This strategic change guarantees a seamless, life-critical experience and meaningfully lowers stress
          during a crisis.
        </Paragraph>
      </section>

      {/* Reflection */}
      <section id="reflection" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Reflection</SectionHeading>
          <PullQuote>This is my proudest work.</PullQuote>
        </Reveal>
        <Paragraph>
          My team and I were genuinely invested in making MyShake the #1 app in its category — and a lot of late
          nights went into it. Two things I'd want a hiring team to take from this project:
        </Paragraph>
        <Bullets
          items={[
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>Design advocacy: </strong>
              our client wanted to skip straight to redesigning. We talked through the risk together, agreed on a
              scoped-down research plan instead, and the findings ended up reshaping the entire information
              architecture.
            </>,
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>With more time: </strong>
              I'd scale the research further, add an earthquake news feed, and layer in more micro-interactions to
              round out the experience.
            </>,
          ]}
        />
      </section>

      {/* Next Case Study */}
      <section style={{ paddingTop: 96, paddingBottom: 100, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
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
              aria-label="View next case study: NVIDIA AI UX Agent"
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
    </CaseStudyShell>
  );
};

export default MyShakeCaseStudy;
