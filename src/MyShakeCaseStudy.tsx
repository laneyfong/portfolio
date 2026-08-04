import type { FC } from "react";
import { useState } from "react";
import { tokens } from "./tokens";
import {
  Reveal,
  Italic,
  TagPill,
  PullQuote,
  SectionHeading,
  Callout,
  SkillRow,
  BigImpactStat,
  ProcessFlow,
} from "./components/caseStudy/CaseStudyKit";
import SolutionBreakdown from "./components/caseStudy/SolutionBreakdown";
import StepsComparison from "./components/caseStudy/StepsComparison";
import {
  ProjectSnapshot,
  KeyInsight,
  VisualProblem,
  VisualTimeline,
  ImpactInfographic,
  ReflectionCards,
} from "./components/caseStudy/EditorialComponents";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import myshakeThumbnail from "./assets/myshake-thumbnail.png";
import myshakeDashboard from "./assets/myshake-dashboard.png";
import myshakeCarouselNote from "./assets/myshake-carousel-note.png";
import myshakePrepareNote from "./assets/myshake-prepare-note.png";
import myshakeNotificationsNote from "./assets/myshake-notifications-note.png";
import myshakeTeam from "./assets/myshake-team.png";
import myshakeAlert from "./assets/myshake-alert.png";
import myshakeDetails from "./assets/myshake-details.png";
import myshakeHomeExplanation from "./assets/myshake-home-explanation.png";

const SECTIONS: CaseSection[] = [
  { id: "hero", label: "Hero" },
  { id: "snapshot", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "insight", label: "Insight" },
  { id: "solution", label: "Solution" },
  { id: "process", label: "Process" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
];

const TAGS = ["Product/UX Design", "Design Systems", "Shipped"];

const HIGHLIGHTS = [
  "Increased user engagement 45% by restructuring the IA around personal safety.",
  "Cut steps to check on loved ones from 7 to 3.",
  "Built MyShake's first design system with WCAG compliance.",
];

const MYSHAKE_EXTRA_STYLE = `
  @media (max-width: 768px) {
    html, body, main { overflow-x: hidden !important; max-width: 100vw; }
  }
`;

interface DashboardAnnotation {
  src: string;
  alt: string;
  label: string;
  description: string;
}

const DashboardWalkthrough: FC<{
  dashboardImage: string;
  annotation1: string;
  annotation2: string;
  annotation3: string;
}> = ({ dashboardImage, annotation1, annotation2, annotation3 }) => {
  const [activeAnnotation, setActiveAnnotation] = useState<0 | 1 | 2>(0);

  const annotations: DashboardAnnotation[] = [
    {
      src: annotation1,
      alt: "Carousel feature",
      label: "Swipe Between Pinned Contacts",
      description: "Users can quickly swipe left/right to check each pinned loved one's status. No searching, no waiting.",
    },
    {
      src: annotation2,
      alt: "Prepare feature",
      label: "One-Tap Prepare Mode",
      description: "Before an earthquake, users can arm alerts and set preferences. When shaking starts, the app is ready.",
    },
    {
      src: annotation3,
      alt: "Notifications feature",
      label: "Clear Alert Hierarchy",
      description: "EEW (seconds before shaking) and CEN (post-earthquake) are visually distinct. No confusion.",
    },
  ];

  return (
    <section id="dashboard-walkthrough" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
      <Reveal dramatic>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.muted, marginBottom: 12, textTransform: "uppercase" }}>
            Dashboard Design
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: 0 }}>
            The solution: Everything a user needs in one tap
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", marginBottom: 80 }}>
          <div>
            <img
              src={dashboardImage}
              alt="MyShake dashboard"
              style={{
                width: "100%",
                maxWidth: "320px",
                height: "auto",
                borderRadius: tokens.radius.md,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
            />
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {annotations.map((ann, i) => (
                <div
                  key={i}
                  onClick={() => setActiveAnnotation(i as 0 | 1 | 2)}
                  style={{
                    padding: 20,
                    borderRadius: tokens.radius.md,
                    backgroundColor: activeAnnotation === i ? tokens.color.offWhite : tokens.color.white,
                    borderLeft: `4px solid ${activeAnnotation === i ? tokens.color.accent : tokens.color.stroke}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px" }}>
                    {ann.label}
                  </h3>
                  <p style={{ fontSize: "14px", color: tokens.color.body, lineHeight: 1.5, margin: 0 }}>
                    {ann.description}
                  </p>
                </div>
              ))}
            </div>

            {activeAnnotation < annotations.length && (
              <div style={{ marginTop: 40, borderRadius: tokens.radius.md, overflow: "hidden" }}>
                <img
                  src={annotations[activeAnnotation].src}
                  alt={annotations[activeAnnotation].alt}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: tokens.radius.md,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

const MyShakeCaseStudy: FC = () => {
  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS} extraStyle={MYSHAKE_EXTRA_STYLE}>
      {/* 1. HERO */}
      <section id="hero" style={{ paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted }}>
              Earthquake app redesign
            </span>
          </div>
          <h1 style={{ fontFamily: tokens.font.sans, fontWeight: tokens.weight.medium, fontSize: tokens.text["2xl"], color: tokens.color.ink, lineHeight: tokens.leading.snug, margin: "0 0 24px", maxWidth: 440 }}>
            Transforming passive alerts into <Italic>active safety companion</Italic>
          </h1>
          <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: tokens.color.body, lineHeight: 1.5, margin: "0 0 32px", maxWidth: 440 }}>
            45% increase in engagement by restructuring the app around personal safety instead of earthquake data.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 60 }}>
            {TAGS.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ borderRadius: tokens.radius.md, overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", marginBottom: 60 }}>
            <img src={myshakeThumbnail} alt="MyShake redesigned app" style={{ width: "100%", height: "auto", display: "block", maxWidth: 640 }} />
          </div>
        </Reveal>
      </section>

      {/* 2. PROJECT SNAPSHOT */}
      <section id="snapshot" style={{ paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <ProjectSnapshot
            items={[
              { label: "Users", value: "3.8M+", icon: "👥" },
              { label: "Time Reduced", value: "7 → 3 steps", icon: "⏱️" },
              { label: "Engagement", value: "+45%", icon: "📈" },
              { label: "Timeline", value: "3 months", icon: "📅" },
              { label: "Team", value: "5 designers", icon: "👨‍💼" },
              { label: "Platforms", value: "iOS & Android", icon: "📱" },
            ]}
          />
        </Reveal>
      </section>

      {/* 3. PROBLEM */}
      <section id="problem" style={{ paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <VisualProblem
            title="Users were abandoning the app because finding loved ones took too long"
            elements={[
              {
                label: "7-Screen Flow",
                description: "Users had to navigate through multiple screens to find a single person",
                metric: "Search → Verify → Confirm",
              },
              {
                label: "Confusion",
                description: "Two alert types (EEW & CEN) weren't clearly distinguished visually",
                metric: "2 of 5 users confused",
              },
              {
                label: "Low Engagement",
                description: "Only 5% of users actively used the app during earthquakes",
                metric: "5% active rate",
              },
            ]}
            visual={<StepsComparison />}
          />
        </Reveal>
      </section>

      {/* 4. KEY INSIGHT */}
      <section id="insight" style={{ paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <KeyInsight
            quote="Users were trying to reassure loved ones, not explore earthquake data"
            evidence={[
              { label: "Interviews", value: "5 users" },
              { label: "Survey", value: "50+ responses" },
              { label: "Finding", value: "Family safety #2 priority" },
            ]}
          />
        </Reveal>
      </section>

      {/* 5. SOLUTION */}
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

        <DashboardWalkthrough
          dashboardImage={myshakeDashboard}
          annotation1={myshakeCarouselNote}
          annotation2={myshakePrepareNote}
          annotation3={myshakeNotificationsNote}
        />

        <section style={{ paddingTop: 60, paddingBottom: 60 }} className="section-reveal">
          <Reveal dramatic>
            <SectionHeading>Key Design Details</SectionHeading>
            <SkillRow items={["Micro-interactions", "Accessibility", "User Testing Refinements"]} />
          </Reveal>

          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              <div>
                <img src={myshakeAlert} alt="Alert notification screens showing EEW vs CEN differentiation" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }} />
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.textDark, marginBottom: 4 }}>
                  Alert Flows
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  EEW and CEN alerts visually distinct
                </div>
              </div>
              <div>
                <img src={myshakeDetails} alt="Detailed information screens with optimized content hierarchy" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md, marginBottom: 16 }} />
                <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.textDark, marginBottom: 4 }}>
                  Detail Screens
                </div>
                <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  Information hierarchy optimized for crisis moments
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </section>

      {/* 6. PROCESS */}
      <section id="process" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <VisualTimeline
            steps={[
              {
                phase: "Phase 1",
                title: "Research & Advocacy",
                insight: "The client said 'no user research.' We convinced them that 5 focused interviews would reveal the core problem without delaying the project.",
                decision: "Conducted targeted research despite initial resistance",
              },
              {
                phase: "Phase 2",
                title: "Information Architecture",
                insight: "Analysis showed users prioritized personal safety first, family safety second. The existing IA buried both under earthquake data.",
                decision: "Restructured IA with personal safety as the dashboard hero",
              },
              {
                phase: "Phase 3",
                title: "Visual Clarity",
                insight: "EEW (early warning) and CEN (post-earthquake) alerts confused 2 of 5 testers. Color and language mattered.",
                decision: "Created distinct visual treatment for each alert type",
              },
              {
                phase: "Phase 4",
                title: "Design System",
                insight: "Building components for high-stress moments requires obsessive attention to accessibility and performance.",
                decision: "Created first-ever MyShake design system with WCAG AA compliance",
              },
            ]}
          />
        </Reveal>
      </section>

      {/* 7. IMPACT */}
      <section id="impact" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <ImpactInfographic
            metrics={[
              {
                before: "7 screens",
                after: "3 screens",
                label: "Steps to find a loved one",
                icon: "📱",
              },
              {
                before: "5%",
                after: "45%+ ↑",
                label: "User engagement during earthquakes",
                icon: "📈",
              },
              {
                before: "None",
                after: "Complete",
                label: "Design system with WCAG AA",
                icon: "✓",
              },
              {
                before: "Multiple flows",
                after: "One pattern",
                label: "Alert type clarity",
                icon: "⚡",
              },
            ]}
          />
        </Reveal>
      </section>

      {/* 8. REFLECTION */}
      <section id="reflection" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <ReflectionCards
            points={[
              {
                title: "Research changes everything",
                content: "Pushing back on 'no research' to run 5 focused interviews was the single most important decision. The insights shaped every design choice that followed.",
              },
              {
                title: "Clarity under pressure",
                content: "During emergencies, every tap counts. We built MyShake's first design system to ensure every component worked for high-stress moments, not just normal use.",
              },
              {
                title: "Ship with intention",
                content: "Shipped with a team that believed in research-backed decisions and accessibility-first thinking. This became the foundation for all future MyShake updates.",
              },
            ]}
          />

          <Reveal>
            <div style={{ marginTop: 80 }}>
              <PullQuote>This is my proudest work.</PullQuote>
            </div>
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
        </Reveal>
      </section>

      {/* Next Case Study */}
      <section style={{ paddingTop: 96, paddingBottom: 100 }} className="section-reveal">
        <Reveal dramatic>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
            <div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, marginBottom: 12 }}>
                Next case study
              </div>
              <h2 style={{ fontFamily: tokens.font.sans, fontWeight: tokens.weight.medium, fontSize: tokens.text.lg, color: tokens.color.textDark, margin: 0 }}>
                NVIDIA AI UX Agent
              </h2>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, margin: "8px 0 0", maxWidth: 400 }}>
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
