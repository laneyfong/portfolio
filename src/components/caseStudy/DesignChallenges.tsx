import type { FC } from "react";
import { tokens } from "../../tokens";

const DesignChallenges: FC = () => {
  const challenges = [
    {
      icon: "🤔",
      title: "The Gap",
      metric: "What engineers say ≠ What they do",
      color: "#FF6B6B",
    },
    {
      icon: "⏳",
      title: "Time Pressure",
      metric: "Timelines drive priorities",
      color: "#FFA500",
    },
    {
      icon: "📝",
      title: "No Feedback Loop",
      metric: "Post-launch Slack messages",
      color: "#FFD93D",
    },
    {
      icon: "🔍",
      title: "Verification Needed",
      metric: "Can't trust black boxes",
      color: "#6BCB77",
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
      {challenges.map((challenge, idx) => (
        <div
          key={idx}
          style={{
            padding: 20,
            borderRadius: tokens.radius.md,
            border: `1px solid ${challenge.color}20`,
            backgroundColor: `${challenge.color}08`,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1,
            }}
          >
            {challenge.icon}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "14px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
            }}
          >
            {challenge.title}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "12px",
              color: tokens.color.body,
              lineHeight: 1.4,
              fontWeight: tokens.weight.medium,
            }}
          >
            {challenge.metric}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignChallenges;
