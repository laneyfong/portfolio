import type { FC } from "react";
import { tokens } from "../../tokens";

interface MatrixQuadrant {
  title: string;
  color: string;
  items: string[];
}

const EffortImpactMatrix: FC = () => {
  const quadrants: Record<string, MatrixQuadrant> = {
    highImpactLowEffort: {
      title: "High Impact\nLow Effort",
      color: "#22C55E",
      items: ["Gamified safety instructions", "Better EEW vs CEN differentiation", "Map shown first"],
    },
    highImpactHighEffort: {
      title: "High Impact\nHigh Effort",
      color: "#3B82F6",
      items: ["News section", "User-submitted photo feed", "Sharing location feature"],
    },
    lowImpactLowEffort: {
      title: "Low Impact\nLow Effort",
      color: "#FBBF24",
      items: ["Remove 'MyLog' page", "Updated logo & iconography", "Dark mode implementation"],
    },
    lowImpactHighEffort: {
      title: "Low Impact\nHigh Effort",
      color: "#F87171",
      items: ["Interactive 3D earthquake map"],
    },
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        marginBottom: 32,
      }}
    >
      {/* High Impact / Low Effort */}
      <div
        style={{
          padding: 20,
          borderRadius: tokens.radius.sm,
          backgroundColor: `${quadrants.highImpactLowEffort.color}20`,
          border: `2px solid ${quadrants.highImpactLowEffort.color}`,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "12px",
            fontWeight: tokens.weight.medium,
            color: quadrants.highImpactLowEffort.color,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            lineHeight: 1.4,
          }}
        >
          {quadrants.highImpactLowEffort.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {quadrants.highImpactLowEffort.items.map((item) => (
            <div
              key={item}
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                color: tokens.color.ink,
                lineHeight: 1.4,
              }}
            >
              ✓ {item}
            </div>
          ))}
        </div>
      </div>

      {/* High Impact / High Effort */}
      <div
        style={{
          padding: 20,
          borderRadius: tokens.radius.sm,
          backgroundColor: `${quadrants.highImpactHighEffort.color}20`,
          border: `2px solid ${quadrants.highImpactHighEffort.color}`,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "12px",
            fontWeight: tokens.weight.medium,
            color: quadrants.highImpactHighEffort.color,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            lineHeight: 1.4,
          }}
        >
          {quadrants.highImpactHighEffort.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {quadrants.highImpactHighEffort.items.map((item) => (
            <div
              key={item}
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                color: tokens.color.ink,
                lineHeight: 1.4,
              }}
            >
              ◆ {item}
            </div>
          ))}
        </div>
      </div>

      {/* Low Impact / Low Effort */}
      <div
        style={{
          padding: 20,
          borderRadius: tokens.radius.sm,
          backgroundColor: `${quadrants.lowImpactLowEffort.color}20`,
          border: `2px solid ${quadrants.lowImpactLowEffort.color}`,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "12px",
            fontWeight: tokens.weight.medium,
            color: quadrants.lowImpactLowEffort.color,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            lineHeight: 1.4,
          }}
        >
          {quadrants.lowImpactLowEffort.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {quadrants.lowImpactLowEffort.items.map((item) => (
            <div
              key={item}
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                color: tokens.color.ink,
                lineHeight: 1.4,
              }}
            >
              ◇ {item}
            </div>
          ))}
        </div>
      </div>

      {/* Low Impact / High Effort */}
      <div
        style={{
          padding: 20,
          borderRadius: tokens.radius.sm,
          backgroundColor: `${quadrants.lowImpactHighEffort.color}20`,
          border: `2px solid ${quadrants.lowImpactHighEffort.color}`,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "12px",
            fontWeight: tokens.weight.medium,
            color: quadrants.lowImpactHighEffort.color,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            lineHeight: 1.4,
          }}
        >
          {quadrants.lowImpactHighEffort.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {quadrants.lowImpactHighEffort.items.map((item) => (
            <div
              key={item}
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "13px",
                color: tokens.color.ink,
                lineHeight: 1.4,
              }}
            >
              ○ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EffortImpactMatrix;
