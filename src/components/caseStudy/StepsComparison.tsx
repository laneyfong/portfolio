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
        alignItems: "flex-start",
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
          {[
            { step: 1, label: "Launch app", desc: "Open the application" },
            { step: 2, label: "Navigate to search", desc: "Find the search feature" },
            { step: 3, label: "Enter name", desc: "Type loved one's name" },
            { step: 4, label: "Wait for results", desc: "Results load on screen" },
            { step: 5, label: "Verify location", desc: "Confirm their location" },
            { step: 6, label: "Get status", desc: "Find safety status" },
            { step: 7, label: "Confirm safety", desc: "Verify they're safe" },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 16px",
                borderRadius: tokens.radius.sm,
                backgroundColor: tokens.color.offWhite,
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
                  marginTop: 2,
                }}
              >
                {item.step}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.ink,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "12px",
                    color: tokens.color.muted,
                  }}
                >
                  {item.desc}
                </div>
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
            { step: 1, label: "Open dashboard", desc: "See pinned loved ones instantly" },
            { step: 2, label: "Tap pinned location", desc: "Access one person's status" },
            { step: 3, label: "See safety status", desc: "Get instant confirmation" },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 16px",
                borderRadius: tokens.radius.sm,
                backgroundColor: "#22C55E30",
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
                  marginTop: 2,
                }}
              >
                {item.step}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "13px",
                    fontWeight: tokens.weight.medium,
                    color: tokens.color.ink,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: "12px",
                    color: tokens.color.muted,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepsComparison;
