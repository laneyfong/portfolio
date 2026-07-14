import type { FC } from "react";
import { tokens } from "../../tokens";

const StepsComparison: FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        marginBottom: 32,
        alignItems: "center",
      }}
    >
      {/* Before */}
      <div>
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "12px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.muted,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 16,
          }}
        >
          Before
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: tokens.radius.sm,
                backgroundColor: tokens.color.offWhite,
                border: `1px solid ${tokens.color.cardBorder}`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "#FF6B6B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "12px",
                  flexShrink: 0,
                }}
              >
                {step}
              </div>
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "13px",
                  color: tokens.color.body,
                }}
              >
                {step === 1 && "Launch app"}
                {step === 2 && "Navigate to search"}
                {step === 3 && "Enter name"}
                {step === 4 && "Wait for results"}
                {step === 5 && "Verify location"}
                {step === 6 && "Get status"}
                {step === 7 && "Confirm safety"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* After */}
      <div>
        <div
          style={{
            fontFamily: tokens.font.sans,
            fontSize: "12px",
            fontWeight: tokens.weight.medium,
            color: tokens.color.muted,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 16,
          }}
        >
          After
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { step: 1, label: "Open dashboard" },
            { step: 2, label: "Tap pinned location" },
            { step: 3, label: "See safety status" },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: tokens.radius.sm,
                backgroundColor: "#22C55E20",
                border: `1px solid #22C55E`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "12px",
                  flexShrink: 0,
                }}
              >
                {item.step}
              </div>
              <div
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: "13px",
                  color: tokens.color.ink,
                  fontWeight: tokens.weight.medium,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepsComparison;
