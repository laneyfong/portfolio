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
  SearchIcon,
  ChatIcon,
  FlaskIcon,
  CheckIcon,
  ClockIcon,
  ProcessFlow,
} from "./components/caseStudy/CaseStudyKit";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import ResearchThemes from "./components/caseStudy/ResearchThemes";
import DesignChallenges from "./components/caseStudy/DesignChallenges";
import nvidiaLogo from "./assets/nvidia-logo.webp";
import nvidiaPrototype from "./assets/nvidia-prototype.mp4";

const SECTIONS: CaseSection[] = [
  { id: "intro", label: "Intro" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "iterations", label: "Iterations" },
  { id: "status", label: "Status" },
  { id: "reflection", label: "Reflection" },
];

const TAGS = ["UX Research", "AI/UX", "Product Strategy", "In Progress"];

// Restates facts already established elsewhere on the page — not new claims, just a
// scannable summary for the sidebar panel.
const HIGHLIGHTS = [
  "Lead product designer on a 5-person capstone team, with 7 interviews across ML engineering, QA, and UX.",
  "Cut a survey that drew zero responses and pivoted to Reddit threads and a competitive analysis.",
  "Found a say-vs-do gap: engineers value trustworthy AI, but their workflows run on Slack and feedback buttons.",
  "Changed the design four times as engineer needs and sponsor goals pulled in different directions.",
];

// Quoted lines are reproduced verbatim from interview transcripts, attributed to the
// anonymized participant codes used in the research report (P1/P2/P3) — not paraphrased.
const QuoteLine: FC<{ children: string; attribution: string }> = ({ children, attribution }) => (
  <p
    style={{
      margin: "10px 0 0",
      fontFamily: tokens.font.sans,
      fontWeight: 500,
      fontSize: tokens.text.base,
      lineHeight: tokens.leading.normal,
      color: "var(--text-dark)",
    }}
  >
    “{children}” <span style={{ fontFamily: tokens.font.sans, fontStyle: "normal", fontSize: tokens.text.sm, color: "var(--text-muted)" }}>— {attribution}</span>
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
      background: state === "active" ? "var(--text-dark)" : "var(--surface-light)",
      color: state === "active" ? "var(--bg-primary)" : "var(--text-secondary)",
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
      <section id="intro" style={{ paddingBottom: 96 }} className="section-reveal">
        <Kicker>Engineering-heavy teams, late-stage discovery.</Kicker>
        <h1
          style={{
            fontFamily: tokens.font.sans,
            fontWeight: tokens.weight.medium,
            fontSize: tokens.text.xl,
            color: "var(--text-dark)",
            lineHeight: tokens.leading.snug,
            margin: "0 0 20px",
            maxWidth: 440,
          }}
        >
          Designing an AI UX agent that <Italic>engineers actually trust</Italic>.
        </h1>

        <div className="case-study-tags" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {TAGS.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>

        <Reveal>
          <SnapshotBar
            items={[
              { label: "Role", value: "Lead Product Designer" },
              { label: "Team", value: "5 collaborators · Research, Visual Design, UX Dev" },
              { label: "Timeline", value: "Spring – Fall 2026" },
              { label: "Status", value: "Research, synthesis & engineer testing complete · Working product" },
            ]}
          />
        </Reveal>

        <Reveal delay={100}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 20px",
              borderRadius: tokens.radius.md,
              backgroundColor: "var(--surface-light)",
              marginBottom: 40,
            }}
          >
            <img
              src={nvidiaLogo}
              alt="NVIDIA company logo"
              style={{
                maxWidth: "280px",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <FeatureCard title="The Gap">
              Usability issues surface late—after features ship, through Slack and user complaints.
            </FeatureCard>
            <FeatureCard title="The Idea">
              An AI UX agent that tests staging builds before release and hands engineers evidence they can verify.
            </FeatureCard>
            <FeatureCard title="The Challenge">
              Make AI findings trustworthy enough that engineers act on them, with minimal setup.
            </FeatureCard>
          </div>
        </Reveal>

        <Paragraph>
          Our UCSC HCI Capstone team partnered with NVIDIA mentor Mamta Kumari on a tool that works like an automated
          usability test suite. It runs persona-driven agents against a staging URL, catches friction before release,
          and gives each finding screenshots, step-by-step logs, a confidence rating, and a recommended fix that
          engineers can export to Jira.
        </Paragraph>

        <div style={{ marginTop: 48 }}>
          <Kicker>How it works</Kicker>
          <Reveal>
            <ProcessFlow
              steps={[
                {
                  title: "Stage the build",
                  description: "A web tool build is deployed to a staging URL",
                  color: "#4D96FF",
                  icon: "1",
                },
                {
                  title: "Run agents",
                  description: "Persona agents execute test intents against the build",
                  color: "#6BCB77",
                  icon: "2",
                },
                {
                  title: "Review evidence",
                  description: "Annotated screenshots and log traces explain each finding",
                  color: "#FFB84D",
                  icon: "3",
                },
                {
                  title: "Fix & ship",
                  description: "Findings export to Jira with recommended fixes",
                  color: "#A78BFA",
                  icon: "4",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 96, paddingBottom: 96 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>I started with deep user research to understand AI UX challenges</SectionHeading>
          <SkillRow items={["Semi-structured Interviews", "Survey Design", "Competitive Analysis", "Secondary Research"]} />
        </Reveal>

        <Paragraph>
          In the spring discovery phase, we set out to map how internal NVIDIA teams currently evaluate usability, and
          what would make a developer trust AI-generated evaluation insights. We interviewed 7 people across machine
          learning engineering, QA, and UX design, and compared market alternatives like UXIA, Synthetic Users, and
          Outset.ai.
        </Paragraph>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 80 }}>
            <IconCard
              icon={<ChatIcon />}
              title="Semi-structured Interviews"
              items={["7 interviews", "ML engineering, QA, and UX design"]}
            />
            <IconCard
              icon={<FlaskIcon />}
              title="Survey"
              items={["Piloted with hardware engineers", "Scrapped — zero responses"]}
            />
            <IconCard
              icon={<SearchIcon />}
              title="Secondary Research"
              items={["Reddit threads on AI evaluation tools", "Competitive matrix of existing products"]}
            />
          </div>
        </Reveal>

        <Paragraph>
          The survey was the first setback. Scheduling delays across internal Slack channels meant no one responded,
          so we scrapped it and leaned on qualitative interviews and community discussions instead.
        </Paragraph>

        <div style={{ marginBottom: 48 }}>
          <Callout>Key research themes from engineer interviews.</Callout>
        </div>
        <Reveal>
          <ResearchThemes />
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <FindingRow method="Trust & Transparency in AI Systems">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", lineHeight: tokens.leading.normal }}>
                  Engineers are skeptical of black-box summaries and hallucinated bugs. Every finding needs hard proof,
                  like screenshots, DOM logs, and reproduction steps, before they'll act on it.
                </p>
                <QuoteLine attribution="P2">You should be able to, like, track down and reach the same conclusion yourself.</QuoteLine>
                <QuoteLine attribution="P2">Where does the accountability lie when things fail?</QuoteLine>
              </div>
            </FindingRow>
            <FindingRow method="Feedback Arrives After Launch">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", lineHeight: tokens.leading.normal }}>
                  Internal feedback loops are thin and reactive. Most usability knowledge comes from Slack messages
                  after launch, not structured testing. Engineers want to catch issues on staging, before shipping.
                </p>
                <QuoteLine attribution="P1">Feedback for internal tools comes from Slack post launch.</QuoteLine>
                <QuoteLine attribution="P2">Everything that we develop has tiny feedback buttons.</QuoteLine>
              </div>
            </FindingRow>
            <FindingRow method="Engineering Priorities Follow Severity">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", lineHeight: tokens.leading.normal }}>
                  Code-breaking bugs and approval workflows crowd out usability fixes. To get prioritized, a usability
                  issue has to be sorted by severity, from P0 (critical) to P3 (low), and clear a "worth the time" bar.
                </p>
                <QuoteLine attribution="P2">Main code breaking bugs are the priority.</QuoteLine>
                <QuoteLine attribution="P2">The usability fixes need to be worth the time it takes to fix them.</QuoteLine>
              </div>
            </FindingRow>
            <FindingRow method="Engineers Prefer Simple, Actionable Tools">
              <div>
                <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", lineHeight: tokens.leading.normal }}>
                  Teams already juggle bloated toolstacks, so a new tool has to earn its place. It needs near-zero setup,
                  sensible defaults, and to do something engineers would otherwise do by hand.
                </p>
                <QuoteLine attribution="P2">Just log in and not have to train myself on how to use it.</QuoteLine>
                <QuoteLine attribution="P1">The point of the tool was to be able to do something that you would do manually.</QuoteLine>
              </div>
            </FindingRow>
          </div>
        </Reveal>

        <div style={{ marginTop: 60, marginBottom: 80 }}>
          <Callout>The Real Insight: Say vs. Do.</Callout>
          <Paragraph>
            What engineers told us in interviews didn't fully align with their actual workflows — and this gap revealed the true design opportunity.
          </Paragraph>
          <Reveal>
            <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <FeatureCard title="What they said">
                Value usability, human judgement, and trustworthy AI insights.
              </FeatureCard>
              <FeatureCard title="What their workflows showed">
                Rely on dashboards, feedback, Slack, and quick summaries.
              </FeatureCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Synthesis */}
      <section id="synthesis" style={{ paddingTop: 96, paddingBottom: 96 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>I synthesized insights into a collaborative AI design system</SectionHeading>
          <SkillRow items={["Affinity Mapping", "Insight Framing", "How Might We"]} />
        </Reveal>

        <Paragraph>
          Affinity mapping showed that roles overlapped more than our personas assumed. ML engineers were writing code
          and also running QA and judging UX. So we stopped designing for job titles and designed for the
          pre-launch staging review, where those roles converge.
        </Paragraph>

        <div style={{ marginBottom: 60 }}>
          <Callout>The core challenge: Say/Do Gap</Callout>
        </div>

        <Reveal>
          <div style={{ marginBottom: 100 }}>
            <DesignChallenges />
          </div>
        </Reveal>

        <div style={{ marginBottom: 100 }}>
          <Kicker>Design Question 1: Prioritization</Kicker>
          <Callout>
            How might we design a system that helps teams rank usability issues alongside technical bugs and see which will have the highest user impact?
          </Callout>
          <Paragraph>
            Today, code-breaking bugs are prioritized automatically, while usability issues get deprioritized when timelines are tight. An AI UX agent could help teams see the full picture.
          </Paragraph>

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

        <div style={{ marginBottom: 100 }}>
          <Kicker>Design Question 2: Trust Through Transparency</Kicker>
          <Callout>
            How might we design AI-supported insights that provide clear reasoning so engineers can confidently act on recommendations?
          </Callout>
          <Paragraph>
            Engineers distrust black-box AI. An effective UX agent needs to show its work and let engineers verify findings themselves.
          </Paragraph>

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

        <div>
          <Kicker>Four pillars of trust</Kicker>
          <Paragraph>
            Those two questions became three product commitments. Every answer has to be checkable.
          </Paragraph>
          <Reveal>
            <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              <FeatureCard title="Annotated screenshots">
                Each issue links to a high-resolution screenshot that highlights the visual problem.
              </FeatureCard>
              <FeatureCard title="Reproducible traces">
                Step-by-step logs show exactly how the agent reached each finding, so engineers can retrace it.
              </FeatureCard>
              <FeatureCard title="Recommendations & Jira">
                Findings come with expected vs. actual behavior, a recommended fix, and a one-click export to the sprint backlog.
              </FeatureCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Iterations */}
      <section id="iterations" style={{ paddingTop: 96, paddingBottom: 96 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Four pivots shaped the design as we learned what engineers needed</SectionHeading>
          <SkillRow items={["Design Critique", "Iteration", "Prototyping"]} />
        </Reveal>

        <Paragraph>
          The design didn't arrive fully formed. Each pivot came from a real constraint: usability testing with
          engineers, weekly syncs with our sponsor, and peer critique of our poster drafts.
        </Paragraph>

        <Reveal>
          <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <FeatureCard title="Pivot 1 · From roles to workflows">
              Role personas (ML engineer, QA, UX) overlapped too much to design around. We built the system around the
              pre-launch staging workflow instead.
            </FeatureCard>
            <FeatureCard title="Pivot 2 · Per-agent token budgets">
              A single global budget hid which agent used what. Each agent now gets its own cap, with a "May stop early"
              warning when a cap falls below its recommended budget. When an agent hits its limit, it halts and returns
              a partial coverage report instead of failing silently.
            </FeatureCard>
            <FeatureCard title="Pivot 3 · Chat-based agent">
              Engineers wanted control over setup and custom intents. Our sponsor wanted one-click, minimal effort. The
              answer was one conversational interface backed by a live execution engine: engineers prompt the agent,
              review its test strategy in conversation, and watch runs as they happen.
            </FeatureCard>
            <FeatureCard title="Pivot 4 · Cleaner, standardized findings">
              Peer critique flagged dense text, a confusing reading order, small screenshots, and mixed naming like
              "P0 Blocker" next to "High/Medium." We moved to compact summary bars, removed redundant cards, and
              standardized on P0–P3.
            </FeatureCard>
          </div>
        </Reveal>

        <Paragraph>
          The thread through all four: when engineers and sponsors wanted different things, we went back to the
          workflow and asked what would earn trust.
        </Paragraph>
      </section>

      {/* Status */}
      <section id="status" style={{ paddingTop: 96, paddingBottom: 96 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>The redesign builds trust between engineers and AI agents</SectionHeading>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 80, marginBottom: 80, borderRadius: 20, overflow: "hidden", backgroundColor: "var(--bg-secondary)", display: "flex", justifyContent: "center", alignItems: "center", maxHeight: "70vh" }}>
            <video
              src={nvidiaPrototype}
              style={{
                width: "auto",
                height: "100%",
                maxWidth: "100%",
                objectFit: "contain",
                display: "block",
              }}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </div>
        </Reveal>

        <Callout>Research, synthesis, and engineer testing are complete. The product is built and working.</Callout>
        <Paragraph>
          The chat-based agent is a working product, with frontend and backend built and running. We tested it with
          engineers at NVIDIA, and recent backend fixes made duplicate severity ratings deduplicate correctly.
        </Paragraph>

        <Reveal>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            <StagePill label="Research" state="done" />
            <StagePill label="Synthesis" state="done" />
            <StagePill label="Prototyping" state="done" />
            <StagePill label="Engineer testing" state="done" />
            <StagePill label="Iteration" state="active" />
          </div>
        </Reveal>

        <Paragraph>
          <strong style={{ fontWeight: tokens.weight.medium, color: "var(--text-dark)" }}>Next phase: </strong>
          iterate on the product based on what engineers told us in testing, and measure it against the success targets below.
        </Paragraph>

        <div style={{ marginTop: 80 }}>
          <Kicker>Success targets</Kicker>
          <Paragraph>
            These are the thresholds we set for judging the tool. They are targets; the measured results are still to come.
          </Paragraph>
          <Reveal>
            <div className="case-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <FeatureCard title="Early detection · >80%">
                Usability issues caught on staging, before features reach production channels.
              </FeatureCard>
              <FeatureCard title="System trust · >80%">
                Engineers' confidence in findings, built on screenshots, log traces, and confidence ratings.
              </FeatureCard>
              <FeatureCard title="Actionability · >80%">
                Engineers rate the recommendations as useful, with expected vs. actual behavior for each.
              </FeatureCard>
              <FeatureCard title="Efficiency · >80%">
                Perceived cut in manual effort, without waiting days to recruit users for basic pre-screening.
              </FeatureCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reflection */}
      <section id="reflection" style={{ paddingTop: 96, paddingBottom: 96 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>This project taught me about designing for technical complexity and trust</SectionHeading>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: "var(--text-secondary)", lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 440 }}>
            The biggest lesson was knowing when to change course. We cut a survey that couldn't reach enough people,
            then changed the design four times as engineers and our sponsor pulled in different directions.
          </p>
          <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: "var(--text-secondary)", lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 440 }}>
            The real breakthrough was the gap between what engineers want (trustworthy AI, simple tools) and what they
            actually do (rely on Slack threads and feedback buttons). That's a workflow-trust problem, not a screen
            redesign.
          </p>
          <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: "var(--text-secondary)", lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 440 }}>
            I'm proud of what our team built together. Thank you to the research, design, and engineering team, and to
            our NVIDIA mentor, for believing that understanding engineers deeply would change how we build AI they can trust.
          </p>
        </Reveal>
      </section>

      {/* Back to Portfolio */}
      <section style={{ paddingTop: 96, paddingBottom: 100 }}>
        <Reveal dramatic>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
            <div>
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.sm,
                  fontWeight: tokens.weight.medium,
                  color: "var(--text-muted)",
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
                  color: "var(--text-dark)",
                  margin: 0,
                }}
              >
                Back to Portfolio
              </h2>
              <p
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.base,
                  color: "var(--text-secondary)",
                  margin: "8px 0 0",
                  maxWidth: 400,
                }}
              >
                View all case studies and projects.
              </p>
            </div>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--text-dark)",
                color: "var(--bg-primary)",
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
