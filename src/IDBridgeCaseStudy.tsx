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
  PullQuote,
  Bullets,
} from "./components/caseStudy/CaseStudyKit";
import IconHighlight from "./components/caseStudy/IconHighlight";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import idbridgeThumbnail from "./assets/idbridge-thumbnail.png";
import idbridgeDocuments from "./assets/idbridge-documents.png";
import idbridgeHistory from "./assets/idbridge-history.png";
import idbridgeMap from "./assets/idbridge-map.png";

const SECTIONS: CaseSection[] = [
  { id: "intro", label: "Intro" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "solution", label: "Solution" },
  { id: "reflection", label: "Reflection" },
];

const TAGS = ["Social Impact", "Accessibility", "AI Integration", "Hackathon Winner"];

const HIGHLIGHTS = [
  "Won first place at Google x UCSC Designathon among competing teams",
  "Designed an offline-first, privacy-centered app in 6 hours for unhoused individuals",
  "Explored AI's role in accelerating research, ideation, and design while identifying its limitations",
];

const IDBridgeCaseStudy: FC = () => {
  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS}>
      {/* Intro */}
      <section id="intro" style={{ paddingBottom: 96 }} className="section-reveal">
        <Kicker>Social impact design under pressure.</Kicker>
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
          Designing a <Italic>verified identity platform</Italic> for unhoused individuals in 6 hours.
        </h1>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {TAGS.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </div>

        <Reveal>
          <SnapshotBar
            items={[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "4 designers · 1 engineer · 1 PM" },
              { label: "Timeline", value: "6 hours (Oct 2025)" },
              { label: "Result", value: "🥇 First Place Winner" },
            ]}
          />
        </Reveal>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            <FeatureCard title="Problem">
              Unhoused individuals struggle to access long-term housing because they lack verifiable identification and documentation.
            </FeatureCard>
            <FeatureCard title="Solution">
              A privacy-first, offline-friendly platform that helps users create a verified document trail and connect with social workers.
            </FeatureCard>
            <FeatureCard title="Approach">
              Explored how AI could accelerate research and ideation while identifying its limitations in empathy-driven design.
            </FeatureCard>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <style>{`
            @keyframes zoomInHome {
              0% { opacity: 1; transform: scale(1); }
              22% { opacity: 1; transform: scale(1); }
              25% { opacity: 0; transform: scale(1.1); }
              100% { opacity: 0; transform: scale(1.1); }
            }

            @keyframes zoomDocuments {
              0% { opacity: 0; transform: scale(0.95); }
              25% { opacity: 1; transform: scale(0.95); }
              48% { opacity: 1; transform: scale(1.05); }
              50% { opacity: 0; transform: scale(1.05); }
              100% { opacity: 0; transform: scale(1.05); }
            }

            @keyframes zoomHistory {
              0% { opacity: 0; transform: scale(0.95); }
              50% { opacity: 1; transform: scale(0.95); }
              72% { opacity: 1; transform: scale(1.08); }
              75% { opacity: 0; transform: scale(1.08); }
              100% { opacity: 0; transform: scale(1.08); }
            }

            @keyframes zoomMap {
              0% { opacity: 0; transform: scale(0.95); }
              75% { opacity: 1; transform: scale(0.95); }
              98% { opacity: 1; transform: scale(1.06); }
              100% { opacity: 0; transform: scale(1); }
            }

            .carousel-background {
              width: 100%;
              background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
              padding: 60px 20px;
              border-radius: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 500px;
              margin-bottom: 40px;
              position: relative;
              overflow: hidden;
            }

            .carousel-container {
              position: relative;
              width: 100%;
              max-width: 320px;
              height: 620px;
            }

            .carousel-slide {
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .carousel-slide:nth-child(1) {
              animation: zoomInHome 10s infinite;
            }

            .carousel-slide:nth-child(2) {
              animation: zoomDocuments 10s infinite;
            }

            .carousel-slide:nth-child(3) {
              animation: zoomHistory 10s infinite;
            }

            .carousel-slide:nth-child(4) {
              animation: zoomMap 10s infinite;
            }

            .carousel-slide img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              will-change: transform;
            }

            .carousel-label {
              position: absolute;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-family: 'Manrope', sans-serif;
              font-size: 12px;
              font-weight: 500;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              opacity: 0;
              animation: labelFade 10s infinite;
              z-index: 5;
            }

            @keyframes labelFade {
              0% { opacity: 0; }
              10% { opacity: 1; }
              22% { opacity: 1; }
              25% { opacity: 0; }
              100% { opacity: 0; }
            }

            .carousel-label:nth-of-type(1) { animation-delay: 0s; }
            .carousel-label:nth-of-type(2) { animation-delay: 2.5s; animation: labelFade2 10s infinite; }
            .carousel-label:nth-of-type(3) { animation-delay: 5s; animation: labelFade3 10s infinite; }
            .carousel-label:nth-of-type(4) { animation-delay: 7.5s; animation: labelFade4 10s infinite; }

            @keyframes labelFade2 {
              0% { opacity: 0; }
              25% { opacity: 0; }
              27% { opacity: 1; }
              48% { opacity: 1; }
              50% { opacity: 0; }
              100% { opacity: 0; }
            }

            @keyframes labelFade3 {
              0% { opacity: 0; }
              50% { opacity: 0; }
              52% { opacity: 1; }
              72% { opacity: 1; }
              75% { opacity: 0; }
              100% { opacity: 0; }
            }

            @keyframes labelFade4 {
              0% { opacity: 0; }
              75% { opacity: 0; }
              77% { opacity: 1; }
              98% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>

          <div className="carousel-background">
            <div className="carousel-container">
              <div className="carousel-slide">
                <img src={idbridgeThumbnail} alt="Home screen" />
              </div>
              <div className="carousel-slide">
                <img src={idbridgeDocuments} alt="Documents screen" />
              </div>
              <div className="carousel-slide">
                <img src={idbridgeHistory} alt="History screen" />
              </div>
              <div className="carousel-slide">
                <img src={idbridgeMap} alt="Map screen" />
              </div>
              <div className="carousel-label">Verify Identity</div>
              <div className="carousel-label">Upload Documents</div>
              <div className="carousel-label">Track Progress</div>
              <div className="carousel-label">Find Shelter</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Context */}
      <section id="context" style={{ paddingTop: 120, paddingBottom: 120, borderTop: `1px solid ${tokens.color.cardBorder}` }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Context</SectionHeading>
          <SkillRow items={["User Research", "Problem Definition", "Empathy Mapping"]} />
        </Reveal>

        <Callout>The barrier to housing is identity verification.</Callout>
        <Paragraph>
          Unhoused individuals face systemic barriers when accessing shelter and housing. Beyond availability and cost, the most overlooked obstacle is documentation — without verifiable identity, referrals, and proof of eligibility, the path to permanent housing becomes nearly impossible to navigate.
        </Paragraph>

        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <Kicker>User pain points from research</Kicker>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${tokens.color.cardBorder}`,
                  backgroundColor: tokens.color.offWhite,
                }}
              >
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.muted,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Wasted Resources
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: tokens.font.serifItalic,
                    fontSize: tokens.text.base,
                    fontStyle: "italic",
                    lineHeight: tokens.leading.normal,
                    color: tokens.color.ink,
                  }}
                >
                  "I walked four miles with a backpack and a hurt knee to get to a shelter that their website said had beds, only to be told they've been full since 4 PM."
                </p>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.sm,
                    color: tokens.color.muted,
                  }}
                >
                  — Unhoused individual
                </p>
              </div>

              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${tokens.color.cardBorder}`,
                  backgroundColor: tokens.color.offWhite,
                }}
              >
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.muted,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Lost Identity
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: tokens.font.serifItalic,
                    fontSize: tokens.text.base,
                    fontStyle: "italic",
                    lineHeight: tokens.leading.normal,
                    color: tokens.color.ink,
                  }}
                >
                  "If you lose your ID, you lose your life. Nothing starts without it, and replacing it is a loop that takes months and money I don't have."
                </p>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.sm,
                    color: tokens.color.muted,
                  }}
                >
                  — Unhoused individual
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Callout>The core challenge</Callout>
        <Paragraph>
          How might we build trust-centered, accessible tools that help unhoused individuals verify their identity and eligibility so they can more easily secure long-term housing?
        </Paragraph>
      </section>

      {/* Research */}
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120, borderTop: `1px solid ${tokens.color.cardBorder}` }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Research</SectionHeading>
          <SkillRow items={["Literature Review", "Reddit Research", "AI-Assisted Synthesis"]} />
        </Reveal>

        <Callout>Using AI to accelerate discovery</Callout>
        <Paragraph>
          With only 6 hours, we used Gemini to condense research papers and Reddit to validate real user experiences. This allowed us to rapidly identify patterns without losing human insight.
        </Paragraph>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
            <IconHighlight
              icon="📊"
              title="Key Finding: Documentation is the Barrier"
              description="In the California Statewide Study of People Experiencing Homelessness (2023), more than 53% of participants noted a lack of documents as a barrier to finding permanent housing."
            />
            <IconHighlight
              icon="🔍"
              title="Recurring Pain Point"
              description="Across multiple Reddit threads, unhoused individuals consistently described losing their ID as the moment they 'lost their life'—without it, every door closes."
            />
          </div>
        </Reveal>

        <Callout>AI's role in research: Pros and cons</Callout>
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: 20,
                borderRadius: tokens.radius.md,
                border: `1px solid #22C55E40`,
                backgroundColor: "#22C55E08",
              }}
            >
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "14px",
                  fontWeight: tokens.weight.medium,
                  color: "#16A34A",
                  marginBottom: 12,
                }}
              >
                ✓ Strengths
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <li style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  Speed & breadth of insights
                </li>
                <li style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  Bias detection & synthesis
                </li>
                <li style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  Accessible to resource-limited teams
                </li>
              </ul>
            </div>
            <div
              style={{
                padding: 20,
                borderRadius: tokens.radius.md,
                border: `1px solid #F87171` + "40",
                backgroundColor: "#F87171" + "08",
              }}
            >
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "14px",
                  fontWeight: tokens.weight.medium,
                  color: "#B91C1C",
                  marginBottom: 12,
                }}
              >
                ✗ Limitations
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <li style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  Loss of human context & empathy
                </li>
                <li style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  AI data mixed with real data = backtracking
                </li>
                <li style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body }}>
                  False authority & bias amplification
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Synthesis */}
      <section id="synthesis" style={{ paddingTop: 120, paddingBottom: 120, borderTop: `1px solid ${tokens.color.cardBorder}` }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Synthesis</SectionHeading>
          <SkillRow items={["Rapid Ideation", "Feature Prioritization", "Information Architecture"]} />
        </Reveal>

        <Callout>From problems to features</Callout>
        <Paragraph>
          We identified five core features that directly address the barriers unhoused individuals face: verification, next-step guidance, shelter availability, offline access, and social worker connection.
        </Paragraph>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            <FeatureCard title="01 ID Verification">
              Upload documents and referrals with QR code history for quick, verifiable proof of identity.
            </FeatureCard>
            <FeatureCard title="02 Social Worker Connection">
              Chat-based access to representatives who provide next steps based on eligibility.
            </FeatureCard>
            <FeatureCard title="03 Shelter Listings">
              View nearby shelters with real-time availability so no more wasted trips.
            </FeatureCard>
          </div>
        </Reveal>

        <Callout>Design principles: Accessibility first</Callout>
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: 16,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.offWhite,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: 8 }}>📱</div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.ink }}>
                Offline-First
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: tokens.color.body, marginTop: 4 }}>
                No data plan required
              </div>
            </div>
            <div
              style={{
                padding: 16,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.offWhite,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: 8 }}>🔒</div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.ink }}>
                Privacy-First
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: tokens.color.body, marginTop: 4 }}>
                User controls what's shared
              </div>
            </div>
            <div
              style={{
                padding: 16,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.offWhite,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: 8 }}>🎯</div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.ink }}>
                Clear Authority
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "12px", color: tokens.color.body, marginTop: 4 }}>
                Inspired by gov't apps
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Solution */}
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120, borderTop: `1px solid ${tokens.color.cardBorder}` }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Solution</SectionHeading>
          <SkillRow items={["Product Design", "Prototyping", "Accessibility"]} />
        </Reveal>

        <Callout>ID Bridge: Verified identity, accessible housing</Callout>
        <Paragraph>
          The app connects unhoused individuals with the documentation and connections they need to access long-term housing—all in offline mode, all under user control.
        </Paragraph>

        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: 24,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: 12 }}>🆔</div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                ID Verification
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: 1.5 }}>
                Upload documents and referrals. QR code creates instant verification history.
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: 12 }}>👥</div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                Social Worker Connect
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: 1.5 }}>
                Chat with representatives for next steps based on eligibility.
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: 12 }}>🏠</div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                Shelter Listings
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: 1.5 }}>
                View availability and real-time bed counts. No more wasted trips.
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: tokens.radius.md,
                border: `1px solid ${tokens.color.cardBorder}`,
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: 12 }}>📍</div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.ink, marginBottom: 8 }}>
                Offline Navigation
              </div>
              <div style={{ fontFamily: tokens.font.sans, fontSize: "13px", color: tokens.color.body, lineHeight: 1.5 }}>
                Bus routes and maps work without data connection.
              </div>
            </div>
          </div>
        </Reveal>

        <Callout>Design Screens</Callout>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src={idbridgeThumbnail} alt="Home screen" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
              <span style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body, textAlign: "center" }}>Home</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src={idbridgeDocuments} alt="Documents screen" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
              <span style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body, textAlign: "center" }}>Documents</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src={idbridgeHistory} alt="History screen" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
              <span style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body, textAlign: "center" }}>History</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <img src={idbridgeMap} alt="Map screen" style={{ width: "100%", height: "auto", borderRadius: tokens.radius.md }} />
              <span style={{ fontFamily: tokens.font.sans, fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.body, textAlign: "center" }}>Map</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reflection */}
      <section id="reflection" style={{ paddingTop: 120, paddingBottom: 120, borderTop: `1px solid ${tokens.color.cardBorder}` }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>Reflection</SectionHeading>
        </Reveal>

        <PullQuote>Design cannot be replaced with AI — it lacks the empathy a human has for other humans.</PullQuote>

        <Callout>What we learned</Callout>
        <Bullets
          items={[
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>AI as a second brain: </strong>
              It accelerated research and ideation, but we had to manually verify AI-sourced data against real findings to avoid mixing false authority with lived experience.
            </>,
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>Speed vs. depth: </strong>
              Six hours forced us to prioritize ruthlessly. We focused on the core problem (verification + connection) and let secondary features fall away.
            </>,
            <>
              <strong style={{ fontWeight: tokens.weight.medium, color: tokens.color.textDark }}>Human-centered wins: </strong>
              The most resonant ideas emerged when we stepped back from AI suggestions and centered the actual lived experiences we'd researched.
            </>,
          ]}
        />

        <Callout>If we had more time…</Callout>
        <Bullets
          items={[
            "Conduct usability testing with real users to validate navigation and mental models",
            "Deeper survey research focused on trauma-informed design practices",
            "Expand the social worker dashboard and profile management features",
            "Accessibility audit (WCAG AAA) across the entire app",
          ]}
        />
      </section>
    </CaseStudyShell>
  );
};

export default IDBridgeCaseStudy;
