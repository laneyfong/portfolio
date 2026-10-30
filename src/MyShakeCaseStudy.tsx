import type { FC } from "react";
import { Reveal, Callout, BigImpactStat } from "./components/caseStudy/CaseStudyKit";
import { CaseStudyShell, type CaseSection } from "./components/caseStudy/CaseStudyShell";
import myshakeBeforeScreens from "./assets/myshake-before-screens.png";
import myshakeDashboard from "./assets/myshake-dashboard.png";
import myshakeStoryboard from "./assets/myshake-storyboard.png";
import myshakeAlert from "./assets/myshake-alert.png";

const SECTIONS: CaseSection[] = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Impact" },
];

const HIGHLIGHTS = [
  "Increased user engagement 45% by restructuring IA around personal safety.",
  "Reduced steps from 7 to 3 — two taps instead of multi-screen search.",
  "Navigated a no-research constraint into a scoped study that shaped every decision.",
];

const MyShakeCaseStudy: FC = () => {
  return (
    <CaseStudyShell sections={SECTIONS} highlights={HIGHLIGHTS}>
      <div id="problem" style={{ padding: "60px 52px", maxWidth: "900px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "32px" }}>The Problem</h2>

        <Reveal>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "var(--text-primary)", marginBottom: "24px" }}>
            MyShake is an earthquake detection app by UC Berkeley that detects seismic activity through smartphone sensors. The app had users but engagement was low — people didn't know <em>why</em> they should check on loved ones, or <em>how</em> to find them quickly.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <img
            src={myshakeBeforeScreens}
            alt="Before: confusing navigation with data visualization focus"
            style={{ width: "100%", borderRadius: "12px", marginBottom: "24px" }}
          />
        </Reveal>

        <Reveal delay={200}>
          <Callout>
            <strong>The core issue:</strong> The IA prioritized earthquake data over human connection. Users had to navigate through maps and graphs to check on loved ones.
          </Callout>
        </Reveal>
      </div>

      <div id="solution" style={{ padding: "60px 52px", maxWidth: "900px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "32px" }}>The Shift</h2>

        <Reveal>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "var(--text-primary)", marginBottom: "24px" }}>
            The insight: <strong>Reframe the app around personal safety, not data visualization.</strong> Make "check on loved ones" the primary action, not buried in a secondary tab.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "12px" }}>
              Before: 7 steps to check on someone
            </p>
            <img
              src={myshakeStoryboard}
              alt="User journey: old multi-step flow"
              style={{ width: "100%", borderRadius: "12px" }}
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "12px" }}>
              After: 2 taps to check on a loved one
            </p>
            <img
              src={myshakeDashboard}
              alt="New design: dashboard-first with quick contact checks"
              style={{ width: "100%", borderRadius: "12px" }}
            />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Alert System
              </p>
              <img src={myshakeAlert} alt="Alert notification design" style={{ width: "100%", borderRadius: "8px" }} />
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Clear Action
              </p>
              <div style={{ background: "var(--bg-secondary)", borderRadius: "8px", padding: "16px", textAlign: "center", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  Prominent "Check Loved Ones" button
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div id="impact" style={{ padding: "60px 52px", maxWidth: "900px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "32px" }}>Results</h2>

        <Reveal>
          <BigImpactStat value="45%" label="Increase in user engagement" />
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Step Reduction
              </p>
              <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--text-primary)" }}>
                7 <span style={{ fontSize: "18px", color: "var(--text-secondary)" }}>→</span> 3
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>steps to check on loved ones</p>
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
                Status Checks
              </p>
              <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--text-primary)" }}>
                2x
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>more frequent post-launch</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <Callout>
            <strong>Key takeaway:</strong> Reframing a feature's purpose — making personal safety the hero, not the data — changed how users engaged with the app. Sometimes the best design decision is organizational, not visual.
          </Callout>
        </Reveal>
      </div>
    </CaseStudyShell>
  );
};

export default MyShakeCaseStudy;
