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
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 24, borderLeft: `4px solid ${tokens.color.accent}` }}>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  The Context
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0 }}>
                  Procurement teams drowning in disconnected risk alerts, unable to act confidently.
                </p>
              </div>

              <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 24, borderLeft: `4px solid ${tokens.color.accent}` }}>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  The Insight
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0 }}>
                  The real bottleneck wasn't visibility—it was confident decision-making.
                </p>
              </div>

              <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 24, borderLeft: `4px solid ${tokens.color.accent}` }}>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  Our Solution
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, margin: 0 }}>
                  Decision-support platform with evidence to back up every recommendation.
                </p>
              </div>
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
          <style>{`
            @media (max-width: 768px) {
              .problem-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32, marginBottom: 60 }}>
            {/* Numbers without meaning */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16, maxWidth: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                {/* Bar chart - orange for warning/problem */}
                <rect x="15" y="45" width="8" height="25" fill="#F97316" opacity="0.5" />
                <rect x="28" y="35" width="8" height="35" fill="#F97316" opacity="0.7" />
                <rect x="41" y="25" width="8" height="45" fill="#F97316" opacity="0.85" />
                <rect x="54" y="40" width="8" height="30" fill="#F97316" opacity="0.6" />
                {/* Question mark */}
                <circle cx="40" cy="18" r="8" fill="#F97316" opacity="0.15" />
                <text x="40" y="22" fontSize="14" fill="#F97316" textAnchor="middle" fontWeight="bold">
                  ?
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", textAlign: "center" }}>
                Numbers without meaning
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal }}>
                Risk scores lack business context
              </p>
            </div>

            {/* Blind spots */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16, maxWidth: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                {/* Eye symbol - orange to show warning/problem */}
                <circle cx="40" cy="40" r="14" fill="none" stroke="#F97316" strokeWidth="2" />
                <circle cx="40" cy="40" r="6" fill="#F97316" opacity="0.3" />
                {/* Fading pyramid showing decreasing visibility */}
                <polygon points="20,55 40,50 60,55 50,65 30,65" fill="#F97316" opacity="0.6" />
                <polygon points="25,60 40,58 55,60 48,68 32,68" fill="#F97316" opacity="0.3" />
                <polygon points="30,65 40,64 50,65 45,70 35,70" fill="#F97316" opacity="0.1" />
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", textAlign: "center" }}>
                Blind spots beyond Tier 1
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal }}>
                Upstream disruptions go unseen
              </p>
            </div>

            {/* Slow analysis */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16, maxWidth: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                {/* Hourglass shape - orange for problem/waiting */}
                <path d="M 25 18 L 55 18 L 50 40 L 55 62 L 25 62 L 30 40 Z" fill="none" stroke="#F97316" strokeWidth="2.5" />
                {/* Sand falling slowly */}
                <circle cx="40" cy="48" r="2" fill="#F97316" />
                <circle cx="40" cy="54" r="1.8" fill="#F97316" opacity="0.5" />
                <circle cx="40" cy="60" r="1.5" fill="#F97316" opacity="0.2" />
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", textAlign: "center" }}>
                Analysis is too slow
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal }}>
                Manual investigation misses decision windows
              </p>
            </div>

            {/* Black box automation */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 16, maxWidth: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                {/* Locked box - orange for warning/problem */}
                <rect x="22" y="28" width="36" height="28" fill="none" stroke="#F97316" strokeWidth="2.5" rx="3" />
                {/* Lock symbol */}
                <path d="M 32 38 Q 32 32 40 32 Q 48 32 48 38" fill="none" stroke="#F97316" strokeWidth="2" />
                <circle cx="40" cy="44" r="3" fill="#F97316" />
                {/* Question mark */}
                <circle cx="40" cy="56" r="6" fill="#F97316" opacity="0.15" />
                <text x="40" y="59" fontSize="12" fill="#F97316" textAnchor="middle" fontWeight="bold">
                  ?
                </text>
                {/* Data flow arrows */}
                <path d="M 12 44 L 22 44" stroke="#F97316" strokeWidth="1.5" opacity="0.5" />
                <path d="M 58 44 L 68 44" stroke="#F97316" strokeWidth="1.5" opacity="0.5" />
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
          <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 700 }}>
            We challenged the assumption that risk visibility was the problem. Interviews with procurement leaders across multiple companies revealed the real bottleneck: <strong>decision-making, not data.</strong>
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
          <style>{`
            @media (max-width: 768px) {
              .gaps-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="gaps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, marginTop: 0 }}>
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 20, textAlign: "center", minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔗</div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 4px" }}>
                Fragmentation
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.muted, margin: 0, lineHeight: tokens.leading.snug }}>
                Data scattered across disconnected tools
              </p>
            </div>

            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 20, textAlign: "center", minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>👁️</div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 4px" }}>
                Invisibility
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.muted, margin: 0, lineHeight: tokens.leading.snug }}>
                Tier 2+ suppliers unseen
              </p>
            </div>

            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 20, textAlign: "center", minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>❓</div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 4px" }}>
                No Context
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.muted, margin: 0, lineHeight: tokens.leading.snug }}>
                Risk without business impact
              </p>
            </div>

            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 20, textAlign: "center", minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>⏱️</div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 4px" }}>
                Slow Action
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.muted, margin: 0, lineHeight: tokens.leading.snug }}>
                Manual analysis misses windows
              </p>
            </div>

            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 20, textAlign: "center", minHeight: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔐</div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 4px" }}>
                Undefendable
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.muted, margin: 0, lineHeight: tokens.leading.snug }}>
                Automation without evidence
              </p>
            </div>
          </div>
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
          <style>{`
            @media (max-width: 768px) {
              .solution-flow {
                height: auto !important;
              }
            }
          `}</style>
          <svg className="solution-flow" width="100%" height="280" viewBox="0 0 1000 280" style={{ marginBottom: 60, maxWidth: "100%" }} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {/* Layer 1: Monitor */}
            <rect x="50" y="40" width="250" height="200" fill={tokens.color.offWhite} stroke={tokens.color.accent} strokeWidth="1.5" rx="12" />
            {/* Monitor icon: signal waves */}
            <circle cx="175" cy="80" r="28" fill="none" stroke={tokens.color.accent} strokeWidth="2" opacity="0.5" />
            <circle cx="175" cy="80" r="18" fill="none" stroke={tokens.color.accent} strokeWidth="2" opacity="0.7" />
            <circle cx="175" cy="80" r="8" fill={tokens.color.accent} />
            <text x="175" y="150" fontSize="18" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              Monitor
            </text>
            <text x="175" y="175" fontSize="12" fill={tokens.color.body} textAnchor="middle">
              Detect changes
            </text>
            <text x="175" y="192" fontSize="12" fill={tokens.color.body} textAnchor="middle">
              across suppliers & data
            </text>

            {/* Arrow 1 */}
            <path d="M 310 140 L 365 140" stroke={tokens.color.accent} strokeWidth="2.5" />
            <polygon points="365,140 375,135 375,145" fill={tokens.color.accent} />

            {/* Layer 2: Understand */}
            <rect x="385" y="40" width="250" height="200" fill={tokens.color.offWhite} stroke={tokens.color.accent} strokeWidth="1.5" rx="12" />
            {/* Understand icon: connected data */}
            <rect x="460" y="60" width="30" height="15" fill={tokens.color.accent} opacity="0.3" rx="2" />
            <rect x="460" y="80" width="30" height="15" fill={tokens.color.accent} opacity="0.6" rx="2" />
            <rect x="495" y="70" width="20" height="20" fill={tokens.color.accent} rx="2" />
            <path d="M 480 68 L 495 78" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.4" />
            <text x="510" y="150" fontSize="18" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              Understand
            </text>
            <text x="510" y="175" fontSize="12" fill={tokens.color.body} textAnchor="middle">
              Assess impact on
            </text>
            <text x="510" y="192" fontSize="12" fill={tokens.color.body} textAnchor="middle">
              business & revenue
            </text>

            {/* Arrow 2 */}
            <path d="M 635 140 L 690 140" stroke={tokens.color.accent} strokeWidth="2.5" />
            <polygon points="690,140 700,135 700,145" fill={tokens.color.accent} />

            {/* Layer 3: Act - Green for positive outcome */}
            <rect x="700" y="40" width="250" height="200" fill={tokens.color.offWhite} stroke="#10B981" strokeWidth="1.5" rx="12" />
            {/* Act icon: checkmark in success circle */}
            <circle cx="825" cy="80" r="28" fill="#10B981" opacity="0.1" />
            <path d="M 815 82 L 821 88 L 835 74" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="825" y="150" fontSize="18" fill={tokens.color.ink} textAnchor="middle" fontWeight="bold">
              Act
            </text>
            <text x="825" y="175" fontSize="12" fill={tokens.color.body} textAnchor="middle">
              Make informed decisions
            </text>
            <text x="825" y="192" fontSize="12" fill={tokens.color.body} textAnchor="middle">
              with evidence
            </text>
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
          <style>{`
            @media (max-width: 768px) {
              .design-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="design-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
            {/* Dashboard */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 32, minHeight: 280 }}>
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }} aria-hidden="true">
                {/* Frame */}
                <rect x="12" y="10" width="216" height="160" fill="none" stroke={tokens.color.accent} strokeWidth="1.5" rx="6" />
                {/* Header bar */}
                <rect x="16" y="14" width="208" height="24" fill={tokens.color.accent} opacity="0.1" rx="3" />
                <line x1="20" y1="20" x2="100" y2="20" stroke={tokens.color.accent} strokeWidth="2" />
                <line x1="20" y1="26" x2="80" y2="26" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.6" />
                {/* Content grid */}
                <rect x="16" y="44" width="96" height="56" fill={tokens.color.accent} opacity="0.08" rx="3" />
                <circle cx="64" cy="72" r="12" fill="none" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.6" />
                <rect x="16" y="104" width="208" height="56" fill={tokens.color.accent} opacity="0.05" rx="3" />
                <line x1="24" y1="115" x2="200" y2="115" stroke={tokens.color.accent} strokeWidth="1" opacity="0.3" />
                <line x1="24" y1="125" x2="200" y2="125" stroke={tokens.color.accent} strokeWidth="1" opacity="0.3" />
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
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }} aria-hidden="true">
                {/* Source box */}
                <rect x="80" y="15" width="80" height="35" fill={tokens.color.accent} opacity="0.15" rx="4" />
                <line x1="95" y1="25" x2="155" y2="25" stroke={tokens.color.accent} strokeWidth="2" />
                <line x1="95" y1="32" x2="155" y2="32" stroke={tokens.color.accent} strokeWidth="2" opacity="0.6" />
                {/* Arrow down */}
                <path d="M 120 50 L 120 65" stroke={tokens.color.accent} strokeWidth="2" />
                <polygon points="120,65 116,57 124,57" fill={tokens.color.accent} />
                {/* Impact nodes */}
                <circle cx="60" cy="100" r="18" fill="none" stroke={tokens.color.accent} strokeWidth="1.5" />
                <circle cx="60" cy="100" r="10" fill={tokens.color.accent} opacity="0.1" />
                <circle cx="180" cy="100" r="18" fill="none" stroke={tokens.color.accent} strokeWidth="1.5" />
                <circle cx="180" cy="100" r="10" fill={tokens.color.accent} opacity="0.1" />
                {/* Connection lines */}
                <path d="M 75 105 Q 120 125 150 105" stroke={tokens.color.accent} strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="2,2" />
                {/* Result highlight */}
                <rect x="50" y="140" width="140" height="28" fill={tokens.color.accent} opacity="0.1" rx="4" />
                <circle cx="60" cy="154" r="4" fill={tokens.color.accent} />
                <line x1="70" y1="154" x2="180" y2="154" stroke={tokens.color.accent} strokeWidth="1.5" />
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
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }} aria-hidden="true">
                {/* Option A */}
                <rect x="10" y="12" width="60" height="140" fill={tokens.color.accent} opacity="0.08" rx="4" />
                <line x1="18" y1="25" x2="52" y2="25" stroke={tokens.color.accent} strokeWidth="2" />
                <line x1="18" y1="35" x2="52" y2="35" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="18" y1="45" x2="52" y2="45" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="18" y1="55" x2="52" y2="55" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />

                {/* Option B - Highlighted */}
                <rect x="80" y="12" width="60" height="140" fill={tokens.color.accent} opacity="0.12" rx="4" />
                <rect x="78" y="10" width="64" height="144" fill="none" stroke={tokens.color.accent} strokeWidth="2.5" rx="5" />
                <line x1="88" y1="25" x2="122" y2="25" stroke={tokens.color.accent} strokeWidth="2" />
                <line x1="88" y1="35" x2="122" y2="35" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.7" />
                <line x1="88" y1="45" x2="122" y2="45" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.7" />
                <line x1="88" y1="55" x2="122" y2="55" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.7" />

                {/* Option C */}
                <rect x="150" y="12" width="60" height="140" fill={tokens.color.accent} opacity="0.08" rx="4" />
                <line x1="158" y1="25" x2="192" y2="25" stroke={tokens.color.accent} strokeWidth="2" />
                <line x1="158" y1="35" x2="192" y2="35" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="158" y1="45" x2="192" y2="45" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="158" y1="55" x2="192" y2="55" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />

                {/* Comparison indicator */}
                <path d="M 40 160 L 120 160 L 180 160" stroke={tokens.color.accent} strokeWidth="1" opacity="0.3" />
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
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }} aria-hidden="true">
                {/* Header */}
                <rect x="14" y="12" width="212" height="22" fill={tokens.color.accent} opacity="0.1" rx="3" />
                <line x1="20" y1="20" x2="70" y2="20" stroke={tokens.color.accent} strokeWidth="2" />
                <line x1="100" y1="20" x2="130" y2="20" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="160" y1="20" x2="180" y2="20" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />

                {/* Row 1 */}
                <rect x="14" y="38" width="212" height="20" fill={tokens.color.accent} opacity="0.08" rx="2" />
                <line x1="30" y1="48" x2="80" y2="48" stroke={tokens.color.accent} strokeWidth="1" opacity="0.4" />
                <rect x="100" y="42" width="30" height="12" fill={tokens.color.accent} opacity="0.15" rx="1" />
                <rect x="140" y="42" width="30" height="12" fill={tokens.color.accent} opacity="0.15" rx="1" />

                {/* Row 2 */}
                <rect x="14" y="64" width="212" height="20" fill={tokens.color.accent} opacity="0.05" rx="2" />
                <line x1="30" y1="74" x2="80" y2="74" stroke={tokens.color.accent} strokeWidth="1" opacity="0.3" />

                {/* Row 3 */}
                <rect x="14" y="90" width="212" height="20" fill={tokens.color.accent} opacity="0.05" rx="2" />
                <line x1="30" y1="100" x2="80" y2="100" stroke={tokens.color.accent} strokeWidth="1" opacity="0.3" />

                {/* Indicator */}
                <path d="M 120 115 L 120 130" stroke={tokens.color.accent} strokeWidth="1" opacity="0.3" strokeDasharray="2,2" />
                <circle cx="120" cy="138" r="3" fill={tokens.color.accent} />
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
          <style>{`
            @media (max-width: 768px) {
              .learnings-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="learnings-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Ask the Right Questions
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.snug }}>
                Narrow hypothesis → Problem reframing. Visibility wasn't the bottleneck; decision-making was.
              </p>
            </div>

            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Prototype to Validate
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.snug }}>
                Low-fidelity testing with users revealed workflow gaps that would've been expensive in dev.
              </p>
            </div>

            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: tokens.color.muted, textTransform: "uppercase", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Build Smarter, Not Bigger
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.snug }}>
                Shifted from "comprehensive database" to "decision support." Less scope, higher impact.
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
