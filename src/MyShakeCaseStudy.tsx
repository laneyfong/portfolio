import type { FC } from "react";
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
import myshakeColorExploration from "./assets/myshake-color-exploration.png";
import myshakeStoryboard from "./assets/myshake-storyboard.png";
import myshakeFinalSolution from "./assets/myshake-final-solution.png";
import myshakeHomeExplanation from "./assets/myshake-home-explanation.png";

const SECTIONS: CaseSection[] = [
  { id: "intro", label: "Intro" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "ideation", label: "Ideation" },
  { id: "solution", label: "Solution" },
  { id: "reflection", label: "Reflection" },
];

const TAGS = ["Product/UX Design", "Design Systems", "Product Strategy", "Shipped"];

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

const MyShakeCaseStudy: FC = () => {

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
              Users now have instant access to loved ones' safety status — transforming MyShake from a curiosity app into a trusted safety companion they return to regularly.
            </FeatureCard>
          </div>
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
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Research</SectionHeading>
          <SkillRow items={["User Interviews", "Competitive Analysis", "Survey Design"]} />
        </Reveal>

        <PullQuote>The only existing research we have is the active user rate.</PullQuote>
        <Paragraph>
          No existing user research existed. The app leaned on data visualization instead of utility during a crisis.
        </Paragraph>

        <Callout>The existing experience: A data-first tool, not a safety companion</Callout>
        <Reveal>
          <img
            src={myshakeBeforeScreens}
            alt="MyShake existing screens: Map view with earthquake search, earthquake list view, and safety information pages"
            style={{
              width: "100%",
              maxWidth: "640px",
              height: "auto",
              borderRadius: tokens.radius.md,
              marginBottom: 32,
              display: "block",
              margin: "0 auto 32px",
            }}
          />
        </Reveal>

        <PullQuote dark attribution="Stakeholder, kickoff meeting">
          Skip research, just redesign.
        </PullQuote>
        <Paragraph>
          I advocated for a middle ground: three scoped studies run in parallel within the timeline, rather than redesigning on assumptions.
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

        <Callout>Empathizing with users to find the most intuitive flow.</Callout>
        <Paragraph>
          We storyboarded the ideal emergency flow end-to-end, drawing on our competitive analysis and interview
          findings to map the fastest path from "something happened" to "my people are safe."
        </Paragraph>
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

        <Callout>Restructuring the landing page to minimize time-to-task for essential safety information.</Callout>

        <Callout>Design principles: From data tool to safety companion.</Callout>
        <Reveal>
          <DesignPrinciples />
        </Reveal>

        <Callout>Balancing color accessibility with visual hierarchy</Callout>
        <Reveal>
          <IconHighlight
            icon="🎨"
            title="Color Strategy"
            description="Magnitude badges needed to be visually distinct and accessible for color blindness. We explored four variations to find the right saturation and hue balance."
          />
        </Reveal>
        <Reveal>
          <ColorVariationGrid />
        </Reveal>

        <Callout>Choosing a font that balances brand and accessibility.</Callout>
        <Reveal>
          <IconHighlight
            icon="🔤"
            title="Typography Selection"
            description="Tested Helvetica Neue against Plus Jakarta Sans. Plus Jakarta Sans won for its welcoming letterforms without sacrificing clarity at small sizes."
          />
        </Reveal>
        <Reveal>
          <TypeCompare />
        </Reveal>

        <Callout>Prioritizing features through effort-impact analysis</Callout>
        <Reveal>
          <EffortImpactMatrix />
        </Reveal>

        <Reveal>
          <IconHighlight
            icon="📐"
            title="Design System"
            description="Authored MyShake's first design system — standardizing components, typography, and color scales. Every component was WCAG-compliant and designed for clarity in high-stress moments."
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
              marginBottom: 32,
              display: "block",
            }}
          />
        </Reveal>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Solution</SectionHeading>
          <SkillRow items={["Interaction Design", "Visual Design", "Prototyping"]} />
          <Callout>Transforming MyShake from a passive alert tool into an active earthquake companion.</Callout>
        </Reveal>

        <Reveal>
          <div style={{
            background: "linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%)",
            padding: "60px 40px",
            borderRadius: "14px",
            marginBottom: 40
          }}>
            <img src={myshakeHomeExplanation} alt="MyShake app features and explanation" style={{ width: "100%", height: "auto", borderRadius: "14px" }} />
          </div>
        </Reveal>

        <Callout>Core features of the redesign</Callout>
        <Reveal>
          <SolutionBreakdown />
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

        <Callout>Design Screens</Callout>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src={myshakeThumbnail} alt="Pinned locations screen" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
              <span style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body, textAlign: "center" }}>Pinned Locations</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src={myshakeAlert} alt="Earthquake alert screen" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
              <span style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body, textAlign: "center" }}>Alert Notifications</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src={myshakeDetails} alt="Detailed information screen" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
              <span style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body, textAlign: "center" }}>Details</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Design System */}
      <section style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Design System</SectionHeading>
          <SkillRow items={["Visual Design", "Design Systems", "Component Architecture"]} />
        </Reveal>

        <Callout>Built for consistency and scale</Callout>
        <Paragraph>
          A comprehensive design system that extends beyond the app — establishing clear patterns for typography, color, spacing, and components that any team member can implement.
        </Paragraph>

        <Reveal>
          <img src={myshakeDesignSystem} alt="MyShake design system showing colors, typography, and components" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 40 }} />
        </Reveal>

        <Reveal>
          <img src={myshakeColorExploration} alt="MyShake color exploration and palette development" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
        </Reveal>
      </section>

      {/* Design Iterations & Impact */}
      <section style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Design Iterations</SectionHeading>
          <SkillRow items={["Rapid Prototyping", "User Testing", "Iteration Cycles"]} />
        </Reveal>

        <Callout>From concept to shipped design</Callout>
        <Paragraph>
          Multiple rounds of iteration and testing refined the design. Each screen shows a different approach to the core challenge: how to make safety information instantly accessible without overwhelming the user.
        </Paragraph>

        <Reveal>
          <img src={myshakeStoryboard} alt="MyShake design iteration storyboard showing evolution of screens" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 40 }} />
        </Reveal>

        <Callout>The Impact</Callout>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div style={{ padding: 32, background: "linear-gradient(135deg, #8DC8E4 0%, #6BB3D9 100%)", borderRadius: tokens.radius.md, color: "white" }}>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "48px", fontWeight: tokens.weight.medium, marginBottom: 12, lineHeight: 1 }}>
                45%
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", lineHeight: tokens.leading.normal }}>
                <strong>Engagement Increase</strong><br/>
                Restructuring the information architecture around personal safety (not data visualization) drove a 45% lift in user engagement.
              </div>
            </div>
            <div style={{ padding: 32, background: "linear-gradient(135deg, #6BCB77 0%, #52B788 100%)", borderRadius: tokens.radius.md, color: "white" }}>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "48px", fontWeight: tokens.weight.medium, marginBottom: 12, lineHeight: 1 }}>
                7 → 3
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", lineHeight: tokens.leading.normal }}>
                <strong>Steps Eliminated</strong><br/>
                Reduced the path to check on a loved one from 7 taps to just 3. A multi-screen search became two intuitive taps.
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* UI Details */}
      <section style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Key Design Details</SectionHeading>
          <SkillRow items={["Micro-interactions", "Accessibility", "User Testing Refinements"]} />
        </Reveal>

        <Callout>Designing every screen with intention</Callout>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <div style={{ padding: 24, borderRadius: tokens.radius.md, backgroundColor: tokens.color.offWhite }}>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 12 }}>
                Pinned Locations Hub
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                The dashboard prioritizes loved ones above all else. Pinned contacts appear instantly with real-time safety status—no digging through menus.
              </div>
            </div>

            <div style={{ padding: 24, borderRadius: tokens.radius.md, backgroundColor: tokens.color.offWhite }}>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 12 }}>
                Alert Differentiation
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                EEW (early warning) and CEN (post-earthquake) alerts look distinctly different. Users know instantly what type of alert they're seeing and how to respond.
              </div>
            </div>

            <div style={{ padding: 24, borderRadius: tokens.radius.md, backgroundColor: tokens.color.offWhite }}>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 12 }}>
                Information Hierarchy
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                Critical safety info is front-and-center. Exploratory content (maps, data) lives secondary—never competing for attention during emergencies.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32, marginTop: 40 }}>
            <div>
              <img src={myshakeAlert} alt="Alert notification screens showing differentiation" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }} />
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body }}>
                Alert Flows
              </div>
            </div>
            <div>
              <img src={myshakeDetails} alt="Detailed information screens with content hierarchy" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }} />
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body }}>
                Detail Screens
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
        <Bullets
          items={[
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>Design advocacy: </strong>
              negotiated a scoped research plan against the urge to skip straight to redesign. The research findings reshaped the entire IA.
            </>,
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>What's next: </strong>
              scale research further, add earthquake news feeds, and layer in more micro-interactions.
            </>,
          ]}
        />
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
