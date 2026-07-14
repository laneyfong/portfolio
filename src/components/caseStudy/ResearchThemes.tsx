import type { FC } from "react";
import { tokens } from "../../tokens";

const ResearchThemes: FC = () => {
  const themes = [
    {
      icon: "🔒",
      title: "Trust & Transparency",
      description: "Engineers need to verify AI findings and understand accountability",
    },
    {
      icon: "📊",
      title: "Data Collection Gap",
      description: "Teams lack structured feedback — relying on Slack instead",
    },
    {
      icon: "⏰",
      title: "Engineering Priorities",
      description: "Code-breaking bugs crowd out usability fixes",
    },
    {
      icon: "⚙️",
      title: "Simple Tools Win",
      description: "Engineers want zero onboarding — seamless workflow replacement",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 20,
        marginBottom: 32,
      }}
    >
      {themes.map((theme, idx) => (
        <div
          key={idx}
          style={{
            padding: 24,
            borderRadius: tokens.radius.md,
            border: `1px solid ${tokens.color.cardBorder}`,
            backgroundColor: tokens.color.offWhite,
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
            {theme.icon}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
            }}
          >
            {theme.title}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "13px",
              color: tokens.color.body,
              lineHeight: 1.5,
            }}
          >
            {theme.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResearchThemes;
