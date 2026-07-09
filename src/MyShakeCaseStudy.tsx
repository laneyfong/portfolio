import type { FC } from "react";
import { tokens } from "./tokens";
import VisualCaseStudyShell from "./components/caseStudy/VisualCaseStudyShell";
import myshakeDashboard from "./assets/myshake-dashboard.png";
import myshakePinned from "./assets/myshake-pinned-locations.png";
import myshakeUserScenario from "./assets/myshake-user-scenario.png";
import myshakeOriginalFlow from "./assets/myshake-original-flow.png";

const MyShakeCaseStudy: FC = () => {
  return (
    <VisualCaseStudyShell
      title="MyShake: Earthquake Safety Redesign"
      subtitle="Users couldn't find critical earthquake information fast enough. By restructuring the entire information architecture around personal safety—not data visualization—we reduced the steps to check on loved ones from 7 to 3, and increased overall engagement by 45%."
      tags={["Product Design", "UX Research", "Information Architecture", "Shipped"]}
      metrics={[
        { label: "Engagement Increase", value: "45%" },
        { label: "Steps Reduced", value: "7 → 3" },
        { label: "Time Saved", value: "~2s per interaction" },
      ]}
      heroImages={[
        { src: myshakeDashboard, alt: "MyShake Dashboard" },
        { src: myshakePinned, alt: "Pinned Locations Feature" },
      ]}
    >
      {/* Detailed Content Sections */}
      <div style={{ maxWidth: 900 }}>
        {/* Research Section */}
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
            During earthquakes, users opened MyShake with a simple goal: check if loved ones are safe. But the app presented them with earthquake data first—complex maps, technical metrics, and visualization tools designed for researchers, not people in crisis.
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
            The existing flow required users to navigate through 7+ steps: open app → find earthquake info → scroll → search for location → check if loved one was near → find contact → message. This multi-screen journey created anxiety and friction during moments of acute stress.
          </p>
        </div>

        {/* User Scenario */}
        <div style={{ marginBottom: 80 }}>
          <h3
            style={{
              margin: "0 0 16px 0",
              fontFamily: tokens.font.sans,
              fontSize: "18px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            User Research: How People Actually Use the App
          </h3>
          <img
            src={myshakeUserScenario}
            alt="User Scenario Storyboard"
            style={{
              width: "100%",
              borderRadius: tokens.radius.sm,
              border: `1px solid ${tokens.color.cardBorder}`,
              marginBottom: 24,
            }}
          />
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
            Storyboard showing how users interact with MyShake during actual seismic events.
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
            The Solution
          </h2>

          <h3
            style={{
              margin: "0 0 12px 0",
              fontFamily: tokens.font.sans,
              fontSize: "16px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            Redesigned Information Architecture
          </h3>
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
            We restructured the entire app around a single principle: <strong>personal safety first</strong>. The redesigned flow now prioritizes checking on loved ones in 3 steps:
          </p>

          <div style={{ marginBottom: 32 }}>
            <img
              src={myshakeOriginalFlow}
              alt="Original vs New User Flow"
              style={{
                width: "100%",
                borderRadius: tokens.radius.sm,
                border: `1px solid ${tokens.color.cardBorder}`,
              }}
            />
          </div>

          <div style={{ backgroundColor: tokens.color.offWhite, padding: 24, borderRadius: tokens.radius.sm, marginBottom: 32 }}>
            <h4
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
              New 3-Step Flow
            </h4>
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
              <li>Open app → See pinned loved ones status immediately</li>
              <li>Tap contact → Send message or call (built-in quick actions)</li>
              <li>If more context needed → Browse earthquake data (secondary, research-focused)</li>
            </ol>
          </div>

          <h3
            style={{
              margin: "0 0 12px 0",
              fontFamily: tokens.font.sans,
              fontSize: "16px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              lineHeight: 1.3,
            }}
          >
            Key Design Decisions
          </h3>
          <ul
            style={{
              margin: 0,
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
              <strong>Pinned Locations:</strong> Users can save up to 5 family/friend addresses. During earthquakes, their status
              appears instantly—no search required.
            </li>
            <li>
              <strong>One-Tap Messaging:</strong> Reduced friction by embedding quick message templates and phone call options
              directly in the contact card.
            </li>
            <li>
              <strong>Contextual Data Visualization:</strong> Earthquake maps and technical info moved to a secondary tab, only
              visible if the user wants more context.
            </li>
            <li>
              <strong>Clear Visual Hierarchy:</strong> Used color, typography, and spatial proximity to signal what matters most
              in a crisis moment.
            </li>
          </ul>
        </div>

        {/* Results Section */}
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
            Results & Impact
          </h2>
          <div style={{ backgroundColor: tokens.color.offWhite, padding: 32, borderRadius: tokens.radius.sm }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
              <div>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "32px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.ink,
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  45%
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: tokens.font.sans,
                    fontSize: "14px",
                    fontWeight: tokens.weight.regular,
                    color: tokens.color.body,
                    opacity: 0.8,
                  }}
                >
                  Increase in app engagement post-launch
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "32px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.ink,
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  7 → 3
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: tokens.font.sans,
                    fontSize: "14px",
                    fontWeight: tokens.weight.regular,
                    color: tokens.color.body,
                    opacity: 0.8,
                  }}
                >
                  Steps to check on a loved one
                </p>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "32px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.ink,
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  86%
                </div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: tokens.font.sans,
                    fontSize: "14px",
                    fontWeight: tokens.weight.regular,
                    color: tokens.color.body,
                    opacity: 0.8,
                  }}
                >
                  User satisfaction with redesigned flow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualCaseStudyShell>
  );
};

export default MyShakeCaseStudy;
