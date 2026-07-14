import type { FC } from "react";
import { tokens } from "../../tokens";

interface ColorVariation {
  label: string;
  color: string;
  isFinal?: boolean;
}

const ColorVariationGrid: FC = () => {
  const variations: ColorVariation[] = [
    { label: "Variation 1", color: "#FFD700" },
    { label: "Variation 2", color: "#FF9500" },
    { label: "Variation 3", color: "#E67E22" },
    { label: "Variation 4 - Final", color: "#E67E22", isFinal: true },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 24,
        marginBottom: 32,
      }}
    >
      {variations.map((variation, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Variation Label */}
          <div
            style={{
              fontFamily: tokens.font.sans,
              fontSize: "14px",
              fontWeight: tokens.weight.medium,
              color: tokens.color.ink,
              letterSpacing: "-0.3px",
            }}
          >
            {variation.label}
          </div>

          {/* Color Card Preview */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              backgroundColor: tokens.color.offWhite,
              borderRadius: tokens.radius.sm,
              border: `1px solid ${tokens.color.cardBorder}`,
            }}
          >
            {/* Magnitude Badge */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: variation.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                flexShrink: 0,
              }}
            >
              5.1
            </div>

            {/* Sample Content */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "13px",
                  fontWeight: tokens.weight.medium,
                  color: tokens.color.ink,
                  marginBottom: 2,
                }}
              >
                Tokyo, Japan
              </div>
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "12px",
                  color: tokens.color.muted,
                  opacity: 0.7,
                }}
              >
                5.2 mi
              </div>
            </div>

            {/* Arrow */}
            <div
              style={{
                fontSize: "18px",
                color: tokens.color.muted,
                opacity: 0.5,
                flexShrink: 0,
              }}
            >
              →
            </div>
          </div>

          {/* Description */}
          {variation.isFinal && (
            <div
              style={{
                fontFamily: tokens.font.sans,
                fontSize: "11px",
                color: tokens.color.muted,
                opacity: 0.6,
                fontStyle: "italic",
              }}
            >
              ✓ Selected for production
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorVariationGrid;
