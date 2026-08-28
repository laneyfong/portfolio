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
} from "./components/caseStudy/CaseStudyKit";
import IconHighlight from "./components/caseStudy/IconHighlight";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import idbridgeScreenRecording from "./assets/idbridge-screen-recording.mp4";
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
            maxWidth: 440,
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

        <Reveal delay={100}>
          <div
            style={{
              marginBottom: 40,
              borderRadius: tokens.radius.md,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
          >
            <video
              src={idbridgeScreenRecording}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
              autoPlay
              playsInline
              loop
              muted
            />
          </div>
        </Reveal>

        <Reveal>
          <div style={{ marginBottom: 48, maxWidth: 600 }}>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 20 }}>
              <strong>The context:</strong> Unhoused individuals face systemic barriers to accessing shelter and housing. The most overlooked obstacle: they lack verifiable identity and documentation required by every housing program.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 20 }}>
              <strong>What made this unique:</strong> This was a 6-hour designathon with 0 prior research. Most teams would sketch surface solutions. We chose to spend the first 2 hours understanding the actual problem through empathy mapping and research, not rushing to design.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: tokens.text.base, color: tokens.color.body, lineHeight: tokens.leading.normal }}>
              <strong>The outcome:</strong> Won first place by designing a privacy-first, offline platform that lets individuals build verified document trails. We also explored how AI could accelerate the design process — and where it falls short in empathy-driven work.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="case-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
            <FeatureCard title="The Barrier">
              Lack of verifiable identity locks unhoused individuals out of housing programs that require documentation.
            </FeatureCard>
            <FeatureCard title="Our Solution">
              Designed a platform that lets users build verified document trails and connect with social workers.
            </FeatureCard>
            <FeatureCard title="The Process">
              Spent time understanding (not assuming). Explored AI's role. Built something that works offline and respects privacy.
            </FeatureCard>
          </div>
        </Reveal>
      </section>

      {/* Context */}
      <section id="context" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>I joined a mission to make identity verification accessible for underbanked communities</SectionHeading>
          <SkillRow items={["User Research", "Problem Definition", "Empathy Mapping"]} />
        </Reveal>

        <Callout>The barrier to housing is identity verification.</Callout>
        <Paragraph>
          Unhoused individuals face systemic barriers when accessing shelter and housing. Beyond availability and cost, the most overlooked obstacle is documentation — without verifiable identity, referrals, and proof of eligibility, the path to permanent housing becomes nearly impossible to navigate.
        </Paragraph>

        <div style={{ marginTop: 60, marginBottom: 80 }}>
          <Kicker>User pain points from research</Kicker>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: tokens.radius.md,
                  
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
      <section id="research" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>I started with research into what makes identity verification accessible and secure</SectionHeading>
          <SkillRow items={["Literature Review", "Reddit Research", "AI-Assisted Synthesis"]} />
        </Reveal>

        <div style={{ marginBottom: 60 }}>
          <Callout>Using AI to accelerate discovery</Callout>
        </div>

        <Paragraph>
          With only 6 hours, we used Gemini to condense research papers and Reddit to validate real user experiences. This allowed us to rapidly identify patterns without losing human insight.
        </Paragraph>

        <Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 80 }}>
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

        <div style={{ marginBottom: 60 }}>
          <Callout>AI's role in research: Pros and cons</Callout>
        </div>

        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: 20,
                borderRadius: tokens.radius.md,
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
      <section id="synthesis" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>I synthesized insights into a streamlined verification flow</SectionHeading>
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

        <div style={{ marginTop: 80, marginBottom: 60 }}>
          <Callout>Design principles: Accessibility first</Callout>
        </div>

        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 24,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: 16,
                borderRadius: tokens.radius.md,
                
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
      <section id="solution" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>The redesign makes identity verification accessible, secure, and human-centered</SectionHeading>
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
                
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: 12 }}>
                <rect x="4" y="6" width="20" height="14" rx="2" fill="none" stroke={tokens.color.ink} strokeWidth="1.5"/>
                <circle cx="10" cy="11" r="2.5" fill="none" stroke={tokens.color.ink} strokeWidth="1.5"/>
                <path d="M 4 18 L 16 18" stroke={tokens.color.ink} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M 4 21 L 12 21" stroke={tokens.color.ink} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
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
                
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: 12 }}>
                <circle cx="8" cy="9" r="2.5" fill="none" stroke={tokens.color.ink} strokeWidth="1.5"/>
                <circle cx="20" cy="9" r="2.5" fill="none" stroke={tokens.color.ink} strokeWidth="1.5"/>
                <path d="M 4 14 C 4 12 6 11 8 11 C 10 11 12 12 12 14" fill="none" stroke={tokens.color.ink} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M 16 14 C 16 12 18 11 20 11 C 22 11 24 12 24 14" fill="none" stroke={tokens.color.ink} strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="14" cy="17" r="2.5" fill="none" stroke={tokens.color.ink} strokeWidth="1.5"/>
                <path d="M 10 22 C 10 20 11.8 19 14 19 C 16.2 19 18 20 18 22" fill="none" stroke={tokens.color.ink} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
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
                
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: 12 }}>
                <path d="M 4 16 L 14 6 L 24 16" fill="none" stroke={tokens.color.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="5" y="16" width="18" height="9" rx="1" fill="none" stroke={tokens.color.ink} strokeWidth="1.5"/>
                <rect x="11" y="19" width="6" height="6" rx="0.5" fill="none" stroke={tokens.color.ink} strokeWidth="1.5"/>
              </svg>
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
                
                backgroundColor: tokens.color.offWhite,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginBottom: 12 }}>
                <path d="M 14 4 C 9.6 4 6 7.6 6 12 C 6 16 10 22 14 26 C 18 22 22 16 22 12 C 22 7.6 18.4 4 14 4 Z" fill="none" stroke={tokens.color.ink} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="14" cy="12" r="2" fill={tokens.color.ink}/>
              </svg>
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
          <div style={{ marginBottom: 48 }}>
            <Kicker>How it works: The app's core screens</Kicker>
          </div>
        </Reveal>

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
      <section id="reflection" style={{ paddingTop: 120, paddingBottom: 120 }} className="section-reveal">
        <Reveal dramatic>
          <SectionHeading>This project taught me about designing for impact and building with communities, not for them</SectionHeading>
        </Reveal>

        <Reveal>
          <div style={{ maxWidth: 440, margin: "0 auto" }}>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32, margin: 0 }}>
              The most important lesson: design cannot be replaced with AI—it lacks the empathy one human has for another.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32 }}>
              AI accelerated our research and ideation, but we had to manually verify every AI-sourced insight against lived experience. Ruthless prioritization revealed what actually matters: verification and direct connection with communities.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 32 }}>
              The most resonant ideas emerged when we stepped back from AI suggestions and centered the voices of the people we were designing for.
            </p>
            <p style={{ fontFamily: tokens.font.sans, fontSize: "16px", color: tokens.color.body, lineHeight: tokens.leading.normal, marginBottom: 0, marginTop: 32 }}>
              I'm proud of the impact we created together in an incredibly tight window. To my team: thank you for approaching this work with care, integrity, and a genuine commitment to building with the underbanked community, not for them.
            </p>
          </div>
        </Reveal>
      </section>
    </CaseStudyShell>
  );
};

export default IDBridgeCaseStudy;
