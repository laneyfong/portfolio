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
          <style>{`
            @media (max-width: 768px) {
              .problem-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="problem-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32, marginBottom: 60 }}>
            {/* Risk Scores */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "#B85C38", opacity: 0.08, borderRadius: "50%" }} />
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 24, maxWidth: "100%", height: "auto", zIndex: 1 }} preserveAspectRatio="xMidYMid meet">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#B85C38" strokeWidth="3" opacity="0.4" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#B85C38" strokeWidth="2" opacity="0.6" />
                <text x="50" y="58" fontSize="40" fontWeight="bold" textAnchor="middle" fill="#B85C38">
                  84
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "8px 0 6px", textAlign: "center", position: "relative", zIndex: 1 }}>
                Risk scores isolated
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                No business context or impact
              </p>
            </div>

            {/* Supply Chain Tiers */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "#B85C38", opacity: 0.08, borderRadius: "50%" }} />
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 24, maxWidth: "100%", height: "auto", zIndex: 1 }} preserveAspectRatio="xMidYMid meet">
                <rect x="30" y="12" width="40" height="22" fill="#B85C38" rx="2" />
                <text x="50" y="30" fontSize="13" fill="white" textAnchor="middle" fontWeight="bold">
                  Tier 1
                </text>
                <line x1="50" y1="34" x2="50" y2="42" stroke="#B85C38" strokeWidth="2" />
                <rect x="28" y="44" width="44" height="18" fill="#B85C38" opacity="0.4" rx="2" />
                <text x="50" y="58" fontSize="11" fill={tokens.color.ink} textAnchor="middle">
                  Tier 2?
                </text>
                <line x1="50" y1="62" x2="50" y2="68" stroke="#B85C38" strokeWidth="2" strokeDasharray="3,2" opacity="0.4" />
                <rect x="20" y="70" width="60" height="16" fill="#B85C38" opacity="0.15" rx="2" />
                <text x="50" y="82" fontSize="10" fill={tokens.color.muted} textAnchor="middle">
                  Tier 3+: Unknown
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "8px 0 6px", textAlign: "center", position: "relative", zIndex: 1 }}>
                Upstream blind spots
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                Disruptions start where you can't see
              </p>
            </div>

            {/* Time Delays */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "#B85C38", opacity: 0.08, borderRadius: "50%" }} />
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 24, maxWidth: "100%", height: "auto", zIndex: 1 }} preserveAspectRatio="xMidYMid meet">
                <circle cx="50" cy="50" r="32" fill="none" stroke="#B85C38" strokeWidth="2" opacity="0.3" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="#B85C38" strokeWidth="2.5" opacity="0.6" />
                <line x1="50" y1="20" x2="50" y2="10" stroke="#B85C38" strokeWidth="3" />
                <line x1="65" y1="32" x2="73" y2="24" stroke="#B85C38" strokeWidth="2" opacity="0.4" />
                <line x1="72" y1="50" x2="82" y2="50" stroke="#B85C38" strokeWidth="2" opacity="0.4" />
                <text x="50" y="58" fontSize="16" fill="#B85C38" textAnchor="middle" fontWeight="bold">
                  ⏱
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "8px 0 6px", textAlign: "center", position: "relative", zIndex: 1 }}>
                Slow decision-making
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                Window to act closes before analysis ends
              </p>
            </div>

            {/* Black Box Automation */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "#B85C38", opacity: 0.08, borderRadius: "50%" }} />
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 24, maxWidth: "100%", height: "auto", zIndex: 1 }} preserveAspectRatio="xMidYMid meet">
                <rect x="22" y="28" width="56" height="44" fill="#1A1A1A" rx="3" />
                <circle cx="50" cy="42" r="10" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
                <text x="50" y="48" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">
                  ?
                </text>
                <line x1="10" y1="50" x2="22" y2="50" stroke="#B85C38" strokeWidth="2.5" />
                <line x1="78" y1="50" x2="90" y2="50" stroke="#B85C38" strokeWidth="2.5" />
                <circle cx="10" cy="50" r="3" fill="#B85C38" />
                <circle cx="90" cy="50" r="3" fill="#B85C38" />
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "8px 0 6px", textAlign: "center", position: "relative", zIndex: 1 }}>
                Undefendable automation
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, textAlign: "center", lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                AI without explanation isn't trustworthy
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
          <style>{`
            @media (max-width: 768px) {
              .solution-flow {
                height: auto !important;
              }
            }
          `}</style>
          <svg className="solution-flow" width="100%" height="320" viewBox="0 0 1000 320" style={{ marginBottom: 60, maxWidth: "100%" }} preserveAspectRatio="xMidYMid meet">
            {/* Layer 1: Monitor */}
            <rect x="40" y="30" width="260" height="240" fill={tokens.color.offWhite} stroke="#2E8B8B" strokeWidth="2.5" rx="12" />
            <circle cx="170" cy="85" r="42" fill="none" stroke="#2E8B8B" strokeWidth="3" />
            <text x="170" y="100" fontSize="28" fill="#2E8B8B" textAnchor="middle" fontWeight="bold">
              📡
            </text>
            <text x="170" y="160" fontSize="19" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
              Monitor
            </text>
            <text x="170" y="195" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="220">
              Real-time detection
            </text>
            <text x="170" y="215" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="220">
              across all suppliers
            </text>
            <rect x="60" y="240" width="220" height="6" fill="#2E8B8B" opacity="0.3" rx="3" />

            {/* Arrow 1 */}
            <path d="M 310 160 L 380 160" stroke="#2E8B8B" strokeWidth="4" markerEnd="url(#tealArrow)" />
            <circle cx="345" cy="160" r="3" fill="#2E8B8B" />

            {/* Layer 2: Understand */}
            <rect x="390" y="30" width="260" height="240" fill={tokens.color.offWhite} stroke="#2E8B8B" strokeWidth="2.5" rx="12" />
            <circle cx="520" cy="85" r="42" fill="none" stroke="#2E8B8B" strokeWidth="3" />
            <text x="520" y="100" fontSize="28" fill="#2E8B8B" textAnchor="middle" fontWeight="bold">
              🎯
            </text>
            <text x="520" y="160" fontSize="19" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
              Understand
            </text>
            <text x="520" y="195" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="220">
              Connect data to
            </text>
            <text x="520" y="215" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="220">
              business impact
            </text>
            <rect x="410" y="240" width="220" height="6" fill="#2E8B8B" opacity="0.3" rx="3" />

            {/* Arrow 2 */}
            <path d="M 660 160 L 730 160" stroke="#2E8B8B" strokeWidth="4" markerEnd="url(#tealArrow)" />
            <circle cx="695" cy="160" r="3" fill="#2E8B8B" />

            {/* Layer 3: Act */}
            <rect x="740" y="30" width="260" height="240" fill={tokens.color.offWhite} stroke="#2E8B8B" strokeWidth="2.5" rx="12" />
            <circle cx="870" cy="85" r="42" fill="none" stroke="#2E8B8B" strokeWidth="3" />
            <text x="870" y="100" fontSize="28" fill="#2E8B8B" textAnchor="middle" fontWeight="bold">
              ✓
            </text>
            <text x="870" y="160" fontSize="19" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
              Act
            </text>
            <text x="870" y="195" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="220">
              Make confident
            </text>
            <text x="870" y="215" fontSize="13" fill={tokens.color.body} textAnchor="middle" textLength="220">
              decisions with evidence
            </text>
            <rect x="760" y="240" width="220" height="6" fill="#2E8B8B" opacity="0.3" rx="3" />

            <defs>
              <marker id="tealArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#2E8B8B" />
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
          <style>{`
            @media (max-width: 768px) {
              .design-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="design-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
            {/* Dashboard */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, minHeight: 300, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: "#2E8B8B", opacity: 0.06, borderRadius: "50%" }} />
              <svg width="100%" height="190" viewBox="0 0 240 190" style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
                <rect x="12" y="12" width="216" height="166" fill="none" stroke="#2E8B8B" strokeWidth="2" rx="6" />
                <rect x="18" y="18" width="204" height="28" fill="#2E8B8B" opacity="0.15" rx="3" />
                <line x1="24" y1="32" x2="80" y2="32" stroke="#2E8B8B" strokeWidth="2" opacity="0.8" />
                <line x1="90" y1="32" x2="120" y2="32" stroke="#2E8B8B" strokeWidth="2" opacity="0.5" />
                <rect x="18" y="52" width="96" height="52" fill="none" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.5" rx="3" />
                <text x="66" y="85" fontSize="11" fill={tokens.color.muted} textAnchor="middle" fontWeight="500">
                  Risk Map
                </text>
                <rect x="126" y="52" width="96" height="52" fill="none" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.5" rx="3" />
                <text x="174" y="85" fontSize="11" fill={tokens.color.muted} textAnchor="middle" fontWeight="500">
                  Alerts
                </text>
                <rect x="18" y="110" width="204" height="44" fill="#2E8B8B" opacity="0.08" rx="3" />
                <line x1="28" y1="126" x2="210" y2="126" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.6" />
                <line x1="28" y1="142" x2="210" y2="142" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.4" />
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", position: "relative", zIndex: 1 }}>
                Central Hub
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                One screen shows priorities, business impact, alerts, and supply-chain overview.
              </p>
            </div>

            {/* Engineering Changes */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, minHeight: 300, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: "#2E8B8B", opacity: 0.06, borderRadius: "50%" }} />
              <svg width="100%" height="190" viewBox="0 0 240 190" style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
                <rect x="76" y="15" width="88" height="42" fill="#2E8B8B" opacity="0.2" rx="4" />
                <text x="120" y="40" fontSize="13" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
                  Design Change
                </text>
                <path d="M 120 57 L 120 75" stroke="#2E8B8B" strokeWidth="2.5" markerEnd="url(#downArrow)" />
                <circle cx="54" cy="110" r="24" fill="none" stroke="#2E8B8B" strokeWidth="2.5" />
                <text x="54" y="117" fontSize="12" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
                  Supplier
                </text>
                <circle cx="186" cy="110" r="24" fill="none" stroke="#2E8B8B" strokeWidth="2.5" />
                <text x="186" y="117" fontSize="12" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
                  Supply
                </text>
                <path d="M 54 134 L 120 158" stroke="#2E8B8B" strokeWidth="2" opacity="0.6" markerEnd="url(#diagArrow)" />
                <path d="M 186 134 L 120 158" stroke="#2E8B8B" strokeWidth="2" opacity="0.6" markerEnd="url(#diagArrow)" />
                <rect x="48" y="160" width="144" height="20" fill="#2E8B8B" opacity="0.15" rx="3" />
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", position: "relative", zIndex: 1 }}>
                Change Impact
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                Link design changes to supplier impact. Catch blind spots before they become problems.
              </p>
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <marker id="downArrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <polygon points="0 0, 10 5, 0 10" fill="#2E8B8B" />
                  </marker>
                  <marker id="diagArrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                    <polygon points="0 0, 10 5, 0 10" fill="#2E8B8B" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Supplier Comparison */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, minHeight: 300, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: "#2E8B8B", opacity: 0.06, borderRadius: "50%" }} />
              <svg width="100%" height="190" viewBox="0 0 240 190" style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
                <g>
                  <rect x="18" y="18" width="62" height="144" fill="none" stroke="#2E8B8B" strokeWidth="2.2" opacity="0.6" rx="4" />
                  <text x="49" y="40" fontSize="12" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
                    Option A
                  </text>
                  <line x1="25" y1="50" x2="73" y2="50" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.4" />
                  <line x1="25" y1="62" x2="73" y2="62" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.4" />
                  <line x1="25" y1="74" x2="73" y2="74" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.4" />
                </g>
                <g>
                  <rect x="89" y="18" width="62" height="144" fill="none" stroke="#2E8B8B" strokeWidth="2.2" opacity="0.8" rx="4" />
                  <text x="120" y="40" fontSize="12" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
                    Option B
                  </text>
                  <line x1="96" y1="50" x2="144" y2="50" stroke="#2E8B8B" strokeWidth="2" opacity="0.7" />
                  <line x1="96" y1="62" x2="144" y2="62" stroke="#2E8B8B" strokeWidth="2" opacity="0.7" />
                  <line x1="96" y1="74" x2="144" y2="74" stroke="#2E8B8B" strokeWidth="2" opacity="0.7" />
                </g>
                <g>
                  <rect x="160" y="18" width="62" height="144" fill="none" stroke="#2E8B8B" strokeWidth="2.2" opacity="0.5" rx="4" />
                  <text x="191" y="40" fontSize="12" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
                    Option C
                  </text>
                  <line x1="167" y1="50" x2="215" y2="50" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.3" />
                  <line x1="167" y1="62" x2="215" y2="62" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.3" />
                  <line x1="167" y1="74" x2="215" y2="74" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.3" />
                </g>
                <rect x="30" y="150" width="180" height="22" fill="#2E8B8B" opacity="0.12" rx="3" />
                <text x="120" y="166" fontSize="11" fill={tokens.color.muted} textAnchor="middle">
                  Tradeoffs shown clearly
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", position: "relative", zIndex: 1 }}>
                Side-by-Side Options
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                AI-generated options with cost, quality, and risk tradeoffs visible. Faster sourcing decisions.
              </p>
            </div>

            {/* Bill of Materials */}
            <div style={{ background: tokens.color.offWhite, borderRadius: tokens.radius.md, padding: 40, minHeight: 300, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, background: "#2E8B8B", opacity: 0.06, borderRadius: "50%" }} />
              <svg width="100%" height="190" viewBox="0 0 240 190" style={{ marginBottom: 20, position: "relative", zIndex: 1 }}>
                <rect x="16" y="16" width="208" height="158" fill="none" stroke="#2E8B8B" strokeWidth="2" rx="5" />

                {/* Header */}
                <rect x="22" y="22" width="196" height="26" fill="#2E8B8B" opacity="0.12" rx="3" />
                <text x="120" y="40" fontSize="11" fill={tokens.color.ink} textAnchor="middle" fontWeight="600">
                  Part #001 • Supplier • Cost • Impact
                </text>

                {/* Part rows */}
                <rect x="22" y="54" width="196" height="18" fill="none" stroke="#2E8B8B" strokeWidth="1.2" opacity="0.5" rx="2" />
                <circle cx="36" cy="63" r="3" fill="#2E8B8B" opacity="0.7" />
                <line x1="48" y1="63" x2="210" y2="63" stroke="#2E8B8B" strokeWidth="1" opacity="0.4" />

                <rect x="22" y="78" width="196" height="18" fill="none" stroke="#2E8B8B" strokeWidth="1.2" opacity="0.5" rx="2" />
                <circle cx="36" cy="87" r="3" fill="#2E8B8B" opacity="0.7" />
                <line x1="48" y1="87" x2="210" y2="87" stroke="#2E8B8B" strokeWidth="1" opacity="0.4" />

                <rect x="22" y="102" width="196" height="18" fill="none" stroke="#2E8B8B" strokeWidth="1.2" opacity="0.5" rx="2" />
                <circle cx="36" cy="111" r="3" fill="#2E8B8B" opacity="0.7" />
                <line x1="48" y1="111" x2="210" y2="111" stroke="#2E8B8B" strokeWidth="1" opacity="0.4" />

                {/* More indicator */}
                <path d="M 120 130 L 120 145" stroke="#2E8B8B" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
                <text x="120" y="162" fontSize="10" fill={tokens.color.muted} textAnchor="middle" fontWeight="500">
                  Complete supply chain view
                </text>
              </svg>
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: "0 0 8px", position: "relative", zIndex: 1 }}>
                Complete BOM View
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: tokens.color.body, margin: 0, lineHeight: tokens.leading.normal, position: "relative", zIndex: 1 }}>
                All parts, suppliers, costs, and supply-chain exposure in one connected view.
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
