import type { FC } from "react";
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
  Bullets,
  SearchIcon,
  ChatIcon,
  FlaskIcon,
  CheckIcon,
  ClockIcon,
  UserJourney,
  ProcessFlow,
} from "./components/caseStudy/CaseStudyKit";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import uxAgentScreenshot from "./assets/ux-agent-screenshot.png";

const SECTIONS: CaseSection[] = [
  { id: "intro", label: "Intro" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "status", label: "Status" },
  { id: "reflection", label: "Reflection" },
];

const TAGS = ["UX Research", "AI/UX", "Product Strategy", "In Progress"];

// Restates facts already established elsewhere on the page — not new claims, just a
// scannable summary for the sidebar panel.
const HIGHLIGHTS = [
  "Led a 4-person research team investigating trust in AI-generated usability insights.",
  "Cut a planned survey mid-study when low response rates meant it wouldn't yield usable data.",
  "Found the real gap isn't a UI problem: what engineers say they want and what their workflows show are different.",
];

// Quoted lines are reproduced verbatim from interview transcripts, attributed to the
// anonymized participant codes used in the research report (P1/P2/P3) — not paraphrased.
const QuoteLine: FC<{ children: string; attribution: string }> = ({ children, attribution }) => (
  <p
    style={{
      margin: "10px 0 0",
      fontFamily: tokens.font.serifItalic,
      fontStyle: "italic",
      fontWeight: 400,
      fontSize: tokens.text.base,
      lineHeight: tokens.leading.normal,
      color: tokens.color.ink,
    }}
  >
    “{children}” <span style={{ fontFamily: tokens.font.sans, fontStyle: "normal", fontSize: tokens.text.sm, color: tokens.color.muted }}>— {attribution}</span>
  </p>
);

const StagePill: FC<{ label: string; state: "done" | "active" | "next" }> = ({ label, state }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 14px",
      borderRadius: tokens.radius.full,
      border: `1px solid ${state === "active" ? tokens.color.ink : tokens.color.cardBorder}`,
      background: state === "active" ? tokens.color.ink : tokens.color.offWhite,
      color: state === "active" ? tokens.color.white : tokens.color.body,
      fontFamily: tokens.font.sans,
      fontSize: tokens.text.sm,
      fontWeight: state === "active" ? tokens.weight.medium : tokens.weight.regular,
      whiteSpace: "nowrap",
    }}
  >
    {state === "done" ? <CheckIcon /> : state === "next" ? <ClockIcon /> : null}
    {label}
  </span>
);

const NvidiaCaseStudy: FC = () => {
  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS}>
      {/* Intro */}
      <section id="intro" style={{ paddingBottom: 96 }}>
        <Kicker>Engineering-heavy teams, late-stage discovery.</Kicker>
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
          Designing an AI UX agent that <Italic>engineers actually trust</Italic>.
        </h1>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {TAGS.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>

        <Reveal>
          <SnapshotBar
            items={[
              { label: "Role", value: "PM / Designer" },
              { label: "Team", value: "4 collaborators · Research, Visual Design, Dev" },
              { label: "Timeline", value: "Ongoing" },
              { label: "Status", value: "Research & synthesis complete" },
            ]}
          />
        </Reveal>

        <Reveal delay={100}>
          <img
            src={uxAgentScreenshot}
            alt="Early concept dashboard for the AI UX agent, showing a usability score and flagged findings"
            className="case-shot"
            style={{ width: "100%", display: "block", borderRadius: tokens.radius.md, boxShadow: tokens.shadow.card, marginBottom: 40 }}
          />
        </Reveal>

        <Paragraph>
          Engineering-heavy teams often lack dedicated UX resources, which means usability issues tend to surface
          late — after something has already shipped. This project investigates the trust, accuracy, and workflow
          integration of AI-generated findings, to see whether automated insights can be made actionable enough for
          practitioners to act on early.
        </Paragraph>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <FeatureCard title="Problem">
              Engineering-heavy teams lack dedicated UX resources, so usability issues are often discovered
              late-stage — after a feature has already shipped.
            </FeatureCard>
            <FeatureCard title="Approach">
              An AI UX agent that simulates user behavior, providing automated pre-screening before features are
              implemented.
            </FeatureCard>
            <FeatureCard title="Research Question">
              How can AI-generated insights support early evaluation, and what makes findings actionable and
              trustworthy for practitioners?
            </FeatureCard>
          </div>
        </Reveal>
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Research</SectionHeading>
          <SkillRow items={["Semi-structured Interviews", "Survey Design", "Secondary Research"]} />
        </Reveal>

        <Paragraph>
          We talked with a mix of NVIDIA engineers and designers, plus external designers, to get a view that wasn't
          filtered entirely through one company's internal tooling.
        </Paragraph>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            <IconCard
              icon={<ChatIcon />}
              title="Semi-structured Interviews"
              items={["NVIDIA engineers & designers", "External designers"]}
            />
            <IconCard
              icon={<FlaskIcon />}
              title="Survey"
              items={["Built to gather quantitative data", "Scrapped — response yield too low"]}
            />
            <IconCard icon={<SearchIcon />} title="Secondary Research" items={["Analysis of Reddit threads"]} />
          </div>
        </Reveal>

        <Callout>Key research themes from engineer interviews.</Callout>
        <Paragraph>
          Four critical patterns emerged that would shape the design of an AI UX agent that engineers would actually trust and use.
        </Paragraph>

        <Reveal>
          <UserJourney
            stages={[
              {
                label: "Trust & Transparency",
                description: "Engineers need to verify AI findings and understand where accountability sits",
                color: "#FF6B6B",
              },
              {
                label: "Data Collection Gap",
                description: "Teams lack structured feedback — relying on Slack and feedback buttons instead",
                color: "#FFA500",
              },
              {
                label: "Engineering Priorities",
                description: "Code-breaking bugs and timelines crowd out usability fixes",
                color: "#FFD93D",
              },
              {
                label: "Simple Tools Win",
                description: "Engineers want zero onboarding — the tool must replace manual work seamlessly",
                color: "#6BCB77",
              },
            ]}
          />
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FindingRow method="Trust & Transparency in AI Systems">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                  Engineers want to be able to verify an AI finding themselves, and they're unclear on where
                  accountability sits when an automated insight turns out to be wrong.
                </p>
                <QuoteLine attribution="P2">You should be able to, like, track down and reach the same conclusion yourself.</QuoteLine>
                <QuoteLine attribution="P2">Where does the accountability lie when things fail?</QuoteLine>
              </div>
            </FindingRow>
            <FindingRow method="Difficulty Collecting Useful User Data">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                  Internal feedback loops are thin and inconsistent — a lot of what teams know about usability comes
                  from Slack messages after launch, not structured testing.
                </p>
                <QuoteLine attribution="P1">Feedback for internal tools comes from Slack post launch.</QuoteLine>
                <QuoteLine attribution="P2">Everything that we develop has tiny feedback buttons.</QuoteLine>
              </div>
            </FindingRow>
            <FindingRow method="Engineering Priorities Driven by Timelines & Severity">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                  Code-breaking bugs and approval workflows (a +1 then +2 review) crowd out usability fixes, which
                  have to clear a "worth the time" bar to get prioritized at all.
                </p>
                <QuoteLine attribution="P2">Main code breaking bugs are the priority.</QuoteLine>
                <QuoteLine attribution="P2">The usability fixes need to be worth the time it takes to fix them.</QuoteLine>
              </div>
            </FindingRow>
            <FindingRow method="Engineers Prefer Simple, Actionable Tools">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                  No appetite for a learning curve — a tool earns its place by doing something engineers would
                  otherwise have to do manually, with zero onboarding.
                </p>
                <QuoteLine attribution="P2">Just log in and not have to train myself on how to use it.</QuoteLine>
                <QuoteLine attribution="P1">The point of the tool was to be able to do something that you would do manually.</QuoteLine>
              </div>
            </FindingRow>
          </div>
        </Reveal>

        <div style={{ marginTop: 40 }}>
          <Callout>The Real Insight: Say vs. Do.</Callout>
          <Reveal>
            <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FeatureCard title="What they said">
                They value usability, human judgement, and trustworthy AI insights in a dedicated tool.
              </FeatureCard>
              <FeatureCard title="What their workflows showed">
                In reality, teams rely on analytics dashboards, feedback buttons, Slack threads, and quick AI summaries to make decisions.
              </FeatureCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Synthesis */}
      <section id="synthesis" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Synthesis</SectionHeading>
          <SkillRow items={["Insight Framing", "How Might We"]} />
        </Reveal>

        <div style={{ marginBottom: 40 }}>
          <Kicker>Design Question 1: Prioritization</Kicker>
          <Callout>
            How might we design a system that helps teams rank usability issues alongside technical bugs and see which will have the highest user impact?
          </Callout>

          <Reveal>
            <ProcessFlow
              direction="vertical"
              steps={[
                {
                  title: "Code bug identified",
                  description: "Breaking bug is flagged during code review",
                  color: "#FF6B6B",
                  icon: "1",
                },
                {
                  title: "Priority assigned",
                  description: "Code bugs immediately get priority over usability issues",
                  color: "#FF8C42",
                  icon: "2",
                },
                {
                  title: "Usability issue surfaces",
                  description: "Teams discover UI problem post-launch via Slack feedback",
                  color: "#FFA500",
                  icon: "3",
                },
                {
                  title: "Assessment",
                  description: "Engineers ask: 'Is this worth the time to fix?' No clear answer",
                  color: "#FFD93D",
                  icon: "4",
                },
                {
                  title: "Deprioritized",
                  description: "Usability fix gets delayed indefinitely without prioritization framework",
                  color: "#A8A8A8",
                  icon: "5",
                },
              ]}
            />
          </Reveal>
        </div>

        <div>
          <Kicker>Design Question 2: Trust Through Transparency</Kicker>
          <Callout>
            How might we design AI-supported insights that provide clear reasoning so engineers can confidently act on recommendations?
          </Callout>

          <Reveal>
            <ProcessFlow
              steps={[
                {
                  title: "AI Analysis",
                  description: "Tool simulates user behavior and identifies usability issues",
                  color: "#4D96FF",
                  icon: "1",
                },
                {
                  title: "Explain Findings",
                  description: "Shows clear reasoning and evidence behind each recommendation",
                  color: "#6BCB77",
                  icon: "2",
                },
                {
                  title: "Enable Verification",
                  description: "Engineers can trace the finding back to see the reasoning",
                  color: "#FFB84D",
                  icon: "3",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Status */}
      <section id="status" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Status</SectionHeading>
        </Reveal>

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
              🎬
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
              Design Concept Video
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
              Early-stage concept showing how an AI UX agent could help engineers prioritize and validate findings
            </p>
          </div>
        </Reveal>

        <Callout>This case study is a work in progress.</Callout>
        <Paragraph>
          What's above reflects where the project actually stands today: research and synthesis are done, and
          they're driving two clear design questions. The design solution itself hasn't been built yet.
        </Paragraph>

        <Reveal>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            <StagePill label="Research" state="done" />
            <StagePill label="Synthesis" state="done" />
            <StagePill label="Design exploration" state="active" />
            <StagePill label="Prototyping" state="next" />
            <StagePill label="Vibe-coding" state="next" />
          </div>
        </Reveal>

        <Paragraph>
          <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.ink }}>Next phase: </strong>
          continuing with design, prototypes, and vibe-coding to turn the two How-Might-We questions above into an
          actual interface — then testing whether engineers trust it enough to act on what it tells them.
        </Paragraph>
      </section>

      {/* Reflection */}
      <section id="reflection" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Reflection</SectionHeading>
        </Reveal>
        <Paragraph>Two things worth pulling out from the research phase so far:</Paragraph>
        <Bullets
          items={[
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>Leading research, not just running it: </strong>
              I scoped the study and led a 4-person team across research, visual design, and dev — and when the
              survey's response rate showed it wouldn't produce usable data, we cut it rather than forcing it to a
              finish line.
            </>,
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>The real finding isn't a UI problem: </strong>
              the gap between what engineers say they want (trustworthy AI, simple tools) and what they actually do
              (lean on Slack threads and feedback buttons) is a workflow-trust problem, not a screen to redesign —
              that reframing is what's shaping the next phase.
            </>,
          ]}
        />
      </section>

      {/* Back to Portfolio */}
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
                Explore more
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
                Back to Portfolio
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
                View all case studies and projects.
              </p>
            </div>
            <a
              href="/"
              aria-label="Back to portfolio"
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </section>
    </CaseStudyShell>
  );
};

export default NvidiaCaseStudy;
