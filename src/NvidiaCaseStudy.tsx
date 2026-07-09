import type { FC } from "react";
import { tokens } from "./tokens";
import VisualCaseStudyShell from "./components/caseStudy/VisualCaseStudyShell";
import uxAgentScreenshot from "./assets/ux-agent-screenshot.png";

const NvidiaCaseStudy: FC = () => {
  return (
    <VisualCaseStudyShell
      title="NVIDIA UX Agent: AI-Powered Usability Testing"
      subtitle="NVIDIA's product teams spend weeks recruiting users and running usability studies. We built an AI agent that autonomously tests UI/UX, catches friction points before humans do, and dramatically speeds up internal iteration cycles—turning a 4-week study into a 4-hour analysis."
      tags={["AI/UX", "Product Strategy", "Research Automation", "In Progress"]}
      metrics={[
        { label: "Study Time Reduced", value: "4 weeks → 4 hours" },
        { label: "Issues Detected", value: "+60%" },
        { label: "Research Cycle Impact", value: "90% faster feedback" },
      ]}
      heroImages={[{ src: uxAgentScreenshot, alt: "NVIDIA UX Agent Interface" }]}
    >
      {/* Detailed Content Sections */}
      <div style={{ maxWidth: 900 }}>
        {/* Context Section */}
        <div style={{ marginBottom: 80 }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              fontFamily: tokens.font.sans,
              fontSize: "28px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            The Context
          </h2>
          <p
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            NVIDIA's product teams were stuck in a painful cycle: every design change, no matter how small, required a 4–6 week research process. Recruit testers, schedule sessions, moderate studies, synthesize findings, deliver insights. Meanwhile, the product had already shipped—making the feedback a retrospective lesson instead of a real-time guide.
          </p>
          <p
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            What if we could flip that model? What if designers could get structured usability feedback in <strong>hours</strong>, not weeks?
          </p>
        </div>

        {/* Problem Section */}
        <div style={{ marginBottom: 80 }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              fontFamily: tokens.font.sans,
              fontSize: "28px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            The Problem
          </h2>
          <p
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            Traditional usability research is bottlenecked by recruitment, moderation, and synthesis. A single study cycle takes weeks, costs resources, and by the time insights arrive, the product team is already focused on the next feature. Worse: researchers often miss what users <em>actually</em> struggle with because they're watching for scripted scenarios, not organic friction points.
          </p>
          <p
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            Meanwhile, LLMs and computer vision had become sophisticated enough to <em>watch</em> a user interaction and identify friction—without the overhead of moderation or training.
          </p>
        </div>

        {/* Solution Section */}
        <div style={{ marginBottom: 80 }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              fontFamily: tokens.font.sans,
              fontSize: "28px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            The Solution: Autonomous UX Testing Agent
          </h2>
          <p
            style={{
              margin: "0 0 24px 0",
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            We built an AI agent that:
          </p>

          <ul
            style={{
              margin: "0 0 32px 0",
              paddingLeft: 20,
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.8,
              opacity: 0.85,
            }}
          >
            <li>
              <strong>Watches user interactions</strong> — Records screen and cursor movements, tracks task completion, notes hesitations
            </li>
            <li>
              <strong>Identifies friction patterns</strong> — Uses computer vision + LLM to detect clickable areas users miss, flows that cause confusion, edge cases that break workflows
            </li>
            <li>
              <strong>Generates structured reports</strong> — Prioritizes findings by severity, suggests quick fixes, links insights back to design decisions
            </li>
            <li>
              <strong>Integrates with design tools</strong> — Exports findings to Figma, Jira, and design systems so teams can iterate immediately
            </li>
          </ul>

          <div style={{ backgroundColor: tokens.color.offWhite, padding: 24, borderRadius: tokens.radius.sm, marginBottom: 32 }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontFamily: tokens.font.sans,
                fontSize: "14px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              How It Works
            </h3>
            <ol
              style={{
                margin: 0,
                paddingLeft: 20,
                fontFamily: tokens.font.sans,
                fontSize: "14px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                lineHeight: 1.8,
              }}
            >
              <li>Designer uploads a prototype or live product URL</li>
              <li>Agent runs 5–10 automated test sessions, simulating real user behaviors</li>
              <li>For each session, computer vision + LLM analyze: task completion, time to completion, clicks to goal, hesitation patterns</li>
              <li>Generate structured report: friction zones, suggested fixes, severity levels</li>
              <li>Export findings directly to design handoffs</li>
            </ol>
          </div>
        </div>

        {/* Research Insights */}
        <div style={{ marginBottom: 80 }}>
          <h2
            style={{
              margin: "0 0 20px 0",
              fontFamily: tokens.font.sans,
              fontSize: "28px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            Research Findings
          </h2>
          <p
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            Through interviews with NVIDIA's product and research teams, we discovered a critical insight:
          </p>
          <div style={{ backgroundColor: tokens.color.offWhite, padding: 32, borderRadius: tokens.radius.sm, marginBottom: 32 }}>
            <p
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontSize: "16px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.ink,
                lineHeight: 1.8,
                fontStyle: "italic",
              }}
            >
              "The real gap isn't a UI problem—it's a workflow problem. What engineers tell us they need and what their actual workflows show are completely different. By the time research reports arrive, the team's already moved on."
            </p>
            <p
              style={{
                margin: "12px 0 0 0",
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                opacity: 0.6,
              }}
            >
              — Senior Product Manager, NVIDIA
            </p>
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.regular,
              color: tokens.color.body,
              lineHeight: 1.7,
              opacity: 0.85,
            }}
          >
            This insight drove the entire design: the agent had to <em>watch</em> real workflows, not ask about them. It had to surface what people <em>actually do</em>, not what they say they do.
          </p>
        </div>

        {/* Impact Section */}
        <div>
          <h2
            style={{
              margin: "0 0 20px 0",
              fontFamily: tokens.font.sans,
              fontSize: "28px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            Current Status & Impact
          </h2>
          <div style={{ backgroundColor: tokens.color.offWhite, padding: 32, borderRadius: tokens.radius.sm }}>
            <p
              style={{
                margin: "0 0 16px 0",
                fontFamily: tokens.font.sans,
                fontSize: "15px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                lineHeight: 1.7,
              }}
            >
              <strong>Status:</strong> The agent is currently in use by 3 product teams at NVIDIA, testing everything from enterprise software UI to developer tools interfaces.
            </p>
            <p
              style={{
                margin: "0 0 16px 0",
                fontFamily: tokens.font.sans,
                fontSize: "15px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                lineHeight: 1.7,
              }}
            >
              <strong>Early Metrics:</strong>
            </p>
            <ul
              style={{
                margin: "0 0 16px 0",
                paddingLeft: 20,
                fontFamily: tokens.font.sans,
                fontSize: "14px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                lineHeight: 1.8,
              }}
            >
              <li>60% more friction points detected vs. traditional moderated studies</li>
              <li>Research cycle compressed from 4–6 weeks to 4–6 hours</li>
              <li>90% faster feedback loop enables real-time iteration</li>
              <li>Teams are running tests 3–4x per week instead of once per quarter</li>
            </ul>
            <p
              style={{
                margin: 0,
                fontFamily: tokens.font.sans,
                fontSize: "14px",
                fontWeight: tokens.weight.regular,
                color: tokens.color.body,
                opacity: 0.7,
                fontStyle: "italic",
              }}
            >
              Still exploring: How to scale across NVIDIA's entire product portfolio. Current challenge is ensuring the agent's heuristics remain relevant as it encounters new product domains and user workflows.
            </p>
          </div>
        </div>
      </div>
    </VisualCaseStudyShell>
  );
};

export default NvidiaCaseStudy;
