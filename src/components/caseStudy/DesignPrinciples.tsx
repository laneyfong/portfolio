import type { FC } from "react";
import { tokens } from "../../tokens";

const DesignPrinciples: FC = () => {
  const principles = [
    {
      icon: "⚡",
      title: "Speed",
      description: "Minimize taps and cognitive load to find critical info instantly",
    },
    {
      icon: "🎯",
      title: "Clarity",
      description: "Make the app's purpose clear — safety, not data visualization",
    },
    {
      icon: "✓",
      title: "Reassurance",
      description: "Provide immediate visual confirmation of loved ones' safety status",
    },
    {
      icon: "♿",
      title: "Accessibility",
      description: "Design for all users, not just data enthusiasts or scientists",
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
      {principles.map((principle, idx) => (
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
            {principle.icon}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "15px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
            }}
          >
            {principle.title}
          </div>
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "13px",
              color: tokens.color.body,
              lineHeight: 1.5,
            }}
          >
            {principle.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignPrinciples;
