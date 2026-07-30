import type { FC } from "react";
import { tokens } from "../../tokens";
import { PinIcon, SpeedIcon, MapIcon, AlertIcon } from "../icons/CaseStudyIcons";

const SolutionBreakdown: FC = () => {
  const features = [
    {
      icon: PinIcon,
      title: "Pinned Locations",
      description: "Instant access to family",
      color: "#22C55E",
    },
    {
      icon: SpeedIcon,
      title: "Quick Safety Check",
      description: "Status in 3 taps",
      color: "#3B82F6",
    },
    {
      icon: MapIcon,
      title: "Map-First Layout",
      description: "Visual context first",
      color: "#F59E0B",
    },
    {
      icon: AlertIcon,
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
            backgroundColor: `${feature.color}20`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              color: feature.color,
            }}
          >
            <feature.icon size={24} />
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
