import type { FC } from "react";
import { tokens } from "../../tokens";
import { LockIcon, AnalyticsIcon, ClockIcon, SettingsIcon } from "../icons/CaseStudyIcons";

const ResearchThemes: FC = () => {
  const themes = [
    {
      icon: LockIcon,
      title: "Trust & Transparency",
      description: "Engineers need to verify AI findings and understand accountability",
    },
    {
      icon: AnalyticsIcon,
      title: "Data Collection Gap",
      description: "Teams lack structured feedback — relying on Slack instead",
    },
    {
      icon: ClockIcon,
      title: "Engineering Priorities",
      description: "Code-breaking bugs crowd out usability fixes",
    },
    {
      icon: SettingsIcon,
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              color: tokens.color.accent,
            }}
          >
            <theme.icon size={24} />
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
