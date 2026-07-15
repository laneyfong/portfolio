import type { FC } from "react";
import { tokens } from "../../tokens";
import { SpeedIcon, ClarityIcon, CheckIcon, AccessibilityIcon } from "../icons/CaseStudyIcons";

const DesignPrinciples: FC = () => {
  const principles = [
    {
      icon: SpeedIcon,
      title: "Speed",
      description: "Minimize taps and cognitive load to find critical info instantly",
    },
    {
      icon: ClarityIcon,
      title: "Clarity",
      description: "Make the app's purpose clear — safety, not data visualization",
    },
    {
      icon: CheckIcon,
      title: "Reassurance",
      description: "Provide immediate visual confirmation of loved ones' safety status",
    },
    {
      icon: AccessibilityIcon,
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              color: tokens.color.accent,
            }}
          >
            <principle.icon size={24} />
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
