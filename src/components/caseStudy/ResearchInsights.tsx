import type { FC } from "react";
import { tokens } from "../../tokens";

const ResearchInsights: FC = () => {
  const insights = [
    {
      number: "7",
      label: "Steps to find\none person",
      color: "#FF6B6B",
    },
    {
      number: "5%",
      label: "Current active\nuser rate",
      color: "#FFA500",
    },
    {
      number: "2",
      label: "Alert types\nconfusion",
      color: "#FFD93D",
    },
    {
      number: "1st",
      label: "Priority:\nFamily Safety",
      color: "#4D96FF",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 20,
        marginBottom: 32,
      }}
    >
      {insights.map((insight, idx) => (
        <div
          key={idx}
          style={{
            padding: 24,
            borderRadius: tokens.radius.md,
            border: `1px solid ${insight.color}`,
            backgroundColor: `${insight.color}08`,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "32px",
              fontWeight: tokens.weight.medium,
              color: insight.color,
              lineHeight: 1,
            }}
          >
            {insight.number}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "13px",
              color: tokens.color.ink,
              lineHeight: 1.4,
              fontWeight: tokens.weight.medium,
            }}
          >
            {insight.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResearchInsights;
