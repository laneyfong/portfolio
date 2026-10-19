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
import verisupplyBom from "./assets/verisupply-bom.mp4?url";
import verisupplyEngineering from "./assets/verisupply-engineering.mp4?url";
import verisupplyCompAnalysis from "./assets/verisupply-comp-analysis.png";

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
  "Led solo product strategy and design, architected three-layer decision engine (Monitor → Understand → Act) under 3-month timeline",
  "Validated through 15 rapid user interviews that decision-making confidence—not data visibility—unblocks procurement velocity",
  "Shipped MVP to Design Partner pilots with defensible AI-backed recommendations and transparent reasoning",
];

const PlatformWalkthrough: FC<{ verisupplyBom: string; verisupplyEngineering: string }> = ({ verisupplyBom, verisupplyEngineering }) => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    { id: 0, label: "BOM Analysis", title: "BOM Analysis & Risk Assessment", description: "Real-time monitoring of Bill of Materials with automated risk scoring and supplier dependency mapping.", src: verisupplyBom },
    { id: 1, label: "Engineering Changes", title: "Engineering Changes & Impact Tracking", description: "Track supplier engineering changes with downstream impact visualization to manufacturing and revenue.", src: verisupplyEngineering },
  ];

  const activeFeature = features[activeTab];

  return (
    <div className="feature-tabs">
      <div className="feature-tab-list" role="tablist">
        {features.map((feature) => (
          <button
            key={feature.id}
            className={`feature-tab ${activeTab === feature.id ? 'active' : ''}`}
            onClick={() => setActiveTab(feature.id)}
            role="tab"
            aria-selected={activeTab === feature.id}
            aria-controls={`panel-${feature.id}`}
            tabIndex={activeTab === feature.id ? 0 : -1}
          >
            {feature.label}
          </button>
        ))}
      </div>

      <div className="feature-video-container" role="tabpanel" id={`panel-${activeTab}`}>
        <video
          src={activeFeature.src}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "rgba(0, 0, 0, 0.2)" }}
          controls={false}
          autoPlay
          loop
          muted
          aria-label={`${activeFeature.title}: ${activeFeature.description}`}
        />
        <div className="feature-video-label">
          <p className="feature-video-title">{activeFeature.title}</p>
          <p className="feature-video-desc">{activeFeature.description}</p>
        </div>
      </div>
    </div>
  );
};

const MarketAnalysisGallery: FC<{ verisupplyCompAnalysis: string; tokens: any }> = ({ verisupplyCompAnalysis, tokens }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const takeaways = [
    "Moves procurement teams from weeks of supplier research to hours of informed decision-making—without sacrificing due diligence",
    "Gives procurement leaders the data-backed confidence to defend every decision to finance, operations, and executives",
    "Removes human bias from supplier selection by automating quality, delivery, and sustainability scoring across the entire supply chain",
  ];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <button
          style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: 0,
            width: "100%",
          }}
          onClick={() => setIsExpanded(true)}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.15)";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.02)";
          }}
          aria-label="Expand competitive analysis view"
        >
          <img src={verisupplyCompAnalysis} alt="Competitive analysis spreadsheet showing feature comparison across supply chain monitoring platforms" style={{ width: "100%", height: "auto", display: "block" }} />
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(8px)",
              color: "rgba(255, 255, 255, 0.8)",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "12px",
              fontFamily: tokens.font.sans,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              letterSpacing: "0.3px",
              fontWeight: 500,
            }}
          >
            Click to expand
          </div>
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: "-0.05em" }}>
            Why this drives better outcomes
          </p>
          {takeaways.map((takeaway, idx) => (
            <div key={idx} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4060C8", flexShrink: 0, marginTop: 6 }} aria-hidden="true" />
              <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: "13px", color: "var(--text-secondary)", lineHeight: tokens.leading.normal }}>
                {takeaway}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isExpanded && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(2px)",
          }}
          onClick={() => setIsExpanded(false)}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
            <img src={verisupplyCompAnalysis} alt="Expanded competitive analysis showing detailed feature matrix and strategic positioning of VeriSupply versus competitors" style={{ width: "100%", height: "auto", borderRadius: "12px" }} />
            <button
              onClick={() => setIsExpanded(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.1)";
              }}
              aria-label="Close expanded view"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const VeriSupplyCaseStudy: FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const sessionKey = "verisupply_unlocked";
    // Clear the unlock state to always show password protection
    sessionStorage.removeItem(sessionKey);
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
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: "var(--text-muted)" }}>
              When every decision has a deadline.
            </span>
          </div>
          <h1
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: "var(--text-dark)",
              lineHeight: tokens.leading.snug,
              margin: "0 0 20px",
              maxWidth: 480,
            }}
          >
            I designed a <Italic>high-stakes decision engine</Italic> for procurement teams operating under extreme time pressure.
          </h1>

          <div className="case-study-tags" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            {TAGS.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>

          <Reveal>
            <SnapshotBar
              items={[
                { label: "Role", value: "Lead Product Designer & Strategy Owner" },
                { label: "Team", value: "Solo Designer · Worked alongside CEO · 3 Engineers" },
                { label: "Timeline", value: "3 months" },
                { label: "Stage", value: "MVP → Design Partner Pilot" },
              ]}
            />
          </Reveal>

          <Reveal>
            <div style={{ marginBottom: 80, width: "100%", overflow: "hidden", borderRadius: "12px" }}>
              <img
                src={verisupplyThumbnail}
                alt="VeriSupply dashboard showing real-time supply chain monitoring with risk indicators and dependency visualization"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "12px",
                }}
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
              <FeatureCard title="The Conflict">
                Procurement leaders are drowning in data but paralyzed by uncertainty. More information ≠ faster decisions.
              </FeatureCard>
              <FeatureCard title="My Insight">
                Confidence, not visibility, unblocks decision-making velocity. Teams need transparent reasoning they can defend—not black-box recommendations.
              </FeatureCard>
              <FeatureCard title="My Bet">
                Design a decision engine that surfaces AI-backed recommendations with transparent reasoning—fast enough to move in real-time, defensible enough to survive executive scrutiny.
              </FeatureCard>
            </div>
          </Reveal>
        </Reveal>
      </section>

      {/* Problem */}
      <section id="problem" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: "var(--text-muted)" }}>
              Understanding the landscape
            </span>
          </div>
        </Reveal>
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: "var(--text-dark)",
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            I diagnosed the bottleneck: Data abundance creates <Italic>decision paralysis</Italic>.
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 48, marginBottom: 60, alignItems: "stretch" }}>
            {/* Before */}
            <div style={{ borderRadius: tokens.radius.md, padding: 40 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", margin: "0 0 24px", letterSpacing: "-0.02em" }}>
                WITHOUT CONFIDENCE ENGINE
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#DC2626", fontWeight: "bold", marginTop: 2 }}>✕</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>50+ page supplier reports</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#DC2626", fontWeight: "bold", marginTop: 2 }}>✕</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>2-4 weeks per decision</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#DC2626", fontWeight: "bold", marginTop: 2 }}>✕</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>Can't defend to executives</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#DC2626", fontWeight: "bold", marginTop: 2 }}>✕</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>Human bias in scoring</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#DC2626", fontWeight: "bold", marginTop: 2 }}>✕</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>Analysis paralysis</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div style={{ borderRadius: tokens.radius.md, padding: 40, background: "rgba(16, 185, 129, 0.03)" }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", margin: "0 0 24px", letterSpacing: "-0.02em" }}>
                WITH VERISUPPLY
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#10B981", fontWeight: "bold", marginTop: 2 }}>✓</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>Glanceable dashboard</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#10B981", fontWeight: "bold", marginTop: 2 }}>✓</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>2-4 hours per decision</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#10B981", fontWeight: "bold", marginTop: 2 }}>✓</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>Data-backed reasoning</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#10B981", fontWeight: "bold", marginTop: 2 }}>✓</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>Automated scoring</p>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ color: "#10B981", fontWeight: "bold", marginTop: 2 }}>✓</span>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0, lineHeight: tokens.leading.snug }}>Confident action</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Callout>AI should inform the decision. It should never make it for you.</Callout>
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: "var(--text-muted)" }}>
              What teams actually needed
            </span>
          </div>
        </Reveal>
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: "var(--text-dark)",
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            I reframed through rapid iteration: Decision-making <Italic>confidence</Italic>, not data, unblocks velocity.
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ background: "rgba(16, 185, 129, 0.05)", borderRadius: tokens.radius.md, padding: 28, marginBottom: 48 }}>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              RESEARCH METHODOLOGY
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 4px" }}>15 rapid interviews</p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>Procurement leaders across manufacturing, logistics, and tech</p>
              </div>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 4px" }}>Top 5 competitor analysis</p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>Direct and indirect competitors in supply-chain visibility</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", lineHeight: tokens.leading.normal, marginBottom: 48, maxWidth: 700 }}>
            This uncovered three universal truths that forced a ruthless MVP scope decision:
          </p>
        </Reveal>

        <Reveal>
          <style>{`
            .truth-item {
              border-radius: tokens.radius.md;
              transition: all 0.2s ease;
            }

            .truth-item:hover {
              background: rgba(64, 96, 200, 0.06);
              transform: translateY(-2px);
            }

            @media (max-width: 768px) {
              .truths-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="truths-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginBottom: 60 }}>
            <div className="truth-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: 32, borderRadius: tokens.radius.md }}>
              <svg className="truth-icon" width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 20 }} aria-hidden="true">
                <g fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Bucket overflowing with data */}
                  <path d="M 20 60 L 25 30 L 55 30 L 60 60 Z" />
                  <path d="M 25 30 L 22 20 M 40 30 L 40 18 M 55 30 L 58 20" strokeWidth="2" opacity="0.7" />
                  <circle cx="30" cy="25" r="3" fill="#06B6D4" opacity="0.8" />
                  <circle cx="40" cy="20" r="3" fill="#06B6D4" opacity="0.8" />
                  <circle cx="50" cy="27" r="3" fill="#06B6D4" opacity="0.8" />
                  <circle cx="35" cy="35" r="2.5" fill="#06B6D4" opacity="0.6" />
                  <circle cx="45" cy="38" r="2.5" fill="#06B6D4" opacity="0.6" />
                  {/* X mark */}
                  <path d="M 20 45 L 30 55 M 30 45 L 20 55" stroke="#FF6B6B" strokeWidth="2.5" />
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 8px" }}>
                More data ≠ faster decisions
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                "Don't give me another place to look — tell me what matters."
              </p>
            </div>

            <div className="truth-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <svg className="truth-icon" width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 20 }} aria-hidden="true">
                <g fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Hourglass */}
                  <path d="M 25 20 L 25 35 Q 25 40 40 40 Q 55 40 55 35 L 55 20 Z" />
                  <path d="M 25 60 L 25 45 Q 25 40 40 40 Q 55 40 55 45 L 55 60 Z" />
                  <path d="M 20 40 L 60 40" strokeWidth="2" />
                  {/* Sand falling */}
                  <circle cx="40" cy="42" r="2" fill="#F59E0B" opacity="0.8" />
                  <circle cx="38" cy="46" r="1.5" fill="#F59E0B" opacity="0.6" />
                  <circle cx="42" cy="46" r="1.5" fill="#F59E0B" opacity="0.6" />
                  {/* Edges */}
                  <path d="M 25 20 L 55 20 M 25 60 L 55 60" strokeWidth="1.5" opacity="0.5" />
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 8px" }}>
                Time is their scarcest resource
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                "We need it condensed to what actually matters."
              </p>
            </div>

            <div className="truth-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <svg className="truth-icon" width="80" height="80" viewBox="0 0 80 80" style={{ marginBottom: 20 }} aria-hidden="true">
                <g fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Locked box (black box) */}
                  <rect x="22" y="28" width="36" height="28" rx="3" />
                  {/* Padlock */}
                  <path d="M 33 38 Q 33 32 40 32 Q 47 32 47 38" />
                  <circle cx="40" cy="48" r="2.5" fill="#8B5CF6" />
                  <path d="M 40 48 L 40 53" strokeWidth="2" />
                  {/* Checkmark (reasoning visible) */}
                  <g transform="translate(58, 50)">
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#10B981" strokeWidth="2" />
                    <path d="M -6 0 L -2 4 L 6 -4" stroke="#10B981" strokeWidth="2.5" />
                  </g>
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 8px" }}>
                Reasoning beats black boxes
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
                "We need the data behind it to defend the decision."
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ background: "var(--surface-light)", padding: "40px", borderRadius: tokens.radius.md, marginBottom: 60 }}>
            <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 24px" }}>
              What Teams Actually Said
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "Don't give me another place to look — tell me what matters."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>
                  Strategic Sourcing Lead at Fortune 500 Manufacturer
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "People don't have time to read 50-page reports. We need it condensed to what actually matters."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>
                  Operations Director, Supply Chain
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 8px", lineHeight: tokens.leading.snug }}>
                  "An AI recommendation is good, but we need the data and reasoning behind it so we can defend the decision."
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>
                  VP Procurement, Tech Company
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <style>{`
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(24px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .gap-card {
              animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              opacity: 0;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .gap-card:nth-child(1) { animation-delay: 0.05s; }
            .gap-card:nth-child(2) { animation-delay: 0.15s; }
            .gap-card:nth-child(3) { animation-delay: 0.25s; }
            .gap-card:nth-child(4) { animation-delay: 0.35s; }
            .gap-card:nth-child(5) { animation-delay: 0.45s; }

            .gap-card:hover {
              background: rgba(64, 96, 200, 0.06);
              transform: translateY(-6px);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            }

            .gap-icon {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .gap-card:hover .gap-icon {
              transform: scale(1.12) rotate(2deg);
            }

            @media (max-width: 768px) {
              .gaps-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="gaps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, marginTop: 0 }}>
            <div className="gap-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28, textAlign: "center", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg className="gap-icon" width="48" height="48" viewBox="0 0 48 48" style={{ marginBottom: 12 }} aria-hidden="true">
                <g fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="10" width="12" height="12" rx="1" />
                  <rect x="28" y="10" width="12" height="12" rx="1" />
                  <rect x="8" y="28" width="12" height="12" rx="1" />
                  <rect x="28" y="28" width="12" height="12" rx="1" />
                  <line x1="20" y1="16" x2="28" y2="16" opacity="0.3" strokeWidth="1.5" />
                  <line x1="20" y1="34" x2="28" y2="34" opacity="0.3" strokeWidth="1.5" />
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 6px" }}>
                Fragmentation
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: tokens.leading.snug }}>
                Data scattered across disconnected tools
              </p>
            </div>

            <div className="gap-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28, textAlign: "center", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg className="gap-icon" width="48" height="48" viewBox="0 0 48 48" style={{ marginBottom: 12 }} aria-hidden="true">
                <g fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 8 24 C 12 16 18 12 24 12 C 30 12 36 16 40 24" />
                  <circle cx="24" cy="24" r="4" />
                  <path d="M 8 24 C 12 32 18 36 24 36 C 30 36 36 32 40 24" opacity="0.3" />
                  <line x1="12" y1="20" x2="36" y2="28" opacity="0.4" strokeWidth="1.5" />
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 6px" }}>
                Invisibility
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: tokens.leading.snug }}>
                Tier 2+ suppliers unseen
              </p>
            </div>

            <div className="gap-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28, textAlign: "center", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg className="gap-icon" width="48" height="48" viewBox="0 0 48 48" style={{ marginBottom: 12 }} aria-hidden="true">
                <g fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="20" r="6" />
                  <path d="M 24 28 L 24 32 M 20 36 L 28 36" strokeWidth="2.5" />
                  <circle cx="24" cy="24" r="12" />
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 6px" }}>
                No Context
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: tokens.leading.snug }}>
                Risk without business impact
              </p>
            </div>

            <div className="gap-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28, textAlign: "center", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg className="gap-icon" width="48" height="48" viewBox="0 0 48 48" style={{ marginBottom: 12 }} aria-hidden="true">
                <g fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="24" r="14" />
                  <path d="M 24 14 L 24 24 L 32 32" />
                  <circle cx="24" cy="24" r="3" fill="#06B6D4" opacity="0.3" />
                  <path d="M 38 10 L 44 4 M 44 10 L 38 4" opacity="0.5" strokeWidth="2" />
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 6px" }}>
                Slow Action
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: tokens.leading.snug }}>
                Manual analysis misses windows
              </p>
            </div>

            <div className="gap-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28, textAlign: "center", minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg className="gap-icon" width="48" height="48" viewBox="0 0 48 48" style={{ marginBottom: 12 }} aria-hidden="true">
                <g fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 24 8 L 36 14 L 36 24 C 36 32 24 40 24 40 C 24 40 12 32 12 24 L 12 14 Z" />
                  <circle cx="28" cy="20" r="6" fill="none" strokeWidth="2" />
                  <path d="M 26 18 L 30 22 M 30 18 L 26 22" strokeWidth="2" opacity="0.6" />
                </g>
              </svg>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 6px" }}>
                Undefendable
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: tokens.leading.snug }}>
                Automation without evidence
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 80, marginBottom: 60 }}>
            <h3 style={{ margin: "0 0 8px", fontFamily: tokens.font.sans, fontSize: tokens.text.lg, fontWeight: tokens.weight.medium, color: "var(--text-dark)", letterSpacing: "-0.02em" }}>
              Real interface: Market analysis & supplier insights
            </h3>
            <p style={{ margin: "0 0 32px", fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", lineHeight: tokens.leading.normal, maxWidth: 700 }}>
              See how procurement teams use VeriSupply to analyze competitive alternatives and make data-backed supplier decisions with confidence.
            </p>

            <style>{`
              .market-image-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(2px);
              }

              .market-image-modal-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
              }

              .market-image-modal img {
                width: 100%;
                height: auto;
                display: block;
                border-radius: 12px;
              }

              .market-image-modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                transition: all 0.2s ease;
              }

              .market-image-modal-close:hover {
                background: rgba(255, 255, 255, 0.2);
              }
            `}</style>

            <MarketAnalysisGallery verisupplyCompAnalysis={verisupplyCompAnalysis} tokens={tokens} />
          </div>
        </Reveal>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: "var(--text-muted)" }}>
              The three-layer approach
            </span>
          </div>
        </Reveal>
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: "var(--text-dark)",
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            I architected a three-layer decision engine under extreme constraints: 3 months, one designer, built for real-time execution.
          </h2>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 700 }}>
            The design philosophy: <strong>Make complex supply-chain analysis as fast and glanceable as a TikTok feed.</strong> Your brain should never struggle to understand what matters. Every pixel had to earn its place.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ background: "rgba(64, 96, 200, 0.05)", borderRadius: tokens.radius.md, padding: 28, marginBottom: 48 }}>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              DESIGN UNDER EXTREME CONSTRAINTS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--text-dark)", fontWeight: "bold", marginTop: 2 }}>•</span>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0 }}>3 months (not 12)</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--text-dark)", fontWeight: "bold", marginTop: 2 }}>•</span>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0 }}>Solo designer (high autonomy)</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ color: "var(--text-dark)", fontWeight: "bold", marginTop: 2 }}>•</span>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: 0 }}>Real-time execution (not batch processing)</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <style>{`
            @keyframes flowBoxSlideIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes arrowDraw {
              from {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
              }
              to {
                stroke-dasharray: 100;
                stroke-dashoffset: 0;
              }
            }


            .solution-flow-box-1,
            .solution-flow-box-2,
            .solution-flow-box-3 {
              animation: flowBoxSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              opacity: 0;
              transition: all 0.2s ease;
              cursor: pointer;
            }

            .solution-flow-box-1 {
              animation-delay: 0.1s;
            }

            .solution-flow-box-2 {
              animation-delay: 0.3s;
            }

            .solution-flow-box-3 {
              animation-delay: 0.5s;
            }

            .solution-flow-box-1:hover,
            .solution-flow-box-2:hover,
            .solution-flow-box-3:hover {
              filter: drop-shadow(0 4px 12px rgba(64, 96, 200, 0.15));
              transform: translateY(-2px);
            }

            .solution-arrow {
              animation: arrowDraw 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
            }

            .solution-arrow:last-of-type {
              animation-delay: 0.4s;
            }


            @media (max-width: 768px) {
              .solution-flow {
                height: auto !important;
              }
            }
          `}</style>
          <svg className="solution-flow" width="100%" height="300" viewBox="0 0 1000 300" style={{ marginBottom: 60, maxWidth: "100%" }} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {/* Layer 1: Monitor - Real-time Detection */}
            <g className="solution-flow-box-1">
              <rect x="50" y="40" width="250" height="220" fill={"var(--surface-light)"} rx="12" />
              <g style={{ transform: "translate(175px, 90px)" }}>
                {/* Radar rings */}
                <circle cx="0" cy="0" r="24" fill="none" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.3" />
                <circle cx="0" cy="0" r="16" fill="none" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <circle cx="0" cy="0" r="8" fill="none" stroke={tokens.color.accent} strokeWidth="2" opacity="0.7" />
                <circle cx="0" cy="0" r="4" fill={tokens.color.accent} />
              </g>
              <text x="175" y="165" fontSize="18" fill={"var(--text-dark)"} textAnchor="middle" fontWeight="500" fontFamily={tokens.font.sans}>
                Monitor
              </text>
              <text x="175" y="190" fontSize="14" fill={"var(--text-secondary)"} textAnchor="middle" fontFamily={tokens.font.sans}>
                Real-time
              </text>
              <text x="175" y="208" fontSize="14" fill={"var(--text-secondary)"} textAnchor="middle" fontFamily={tokens.font.sans}>
                detection & tracking
              </text>
            </g>

            {/* Arrow 1 */}
            <g className="solution-arrow">
              <path d="M 310 150 L 365 150" stroke={tokens.color.accent} strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="365,150 377,145 377,155" fill={tokens.color.accent} />
            </g>

            {/* Layer 2: Understand - AI with Transparency */}
            <g className="solution-flow-box-2">
              <rect x="385" y="40" width="250" height="220" fill={"var(--surface-light)"} rx="12" />
              <g style={{ transform: "translate(510px, 95px)" }}>
                {/* Gear icon */}
                <g>
                  <circle cx="0" cy="0" r="5" fill={tokens.color.accent} />
                  <path d="M 0,-16 L 2,-10 L 8,-12 L 5,-8 L 8,-2 L 2,-4 L 0,2 L -2,-4 L -8,-2 L -5,-8 L -8,-12 L -2,-10 Z" fill={tokens.color.accent} opacity="0.7" />
                </g>
                {/* Document/reasoning symbol */}
                <rect x="16" y="-12" width="12" height="16" fill="none" stroke={tokens.color.accent} strokeWidth="1.5" rx="1" opacity="0.6" />
                <line x1="18" y1="-8" x2="26" y2="-8" stroke={tokens.color.accent} strokeWidth="1" opacity="0.5" />
                <line x1="18" y1="-4" x2="26" y2="-4" stroke={tokens.color.accent} strokeWidth="1" opacity="0.5" />
              </g>
              <text x="510" y="165" fontSize="18" fill={"var(--text-dark)"} textAnchor="middle" fontWeight="500" fontFamily={tokens.font.sans}>
                Understand
              </text>
              <text x="510" y="190" fontSize="14" fill={"var(--text-secondary)"} textAnchor="middle" fontFamily={tokens.font.sans}>
                AI analysis with
              </text>
              <text x="510" y="208" fontSize="14" fill={"var(--text-secondary)"} textAnchor="middle" fontFamily={tokens.font.sans}>
                transparent reasoning
              </text>
            </g>

            {/* Arrow 2 */}
            <g className="solution-arrow">
              <path d="M 635 150 L 690 150" stroke={tokens.color.accent} strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="690,150 702,145 702,155" fill={tokens.color.accent} />
            </g>

            {/* Layer 3: Act - Confident Decisions */}
            <g className="solution-flow-box-3">
              <rect x="700" y="40" width="250" height="220" fill={"var(--surface-light)"} rx="12" />
              <g style={{ transform: "translate(825px, 95px)" }}>
                {/* Decision circle with checkmark */}
                <circle cx="0" cy="0" r="20" fill="#10B981" opacity="0.15" />
                <circle cx="0" cy="0" r="20" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.5" />
                <path d="M -8 0 L -2 6 L 10 -6" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="825" y="165" fontSize="18" fill={"var(--text-dark)"} textAnchor="middle" fontWeight="500" fontFamily={tokens.font.sans}>
                Act
              </text>
              <text x="825" y="190" fontSize="14" fill={"var(--text-secondary)"} textAnchor="middle" fontFamily={tokens.font.sans}>
                Confident, defensible
              </text>
              <text x="825" y="208" fontSize="14" fill={"var(--text-secondary)"} textAnchor="middle" fontFamily={tokens.font.sans}>
                decisions with evidence
              </text>
            </g>
          </svg>
        </Reveal>

        <Callout>Decision support with evidence to increase confidence.</Callout>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 40 }}>
            <div>
              <h3 style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.lg, fontWeight: tokens.weight.medium, color: "var(--text-dark)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                Platform in action
              </h3>
              <p style={{ margin: 0, fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", lineHeight: tokens.leading.normal, maxWidth: 700 }}>
                See how VeriSupply transforms raw supply-chain data into actionable insights. The platform combines real-time monitoring, impact assessment, and decision support to help procurement teams act with confidence.
              </p>
            </div>

            <style>{`
              .feature-tabs {
                display: flex;
                flex-direction: column;
                gap: 24px;
              }

              .feature-tab-list {
                display: flex;
                flex-direction: row;
                gap: 12px;
                flex-wrap: wrap;
              }

              .feature-tab {
                padding: 10px 18px;
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 20px;
                background: rgba(255, 255, 255, 0.05);
                font-family: ${tokens.font.sans};
                font-size: ${tokens.text.sm};
                font-weight: ${tokens.weight.medium};
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                text-align: center;
                white-space: nowrap;
              }

              .feature-tab:hover {
                background: rgba(64, 96, 200, 0.15);
                color: var(--text-dark);
                border-color: rgba(64, 96, 200, 0.3);
              }

              .feature-tab.active {
                background: #4060C8;
                color: white;
                border-color: #4060C8;
              }

              .feature-video-container {
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.08);
                aspect-ratio: 16 / 9;
                animation: fadeInScale 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              }

              .feature-video-container video,
              .feature-video-container img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
                background: rgba(0, 0, 0, 0.2);
              }

              .feature-video-label {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2), transparent);
                padding: 32px 24px 24px;
              }

              .feature-video-label p {
                margin: 0;
                font-family: ${tokens.font.sans};
              }

              .feature-video-title {
                font-size: 14px;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 6px;
              }

              .feature-video-desc {
                font-size: 13px;
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.5;
              }

              @keyframes fadeInScale {
                from {
                  opacity: 0;
                  transform: scale(0.98);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              @media (max-width: 768px) {
                .feature-tab-list {
                  gap: 8px;
                }

                .feature-tab {
                  padding: 8px 14px;
                  font-size: 13px;
                }

                .feature-video-container {
                  aspect-ratio: 16 / 9;
                }
              }
            `}</style>

            <PlatformWalkthrough verisupplyBom={verisupplyBom} verisupplyEngineering={verisupplyEngineering} />
          </div>
        </Reveal>
      </section>

      {/* Design */}
      <section id="design" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.regular, color: "var(--text-muted)" }}>
              Building for clarity under pressure
            </span>
          </div>
        </Reveal>
        <Reveal dramatic>
          <h2
            style={{
              fontFamily: tokens.font.sans,
              fontWeight: tokens.weight.medium,
              fontSize: tokens.text.xl,
              color: "var(--text-dark)",
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            I designed every pixel for confident decision-making in high-stakes moments
          </h2>
        </Reveal>

        <Reveal>
          <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", lineHeight: tokens.leading.normal, marginBottom: 32, maxWidth: 700 }}>
            Enterprise supply-chain data is inherently dense. Most tools overwhelm users with information architecture. My approach inverted this: ruthless information hierarchy (what's actionable vs. context), AI-driven recommendations with transparent reasoning (no black boxes), and micro-interactions that reward fast scanning. Every interface teaches the user's mental model in under 3 seconds.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ background: "rgba(139, 92, 246, 0.05)", borderRadius: tokens.radius.md, padding: 28, marginBottom: 48 }}>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              KEY DESIGN PRINCIPLES
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 4px", fontWeight: 500 }}>Information Hierarchy</p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>80% actionable, 20% context</p>
              </div>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 4px", fontWeight: 500 }}>Transparent Reasoning</p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>AI with evidence, not black boxes</p>
              </div>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 4px", fontWeight: 500 }}>Fast Scanning</p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>Micro-interactions guide attention</p>
              </div>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-dark)", margin: "0 0 4px", fontWeight: 500 }}>3-Second Mental Model</p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-muted)", margin: 0 }}>Every interface self-teaches</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <style>{`
            @keyframes designCardSlideIn {
              from {
                opacity: 0;
                transform: translateY(24px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .design-card {
              animation: designCardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              opacity: 0;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .design-card:nth-child(1) { animation-delay: 0.15s; }
            .design-card:nth-child(2) { animation-delay: 0.25s; }
            .design-card:nth-child(3) { animation-delay: 0.35s; }
            .design-card:nth-child(4) { animation-delay: 0.45s; }

            .design-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 12px 32px rgba(64, 96, 200, 0.1);
              border-color: rgba(64, 96, 200, 0.2);
            }

            .design-card svg {
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .design-card:hover svg {
              filter: brightness(1.05);
            }

            @media (max-width: 768px) {
              .design-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
          <div className="design-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
            {/* Dashboard */}
            <div className="design-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 32, minHeight: 280, border: "1px solid rgba(64, 96, 200, 0)" }}>
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }} aria-hidden="true">
                {/* Frame */}
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
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 8px" }}>
                    Dashboard
                  </h3>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.normal }}>
                    Central hub showing AI summary, priorities, business impact, and supply-chain risk map. One screen to see what matters most.
                  </p>
                </div>
              </div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "11px", color: "var(--text-muted)", margin: "12px 0 0", padding: "8px 12px", background: "rgba(64, 96, 200, 0.05)", borderRadius: "4px", borderLeft: "2px solid var(--text-muted)" }}>
                ↪ Directly addresses: <em>"Don't give me another place to look — tell me what matters."</em>
              </p>
            </div>

            {/* Engineering Changes */}
            <div className="design-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 32, minHeight: 280, border: "1px solid rgba(64, 96, 200, 0)" }}>
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
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 8px" }}>
                Engineering Changes
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.normal }}>
                Automatically links design changes to supplier and sourcing impact. Catch risks before they become problems.
              </p>
            </div>

            {/* Supplier Comparison */}
            <div className="design-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 32, minHeight: 280, border: "1px solid rgba(64, 96, 200, 0)" }}>
              <svg width="100%" height="180" viewBox="0 0 240 180" style={{ marginBottom: 16 }} aria-hidden="true">
                {/* Option A */}
                <rect x="10" y="12" width="60" height="140" fill={tokens.color.accent} opacity="0.08" rx="4" />
                <line x1="18" y1="25" x2="52" y2="25" stroke={tokens.color.accent} strokeWidth="2" />
                <line x1="18" y1="35" x2="52" y2="35" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="18" y1="45" x2="52" y2="45" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />
                <line x1="18" y1="55" x2="52" y2="55" stroke={tokens.color.accent} strokeWidth="1.5" opacity="0.5" />

                {/* Option B - Highlighted */}
                <rect x="80" y="12" width="60" height="140" fill={tokens.color.accent} opacity="0.12" rx="4" />
                <rect x="78" y="10" width="64" height="144" fill="none" rx="5" />
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
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 8px" }}>
                    Supplier Comparison
                  </h3>
                  <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.normal }}>
                    AI-generated options with cost, quality, and risk tradeoffs side-by-side. Every recommendation includes an expandable <strong>Trace Evidence</strong> drawer linking back to raw ERP metrics and sourcing history.
                  </p>
                </div>
              </div>
              <p style={{ fontFamily: tokens.font.sans, fontSize: "11px", color: "var(--text-muted)", margin: "12px 0 0", padding: "8px 12px", background: "rgba(64, 96, 200, 0.05)", borderRadius: "4px", borderLeft: "2px solid var(--text-muted)" }}>
                ↪ Addresses: <em>"We need the data and reasoning behind it so we can defend the decision."</em> — Defendable AI by design.
              </p>
            </div>

            {/* Bill of Materials */}
            <div className="design-card" style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 32, minHeight: 280, border: "1px solid rgba(64, 96, 200, 0)" }}>
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
              <h3 style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, fontWeight: tokens.weight.medium, color: "var(--text-dark)", margin: "0 0 8px" }}>
                Bill of Materials
              </h3>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.normal }}>
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
              color: "var(--text-dark)",
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            I mapped a phased go-to-market: From MVP validation to Design Partner pilots
          </h2>
        </Reveal>

        <Reveal>
          <div style={{ background: "var(--surface-light)", padding: "40px", borderRadius: tokens.radius.md, marginBottom: 60 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P0: Discovery & Definition
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0 }}>
                  1–2 months
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  User research, problem validation, MVP scope definition, success metrics, technical requirements
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P1: Prototyping & Validation
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0 }}>
                  0.5–1 month
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  Low-fidelity prototype, usability testing, workflow validation, core feature prioritization
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P2: Design Partner Pilot
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0 }}>
                  2–3 months
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: "var(--text-secondary)", margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  High-fidelity design, design partner feedback loops, iterative refinement, edge-case discovery
                </p>
              </div>

              <div>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 8px" }}>
                  P3: Scale & Launch
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: 0 }}>
                  3+ months
                </p>
                <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, color: "var(--text-secondary)", margin: "8px 0 0", lineHeight: tokens.leading.snug }}>
                  Full product build, feature expansion, performance tuning, GTM preparation
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
              color: "var(--text-dark)",
              margin: "0 0 40px",
              lineHeight: tokens.leading.snug,
            }}
          >
            I learned: Problem reframing beats perfect execution, and every pixel should serve the user
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
            <div style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Ask the Right Questions
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.snug }}>
                My hypothesis reframing shifted everything. I discovered that teams didn't need more visibility—they needed confidence in their decisions backed by data.
              </p>
            </div>

            <div style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Validate Early, Validate Often
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.snug }}>
                My rapid prototyping and user testing uncovered critical workflow gaps before engineering. Saved months of development rework.
              </p>
            </div>

            <div style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Design for Outcomes, Not Features
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.snug }}>
                I pivoted the entire product strategy from "build a database" to "enable confident decisions." Strategic design choices drove business impact.
              </p>
            </div>

            <div style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Thought Leadership & Finding Your Audience
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.snug }}>
                Understanding procurement teams' pain points meant becoming fluent in their language, their constraints, and their strategic priorities. The best product strategy comes from seeking the right audience and truly understanding what drives their decisions.
              </p>
            </div>

            <div style={{ background: "var(--surface-light)", borderRadius: tokens.radius.md, padding: 28 }}>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.sm, fontWeight: tokens.weight.medium, color: "var(--text-muted)", letterSpacing: tokens.tracking.tight, margin: "0 0 12px" }}>
                Speed Beats Perfection
              </p>
              <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: "var(--text-secondary)", margin: 0, lineHeight: tokens.leading.snug }}>
                Shipping a 3-month MVP that solved the core problem (decision confidence under time pressure) proved far more valuable than 12 months of perfect architecture. Iteration with real users beats theoretical optimization every time.
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
