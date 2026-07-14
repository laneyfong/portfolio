import type { FC } from "react";
import { tokens } from "../../tokens";

const SolutionBreakdown: FC = () => {
  const features = [
    {
      icon: "📍",
      title: "Pinned Locations",
      description: "Instant access to family",
      color: "#22C55E",
    },
    {
      icon: "⚡",
      title: "Quick Safety Check",
      description: "Status in 3 taps",
      color: "#3B82F6",
    },
    {
      icon: "🗺",
      title: "Map-First Layout",
      description: "Visual context first",
      color: "#F59E0B",
    },
    {
      icon: "🎯",
      title: "Clear Alerts",
      description: "EEW vs CEN distinction",
      color: "#DC2626",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 20,
        marginBottom: 32,
      }}
    >
      {features.map((feature, idx) => (
        <div
          key={idx}
          style={{
            padding: 24,
            borderRadius: tokens.radius.md,
            border: `1px solid ${feature.color}`,
            backgroundColor: `${feature.color}08`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: "32px",
              lineHeight: 1,
            }}
          >
            {feature.icon}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "14px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
            }}
          >
            {feature.title}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "12px",
              color: tokens.color.muted,
              lineHeight: 1.4,
            }}
          >
            {feature.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolutionBreakdown;
