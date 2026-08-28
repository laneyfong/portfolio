import type { FC } from "react";
import { useState, useEffect } from "react";
import { tokens } from "./tokens";
import {
  Reveal,
  Italic,
  TagPill,
  Callout,
  SnapshotBar,
  FeatureCard,
  PullQuote,
} from "./components/caseStudy/CaseStudyKit";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import PasswordProtection from "./components/PasswordProtection";

const SECTIONS: CaseSection[] = [
  { id: "intro", label: "Intro" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "solution", label: "Solution" },
  { id: "design", label: "Design" },
  { id: "roadmap", label: "Roadmap" },
  { id: "learnings", label: "Learnings" },
];

const TAGS = ["Product Design", "B2B SaaS", "Supply Chain", "AI/ML"];

const HIGHLIGHTS = [
  "Turned supply-chain risk visibility into actionable decision-making for procurement teams",
  "Designed a three-phase MVP approach (Monitor → Understand → Act) to address core workflow gaps",
  "Validated hypothesis through prototype testing that decision-making, not just risk scores, was the primary pain point",
];

const VeriSupplyCaseStudy: FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Check if password was previously entered in this session
  useEffect(() => {
    const sessionKey = "verisupply_unlocked";
    const wasUnlocked = sessionStorage.getItem(sessionKey);
    if (wasUnlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem("verisupply_unlocked", "true");
  };

  if (!isUnlocked) {
    return <PasswordProtection onUnlock={handleUnlock} />;
  }

  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS}>
      {/* Intro */}
      <section id="intro" style={{ paddingBottom: 96 }} className="section-reveal">
        <Reveal>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: tokens.color.muted }}>
              Supply-chain risk meets decision support.
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
            Turn complexity into <Italic>confident decisions</Italic>.
          </h1>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {TAGS.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>

          <Reveal>
            <SnapshotBar
              items={[
                { label: "Role", value: "Product Designer, Strategy" },
                { label: "Team", value: "2 Designers · 1 PM · 3 Engineers" },
                { label: "Timeline", value: "6 months" },
                { label: "Stage", value: "MVP → Design Partner Pilot" },
              ]}
            />
          </Reveal>

          <Reveal>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 480 }}>
              VeriSupply is a decision-support platform for procurement teams navigating supply-chain complexity. Rather than overwhelming users with risk scores, we designed a system that connects supplier data to business impact and recommends actionable decisions.
            </p>
          </Reveal>

          <Reveal>
            <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
              <FeatureCard title="Problem">
                Procurement leaders were drowning in disconnected risk signals with no way to understand business impact or prioritize action.
              </FeatureCard>
              <FeatureCard title="Insight">
                Risk visibility alone wasn't the problem—inability to make informed decisions with that information was.
              </FeatureCard>
              <FeatureCard title="Solution">
                A three-layer platform: Monitor supplier data, Understand impact and dependencies, Act with AI-assisted sourcing decisions.
              </FeatureCard>
            </div>
          </Reveal>
        </Reveal>
      </section>

      {/* Problem */}
      <section id="problem" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: tokens.color.ink,
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            The problem: Complexity without clarity
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 60 }}>
            <div style={{ borderLeft: `4px solid ${tokens.color.accent}`, paddingLeft: 24 }}>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                Risk scores without business context
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                A number on a screen doesn't say which products, customers, or revenue are actually exposed—or what to do next.
              </p>
            </div>

            <div style={{ borderLeft: `4px solid ${tokens.color.accent}`, paddingLeft: 24 }}>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                Visibility that stops at Tier 1
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Most disruptions start several tiers upstream, in suppliers your systems were never connected to in the first place.
              </p>
            </div>

            <div style={{ borderLeft: `4px solid ${tokens.color.accent}`, paddingLeft: 24 }}>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                Analysis that arrives too late
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                By the time a manual investigation is finished, the decision window that mattered has already closed.
              </p>
            </div>

            <div style={{ borderLeft: `4px solid ${tokens.color.accent}`, paddingLeft: 24 }}>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                Automation that replaces judgment
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                An answer with no evidence and no reasoning isn't something a procurement team can defend to their stakeholders.
              </p>
            </div>
          </div>
        </Reveal>

        <Callout>AI should inform the decision. It should never make it for you.</Callout>
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: tokens.color.ink,
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            Research: Reframing the problem
          </h2>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 600 }}>
            Initial hypothesis: Supply-chain risk visibility was the core problem. After interviews with procurement leaders, strategic sourcing managers, and operations teams, we discovered the real pain wasn't knowing about risk—it was knowing what to do about it.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ background: tokens.color.offWhite, padding: "40px", borderRadius: tokens.radius.md, marginBottom: 60 }}>
            <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 24px" }}>
              Key Research Findings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontFamily: tokens.font.serifItalic, fontSize: tokens.text.base, fontStyle: "italic", color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "Don't give me another place to look — tell me what matters."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, margin: 0 }}>
                  Strategic Sourcing / Procurement Lead
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.serifItalic, fontSize: tokens.text.base, fontStyle: "italic", color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "People don't have time to read. They need it condensed."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, margin: 0 }}>
                  Operations / Supply Chain Leader
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.serifItalic, fontSize: tokens.text.base, fontStyle: "italic", color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "AI summary is good, just need a good database to back it up."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, margin: 0 }}>
                  Operations / Supply Chain Leader
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 16px" }}>
            Patterns we identified:
          </h3>
          <ul style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0, paddingLeft: 20 }}>
            <li>Fragmented information across tools and systems</li>
            <li>Invisible supply-chain connections beyond Tier 1</li>
            <li>No clear way to assess business impact of supply issues</li>
            <li>Difficult supplier comparison and alternative sourcing</li>
            <li>Engineering changes create blind spots in the supply chain</li>
          </ul>
        </Reveal>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: tokens.color.ink,
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            The solution: Three layers of decision support
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginBottom: 60 }}>
            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                01 Monitor
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Continuously monitors suppliers, BOMs, market signals, and supply-chain data to surface relevant changes automatically.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                02 Understand
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Identifies supplier patterns, dependencies, and potential business impact so you can quickly understand what requires attention.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                03 Act
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Compares options, surfaces tradeoffs, and recommends next actions while showing how each decision could affect your supply chain.
              </p>
            </div>
          </div>
        </Reveal>

        <Callout>Decision support with evidence to increase confidence.</Callout>
      </section>

      {/* Design */}
      <section id="design" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: tokens.color.ink,
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            Design: Making complexity approachable
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                Dashboard
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Central hub showing AI analyst summary, priority list, business impact indicators, and supply-chain risk map. Designed to answer: "What matters most right now?"
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                Engineering Changes
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Monitors open changes and their sourcing impact. Designed to catch supply-chain blind spots before they become problems.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                Supplier Comparison
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                AI-generated comparison cards with rationale, alternative options, and decision tradeoffs. Designed to speed up sourcing decisions.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                Bill of Materials
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Connected view of part numbers, suppliers, quotes, and sourcing impact. Designed to show the full picture of product supply-chain exposure.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Roadmap */}
      <section id="roadmap" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: tokens.color.ink,
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            Product roadmap
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ background: tokens.color.offWhite, padding: "40px", borderRadius: tokens.radius.md, marginBottom: 60 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P0: Validation
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0 }}>
                  1–2 months
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  Prototype testing, interviews, validate core workflow, identify MVP
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P1: Definition
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0 }}>
                  0.5–1 month
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  Finalize MVP scope, requirements, success metrics, technical requirements
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P2: Design
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0 }}>
                  1–2 months
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  High-fidelity UX/UI, workflows, usability testing, design iteration
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P3: Build
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0 }}>
                  3–5 months
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  Build core product, data architecture, integrations, core workflows
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Learnings */}
      <section id="learnings" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: tokens.color.ink,
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            Key learnings
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                Asking the right questions
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                The initial hypothesis was too narrow. By asking "Why don't you use existing risk tools?" instead of assuming the answer, we discovered that risk visibility wasn't the real problem—decision-making was.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                Prototype testing and iteration
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Low-fidelity prototypes revealed workflow gaps that would have been expensive to discover in high-fidelity. Testing with actual procurement leaders caught critical assumptions before development.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 12px" }}>
                Validating hypothesis, not features
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                The MVP scope shifted from "comprehensive risk database" to "decision support with evidence." This reframing meant building less but building smarter, focused on the actual problem.
              </p>
            </div>
          </div>
        </Reveal>

        <div style={{ marginTop: 60 }}>
          <Reveal>
            <PullQuote>"AI should inform the decision. It should never make it for you."</PullQuote>
          </Reveal>
        </div>
      </section>
    </CaseStudyShell>
  );
};

export default VeriSupplyCaseStudy;
