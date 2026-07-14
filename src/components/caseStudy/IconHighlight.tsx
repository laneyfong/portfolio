import type { FC } from "react";
import { tokens } from "../../tokens";

interface IconHighlightProps {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

const IconHighlight: FC<IconHighlightProps> = ({ icon, title, description, color = tokens.color.accent }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        padding: "16px 20px",
        borderRadius: tokens.radius.md,
        border: `1px solid ${color}20`,
        backgroundColor: `${color}08`,
      }}
    >
      <div
        style={{
          fontSize: "28px",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "14px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.ink,
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "13px",
            color: tokens.color.body,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default IconHighlight;
