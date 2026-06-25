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

        <Callout>Four themes came up again and again.</Callout>

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

        <div style={{ marginTop: 48 }}>
          <Callout>Say vs. Do: a real gap.</Callout>
          <Paragraph>
            What people told us in interviews didn't fully match what their day-to-day workflows actually showed —
            and that gap turned out to matter more than any single theme above.
          </Paragraph>
          <Reveal>
            <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FeatureCard title="What they said">
                They value usability, human judgement, and trustworthy AI insights.
              </FeatureCard>
              <FeatureCard title="What their workflows showed">
                In practice, teams lean on analytics, feedback buttons, Slack comments, and AI summaries — because
                running direct usability testing consistently is hard.
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

        <Paragraph>
          The say/do gap pointed at something more specific than "make the tool easier to use." We turned the four
          themes into two design questions worth building toward.
        </Paragraph>

        <div style={{ marginBottom: 40 }}>
          <Kicker>Insight 1 — Prioritization under engineering constraints</Kicker>
          <Paragraph>
            Engineers prioritize code-breaking bugs and delivery timelines over smaller usability issues, because
            development resources and approval workflows are limited.
          </Paragraph>
          <Callout>
            How might we design a prioritization system that helps teams rank usability issues alongside technical
            bugs, and identify which issues will have the highest user impact?
          </Callout>
        </div>

        <div>
          <Kicker>Insight 2 — Trust in AI depends on transparency</Kicker>
          <Paragraph>
            Engineers only trust AI-generated usability insights when the recommendation is transparent,
            explainable, and easy to verify.
          </Paragraph>
          <Callout>
            How might we design AI-supported insights that provide clear reasoning and traceable evidence, so
            engineers can confidently review and act on recommendations?
          </Callout>
        </div>
      </section>

      {/* Status */}
      <section id="status" style={{ paddingTop: 96, paddingBottom: 96, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Status</SectionHeading>
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
      <section id="reflection" style={{ paddingTop: 96, paddingBottom: 100, borderTop: `1px solid ${tokens.color.cardBorder}` }}>
        <Reveal dramatic>
          <SectionHeading>Reflection</SectionHeading>
        </Reveal>
        <Paragraph>Two things worth pulling out from the research phase so far:</Paragraph>
        <Bullets
          items={[
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.ink }}>Leading research, not just running it: </strong>
              I scoped the study and led a 4-person team across research, visual design, and dev — and when the
              survey's response rate showed it wouldn't produce usable data, we cut it rather than forcing it to a
              finish line.
            </>,
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.ink }}>The real finding isn't a UI problem: </strong>
              the gap between what engineers say they want (trustworthy AI, simple tools) and what they actually do
              (lean on Slack threads and feedback buttons) is a workflow-trust problem, not a screen to redesign —
              that reframing is what's shaping the next phase.
            </>,
          ]}
        />
      </section>
    </CaseStudyShell>
  );
};

export default NvidiaCaseStudy;
