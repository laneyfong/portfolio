import type { FC, ReactNode } from "react";
import { tokens } from "../../tokens";

/**
 * Editorial-first case study components for premium product strategy presentation
 */

// ============================================================================
// 1. PROJECT SNAPSHOT DASHBOARD
// ============================================================================
interface SnapshotItem {
  label: string;
  value: string | ReactNode;
  icon?: ReactNode;
}

export const ProjectSnapshot: FC<{ items: SnapshotItem[] }> = ({ items }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 24,
      padding: "40px",
      backgroundColor: tokens.color.offWhite,
      borderRadius: tokens.radius.md,
      marginBottom: 80,
    }}
  >
    {items.map((item, i) => (
      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {item.icon && <div style={{ fontSize: 24 }}>{item.icon}</div>}
        <div
          style={{
            fontSize: "12px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.muted,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
            lineHeight: tokens.leading.snug,
          }}
        >
          {item.value}
        </div>
      </div>
    ))}
  </div>
);

// ============================================================================
// 2. KEY INSIGHT CARD - Large pull quote with evidence
// ============================================================================
interface EvidencePoint {
  label: string;
  value: string;
}

export const KeyInsight: FC<{
  quote: string;
  evidence: EvidencePoint[];
}> = ({ quote, evidence }) => (
  <div style={{ marginBottom: 80 }}>
    <div
      style={{
        borderLeft: `4px solid ${tokens.color.accent}`,
        paddingLeft: 24,
        marginBottom: 40,
      }}
    >
      <p
        style={{
          fontSize: "24px",
          fontStyle: "italic",
          fontWeight: tokens.weight.medium,
          color: tokens.color.ink,
          lineHeight: 1.6,
          maxWidth: 640,
          margin: 0,
        }}
      >
        "{quote}"
      </p>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: 32,
      }}
    >
      {evidence.map((point, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: "14px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.muted,
            }}
          >
            {point.label}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.accent,
            }}
          >
            {point.value}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// 3. VISUAL PROBLEM STATEMENT
// ============================================================================
interface ProblemElement {
  label: string;
  description: string;
  metric?: string;
}

export const VisualProblem: FC<{
  title: string;
  elements: ProblemElement[];
  visual?: ReactNode;
}> = ({ title, elements, visual }) => (
  <div style={{ marginBottom: 80 }}>
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.muted, marginBottom: 12 }}>
        THE PROBLEM
      </div>
      <h2 style={{ fontSize: "24px", fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: 0, maxWidth: 440 }}>
        {title}
      </h2>
    </div>

    {visual && <div style={{ marginBottom: 60 }}>{visual}</div>}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 24,
      }}
    >
      {elements.map((el, i) => (
        <div
          key={i}
          style={{
            padding: 20,
            backgroundColor: tokens.color.offWhite,
            borderRadius: tokens.radius.md,
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              marginBottom: 8,
            }}
          >
            {el.label}
          </div>
          <p
            style={{
              fontSize: "13px",
              color: tokens.color.body,
              lineHeight: tokens.leading.normal,
              margin: 0,
              marginBottom: el.metric ? 12 : 0,
            }}
          >
            {el.description}
          </p>
          {el.metric && (
            <div
              style={{
                fontSize: "16px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.accent,
                marginTop: 8,
              }}
            >
              {el.metric}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// 4. VISUAL TIMELINE / PROCESS
// ============================================================================
interface ProcessStep {
  phase: string;
  title: string;
  insight: string;
  visual?: ReactNode;
  decision?: string;
}

export const VisualTimeline: FC<{ steps: ProcessStep[] }> = ({ steps }) => (
  <div style={{ marginBottom: 80 }}>
    <div style={{ marginBottom: 60 }}>
      <div style={{ fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.muted, marginBottom: 12 }}>
        PROCESS
      </div>
      <h2 style={{ fontSize: "24px", fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: 0 }}>
        From research to ship
      </h2>
    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 60,
      }}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div style={i % 2 === 1 ? { order: 2 } : {}}>
            {step.visual && (
              <div
                style={{
                  borderRadius: tokens.radius.md,
                  overflow: "hidden",
                  backgroundColor: tokens.color.offWhite,
                  minHeight: 300,
                }}
              >
                {step.visual}
              </div>
            )}
          </div>

          <div style={i % 2 === 1 ? { order: 1 } : {}}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: tokens.color.accent,
                color: tokens.color.white,
                fontWeight: tokens.weight.medium,
                fontSize: "16px",
                marginBottom: 16,
              }}
            >
              {i + 1}
            </div>

            <div
              style={{
                fontSize: "12px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.muted,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 8,
              }}
            >
              {step.phase}
            </div>

            <h3
              style={{
                fontSize: "18px",
                fontWeight: tokens.weight.medium,
                color: tokens.color.ink,
                margin: "0 0 16px",
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: tokens.color.body,
                lineHeight: tokens.leading.normal,
                margin: "0 0 12px",
                maxWidth: 400,
              }}
            >
              {step.insight}
            </p>

            {step.decision && (
              <div
                style={{
                  fontSize: "13px",
                  color: tokens.color.accent,
                  fontWeight: tokens.weight.medium,
                  paddingTop: 12,
                  borderTop: `1px solid ${tokens.color.stroke}`,
                }}
              >
                Decision: {step.decision}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// 5. IMPACT INFOGRAPHIC
// ============================================================================
interface ImpactMetric {
  before: string;
  after: string;
  label: string;
  icon?: ReactNode;
}

export const ImpactInfographic: FC<{ metrics: ImpactMetric[] }> = ({ metrics }) => (
  <div style={{ marginBottom: 80 }}>
    <div style={{ marginBottom: 60 }}>
      <div style={{ fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.muted, marginBottom: 12 }}>
        IMPACT
      </div>
      <h2 style={{ fontSize: "24px", fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: 0 }}>
        What changed
      </h2>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 40,
      }}
    >
      {metrics.map((metric, i) => (
        <div
          key={i}
          style={{
            textAlign: "center",
            padding: "32px 20px",
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.color.offWhite,
          }}
        >
          {metric.icon && (
            <div style={{ fontSize: 32, marginBottom: 16 }}>
              {metric.icon}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: "12px", color: tokens.color.muted, marginBottom: 4 }}>Before</div>
              <div style={{ fontSize: "28px", fontWeight: tokens.weight.medium, color: tokens.color.body }}>
                {metric.before}
              </div>
            </div>

            <div style={{ fontSize: "20px", color: tokens.color.muted }}>→</div>

            <div>
              <div style={{ fontSize: "12px", color: tokens.color.muted, marginBottom: 4 }}>After</div>
              <div style={{ fontSize: "28px", fontWeight: tokens.weight.medium, color: tokens.color.accent }}>
                {metric.after}
              </div>
            </div>
          </div>

          <div style={{ fontSize: "13px", fontWeight: tokens.weight.medium, color: tokens.color.ink }}>
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============================================================================
// 6. REFLECTION CARDS
// ============================================================================
interface ReflectionPoint {
  title: string;
  content: string;
}

export const ReflectionCards: FC<{ points: ReflectionPoint[] }> = ({ points }) => (
  <div style={{ marginBottom: 80 }}>
    <div style={{ marginBottom: 60 }}>
      <div style={{ fontSize: "14px", fontWeight: tokens.weight.medium, color: tokens.color.muted, marginBottom: 12 }}>
        REFLECTION
      </div>
      <h2 style={{ fontSize: "24px", fontWeight: tokens.weight.medium, color: tokens.color.ink, margin: 0 }}>
        Key takeaways
      </h2>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 24,
      }}
    >
      {points.map((point, i) => (
        <div
          key={i}
          style={{
            padding: 24,
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.color.offWhite,
            borderLeft: `4px solid ${tokens.color.accent}`,
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              margin: "0 0 12px",
            }}
          >
            {point.title}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: tokens.color.body,
              lineHeight: tokens.leading.normal,
              margin: 0,
            }}
          >
            {point.content}
          </p>
        </div>
      ))}
    </div>
  </div>
);
