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
import verisupplyThumbnail from "./assets/verisupply-thumbnail.png";

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
            <div style={{ marginBottom: 48, maxWidth: 600 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 20 }}>
                <strong>The context:</strong> Procurement teams at enterprises manage thousands of suppliers and complex bill-of-materials. When supply disruptions happen, they're drowning in risk alerts but paralyzed—unable to connect the data to what actually matters for their business.
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 20 }}>
                <strong>What makes this different:</strong> Instead of building another risk-scoring tool (which already existed), we discovered through research that the real bottleneck wasn't visibility—it was decision-making. Procurement leaders had the data but couldn't act on it confidently.
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
                <strong>Our solution:</strong> A decision-support platform that reframes how teams use supply-chain data. Rather than overwhelming with risk scores, we built a system that connects supplier data to business impact and recommends next actions—with evidence to back them up.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginBottom: 60, borderRadius: 20, overflow: "hidden" }}>
              <img
                src={verisupplyThumbnail}
                alt="VeriSupply dashboard interface"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32, marginBottom: 60 }}>
            {/* Risk Scores */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16 }}>
                <circle cx="40" cy="40" r="35" fill="none" stroke={tokens.color.muted} strokeWidth="2" opacity="0.3" />
                <text x="40" y="45" fontSize="32" fontWeight="bold" textAnchor="middle" fill={tokens.color.ink}>
                  84
                </text>
                <path d="M 40 65 L 40 75" stroke={tokens.color.muted} strokeWidth="2" />
                <path d="M 30 70 L 50 70" stroke={tokens.color.muted} strokeWidth="2" />
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", textAlign: "center" }}>
                Numbers without meaning
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal }}>
                Risk scores lack business context
              </p>
            </div>

            {/* Supply Chain Tiers */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16 }}>
                <rect x="25" y="10" width="30" height="20" fill={tokens.color.ink} rx="2" />
                <text x="40" y="25" fontSize="12" fill={tokens.color.white} textAnchor="middle" fontWeight="bold">
                  Tier 1
                </text>
                <line x1="40" y1="30" x2="40" y2="35" stroke={tokens.color.muted} strokeWidth="2" />
                <rect x="25" y="38" width="30" height="16" fill={tokens.color.muted} opacity="0.3" rx="2" />
                <text x="40" y="50" fontSize="10" fill={tokens.color.ink} textAnchor="middle">
                  Tier 2?
                </text>
                <line x1="40" y1="54" x2="40" y2="58" stroke={tokens.color.muted} strokeWidth="2" strokeDasharray="2,2" />
                <rect x="20" y="60" width="40" height="14" fill={tokens.color.muted} opacity="0.2" rx="2" />
                <text x="40" y="71" fontSize="10" fill={tokens.color.muted} textAnchor="middle">
                  Tier 3+: Unknown
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", textAlign: "center" }}>
                Blind spots beyond Tier 1
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal }}>
                Upstream disruptions go unseen
              </p>
            </div>

            {/* Time Delays */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16 }}>
                <circle cx="40" cy="40" r="28" fill="none" stroke={tokens.color.muted} strokeWidth="2" opacity="0.3" />
                <circle cx="40" cy="40" r="20" fill="none" stroke={tokens.color.muted} strokeWidth="2" opacity="0.5" />
                <line x1="40" y1="20" x2="40" y2="12" stroke={tokens.color.ink} strokeWidth="2" />
                <line x1="55" y1="25" x2="61" y2="19" stroke={tokens.color.muted} strokeWidth="1.5" opacity="0.5" />
                <line x1="60" y1="40" x2="70" y2="40" stroke={tokens.color.muted} strokeWidth="1.5" opacity="0.5" />
                <text x="40" y="48" fontSize="14" fill={tokens.color.muted} textAnchor="middle" fontWeight="bold" opacity="0.6">
                  Waiting...
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", textAlign: "center" }}>
                Analysis is too slow
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal }}>
                Manual investigation misses decision windows
              </p>
            </div>

            {/* Black Box Automation */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16 }}>
                <rect x="20" y="25" width="40" height="30" fill={tokens.color.ink} rx="2" />
                <text x="40" y="50" fontSize="24" fill={tokens.color.white} textAnchor="middle" fontWeight="bold">
                  ?
                </text>
                <line x1="15" y1="42" x2="25" y2="42" stroke={tokens.color.muted} strokeWidth="2" />
                <line x1="55" y1="42" x2="65" y2="42" stroke={tokens.color.muted} strokeWidth="2" />
                <text x="40" y="70" fontSize="12" fill={tokens.color.muted} textAnchor="middle">
                  Black box decision
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", textAlign: "center" }}>
                Automation without evidence
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal }}>
                Can't defend decisions to stakeholders
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
            <strong>What we set out to prove:</strong> Supply-chain risk visibility was the core bottleneck. But we challenged that assumption by conducting in-depth interviews with procurement leaders, strategic sourcing managers, and operations teams across multiple companies. What we discovered shifted the entire project direction.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ background: tokens.color.offWhite, padding: "40px", borderRadius: tokens.radius.md, marginBottom: 60 }}>
            <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 24px" }}>
              The Real Problem (What Teams Actually Said)
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontFamily: tokens.font.serifItalic, fontSize: tokens.text.base, fontStyle: "italic", color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "Don't give me another place to look — tell me what matters."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, margin: 0 }}>
                  Strategic Sourcing Lead at Fortune 500 Manufacturer
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.serifItalic, fontSize: tokens.text.base, fontStyle: "italic", color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "People don't have time to read 50-page reports. We need it condensed to what actually matters."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, margin: 0 }}>
                  Operations Director, Supply Chain
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.serifItalic, fontSize: tokens.text.base, fontStyle: "italic", color: tokens.color.ink, margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "An AI recommendation is good, but we need the data and reasoning behind it so we can defend the decision."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.muted, margin: 0 }}>
                  VP Procurement, Tech Company
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 16px" }}>
            This revealed 5 critical gaps:
          </h3>
          <ul style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0, paddingLeft: 20 }}>
            <li><strong>Fragmentation:</strong> Critical supply-chain data scattered across disconnected tools and systems</li>
            <li><strong>Invisibility:</strong> Disruptions start in Tier 2+ suppliers no one is monitoring</li>
            <li><strong>No context:</strong> Risk scores don't show which products, customers, or revenue are actually exposed</li>
            <li><strong>Slow action:</strong> Manual analysis takes days—decision windows close in hours</li>
            <li><strong>Undefendable decisions:</strong> Automation without reasoning can't be justified to stakeholders</li>
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
          <svg width="100%" height="280" viewBox="0 0 1000 280" style={{ marginBottom: 60 }}>
            {/* Flow diagram: three layers */}
            {/* Layer 1: Monitor */}
            <rect x="50" y="40" width="250" height="200" fill={tokens.color.offWhite} stroke={tokens.color.muted} strokeWidth="2" rx="8" opacity="0.7" />
            <circle cx="175" cy="85" r="35" fill="none" stroke={tokens.color.ink} strokeWidth="2" />
            <text x="175" y="95" fontSize="24" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              📡
            </text>
            <text x="175" y="145" fontSize="18" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              Monitor
            </text>
            <text x="175" y="200" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="200">
              Detect changes
            </text>
            <text x="175" y="220" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="200">
              across suppliers & data
            </text>

            {/* Arrow 1 */}
            <path d="M 300 140 L 360 140" stroke={tokens.color.muted} strokeWidth="3" markerEnd={`url(#arrowhead)`} />

            {/* Layer 2: Understand */}
            <rect x="370" y="40" width="250" height="200" fill={tokens.color.offWhite} stroke={tokens.color.muted} strokeWidth="2" rx="8" opacity="0.7" />
            <circle cx="495" cy="85" r="35" fill="none" stroke={tokens.color.ink} strokeWidth="2" />
            <text x="495" y="95" fontSize="24" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              🔍
            </text>
            <text x="495" y="145" fontSize="18" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              Understand
            </text>
            <text x="495" y="200" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="200">
              Assess impact on
            </text>
            <text x="495" y="220" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="200">
              business & revenue
            </text>

            {/* Arrow 2 */}
            <path d="M 620 140 L 680 140" stroke={tokens.color.muted} strokeWidth="3" markerEnd={`url(#arrowhead)`} />

            {/* Layer 3: Act */}
            <rect x="690" y="40" width="250" height="200" fill={tokens.color.offWhite} stroke={tokens.color.muted} strokeWidth="2" rx="8" opacity="0.7" />
            <circle cx="815" cy="85" r="35" fill="none" stroke={tokens.color.ink} strokeWidth="2" />
            <text x="815" y="95" fontSize="24" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              ✓
            </text>
            <text x="815" y="145" fontSize="18" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              Act
            </text>
            <text x="815" y="200" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="200">
              Make informed decisions
            </text>
            <text x="815" y="220" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="200">
              with evidence
            </text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill={tokens.color.muted} />
              </marker>
            </defs>
          </svg>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
            {/* Dashboard */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, minHeight: 280 }}>
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }}>
                <rect x="10" y="10" width="220" height="160" fill="none" stroke={tokens.color.muted} strokeWidth="1.5" rx="4" />
                <rect x="15" y="15" width="210" height="30" fill={tokens.color.muted} opacity="0.2" rx="2" />
                <text x="120" y="36" fontSize="12" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  AI Summary • Priorities • Impact
                </text>
                <rect x="15" y="50" width="100" height="50" fill={tokens.color.muted} opacity="0.1" rx="2" />
                <text x="65" y="82" fontSize="10" fill={tokens.color.muted} textAnchor="middle">
                  Risk Map
                </text>
                <rect x="125" y="50" width="100" height="50" fill={tokens.color.muted} opacity="0.1" rx="2" />
                <text x="175" y="82" fontSize="10" fill={tokens.color.muted} textAnchor="middle">
                  Alerts
                </text>
                <rect x="15" y="105" width="210" height="50" fill={tokens.color.muted} opacity="0.05" rx="2" />
                <text x="120" y="135" fontSize="10" fill={tokens.color.muted} textAnchor="middle">
                  Supply Chain Overview
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px" }}>
                Dashboard
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Central hub showing AI summary, priorities, business impact, and supply-chain risk map. One screen to see what matters most.
              </p>
            </div>

            {/* Engineering Changes */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, minHeight: 280 }}>
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }}>
                <rect x="80" y="20" width="80" height="50" fill={tokens.color.muted} opacity="0.15" rx="3" />
                <text x="120" y="50" fontSize="12" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  Open Changes
                </text>
                <path d="M 120 70 L 120 90" stroke={tokens.color.muted} strokeWidth="2" markerEnd={`url(#arrowdown)`} />
                <circle cx="60" cy="110" r="20" fill="none" stroke={tokens.color.muted} strokeWidth="1.5" />
                <text x="60" y="117" fontSize="11" fill={tokens.color.muted} textAnchor="middle">
                  Supplier
                </text>
                <text x="60" y="130" fontSize="11" fill={tokens.color.muted} textAnchor="middle">
                  Impact?
                </text>
                <circle cx="180" cy="110" r="20" fill="none" stroke={tokens.color.muted} strokeWidth="1.5" />
                <text x="180" y="117" fontSize="11" fill={tokens.color.muted} textAnchor="middle">
                  Supply
                </text>
                <text x="180" y="130" fontSize="11" fill={tokens.color.muted} textAnchor="middle">
                  Risk?
                </text>
                <path d="M 60 130 L 90 145" stroke={tokens.color.muted} strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 180 130 L 150 145" stroke={tokens.color.muted} strokeWidth="1" strokeDasharray="2,2" />
                <rect x="50" y="145" width="140" height="25" fill={tokens.color.ink} opacity="0.1" rx="2" />
                <text x="120" y="163" fontSize="11" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  Catch blind spots before problems
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px" }}>
                Engineering Changes
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Automatically links design changes to supplier and sourcing impact. Catch risks before they become problems.
              </p>
            </div>

            {/* Supplier Comparison */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, minHeight: 280 }}>
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }}>
                <rect x="15" y="15" width="65" height="140" fill={tokens.color.muted} opacity="0.15" rx="3" />
                <text x="47" y="40" fontSize="11" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  Option A
                </text>
                <rect x="17" y="48" width="61" height="8" fill={tokens.color.muted} opacity="0.3" rx="1" />
                <rect x="17" y="60" width="61" height="8" fill={tokens.color.muted} opacity="0.3" rx="1" />
                <rect x="17" y="72" width="61" height="8" fill={tokens.color.muted} opacity="0.3" rx="1" />
                <text x="47" y="130" fontSize="10" fill={tokens.color.muted} textAnchor="middle">
                  Cost vs Quality
                </text>

                <rect x="88" y="15" width="65" height="140" fill={tokens.color.muted} opacity="0.25" rx="3" />
                <text x="120" y="40" fontSize="11" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  Option B
                </text>
                <rect x="90" y="48" width="61" height="8" fill={tokens.color.muted} opacity="0.4" rx="1" />
                <rect x="90" y="60" width="61" height="8" fill={tokens.color.muted} opacity="0.4" rx="1" />
                <rect x="90" y="72" width="61" height="8" fill={tokens.color.muted} opacity="0.4" rx="1" />
                <text x="120" y="130" fontSize="10" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  Comparison
                </text>

                <rect x="161" y="15" width="65" height="140" fill={tokens.color.muted} opacity="0.35" rx="3" />
                <text x="193" y="40" fontSize="11" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  Option C
                </text>
                <rect x="163" y="48" width="61" height="8" fill={tokens.color.muted} opacity="0.5" rx="1" />
                <rect x="163" y="60" width="61" height="8" fill={tokens.color.muted} opacity="0.5" rx="1" />
                <rect x="163" y="72" width="61" height="8" fill={tokens.color.muted} opacity="0.5" rx="1" />
                <text x="193" y="130" fontSize="10" fill={tokens.color.muted} textAnchor="middle">
                  Tradeoffs
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px" }}>
                Supplier Comparison
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                AI-generated options with cost, quality, and risk tradeoffs side-by-side. Make faster sourcing decisions.
              </p>
            </div>

            {/* Bill of Materials */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, minHeight: 280 }}>
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }}>
                <rect x="15" y="15" width="210" height="25" fill={tokens.color.muted} opacity="0.2" rx="2" />
                <text x="120" y="33" fontSize="11" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
                  Part #001 | Supplier A | $45
                </text>
                <rect x="30" y="48" width="65" height="15" fill={tokens.color.muted} opacity="0.1" rx="1" />
                <text x="62" y="58" fontSize="9" fill={tokens.color.muted} textAnchor="middle">
                  Quote
                </text>
                <rect x="110" y="48" width="65" height="15" fill={tokens.color.muted} opacity="0.1" rx="1" />
                <text x="142" y="58" fontSize="9" fill={tokens.color.muted} textAnchor="middle">
                  Risk
                </text>
                <rect x="190" y="48" width="35" height="15" fill={tokens.color.muted} opacity="0.1" rx="1" />
                <text x="207" y="58" fontSize="9" fill={tokens.color.muted} textAnchor="middle">
                  Impact
                </text>

                <rect x="15" y="75" width="210" height="25" fill={tokens.color.muted} opacity="0.1" rx="2" />
                <text x="120" y="93" fontSize="11" fill={tokens.color.muted} textAnchor="middle">
                  Part #002 | Supplier B | $32
                </text>

                <rect x="15" y="110" width="210" height="25" fill={tokens.color.muted} opacity="0.1" rx="2" />
                <text x="120" y="128" fontSize="11" fill={tokens.color.muted} textAnchor="middle">
                  Part #003 | Supplier C | $89
                </text>

                <path d="M 120 140 L 120 155" stroke={tokens.color.muted} strokeWidth="1" strokeDasharray="2,2" />
                <text x="120" y="170" fontSize="10" fill={tokens.color.muted} textAnchor="middle" fontWeight="bold">
                  Full supply chain visibility
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px" }}>
                Bill of Materials
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                Connected view of all parts, suppliers, costs, and supply-chain exposure in one view.
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
                Prototype testing and iteration (going deeper)
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal }}>
                After discovering the real problem was decision-making, not visibility, we built low-fidelity prototypes to test the three-layer hypothesis with actual procurement leaders. Multiple rounds of testing and iteration revealed workflow gaps that would have been expensive to discover during development. This validation phase shifted resource allocation and shaped the entire MVP scope.
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
